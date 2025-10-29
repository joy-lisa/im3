// js/script.js (ES module)

const API_URL = 'https://im3hs25.jannastutz.ch/php/unload.php';

console.log(API_URL);

// ===== Simple timestamp parser =====
function parseTimestamp(timestamp) {
  // "2025-10-09 00:02:23" -> Unix seconds (UTC)
  const isoString = timestamp.replace(' ', 'T') + 'Z';
  return Math.floor(new Date(isoString).getTime() / 1000);
}

// ===== Fetch data from API =====
async function fetchData() {
  const response = await fetch(API_URL, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return await response.json();
}
