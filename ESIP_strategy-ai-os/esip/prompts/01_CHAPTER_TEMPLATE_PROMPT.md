# Chapter Generation Prompt

다음 Chapter를 컨설팅 보고서 최종본 수준으로 작성하라.

## Chapter
{{CHAPTER_NUMBER}}. {{CHAPTER_TITLE}}

## 작성 기준
- 한국어
- 전문용어 영문 병기
- 임원 보고 수준
- 사실과 해석 분리
- 출처 URL 포함
- 표와 DB 구조 포함

## 필수 섹션

1. Executive Summary
2. Scope & Methodology
3. Market/Company Fact Base
4. Evidence Table
5. Strategic Analysis
6. Business Impact
7. Recommendation
8. CEO Decision Point
9. Confidence Level
10. Automation Schema
11. References

## 출력 파일
- `/outputs/reports/Chapter{{CHAPTER_NUMBER}}_Report.md`
- `/outputs/ppt/Chapter{{CHAPTER_NUMBER}}_Executive_PPT_Storyboard.md`
- `/outputs/db/Chapter{{CHAPTER_NUMBER}}_DB.csv`
- `/outputs/references/Chapter{{CHAPTER_NUMBER}}_References.csv`
- `/outputs/automation/Chapter{{CHAPTER_NUMBER}}_Automation_Guide.md`
- `/outputs/qa/Chapter{{CHAPTER_NUMBER}}_QA_Report.md`
