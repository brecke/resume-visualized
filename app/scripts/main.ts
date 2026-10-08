/*
 * Visualized resume
 * Author: Miguel Laginha
 * License: MIT (preserved from the original main.js notice)
 */
import { careerData } from './data.ts';

const table = document.querySelector<HTMLTableElement>('#career-table')!;
table.caption!.textContent = `Working-time shares · ${careerData.coverage.startYear}–${careerData.coverage.endYear}`;

const headerRow = table.createTHead().insertRow();
const yearColumn = document.createElement('th');
yearColumn.scope = 'col';
yearColumn.textContent = 'Year';
headerRow.append(yearColumn);

for (const [index, discipline] of careerData.disciplines.entries()) {
    const header = document.createElement('th');
    header.id = `discipline-${index}`;
    header.scope = 'col';
    header.textContent = discipline.name;
    headerRow.append(header);
}

const body = table.createTBody();
for (const record of careerData.years.toSorted((a, b) => a.year - b.year)) {
    const row = body.insertRow();
    const yearHeader = document.createElement('th');
    yearHeader.id = `year-${record.year}`;
    yearHeader.scope = 'row';
    yearHeader.textContent = String(record.year);
    if (!record.complete) {
        const status = document.createElement('span');
        status.className = 'year-status';
        status.textContent = 'Partial';
        yearHeader.append(status);
    }
    row.append(yearHeader);

    for (const [index, discipline] of careerData.disciplines.entries()) {
        const cell = row.insertCell();
        cell.headers = `${yearHeader.id} discipline-${index}`;
        const allocation = record.allocations[discipline.id]!;
        const label = document.createElement('span');
        label.className = 'allocation';
        if (allocation === null) {
            cell.className = 'unknown';
            label.textContent = 'Unknown';
        } else {
            cell.style.setProperty('--discipline-color', discipline.color);
            cell.style.setProperty('--allocation', `${allocation}%`);
            label.textContent = `${allocation}%`;
        }
        cell.append(label);
    }
}
