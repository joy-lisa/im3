// --- NEU: Cache & Helper ---
let __allRows = []; // [{ort, ts(sec), temp}...]

function pickTemp(o) {
  const v = o?.temperature ?? o?.aare_temp ?? o?.temp ?? o?.water_temp ?? o?.tt;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function toUnix(t) {
  if (typeof t === 'number') return t > 1e12 ? Math.floor(t / 1000) : t; // ms->s
  const d = new Date(t);
  return Number.isFinite(d.getTime()) ? Math.floor(d.getTime() / 1000) : NaN;
}

// Für einen Ort + Tagesfenster (00:00–24:00) eine 25er Serie bauen (pro Stunde letzter Wert)
function seriesForOrtAndDay(ort, startSec, endSec) {
  const rows = __allRows.filter(r => r.ort === ort && r.ts >= startSec && r.ts <= endSec);

  const hourKey = (ts) => {
    const d = new Date(ts * 1000);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const h = String(d.getHours()).padStart(2, '0');
    return `${y}-${m}-${day} ${h}`;
  };

  const map = new Map();
  for (const r of rows) map.set(hourKey(r.ts), r.temp); // letzter gewinnt

  const values = [];
  for (let h = 0; h <= 24; h++) {
    const ts = startSec + h * 3600;
    const d = new Date(ts * 1000);
    const k = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}`;
    const v = map.get(k);
    values.push(Number.isFinite(v) ? v : null); // null = Lücke
  }
  return values;
}


//api url https://im3hs25.jannastutz.ch/php/unload.php





fetch('https://im3hs25.jannastutz.ch/php/unload.php')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Fehler beim Abrufen der Daten:', error);
  });

  
//Dropdown

document.addEventListener("DOMContentLoaded", async () => {
  const select = document.getElementById("orte");
  const dateInput = document.getElementById("datum"); // <input type="date" id="datum">
  
  //const button = document.getElementById("anzeigen-btn");

  try {
    const response = await fetch("php/unload.php"); // dein Backend-Endpunkt
    if (!response.ok) throw new Error("Serverfehler: " + response.status);

    const data = await response.json(); // erwartet z. B. [{ ort: "Berlin" }, { ort: "Hamburg" }]

    // Dropdown befüllen & nicht doppelt befüllen
    const orteSet = new Set(data.map(item => item.orte)); // Duplikate entfernen

    orteSet.forEach(ort => {
      const option = document.createElement("option");
      option.value = ort;
      option.textContent = ort;
      select.appendChild(option);
    });

  } catch (error) {
    console.error("Fehler beim Laden der Orte:", error);
  }

  // // Button-Klick: zur neuen Seite weiterleiten
  // button.addEventListener("click", () => {
  //   const ort = select.value;
  //   if (!ort) {
  //     alert("Bitte wähle einen Ort aus!");
  //     return;
  //   }
  // });

});


// Chart.js
let myAareChart = document.querySelector("#myAareChart");

const API_URL = 'https://im3hs25.jannastutz.ch/php/unload.php';
async function loadAareDaten() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Netzwerkantwort war nicht ok' + response.status);

    const apiDaten = await response.json();
    console.log("geladene Daten:", apiDaten);
  } catch (error) {
    console.error('Fehler beim Laden der Aare-Daten:', error);
  }
}
    console.log("hello world");

    const DATA_COUNT = 25;
    const labels = [];
    for (let i = 0; i < DATA_COUNT; i++) {
      // wenn i = 0 → "00", wenn i = 1 → "01", usw.
      const stunde = i.toString().padStart(2, "0"); // sorgt für führende Null
      labels.push(`${stunde}:00`);
    }
    const datapoints = [];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'ausgewählter Ort',
          data: datapoints,
          borderColor: 'red',
          fill: false,
          cubicInterpolationMode: 'monotone',
          tension: 0.4
        },
      ]
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Temperatur-Tabelle der Aare'
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'zeitpunkt (in stunden)'
            },
            ticks: {
              maxRotation: 90,   // verhindert Schrägstellung
              minRotation: 90,   // verhindert automatische Drehung
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'temperatur (in grad celsius)'
            },
            suggestedMin: -5,
            suggestedMax: 30
          }
        }
      },
    };

    const chart = new Chart(myAareChart, config);

  loadAareDaten();
