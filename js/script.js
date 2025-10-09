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
