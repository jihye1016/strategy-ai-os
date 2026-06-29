# GitHub Setup Guide

## 1. Repository 생성

- GitHub 접속
- New Repository 클릭
- Repository name: `strategy-ai-os`
- Visibility: Private 추천
- README 생성 체크

## 2. 폴더 구조

아래 구조를 그대로 생성한다.

```text
strategy-ai-os/
├── README.md
├── prompts/
├── templates/
├── automation/
├── outputs/
│   ├── reports/
│   ├── ppt/
│   ├── db/
│   ├── references/
│   ├── automation/
│   └── qa/
└── scripts/
```

## 3. Claude Code 연결

Claude Code에서 GitHub Repository를 연결한 뒤,
`prompts/00_CLAUDE_CODE_MASTER_PROMPT.md`를 실행한다.

## 4. 운영 방식

- Claude Code: 조사, 파일 생성, GitHub 반영
- ChatGPT: 전략 검토, 임원 보고 문체 개선, PPT 개선
- Gemini: Google Sheets/Drive 연계 자동화
