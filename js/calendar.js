async function getAgendamentos() {
  return [
    { nome: 'Consulta', hora: '14:00', data: '2025-05-10' },
    { nome: 'Reunião', hora: '09:30', data: '2025-05-12' },
  ];
}

export async function renderCalendar() {
  const calendarEl = document.getElementById('calendar');
  if (!calendarEl) return;

  const agendamentos = await getAgendamentos();

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek',
    },
    events: agendamentos.map((a, i) => ({
      id: String(i),
      title: `${a.nome} - ${a.hora}`,
      start: a.data,
    })),
      locale: 'pt-br'
  });

  calendar.render();
}
