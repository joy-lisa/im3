fetch orte = [orte.json];

async function loadOrteDetails(url_orte) {
    try {
        const response = await fetch(url_orte);
        const answer = await response.json();
        // array all_mountains_with_details mit den details aus den detaildaten befüllen
        return {
            id: answer.id,
            canton: answer.canton,
            name: answer.name,
            height: answer.height,
            lat: answer.lat,
            long: answer.long,
            image: answer.image
        };
    } catch (error) {
        console.error(error);
        return error;
    }
}
for (const [orte] of all_orte_with_details.entries()) {
    const details = await loadOrteDetails(orte.url);
    all_orte_with_details.push(details);
}

// Eindeutige Orte sammeln und sortieren
const uniqueOrte = [...new Set(orte.map(o => o.name.trim()))].sort();

// Dropdown mit Orten füllen
const selectElement = document.getElementById('orte');
uniqueOrte.forEach(ort => {
    const option = document.createElement('option');
    option.value = ort;
    option.textContent = ort;
    selectElement.appendChild(option);
});