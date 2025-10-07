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
  const select = document.getElementById("ort-dropdown");
  const button = document.getElementById("anzeigen-btn");

  try {
    const response = await fetch("php/unload.php"); // dein Backend-Endpunkt
    if (!response.ok) throw new Error("Serverfehler: " + response.status);

    const data = await response.json(); // erwartet z. B. [{ ort: "Berlin" }, { ort: "Hamburg" }]

    // Dropdown befüllen
    data.forEach(item => {
      const option = document.createElement("option");
      option.value = item.ort;
      option.textContent = item.ort;
      select.appendChild(option);
    });

  } catch (error) {
    console.error("Fehler beim Laden der Orte:", error);
  }

  // Button-Klick: zur neuen Seite weiterleiten
  button.addEventListener("click", () => {
    const ort = select.value;
    if (!ort) {
      alert("Bitte wähle einen Ort aus!");
      return;
    }
  });

  // Gfrörli Button Versuch
  const buttons = document.querySelectorAll(".auswahlbutton");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      // Entferne aktive Klasse von allen Buttons
      buttons.forEach(btn => btn.classList.remove("active"));

      // Aktiviere den geklickten Button
      button.classList.add("active");

      // Beispiel: Den Wert ausgeben
      const selectedValue = button.textContent;
      console.log("Ausgewählt:", selectedValue);
    });
  });

});











// // Dropdown befüllen
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

