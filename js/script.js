
// Dropdown befüllen
async function ladeOrte() {
  try {
    // JSON-Datei laden
    const response = await fetch("orte.json");
    const orte = await response.json();

    console.log("Geladene Rohdaten:", orte);

    // Dropdown-Element holen
    const dropdown = document.getElementById("orte");
    const ausgabe = document.getElementById("ausgabe");

    // Orte einfügen
    orte.forEach(ort => {
      console.log("Ort-Objekt:", ort);
      const option = document.createElement("option");
      option.value = ort.id;        // interne ID
      option.textContent = ort.ort; // sichtbarer Name
      dropdown.appendChild(option);
    });

    // Wenn jemand auswählt → Text anzeigen
   // dropdown.addEventListener("change", () => {
  //ausgabe.textContent = dropdown.value
   // ? `Du hast ${dropdown.value} gewählt.`
   // : "";
//});
  } catch (error) {
    console.error("Fehler beim Laden:", error);
  }
}

// Funktion starten
ladeOrte();

