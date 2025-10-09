// //api url https://im3hs25.jannastutz.ch/php/unload.php

// fetch('https://im3hs25.jannastutz.ch/php/unload.php')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Fehler beim Abrufen der Daten:', error);
//   });


// //Dropdown

// document.addEventListener("DOMContentLoaded", async () => {
//   const select = document.getElementById("ort-dropdown");
//   const button = document.getElementById("anzeigen-btn");

//   try {
//     const response = await fetch("php/unload.php"); // dein Backend-Endpunkt
//     if (!response.ok) throw new Error("Serverfehler: " + response.status);

//     const data = await response.json(); // erwartet z. B. [{ ort: "Berlin" }, { ort: "Hamburg" }]

//     // Dropdown befüllen
//     data.forEach(item => {
//       const option = document.createElement("option");
//       option.value = item.ort;
//       option.textContent = item.ort;
//       select.appendChild(option);
//     });

//   } catch (error) {
//     console.error("Fehler beim Laden der Orte:", error);
//   }

//   // Button-Klick: zur neuen Seite weiterleiten
//   button.addEventListener("click", () => {
//     const ort = select.value;
//     if (!ort) {
//       alert("Bitte wähle einen Ort aus!");
//       return;
//     }
//   });

//   // Gfrörli Button Versuch
//   const buttons = document.querySelectorAll(".auswahlbutton");

//   buttons.forEach(button => {
//     button.addEventListener("click", () => {
//       // Entferne aktive Klasse von allen Buttons
//       buttons.forEach(btn => btn.classList.remove("active"));

//       // Aktiviere den geklickten Button
//       button.classList.add("active");

//       // Beispiel: Den Wert ausgeben
//       const selectedValue = button.textContent;
//       console.log("Ausgewählt:", selectedValue);
//     });
//   });

// });










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
            suggestedMin: -1,
            suggestedMax: 30
          }
        }
      },
    };

    const chart = new Chart(myAareChart, config);

    console.log("hello");

    // Dropdown befüllen
    // async function ladeOrte() {
    //   try {
    //     // JSON-Datei laden
    //     const response = await fetch("orte.json");
    //     const orte = await response.json();

    //     console.log("Geladene Rohdaten:", orte);

    //     // Dropdown-Element holen
    //     const dropdown = document.getElementById("orte");
    //     const ausgabe = document.getElementById("ausgabe");

    //     // Orte einfügen
    //     orte.forEach(ort => {
    //       console.log("Ort-Objekt:", ort);
    //       const option = document.createElement("option");
    //       option.value = ort.id;        // interne ID
    //       option.textContent = ort.ort; // sichtbarer Name
    //       dropdown.appendChild(option);
    //     });

    //     // Wenn jemand auswählt → Text anzeigen
    //    // dropdown.addEventListener("change", () => {
    //   //ausgabe.textContent = dropdown.value
    //    // ? `Du hast ${dropdown.value} gewählt.`
    //    // : "";
    // //});
    //   } catch (error) {
    //     console.error("Fehler beim Laden:", error);
    //   }
    // }

    // // Funktion starten
    // ladeOrte();

    //   } catch (error) {
    //     console.error('Fehler beim Laden der Aare-Daten:', error);
    //   };
  loadAareDaten();
