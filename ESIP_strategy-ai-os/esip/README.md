# ESIP — Enterprise Strategy Intelligence Platform

> 회사명만 바꾸면 전략보고서가 자동 생성되는 AI 기반 전략기획 자동화 시스템

---

## 아키텍처

```
GitHub (Repository)
    ↓ 프롬프트 / 템플릿 / 스크립트
Claude Code (Research Engine)
    ↓ 시장·경쟁사·정책·기술 조사
Google Drive          Google Sheets (Master DB)
(Word/PPT 저장)      Company/Market/Competitor/Feature
                      Pricing/Investment/Policy/Patent
                      Reference/Report_Log/QA_Log
         ↓
    n8n Cloud (8개 Workflow 자동화)
    Daily / Weekly / Monthly / Regulation
    Investment / Patent / Report / PPT
         ↓
    ChatGPT API (전략 분석 + 임원 보고 문체)
         ↓
    PowerPoint / Word 최종 산출물
```

---

## 파일 구조

```
strategy-ai-os/
├── ESIP_INSTALL_GUIDE.md       ← 설치 가이드 (여기서 시작)
├── prompts/
│   ├── 00_CLAUDE_CODE_MASTER_PROMPT.md
│   ├── 01_CHAPTER_TEMPLATE_PROMPT.md
│   ├── 02_COMPETITOR_INTELLIGENCE_PROMPT.md
│   ├── 03_QA_PROMPT.md
│   └── 04_DANAA_CHAPTER_1_2_RUN_PROMPT.md
├── automation/
│   ├── google_apps_script.js   ← Sheets 11개 DB + Web App API
│   └── n8n_workflows_8.json    ← n8n 8개 워크플로우
├── templates/
│   └── report_structure.md
├── scripts/
│   └── create_project_structure.sh
└── outputs/
    ├── reports/    (Chapter별 보고서)
    ├── ppt/        (PPT 스토리보드)
    ├── db/         (CSV 데이터)
    ├── references/ (레퍼런스 목록)
    ├── automation/ (자동화 가이드)
    └── qa/         (QA 리포트)
```

---

## 빠른 시작

1. `ESIP_INSTALL_GUIDE.md` 읽기
2. Google Sheets에 `automation/google_apps_script.js` 설치
3. n8n Cloud에 `automation/n8n_workflows_8.json` 임포트
4. Claude Code에서 `prompts/00_CLAUDE_CODE_MASTER_PROMPT.md` 실행

---

## n8n 8개 워크플로우

| # | 이름 | 트리거 | 주요 액션 |
|---|---|---|---|
| WF1 | Daily Market Intelligence | 평일 07:00 | 뉴스 수집 → Claude 분석 → Sheets 저장 |
| WF2 | Weekly Competitor Intelligence | 월 07:00 | 경쟁사 업데이트 → Gap Analysis |
| WF3 | Monthly Executive Report | 매월 1일 | DB 집계 → ChatGPT 보고서 |
| WF4 | Regulation Monitoring | 수 08:00 | 정책 변화 → Policy_DB |
| WF5 | Investment Monitoring | 금 08:00 | 투자/M&A → Investment_DB |
| WF6 | Patent Monitoring | 매월 15일 | 특허 → Patent_DB |
| WF7 | Report Generator | Webhook | Claude 보고서 → ChatGPT 개선 |
| WF8 | PPT Generator | Webhook | 보고서 → PPT 스토리보드 |

---

## Google Sheets Master DB (11개 시트)

| 시트 | 업데이트 주기 | 주요 필드 |
|---|---|---|
| Company_DB | 월간 | 기업명, 산업, URL, 모회사 |
| Market_DB | 분기 | 시장명, 규모, CAGR, 출처 |
| Competitor_DB | 주간 | 경쟁사, BM, 위협수준 |
| Feature_DB | 주간 | 기능명, AI여부, 출시일 |
| Pricing_DB | 주간 | 요금제, 가격, 고객군 |
| Investment_DB | 주간 | 투자라운드, 금액, 투자자 |
| Policy_DB | 주간 | 정책명, 기관, 영향도 |
| Patent_DB | 월간 | 특허명, 기술영역 |
| Reference_DB | 수시 | 출처, Tier, 사용 Chapter |
| Report_Log | 수시 | 보고서 버전, 상태, URL |
| QA_Log | 수시 | QA 점수, 승인 상태 |

---

## 핵심 원칙

- 근거 없는 주장 금지 — 수치에는 반드시 출처 URL
- 공식자료 우선 (정부 > 공공기관 > 기업공시 > 논문)
- 사실(Fact)과 해석(Insight) 분리
- CEO 의사결정 관점으로 작성
- 회사명만 변경하면 동일 구조 재사용 가능

---

## 대상 기업 (현재)

- 기업명: 다나아데이터
- 산업: AI 헬스케어 / 디지털 헬스케어 / 건강검진 플랫폼
- 서비스: 에스크미, 나만의 건강 AI코치, 비즈36.5, 바이오에이지
- 관련사: 대웅제약
