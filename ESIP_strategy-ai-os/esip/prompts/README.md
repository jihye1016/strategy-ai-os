# Strategy AI OS — Claude Code Automation Package

목적: 전략기획자가 회사명/사업명만 입력하면 Claude Code + GitHub 기반으로 시장조사, 경쟁사 분석, 보고서, PPT, Excel DB, 자동화 가이드를 생성하는 구조.

## 사용 순서

1. GitHub에 새 Repository 생성
   - 추천 이름: `strategy-ai-os`
   - Private 권장

2. 이 패키지의 전체 파일을 Repository에 업로드

3. Claude Code에서 Repository 연결

4. Claude Code에 아래 프롬프트 입력
   - `/prompts/00_CLAUDE_CODE_MASTER_PROMPT.md`

5. 첫 실행 명령
   - 대상 회사: 다나아데이터
   - 산업: AI 헬스케어 / 디지털 헬스케어 / 건강검진 플랫폼
   - 산출물: Chapter 1, Chapter 2부터 생성

## 기본 산출물

- `/outputs/reports/` : Word 보고서용 Markdown 원고
- `/outputs/ppt/` : PPT 스토리라인
- `/outputs/db/` : CSV/Excel용 데이터
- `/outputs/references/` : 레퍼런스 목록
- `/outputs/automation/` : 자동화 실행 가이드

## 핵심 원칙

- 근거 없는 주장 금지
- 수치에는 반드시 출처 URL
- 공식자료 우선: 정부, 공공기관, 기업공시, IR, 논문, 특허, 공식 홈페이지
- 사실(Fact)과 해석(Insight) 분리
- CEO 의사결정 관점으로 작성
