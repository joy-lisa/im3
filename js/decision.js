// js/decision.js

// js/decision.js
const API_URL = 'https://im3hs25.jannastutz.ch/php/unload.php';

const $select   = document.getElementById('orte');
const $goBtn    = document.getElementById('findsuse-btn');
const stufeBtns = document.querySelectorAll('.auswahlbutton');
let selectedStufe = '';



// === DEBUG: überprüfen, ob Script und Buttons erkannt werden ===
console.log('[decision.js] geladen');
console.log('Buttons gefunden:', document.querySelectorAll('.auswahlbutton').length);



// load Orte (same as before) ...
// stufe selection (same as before) ...

function goToResult() {
  const ort = $select.value;
  if (!ort) { alert('Bitte Ort auswählen'); return; }

  // also store in sessionStorage as fallback (in case someone opens result.html directly)
  sessionStorage.setItem('ort', ort);
  sessionStorage.setItem('stufe', selectedStufe || '');

  const qs = new URLSearchParams({ ort, stufe: selectedStufe || '' }).toString();
  window.location.href = `result.html?${qs}`;
}

$goBtn?.addEventListener('click', goToResult);






// === GFRÖRLI-STUFEN SPEICHERN & VISUELL MARKIEREN ===
let savedStufe = localStorage.getItem('selectedStufe') || '';
if (savedStufe) {
  const pre = Array.from(stufeBtns).find(b => b.dataset.value === savedStufe);
  if (pre) pre.classList.add('active');
}

stufeBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    console.log("Button geklickt:", btn.dataset.value);

    selectedStufe = btn.dataset.value;
    localStorage.setItem('selectedStufe', selectedStufe);
    stufeBtns.forEach(b => b.classList.toggle('active', b === btn));
  });
});

$goBtn.addEventListener('click', () => {
  const ort = $select.value;
  if (!ort) { alert('Bitte Ort auswählen'); return; }
  if (!selectedStufe) { alert('Bitte Gfrörli-Stufe auswählen'); return; }

  localStorage.setItem('selectedOrt', ort);
  const qs = new URLSearchParams({ ort, stufe: selectedStufe }).toString();
  window.location.href = `result.html?${qs}`;
});





//aus orte.js kopiert:
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
  
  
  function populateLocations() {}
document.addEventListener('DOMContentLoaded', populateLocations);