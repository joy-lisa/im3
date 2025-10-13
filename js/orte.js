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

document.addEventListener('DOMContentLoaded', populateLocations);
