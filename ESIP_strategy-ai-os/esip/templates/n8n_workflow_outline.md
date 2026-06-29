# n8n Workflow Outline

## Workflow 1. Daily Strategy Intelligence

Trigger:
- 매일 오전 7시

Steps:
1. Search market news
2. Search competitor updates
3. Search policy updates
4. Append to Google Sheets
5. Run Claude/GPT analysis prompt
6. Generate daily summary
7. Send email or Slack message

## Workflow 2. Weekly Competitor Update

Trigger:
- 매주 월요일 오전 7시

Steps:
1. Visit competitor official websites
2. Detect product/pricing/service changes
3. Update Competitor_DB
4. Generate gap analysis
5. Create weekly report

## Workflow 3. Monthly Executive Report

Trigger:
- 매월 1일 오전 7시

Steps:
1. Pull Market_DB, Competitor_DB, Policy_DB
2. Generate Executive Summary
3. Generate PPT storyboard
4. Create Word/PPT draft
5. Send review notification
