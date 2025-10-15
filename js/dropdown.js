
const API_URL = 'https://im3hs25.jannastutz.ch/php/unload.php';


const $location = document.getElementById('orte');
//const $date = document.getElementById('date');
//const $canvas = document.getElementById('myAareChart');

//===== Fill location dropdown =====
function populateLocations(apiData) {
    const locations = [...new Set(apiData.map(row => row.orte))].sort();
    console.log('Available locations:', locations);

    $location.innerHTML = '<option value="" disabled selected>Ort auswählen</option>';

    locations.forEach(loc => {
        const option = document.createElement('option');
        option.value = loc;
        option.textContent = loc;
        $location.appendChild(option);
    });

    // Auto-select first location
    if (locations.length > 0) {
        $location.value = locations[0];
    }
}
async function fetchData() {
    const response = await fetch(API_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  }

document.addEventListener('DOMContentLoaded', async () => {
    try {

        // Fetch data and populate dropdown
        apiData = await fetchData(API_URL);
        populateLocations(apiData);


    } catch (error) {
        console.error('Error:', error);
    }
});