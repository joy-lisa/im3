// js/script.js (ES module)

const API_URL = 'https://im3hs25.jannastutz.ch/php/unload.php';

console.log(API_URL);

// ===== Simple timestamp parser =====
function parseTimestamp(timestamp) {
  // "2025-10-09 00:02:23" -> Unix seconds (UTC)
  const isoString = timestamp.replace(' ', 'T') + 'Z';
  return Math.floor(new Date(isoString).getTime() / 1000);
}

// ===== Fetch data from API =====
async function fetchData() {
  const response = await fetch(API_URL, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return await response.json();
}

// // ===== Build 25-hour series for chart =====
// function buildSeries(data, location, selectedDate) {
//   // Parse selected date to get day boundaries (UTC)
//   const [year, month, day] = selectedDate.split('-').map(Number);
//   const dayStart = Date.UTC(year, month - 1, day, 0, 0, 0) / 1000;
//   const dayEnd = dayStart + 24 * 3600;

//   // Filter data for selected location and date
//   const filtered = data.filter(row => {
//     const ts = parseTimestamp(row.timestamp);
//     return row.orte === location && ts >= dayStart && ts <= dayEnd;
//   });

//   // Group by hour (keep last value per hour)
//   const hourlyData = new Map();
//   filtered.forEach(row => {
//     const ts = parseTimestamp(row.timestamp);
//     const date = new Date(ts * 1000);
//     const hour = date.getUTCHours();
//     hourlyData.set(hour, parseFloat(row.aare_temp));
//   });

//   // Build 25-point array (00:00 to 24:00)
//   const series = [];
//   for (let h = 0; h <= 24; h++) {
//     series.push(hourlyData.get(h) ?? null);
//   }
  
//   return series;
// }

// // ===== UI Elements =====
// const $location = document.getElementById('orte');
// const $date = document.getElementById('date');
// const $canvas = document.getElementById('myAareChart');

// let chart;
// let apiData = [];

// // ===== Chart config =====
// const HOUR_LABELS = Array.from({ length: 25 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

// function createChart() {
//   chart = new Chart($canvas, {
//     type: 'line',
//     data: {
//       labels: HOUR_LABELS,
//       datasets: [{
//         label: 'Temperatur',
//         data: [],
//         borderColor: '#213e60',
//         fill: false,
//         tension: 0.4,
//         spanGaps: true
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         title: { display: true, text: 'Temperatur-Tabelle der Aare' }
//       },
//       scales: {
//         x: {
//           title: { display: true, text: 'Zeitpunkt (in Stunden)' },
//           ticks: { maxRotation: 90, minRotation: 90 }
//         },
//         y: {
//           title: { display: true, text: 'Temperatur (°C)' },
//           suggestedMin: 0,
//           suggestedMax: 20
//         }
//       }
//     }
//   });
// }

// // ===== Update chart =====
// function updateChart() {
//   const location = $location.value;
//   const date = $date.value;
  
//   if (!location || !date) return;

//   const series = buildSeries(apiData, location, date);
  
//   // Update chart data
//   chart.data.datasets[0].data = series;
//   chart.data.datasets[0].label = `${location} (${date})`;
  
//   // Auto-scale Y axis
//   const temps = series.filter(v => v !== null);
//   if (temps.length > 0) {
//     const min = Math.min(...temps);
//     const max = Math.max(...temps);
//     chart.options.scales.y.suggestedMin = Math.floor(min - 1);
//     chart.options.scales.y.suggestedMax = Math.ceil(max + 1);
//   }
  
//   chart.update();
  
//   console.log(`${location} on ${date}: ${temps.length} data points`);
// }

// // ===== Export for manual refresh =====
// /*export async function refreshData() {
//   apiData = await fetchData();
//   updateChart();
// }*/
