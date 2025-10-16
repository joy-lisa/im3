// --- chart.js (drop-in) ---


// const API_URL = 'https://im3hs25.jannastutz.ch/php/unload.php';

// const $location = document.getElementById('orte');
const $date = document.getElementById('date');
const $canvas = document.getElementById('myAareChart');

let chart;
let apiData = (typeof window.apiData !== 'undefined') ? window.apiData : []; // nutze globales apiData falls vorhanden

// ===== Helpers =====
function parseTimestamp(timestamp) {
  // "2025-10-09 00:02:23" -> Unix seconds (UTC)
  const isoString = timestamp.replace(' ', 'T') + 'Z';
  return Math.floor(new Date(isoString).getTime() / 1000);
}

async function fetchData() {
  const response = await fetch(API_URL, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return await response.json();
}

// 25-Stunden Serie (00:00–24:00) eines Tages
function buildSeries(data, location, selectedDate) {
  if (!location || !selectedDate) return Array(25).fill(null);

  // Tag in UTC Grenzen
  const [year, month, day] = selectedDate.split('-').map(Number);
  const dayStart = Date.UTC(year, month - 1, day, 0, 0, 0) / 1000;
  const dayEnd = dayStart + 24 * 3600;

  // Filter Ort + Tag
  const filtered = data.filter(row => {
    const ts = parseTimestamp(row.timestamp);
    return row.orte === location && ts >= dayStart && ts <= dayEnd;
  });

  // Stündlich gruppieren (letzter Wert pro Stunde)
  const hourlyData = new Map();
  filtered.forEach(row => {
    const ts = parseTimestamp(row.timestamp);
    const hour = new Date(ts * 1000).getUTCHours();
    hourlyData.set(hour, Number(row.aare_temp));
  });

  // 25 Punkte bauen
  const series = [];
  for (let h = 0; h <= 24; h++) {
    series.push(hourlyData.get(h) ?? null);
  }
  return series;
}

// ===== Chart =====
const HOUR_LABELS = Array.from({ length: 25 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

function createChart() {
  chart = new Chart($canvas, {
    type: 'line',
    data: {
      labels: HOUR_LABELS,
      datasets: [{
        label: 'Temperatur',
        data: [],
        borderColor: '#e8ba71',
        fill: false,
        tension: 0.4,
        spanGaps: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { 
          display: true, 
          text: 'dr verlouf vode letste stung',
          color: '#f4f2ef',
          font: {
            family: 'Aptly', 
            size: 24, 
            weight: 'bold'
          }
         },
        legend: {
          labels: { 
            color: '#f4f2ef', 
            font: { 
              family: 'Aptly', 
            }
          }
        },
      },
      scales: {
        x: {
          title: { display: true, text: 'zeitpunkt (in stunden)', color: '#f4f2ef', font: { family: 'Aptly' } },
          ticks: { color: '#f4f2ef', maxRotation: 90, minRotation: 90, font: { family: 'Aptly' } },
          grid: { color: '#9f9d9a' }
        },
        y: {
          title: { display: true, text: 'temperatur (°C)', color: '#f4f2ef', font: { family: 'Aptly' } },
          ticks: { color: '#f4f2ef', font: { family: 'Aptly' } },
          grid: { color: '#9f9d9a' },
          suggestedMin: 0,
          suggestedMax: 20
        }
      }
    }
  });
}

function updateChart() {
  const location = $location.value;
  const date = $date.value;
  if (!chart || !location || !date || !apiData?.length) return;

  const series = buildSeries(apiData, location, date);

  chart.data.datasets[0].data = series;
  chart.data.datasets[0].label = `${location} (${date})`;

  const temps = series.filter(v => v !== null);
  if (temps.length) {
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    chart.options.scales.y.suggestedMin = Math.floor(min - 1);
    chart.options.scales.y.suggestedMax = Math.ceil(max + 1);
  }
  chart.update();

  console.log(`${location} @ ${date}: ${temps.length} Punkte`);
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', async () => {
  // Datum vorbefüllen: aus URL ?date=YYYY-MM-DD oder heute
  const q = new URLSearchParams(location.search);
  const qDate = q.get('date');
  if (qDate) {
    $date.value = qDate;
  } else {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    $date.value = `${yyyy}-${mm}-${dd}`;
  }

  createChart();

  // Falls dropdown.js schon geladen hat, übernehmen
  if (typeof window.apiData !== 'undefined' && window.apiData.length) {
    apiData = window.apiData;
  } else {
    // sonst selbst laden (stört dropdown.js nicht)
    try {
      apiData = await fetchData();
      window.apiData = apiData; // optional global
    } catch (e) {
      console.error('Fetch error (chart.js):', e);
    }
  }

  // Warten, bis der Ort-Dropdown eine Auswahl hat (dropdown.js füllt async)
  const readyInterval = setInterval(() => {
    if ($location && $location.value && apiData?.length) {
      updateChart();
      clearInterval(readyInterval);
    }
  }, 100);

  // Listener
  $location.addEventListener('change', updateChart);
  $date.addEventListener('change', updateChart);
});






// === Deep-Link Init: ort & date übernehmen ===
document.addEventListener('DOMContentLoaded', async () => {
  const q = new URLSearchParams(location.search);
  const ortFromURL  = q.get('ort');
  const dateFromURL = q.get('date');

  // Warten, bis Dropdown gefüllt ist (dropdown.js macht das async)
  const $loc = document.getElementById('orte');
  const $date = document.getElementById('date');

  if (dateFromURL && $date) {
    $date.value = dateFromURL;
  }

  if (!ortFromURL) return; // nichts zu tun

  const trySelect = setInterval(() => {
    const hasOption = Array.from($loc.options).some(o => o.value === ortFromURL);
    if (hasOption) {
      $loc.value = ortFromURL;
      clearInterval(trySelect);

      // gleich Chart updaten
      if (typeof updateChart === 'function') updateChart();
    }
  }, 100);
});
