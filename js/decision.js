// js/decision.js

// js/decision.js
//const API_URL = 'https://im3hs25.jannastutz.ch/php/unload.php';


// === Reset beim Laden: immer frischer Start ===
document.addEventListener('DOMContentLoaded', () => {
  // alles zurücksetzen
  ['selectedOrt', 'selectedStufe', 'selectedDate'].forEach(k => localStorage.removeItem(k));

  // Dropdown + Buttons visuell zurücksetzen
  const $ort = document.getElementById('orte');
  if ($ort) $ort.selectedIndex = 0;

  const stufeBtns = document.querySelectorAll('.auswahlbutton');
  stufeBtns.forEach(btn => btn.classList.remove('active'));
});





const $goBtn    = document.getElementById('findsuse-btn');
const stufeBtns = document.querySelectorAll('.auswahlbutton');
const $select = document.getElementById('orte');
let selectedStufe = '';



// === DEBUG: überprüfen, ob Script und Buttons erkannt werden ===
console.log('[decision.js] geladen');
console.log('Buttons gefunden:', document.querySelectorAll('.auswahlbutton').length);



// load Orte (same as before) ...
// stufe selection (same as before) ...








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



