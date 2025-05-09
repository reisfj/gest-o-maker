import {
  getPatientsFromLocalStorage,
  savePatientsToLocalStorage,
} from './storage.js';
import { applyPhoneMask } from './utils.js';
import { renderPatients, updateTotalPatients } from './patientUI.js';
import { searchPatients } from './table.js';



function attachFormListeners() {
  const form = document.getElementById('addPatientForm');
  if (!form) return;

  const contactInput = document.getElementById('contact');
  if (contactInput) applyPhoneMask(contactInput);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const patients = getPatientsFromLocalStorage();
    const editIndex = form.dataset.editIndex;

    if (editIndex !== undefined && editIndex !== '') {
      patients[editIndex] = data;
      delete form.dataset.editIndex;
    } else {
      patients.push(data);
    }

    savePatientsToLocalStorage(patients);
    renderPatients();
    updateTotalPatients();

    const modal = bootstrap.Modal.getInstance(
      document.getElementById('addPatientModal')
    );
    if (modal) modal.hide();

    form.reset();
  });

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', searchPatients);
  }
}

function attachEventListeners() {
  const eventForm = document.getElementById('eventForm');
  if (!eventForm) return;

  eventForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = document.getElementById('clientName').value;
    const data = document.getElementById('eventDate').value;
    const hora = document.getElementById('eventTime').value;

    saveAgendamento({ nome, data, hora });

    this.reset();
    bootstrap.Modal.getInstance(
      document.getElementById('newEventModal')
    ).hide();

    renderAgendamentosNaTabela();

    // Atualiza o calendário, se quiser
    if (typeof calendar !== 'undefined') {
      calendar.removeAllEvents();
      getAgendamentos().forEach((a, i) =>
        calendar.addEvent({
          id: String(i),
          title: `${a.nome} - ${a.hora}`,
          start: a.data,
        })
      );
    }
  });
}


export { attachFormListeners, attachEventListeners };
