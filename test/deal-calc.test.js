const test = require('node:test'); const assert = require('node:assert/strict');
const { analyze, pmt } = require('../deal-calc.js');
const fx = require('./deal_fixtures.json');
const close = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
test('pmt basics', () => {
  assert.ok(close(pmt(0.06, 30, 200000), 1199.101050304));
  assert.equal(pmt(0, 10, 12000), 100); assert.equal(pmt(0.05, 30, 0), 0);
});
for (const d of fx) test('matches tested spreadsheet: ' + d['Deal name'], () => {
  const r = analyze({ price: d['Purchase price'], closing: d['Closing costs'], repairs: d['Upfront repairs / rehab'], downPct: d['Down payment %'],
    rate: d['Interest rate (annual)'], years: d['Loan term (years)'], pointsPct: d['Loan points / fees (% of loan)'], units: d['Number of units'],
    rent: d['Monthly rent per unit (average)'], otherIncome: d['Other monthly income (laundry, parking...)'], vacancyPct: d['Vacancy & credit loss %'],
    taxes: d['Property taxes (annual)'], insurance: d['Insurance (annual)'], hoa: d['HOA (monthly)'], utilities: d['Owner-paid utilities (monthly)'],
    repairsPct: d['Repairs & maintenance (% of rent)'], capexPct: d['CapEx reserve (% of rent)'], mgmtPct: d['Property management (% of collected rent)'], otherExp: d['Other expenses (monthly)'] });
  const map = { loan: 'Loan amount', cash: 'Total cash invested', monthlyPayment: 'Monthly mortgage payment (P&I)', egi: 'Effective gross income (annual)',
    opex: 'Total operating expenses (annual)', noi: 'Net operating income (NOI)', monthlyCashFlow: 'Monthly cash flow', capRate: 'Cap rate (NOI / price)',
    cashOnCash: 'Cash-on-cash return', dscr: 'DSCR (NOI / debt service)', grm: 'Gross rent multiplier', rentToPrice: "Rent-to-price (monthly, the '1% rule')",
    breakEvenOccupancy: 'Break-even occupancy', expenseRatio: 'Operating expense ratio' };
  for (const [k, label] of Object.entries(map)) assert.ok(close(r[k], d[label]), k + ': ' + r[k] + ' vs ' + d[label]);
});
