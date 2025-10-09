const API_URL = 'https://im3hs25.jannastutz.ch/php/unload.php';

// === Simple timestamp parser (not needed here but kept for future use) ===
function parseTimestamp(timestamp) {
  const isoString = timestamp.replace(' ', 'T') + 'Z';
  return Math.floor(new Date(isoString).getTime() / 1000);
}

// === Fetch data from API ===
async function fetchData() {
  const response = await fetch(API_URL, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return await response.json();
}

// === Fill location dropdown ===
async function populateLocations() {
  try {
    const data = await fetchData();
    const locations = [...new Set(data.map(row => row.orte))].sort();

    const $location = document.getElementById('orte');
    $location.innerHTML = '<option value="" disabled selected>uswau vom ort</option>';

    locations.forEach(loc => {
      const option = document.createElement('option');
      option.value = loc;
      option.textContent = loc;
      $location.appendChild(option);
    });

    console.log(`Geladeni Orte: ${locations.join(', ')}`);
  } catch (err) {
    console.error('Fehler bim Lade vo de Orte:', err);
  }
}

document.addEventListener('DOMContentLoaded', populateLocations);
