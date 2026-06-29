/**
 * ESIP — Enterprise Strategy Intelligence Platform
 * Google Apps Script: Master DB 자동화
 *
 * [설치 방법]
 * 1. Google Sheets 열기
 * 2. 확장 프로그램 > Apps Script
 * 3. 이 코드 전체 붙여넣기
 * 4. 저장 > 배포 > 새 배포 > 웹 앱
 *    - 액세스: 모든 사용자 (n8n 연동용)
 * 5. 배포 URL을 n8n 워크플로우에 입력
 */

// =============================================
// 1. 시트 초기화 — 처음 한 번만 실행
// =============================================
function initializeAllSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const schemas = {
    Company_DB: [
      'id','company_name','industry','country','official_url',
      'founding_year','parent_company','ceo','employee_count',
      'revenue','description','created_at','updated_at','source_url'
    ],
    Market_DB: [
      'id','market_name','region','market_size_usd','currency',
      'cagr','base_year','forecast_year','segment',
      'key_driver','source_name','source_url','created_at','updated_at'
    ],
    Competitor_DB: [
      'id','company_name','country','service_name','target_customer',
      'business_model','pricing','ai_features','data_assets',
      'partnerships','threat_level','strength','weakness',
      'source_url','created_at','updated_at'
    ],
    Feature_DB: [
      'id','company_name','service_name','feature_name','feature_category',
      'description','ai_enabled','release_date',
      'source_url','created_at','updated_at'
    ],
    Pricing_DB: [
      'id','company_name','service_name','plan_name','price',
      'currency','billing_cycle','target_customer','features_included',
      'source_url','created_at','updated_at'
    ],
    Investment_DB: [
      'id','company_name','round','amount_usd','investors',
      'date','valuation','use_of_funds','country',
      'source_url','created_at','updated_at'
    ],
    Policy_DB: [
      'id','policy_name','country','authority','policy_type',
      'effective_date','summary','impact_on_danaa','status',
      'source_url','created_at','updated_at'
    ],
    Patent_DB: [
      'id','company_name','patent_title','patent_number','country',
      'application_date','registration_date','technology_area',
      'abstract','source_url','created_at','updated_at'
    ],
    Reference_DB: [
      'id','title','organization','author','publication_date',
      'url','accessed_date','tier','doc_type',
      'used_in_chapter','notes','created_at'
    ],
    Report_Log: [
      'id','report_title','chapter','version','status',
      'qa_score','created_by','created_at','updated_at',
      'gdrive_url','notes'
    ],
    QA_Log: [
      'id','report_id','report_title','qa_score','fact_accuracy',
      'source_quality','logic_structure','strategic_insight',
      'executability','exec_suitability','reusability',
      'major_issues','minor_issues','approval_status',
      'reviewer','reviewed_at'
    ]
  };

  Object.entries(schemas).forEach(([sheetName, headers]) => {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    } else {
      sheet.clearContents();
    }
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#1a1a2e')
      .setFontColor('#ffffff')
      .setFontWeight('bold');
    sheet.setFrozenRows(1);
  });

  SpreadsheetApp.getUi().alert('✅ ESIP Master DB 초기화 완료 — 11개 시트 생성됨');
}

// =============================================
// 2. Web App 진입점 — n8n에서 POST 요청
// =============================================
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const { sheet, action, data } = payload;

    if (!sheet || !action) {
      return jsonResponse({ success: false, error: 'sheet, action 필드 필수' });
    }

    switch (action) {
      case 'append':
        return appendRow(sheet, data);
      case 'upsert':
        return upsertRow(sheet, data);
      case 'read':
        return readSheet(sheet, payload.limit || 100);
      case 'search':
        return searchSheet(sheet, payload.query);
      default:
        return jsonResponse({ success: false, error: `알 수 없는 action: ${action}` });
    }
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

function doGet(e) {
  const sheet = e.parameter.sheet;
  const limit = parseInt(e.parameter.limit) || 50;
  if (!sheet) return jsonResponse({ success: false, error: 'sheet 파라미터 필요' });
  return readSheet(sheet, limit);
}

// =============================================
// 3. 핵심 함수
// =============================================
function appendRow(sheetName, data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return jsonResponse({ success: false, error: `시트 없음: ${sheetName}` });

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const now = new Date().toISOString();
  const id = Utilities.getUuid();

  const row = headers.map(h => {
    if (h === 'id') return id;
    if (h === 'created_at') return now;
    if (h === 'updated_at') return now;
    return data[h] !== undefined ? data[h] : '';
  });

  sheet.appendRow(row);
  return jsonResponse({ success: true, id, sheet: sheetName, action: 'append' });
}

function upsertRow(sheetName, data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return jsonResponse({ success: false, error: `시트 없음: ${sheetName}` });

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const allData = sheet.getDataRange().getValues();
  const now = new Date().toISOString();

  // 매칭 키: company_name + service_name 또는 id
  const matchKey = data.id || null;
  let matchRow = -1;

  if (matchKey) {
    const idCol = headers.indexOf('id');
    for (let i = 1; i < allData.length; i++) {
      if (allData[i][idCol] === matchKey) { matchRow = i + 1; break; }
    }
  }

  if (matchRow > 0) {
    const row = headers.map(h => {
      if (h === 'updated_at') return now;
      return data[h] !== undefined ? data[h] : allData[matchRow - 1][headers.indexOf(h)];
    });
    sheet.getRange(matchRow, 1, 1, row.length).setValues([row]);
    return jsonResponse({ success: true, action: 'updated', row: matchRow });
  } else {
    return appendRow(sheetName, data);
  }
}

function readSheet(sheetName, limit) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return jsonResponse({ success: false, error: `시트 없음: ${sheetName}` });

  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return jsonResponse({ success: true, rows: [] });

  const headers = data[0];
  const rows = data.slice(1, limit + 1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i]; });
    return obj;
  });

  return jsonResponse({ success: true, sheet: sheetName, count: rows.length, rows });
}

function searchSheet(sheetName, query) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet || !query) return jsonResponse({ success: false, error: 'sheet 또는 query 없음' });

  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const q = query.toLowerCase();

  const rows = data.slice(1).filter(row =>
    row.some(cell => String(cell).toLowerCase().includes(q))
  ).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i]; });
    return obj;
  });

  return jsonResponse({ success: true, query, count: rows.length, rows });
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// =============================================
// 4. 메뉴 등록
// =============================================
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🧠 ESIP')
    .addItem('DB 초기화 (최초 1회)', 'initializeAllSheets')
    .addItem('테스트: Company_DB 샘플 입력', 'testInsertSample')
    .addToUi();
}

function testInsertSample() {
  const payload = {
    sheet: 'Company_DB',
    action: 'append',
    data: {
      company_name: '다나아데이터',
      industry: 'AI 헬스케어',
      country: 'Korea',
      official_url: 'https://www.danaaData.com',
      parent_company: '대웅제약',
      description: 'AI 기반 건강검진 플랫폼'
    }
  };
  const result = appendRow(payload.sheet, payload.data);
  SpreadsheetApp.getUi().alert('샘플 입력 완료:\n' + result.getContent());
}
