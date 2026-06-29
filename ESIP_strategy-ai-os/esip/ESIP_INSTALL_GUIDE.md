# ESIP 설치 가이드 — Step by Step

## 전체 소요시간: 약 2시간

---

## STEP 1. GitHub Repository 생성 (10분)

1. github.com 접속 > New Repository
2. Repository name: `strategy-ai-os`
3. Visibility: **Private**
4. README 체크 후 Create
5. 이 패키지 전체 파일을 Repository에 업로드

폴더 구조:
```
strategy-ai-os/
├── prompts/
│   ├── 00_CLAUDE_CODE_MASTER_PROMPT.md
│   ├── 01_CHAPTER_TEMPLATE_PROMPT.md
│   ├── 02_COMPETITOR_INTELLIGENCE_PROMPT.md
│   ├── 03_QA_PROMPT.md
│   └── 04_DANAA_CHAPTER_1_2_RUN_PROMPT.md
├── automation/
│   ├── google_apps_script.js
│   └── n8n_workflows_8.json
├── templates/
│   └── report_structure.md
├── scripts/
│   └── create_project_structure.sh
└── outputs/
    ├── reports/
    ├── ppt/
    ├── db/
    ├── references/
    ├── automation/
    └── qa/
```

---

## STEP 2. Google Sheets Master DB 구축 (20분)

### 2-1. Sheets 파일 생성
1. Google Drive에서 새 Google Sheets 생성
2. 파일명: `ESIP_Master_DB`

### 2-2. Apps Script 설치
1. Sheets에서: 확장 프로그램 > Apps Script
2. `google_apps_script.js` 전체 내용 붙여넣기
3. 저장 (Ctrl+S)

### 2-3. DB 초기화
1. Apps Script 에디터에서 `initializeAllSheets` 함수 선택
2. 실행 버튼 클릭
3. 권한 허용 (Google 계정 인증)
4. Sheets로 돌아오면 11개 시트 생성 확인:
   - Company_DB / Market_DB / Competitor_DB / Feature_DB
   - Pricing_DB / Investment_DB / Policy_DB / Patent_DB
   - Reference_DB / Report_Log / QA_Log

### 2-4. Web App 배포 (핵심!)
1. Apps Script 에디터에서 오른쪽 상단 **배포** 클릭
2. **새 배포** 선택
3. 설정:
   - 유형: 웹 앱
   - 설명: ESIP Web App v1
   - 실행 계정: 나(본인 계정)
   - 액세스 권한: **모든 사용자**
4. **배포** 클릭
5. Web App URL 복사 → 메모해 둘 것

```
예시 URL:
https://script.google.com/macros/s/AKfycbxxxxxx/exec
```

### 2-5. 연결 테스트
브라우저에서 아래 URL 입력 (URL은 본인 것으로 변경):
```
https://script.google.com/macros/s/YOUR_URL/exec?sheet=Company_DB&limit=5
```
`{"success":true,"rows":[]}` 응답이 오면 성공.

---

## STEP 3. n8n Cloud 설정 (30분)

### 3-1. n8n Cloud 접속
- app.n8n.cloud 로그인

### 3-2. 환경변수 등록
Settings > Variables에서 아래 등록:

| 변수명 | 값 |
|---|---|
| ANTHROPIC_API_KEY | Claude API Key |
| OPENAI_API_KEY | OpenAI API Key |
| NEWS_API_KEY | newsapi.org API Key |
| SHEETS_WEBAPP_URL | STEP 2-4에서 복사한 URL |
| GMAIL_ACCOUNT | 알림 수신 이메일 |

### 3-3. Gmail 연결
Credentials > New > Gmail OAuth2
- Google 계정 연결 (알림 발송용)

### 3-4. 워크플로우 임포트
`n8n_workflows_8.json`의 각 워크플로우를:
1. n8n > Workflows > New > Import from JSON
2. 워크플로우별로 JSON 블록 붙여넣기
3. SHEETS_WEBAPP_URL, GMAIL_ACCOUNT 등 플레이스홀더를 실제 값으로 교체

### 3-5. 워크플로우 활성화 순서
우선순위 순:
1. WF1 Daily Market Intelligence — 즉시 활성화
2. WF2 Weekly Competitor Intelligence — 즉시 활성화
3. WF4 Regulation Monitoring — 즉시 활성화
4. WF5 Investment Monitoring — 즉시 활성화
5. WF7 Report Generator (Webhook) — 필요시 수동 실행
6. WF8 PPT Generator (Webhook) — 필요시 수동 실행
7. WF3 Monthly Executive Report — 다음 달 1일 자동 실행
8. WF6 Patent Monitoring — 15일 자동 실행

---

## STEP 4. Claude Code 연결 (20분)

1. Claude Code 앱 설치 (claude.ai/code)
2. GitHub Repository 연결
3. `prompts/00_CLAUDE_CODE_MASTER_PROMPT.md` 실행
4. 첫 실행 명령:

```
대상 회사: 다나아데이터
산업: AI 헬스케어 / 디지털 헬스케어 / 건강검진 플랫폼
산출물: Chapter 1, Chapter 2 최종본 생성
품질 기준: 공식 자료 기반, 출처 포함
```

5. 생성된 파일은 `outputs/reports/` 에 저장됨

---

## STEP 5. 검증 체크리스트

- [ ] GitHub Repository Private 확인
- [ ] Google Sheets 11개 시트 생성 확인
- [ ] Apps Script Web App URL 발급 확인
- [ ] Web App GET 테스트 응답 확인
- [ ] n8n 환경변수 5개 등록 확인
- [ ] Gmail 연결 확인
- [ ] WF1 Daily Intelligence 수동 실행 테스트
- [ ] Sheets에 데이터 자동 입력 확인
- [ ] Claude Code Chapter 1 생성 확인

---

## 회사명 변경 시 재사용 방법

새 프로젝트 시작 시 아래 3개 파일만 수정:

1. `prompts/00_CLAUDE_CODE_MASTER_PROMPT.md`
   - `Company: 다나아데이터` → 새 회사명
   - `Industry:` → 새 산업
   - `Services:` → 새 서비스

2. `automation/n8n_workflows_8.json`
   - 뉴스 검색 키워드 업데이트

3. Google Sheets
   - Company_DB에 새 회사 정보 입력

나머지 구조(Sheets 스키마, n8n 흐름, Claude 프롬프트 템플릿)는 그대로 재사용.

---

## API Key 발급 방법

| 서비스 | 발급 URL | 비용 |
|---|---|---|
| Anthropic Claude | console.anthropic.com | 사용량 기반 |
| OpenAI ChatGPT | platform.openai.com | 사용량 기반 |
| NewsAPI | newsapi.org/register | 무료(월 100건) / 유료 |
| n8n Cloud | app.n8n.cloud | 월 $20~ |

---

## 문제 해결

**Apps Script 권한 오류**
→ 배포 시 "액세스: 모든 사용자" 재확인

**n8n → Sheets 연결 실패**
→ Web App URL이 올바른지 확인
→ Apps Script > 배포 관리 > URL 재복사

**Claude API 오류**
→ ANTHROPIC_API_KEY 환경변수 재확인
→ 모델명: `claude-opus-4-6` 확인
