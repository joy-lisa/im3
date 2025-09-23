const orte = [orte.json];

// Dropdown und Ausgabefeld holen
const dropdown = document.getElementById("orte");
const ausgabe = document.getElementById("ausgabe");

// JSON in Dropdown einfügen
orte.forEach(ort => {
  const option = document.createElement("option");
  option.value = ort.id;
  option.textContent = ort.name;
  dropdown.appendChild(option);
});

// Eventlistener: Auswahl anzeigen
dropdown.addEventListener("change", () => {
  const selected = orte.find(o => o.id == dropdown.value);
  ausgabe.textContent = selected ? `Du hast ${selected.name} gewählt.` : "";
});

.date {

}