# Project TITAN Operating Manual

## 목적

전략기획자의 반복 업무를 AI 기반으로 자동화한다.

## 업무 프로세스 매핑

| 전략기획 업무 | AI Agent | 산출물 |
|---|---|---|
| 시장조사 | Market Agent | Market_DB, Market Report |
| 경쟁사 조사 | Competitor Agent | Competitor_DB, Benchmark Report |
| 정책 조사 | Regulation Agent | Policy_DB |
| 기술 조사 | Technology Agent | Tech Trend Report |
| 사업 진단 | Strategy Agent | SWOT, Issue Tree |
| 임원 보고 | Executive Agent | CEO Report, PPT |
| 품질 검증 | QA Agent | QA Report |

## 표준 실행 명령

```text
대상 기업: [회사명]
산업: [산업명]
국가: [국가]
주요 서비스: [서비스명]
산출물: Chapter 1~2부터 생성
품질 기준: 공식 자료 기반, 출처 포함, 최종본 기준
```

## 반복 운영

Daily:
- 뉴스/정책/경쟁사 변화 감지

Weekly:
- 경쟁사 기능/가격/투자 업데이트

Monthly:
- Executive Report 생성

Quarterly:
- 전략 Roadmap 업데이트
