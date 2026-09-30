# Rental Deal Calculator (free, open source)

A dependency-free rental property calculator: **monthly cash flow, NOI, cap rate, cash-on-cash return, DSCR, gross rent multiplier, the 1% rule, break-even occupancy and expense ratio**.

- **Use it in your browser:** https://onyxaholguin-cyber.github.io/rental-deal-calculator/ (nothing you type leaves your browser)
- **Use the math in code:** `deal-calc.js` is a ~50-line pure-function module (Node or browser, no dependencies).

## Use in Node

```js
const { analyze } = require('./deal-calc.js');
const r = analyze({
  price: 250000, downPct: 0.25, rate: 0.07, years: 30, closing: 6000, repairs: 4000,
  units: 1, rent: 2100, otherIncome: 0, vacancyPct: 0.05,
  taxes: 3000, insurance: 1400, hoa: 0, utilities: 0,
  repairsPct: 0.05, capexPct: 0.05, mgmtPct: 0.08,
});
console.log(r.monthlyCashFlow, r.capRate, r.cashOnCash, r.dscr);
```

Percentages are decimals (7% = `0.07`). Optional inputs: `pointsPct` (loan points as % of loan), `otherExp` (other monthly expenses).

## Formulas

| Metric | Formula |
|---|---|
| NOI | gross scheduled income − vacancy − operating expenses (taxes, insurance, HOA, utilities, repairs, CapEx, management). Excludes the mortgage. |
| Cap rate | NOI ÷ purchase price |
| Cash-on-cash | annual cash flow ÷ cash invested (down payment + closing + repairs + points) |
| DSCR | NOI ÷ annual mortgage payments |
| Break-even occupancy | (operating expenses + mortgage) ÷ gross scheduled income |
| GRM | price ÷ gross scheduled income |

Repairs and CapEx are a % of scheduled rent; management is a % of collected (post-vacancy) income.

## Tested

`npm test` checks every output against three example deals from a spreadsheet whose results were verified with an independent calculation.

Walkthrough of the metrics with a worked example: [Cap rate vs cash-on-cash vs DSCR](https://onyxaholguin-cyber.github.io/sheet-and-flow/tutorials/cap-rate-cash-on-cash-dscr/).

Need to compare 3 deals side by side with a 10-year projection, IRR and sensitivity tables? That's the [Rental Deal Analyzer spreadsheet](https://sheetandflow.gumroad.com/l/rental-deal-analyzer) (Excel + Google Sheets, paid). More free tools and tutorials at [Sheet & Flow](https://onyxaholguin-cyber.github.io/sheet-and-flow/).

Built with AI assistance. For education only, not financial advice. MIT licensed.
