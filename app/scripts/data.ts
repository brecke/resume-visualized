import source from '../career.json' with { type: 'json' };

export type CareerData = {
  coverage: { startYear: number; endYear: number };
  disciplines: { id: string; name: string; color: string }[];
  years: { year: number; complete: boolean; allocations: Record<string, number | null> }[];
};

function requireValid(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`Invalid career data: ${message}`);
}

export function validateCareerData(value: unknown): asserts value is CareerData {
  requireValid(
    typeof value === 'object' && value !== null && !Array.isArray(value)
      && 'coverage' in value && 'disciplines' in value && 'years' in value,
    'expected coverage, disciplines, and years',
  );
  const { coverage, disciplines, years } = value;
  requireValid(
    typeof coverage === 'object' && coverage !== null && !Array.isArray(coverage)
      && 'startYear' in coverage && 'endYear' in coverage,
    'expected coverage bounds',
  );
  const { startYear, endYear } = coverage;
  requireValid(typeof startYear === 'number' && Number.isSafeInteger(startYear), 'startYear must be an integer');
  requireValid(typeof endYear === 'number' && Number.isSafeInteger(endYear), 'endYear must be an integer');
  requireValid(startYear <= endYear, 'coverage must be chronological');
  requireValid(Array.isArray(disciplines) && disciplines.length > 0, 'expected disciplines');
  requireValid(Array.isArray(years), 'expected years');

  const disciplineIds = new Set<string>();
  for (const discipline of disciplines) {
    requireValid(
      typeof discipline === 'object' && discipline !== null && !Array.isArray(discipline)
        && 'id' in discipline && 'name' in discipline && 'color' in discipline,
      'expected discipline ID, name, and color',
    );
    const { id, name, color } = discipline;
    requireValid(typeof id === 'string' && id.trim().length > 0, 'discipline ID must be nonempty');
    requireValid(!disciplineIds.has(id), `duplicate discipline ID ${id}`);
    requireValid(typeof name === 'string' && name.trim().length > 0, `expected name for ${id}`);
    requireValid(typeof color === 'string' && /^#[0-9a-f]{6}$/i.test(color), `invalid color for ${id}`);
    disciplineIds.add(id);
  }

  const recordedYears = new Set<number>();
  const tolerance = 1e-6;
  for (const row of years) {
    requireValid(
      typeof row === 'object' && row !== null && !Array.isArray(row)
        && 'year' in row && 'complete' in row && 'allocations' in row,
      'expected year, completeness, and allocations',
    );
    const { year, complete, allocations } = row;
    requireValid(typeof year === 'number' && Number.isSafeInteger(year), 'year must be an integer');
    requireValid(year >= startYear && year <= endYear, `${year} is outside coverage`);
    requireValid(!recordedYears.has(year), `duplicate year ${year}`);
    requireValid(typeof complete === 'boolean', `expected completeness for ${year}`);
    requireValid(
      typeof allocations === 'object' && allocations !== null && !Array.isArray(allocations),
      `expected allocations for ${year}`,
    );
    requireValid(Object.keys(allocations).length === disciplineIds.size, `wrong allocation keys for ${year}`);

    let total = 0;
    let hasUnknown = false;
    for (const [id, allocation] of Object.entries(allocations)) {
      requireValid(disciplineIds.has(id), `undeclared ${id} allocation for ${year}`);
      if (allocation === null) {
        hasUnknown = true;
      } else {
        requireValid(
          typeof allocation === 'number' && Number.isFinite(allocation) && allocation >= 0 && allocation <= 100,
          `invalid ${id} allocation for ${year}`,
        );
        total += allocation;
      }
    }
    if (complete) {
      requireValid(!hasUnknown, `complete year ${year} contains unknown allocations`);
      requireValid(Math.abs(total - 100) < tolerance, `complete year ${year} must total 100%`);
    } else {
      requireValid(total <= 100, `${year} exceeds 100% of working time`);
    }
    recordedYears.add(year);
  }
  requireValid(recordedYears.size === endYear - startYear + 1, 'every year in coverage needs a record');
}

// Original discipline palette: http://flatuicolors.com.
validateCareerData(source);
export const careerData: CareerData = source;
