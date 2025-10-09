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

    const DATA_COUNT = 12;
    const labels = [];
    for (let i = 0; i < DATA_COUNT; ++i) {
      labels.push(i.toString());
    }
    const datapoints = [];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Cubic interpolation (monotone)',
          data: datapoints,
          borderColor: 'red',
          fill: false,
          cubicInterpolationMode: 'monotone',
          tension: 0.4
        }, {
          label: 'Cubic interpolation',
          data: datapoints,
          borderColor: 'blue',
          fill: false,
          tension: 0.4
        }, {
          label: 'Linear interpolation (default)',
          data: datapoints,
          borderColor: 'green',
          fill: false
        }
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
            text: 'Chart.js Line Chart - Cubic interpolation mode'
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Value'
            },
            suggestedMin: -5,
            suggestedMax: 30
          }
        }
      },
    };

    const chart = new Chart(myAareChart, config);

  loadAareDaten();
