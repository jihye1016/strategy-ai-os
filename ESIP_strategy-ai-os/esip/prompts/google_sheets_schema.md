# Google Sheets Strategy DB Structure

## Sheet 목록

1. Company_DB
2. Market_DB
3. Competitor_DB
4. Feature_DB
5. Pricing_DB
6. Policy_DB
7. Investment_DB
8. Patent_DB
9. Reference_DB
10. Report_Log
11. QA_Log

## 자동화 흐름

```text
Source Collection
↓
Raw Data Sheet
↓
Validation
↓
Structured DB
↓
Insight Generation
↓
Report Generation
↓
PPT Generation
```

## 업데이트 주기

| DB | 주기 |
|---|---|
| News/Trend | Daily |
| Competitor | Weekly |
| Market Size | Quarterly |
| Policy | Weekly |
| Investment | Weekly |
| Patent | Monthly |
| Report | Monthly |
