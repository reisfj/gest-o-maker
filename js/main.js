import { renderCalendar } from './calendar.js';
import { attachFormListeners, attachEventListeners } from "./formHandlers.js";
import { renderPatients, updateTotalPatients } from "./patientUI.js";
import { initChart } from "./charts.js";


// Navegação entre páginas
let isNavigating = false;

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[data-page]');
  if (link && !isNavigating) {
    event.preventDefault();
    isNavigating = true;

    const page = link.getAttribute('data-page');
    localStorage.setItem('lastVisitedPage', page);
    const mainContent = document.getElementById('main-content');
    mainContent.classList.add('fade-out');

    setTimeout(() => {
      fetch(page)
        .then((response) => response.text())
        .then((html) => {
          mainContent.innerHTML = html;
          mainContent.classList.remove('fade-out');
          isNavigating = false;

          if (page.includes('dashboard') || page.includes('report')) {
            initChart();
            updateTotalPatients();
          } else if (page.includes('patient')) {
            renderPatients();
            attachFormListeners();
            updateTotalPatients();
          } else if (page.includes('schedule')) {
            attachEventListeners();
            renderCalendar();
          }
        });
    }, 300);
  }
});

// Tooltip e renderização de página
document.addEventListener('DOMContentLoaded', function () {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  [...tooltipTriggerList].forEach(
    (el) => new bootstrap.Tooltip(el, { trigger: 'hover' })
  );
 
  const lastVisited =
    localStorage.getItem('lastVisitedPage') || 'routes/dashboard.html';
  
  const targetLink = document.querySelector(
    `#sidebar a[data-page="${lastVisited}"]`
  );

  if (targetLink) {
    targetLink.click();
  } else {
    const defaultPage = document.querySelector(
      '#sidebar a[data-page="routes/dashboard.html"]'
    );
    if (defaultPage) defaultPage.click();
  }
});

// Sidebar transição
const toggleBtn = document.getElementById('sidebarToggle');
const closeBtn = document.getElementById('sidebarClose');
const sidebar = document.getElementById('sidebar');

[toggleBtn, closeBtn].forEach((btn) => {
  btn.addEventListener('click', () => {
    sidebar.classList.toggle('d-none');
  });
});








// Carrega tabela ao iniciar
document.addEventListener('DOMContentLoaded', renderPatients);
