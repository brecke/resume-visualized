/*
 * Visualized resume
 * Author: Miguel Laginha
 * License: MIT (preserved from the original main.js notice)
 */
import { careerData } from './data.ts';

const table = document.querySelector<HTMLTableElement>('#career-table')!;
const details = document.querySelector<HTMLDetailsElement>('#year-detail')!;
const detailSummary = document.querySelector<HTMLElement>('#detail-summary')!;
const detailHeading = document.querySelector<HTMLElement>('#detail-heading')!;
const detailContext = document.querySelector<HTMLParagraphElement>('#detail-context')!;
const detailValues = document.querySelector<HTMLDListElement>('#detail-values')!;
const years = careerData.years.toSorted((a, b) => a.year - b.year);
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
let selectedYear = years.at(-1)!.year;
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
    header.style.setProperty('--discipline-color', discipline.color);
    headerRow.append(header);
}

const body = table.createTBody();
for (const record of years) {
    const row = body.insertRow();
    const yearHeader = document.createElement('th');
    yearHeader.id = `year-${record.year}`;
    yearHeader.scope = 'row';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'year-button';
    button.textContent = String(record.year);
    button.dataset.year = String(record.year);
    button.setAttribute('aria-controls', details.id);
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
        selectYear(record);
        details.open = true;
        syncExpanded();
        detailSummary.focus({ preventScroll: true });
        details.scrollIntoView({ block: 'nearest' });
    });
    button.addEventListener('pointerenter', (event) => {
        if (event.pointerType === 'mouse' && finePointer.matches) {
            selectYear(record);
            details.open = true;
            syncExpanded();
        }
    });
    yearHeader.append(button);
    if (!record.complete) {
        const status = document.createElement('span');
        status.className = 'year-status';
        status.textContent = 'Partial';
        button.append(status);
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

function syncExpanded() {
    for (const button of body.querySelectorAll<HTMLButtonElement>('.year-button')) {
        button.setAttribute('aria-expanded', String(details.open && Number(button.dataset.year) === selectedYear));
    }
}

function selectYear(record: (typeof careerData.years)[number]) {
    selectedYear = record.year;
    detailHeading.textContent = `${record.year} · Working-time shares`;
    detailContext.textContent = `Record status: ${record.complete ? 'complete' : 'partial'}. Percentages are exclusive shares of working time, not proficiency. Recorded coverage: ${careerData.coverage.startYear}–${careerData.coverage.endYear}.`;
    detailValues.replaceChildren();
    for (const discipline of careerData.disciplines) {
        const pair = document.createElement('div');
        const name = document.createElement('dt');
        name.textContent = discipline.name;
        const value = document.createElement('dd');
        const allocation = record.allocations[discipline.id]!;
        value.textContent = allocation === null ? 'Unknown' : `${allocation}%`;
        pair.append(name, value);
        detailValues.append(pair);
    }
}

details.addEventListener('toggle', syncExpanded);
selectYear(years.at(-1)!);
details.open = false;
details.hidden = false;
