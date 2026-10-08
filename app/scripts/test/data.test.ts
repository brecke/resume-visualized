import assert from 'node:assert/strict';
import test from 'node:test';
import { careerData, validateCareerData } from '../data.ts';

test('career allocations obey declared coverage and exclusive working-time shares', () => {
  const valid: typeof careerData = {
    coverage: { startYear: 2006, endYear: 2006 },
    disciplines: [
      { id: 'primary', name: 'Primary', color: '#91c847' },
      { id: 'secondary', name: 'Secondary', color: '#c22938' },
    ],
    years: [{ year: 2006, complete: true, allocations: { primary: 100, secondary: 0 } }],
  };
  validateCareerData(valid);

  const partial = structuredClone(valid);
  partial.years[0].complete = false;
  partial.years[0].allocations = { primary: 30, secondary: null };
  validateCareerData(partial);

  const unknown = structuredClone(valid);
  unknown.years[0].complete = false;
  unknown.years[0].allocations = { primary: null, secondary: null };
  validateCareerData(unknown);

  const fractional = structuredClone(valid);
  fractional.years[0].allocations = { primary: 33.3, secondary: 66.7 };
  validateCareerData(fractional);

  const invalidCases: Array<[string, (data: typeof careerData) => void]> = [
    ['negative allocation', data => { data.years[0].allocations.primary = -1; }],
    ['allocation above 100', data => { data.years[0].allocations.primary = 101; }],
    ['non-finite allocation', data => { data.years[0].allocations.primary = Infinity; }],
    ['NaN allocation', data => { data.years[0].allocations.primary = NaN; }],
    ['complete year below 100', data => { data.years[0].allocations.primary = 90; }],
    ['overlapping exclusive allocations', data => { data.years[0].allocations = { primary: 70, secondary: 50 }; }],
    ['missing data marked complete', data => { data.years[0].allocations.secondary = null; }],
    ['incomplete year above 100', data => {
      data.years[0].complete = false;
      data.years[0].allocations = { primary: 70, secondary: 50 };
    }],
    ['duplicate discipline', data => { data.disciplines.push({ ...data.disciplines[0] }); }],
    ['duplicate year', data => { data.years.push(structuredClone(data.years[0])); }],
    ['year outside declared coverage', data => { data.years[0].year = 2007; }],
    ['missing year in coverage', data => { data.coverage.endYear = 2007; }],
    ['reversed coverage', data => { data.coverage.endYear = 2005; }],
    ['fractional year', data => { data.years[0].year = 2006.5; }],
    ['missing discipline allocation', data => { delete data.years[0].allocations.secondary; }],
    ['undeclared discipline allocation', data => { data.years[0].allocations.unlisted = 0; }],
    ['invalid discipline color', data => { data.disciplines[0].color = 'not-a-color'; }],
  ];
  for (const [name, mutate] of invalidCases) {
    const invalid = structuredClone(valid);
    mutate(invalid);
    assert.throws(() => validateCareerData(invalid), name);
  }
  for (const invalid of [null, {}, [], { ...valid, years: null }]) {
    assert.throws(() => validateCareerData(invalid));
  }

  validateCareerData(careerData);
  const recordedYears = careerData.years.map(row => row.year).sort((a, b) => a - b);
  const declaredYears = Array.from(
    { length: careerData.coverage.endYear - careerData.coverage.startYear + 1 },
    (_, index) => careerData.coverage.startYear + index,
  );
  assert.deepEqual(recordedYears, declaredYears);
  for (const row of careerData.years.filter(row => row.complete)) {
    const total = Object.values(row.allocations).reduce<number>((sum, value) => sum + (value ?? 0), 0);
    assert.ok(Math.abs(total - 100) < 1e-6, `${row.year} records ${total}% of working time`);
  }
});
