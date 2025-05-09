export function initChart() {
  const canvas = document.getElementById('myChart');
   if (!canvas) {
     console.log('Canvas não encontrado!');
     return;
   }

  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [
        {
          label: 'Vendas',
          data: [10, 20, 15, 25, 30, 40, 50, 60, 70, 80, 90, 100],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}
