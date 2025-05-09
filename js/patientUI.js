import { getPatientsFromLocalStorage } from './storage.js';
import { renderTable, getCurrentPage } from './table.js';

function renderPatients() {
  const patients = getPatientsFromLocalStorage();
  renderTable(patients, getCurrentPage ());
  
  const totalElement = document.querySelector('.display-1');
  if (totalElement) {
    totalElement.textContent = patients.length;
  }
}

function updateTotalPatients() {
  const totalPatientsEl = document.getElementById('totalPatients');
  if (totalPatientsEl) {
    const total = getPatientsFromLocalStorage().length;
    totalPatientsEl.textContent = total;
  }
}
export {renderPatients, updateTotalPatients};