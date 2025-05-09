import { renderPatients } from './patientUI.js';   
import { getPatientsFromLocalStorage, savePatientsToLocalStorage } from './storage.js';



let currentPage = 1;
const patientsPerPage = 5;

function renderTable(patients, page = 1) {
  const tableBody = document.querySelector('table tbody');
  if (!tableBody) return;

  const start = (page - 1) * patientsPerPage;
  const end = start + patientsPerPage;
  const paginatedPatients = patients.slice(start, end);

  tableBody.innerHTML = '';
  paginatedPatients.forEach((patient, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${start + index + 1}</td>
      <td>${patient.name}</td>
      <td>${patient.age}</td>
      <td>${patient.contact}</td>
      <td class="text-center">
        <div class="d-flex flex-wrap justify-content-center gap-2">
          <button class="btn btn-light btn-sm border rounded m-2 shadow-sm btn-edit" title="Editar" data-index="${
            start + index
          }">Editar</button>
          <button class="btn btn-light btn-sm border rounded m-2 shadow-sm btn-delete" title="Excluir" data-index="${
            start + index
          }">Excluir</button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });

  document
    .querySelectorAll('.btn-edit')
    .forEach((btn) =>
      btn.addEventListener('click', (e) =>
        editPatient(parseInt(e.target.dataset.index))
      )
    );

  document
    .querySelectorAll('.btn-delete')
    .forEach((btn) =>
      btn.addEventListener('click', (e) =>
        deletePatient(parseInt(e.target.dataset.index))
      )
    );

  renderPagination(patients);
}

function renderPagination(patients) {
  const paginationContainer = document.getElementById('pagination');
  if (!paginationContainer) return;

  const totalPages = Math.ceil(patients.length / patientsPerPage);
  paginationContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className =
      'btn btn-sm mx-1 ' +
      (i === currentPage ? 'btn-primary' : 'btn-outline-primary');
    btn.addEventListener('click', () => {
      currentPage = i;
      renderPatients();
    });
    paginationContainer.appendChild(btn);
  }
}

function getCurrentPage() {
  return currentPage;
}

function editPatient(index) {
  const patients = getPatientsFromLocalStorage();
  const patient = patients[index];

  const form = document.getElementById('addPatientForm');
  if (!form) return;

  form.name.value = patient.name;
  form.age.value = patient.age;
  form.contact.value = patient.contact;
  form.dataset.editIndex = index;

  const modal = new bootstrap.Modal(document.getElementById('addPatientModal'));
  modal.show();
}

function deletePatient(index) {
  if (!confirm('Deseja realmente excluir este paciente?')) return;
  const patients = getPatientsFromLocalStorage();
  patients.splice(index, 1);
  savePatientsToLocalStorage(patients);
  renderPatients();
}

function searchPatients() {
  const searchInput = document.getElementById('searchInput');
  const patients = getPatientsFromLocalStorage();
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  getCurrentPage = 1;
  renderTable(filteredPatients, getCurrentPage);
}

export { renderTable, getCurrentPage, editPatient, deletePatient, searchPatients };