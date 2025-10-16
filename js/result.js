// js/result.js

// const API_URL = 'https://im3hs25.jannastutz.ch/php/unload.php';

console.log(API_URL);

function tsToUnix(tsStr) {
  // "YYYY-MM-DD HH:MM:SS" -> treat as UTC
  const iso = tsStr.replace(' ', 'T') + 'Z';
  return Math.floor(new Date(iso).getTime() / 1000);
}


(async function init() {
  // Parameter aus URL oder localStorage holen
  const params = new URLSearchParams(location.search);
  const ort = params.get('ort') || localStorage.getItem('selectedOrt') || '';

  // HTML-Elemente
  const $tempEl = document.querySelector('h1.temperatur');
  const $ortOut = document.getElementById('ausgabe-ort');

  // Falls kein Ort gewählt wurde
  if (!ort) {
    if ($tempEl) $tempEl.textContent = 'Kein Ort gewählt';
    if ($ortOut) $ortOut.textContent = 'Kein Ort gewählt';
    return;
  }



  // Ort ausgeben
  if ($ortOut) $ortOut.textContent = `Ort: ${ort}`;



  try {
    // Daten abrufen
    const rows = await fetch(API_URL, { cache: 'no-store' }).then(r => {
      if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
      return r.json();
    });

    // Daten für gewählten Ort herausfiltern
    const parsed = (Array.isArray(rows) ? rows : [])
      .filter(r => r && r.orte === ort)
      .map(r => ({
        temp: Number(r.aare_temp),
        ts: tsToUnix(r.timestamp)
      }))
      .filter(r => Number.isFinite(r.temp) && Number.isFinite(r.ts));

    // Falls keine Daten gefunden
    if (!parsed.length) {
      if ($tempEl) $tempEl.textContent = `keini aktuelle Date für ${ort}`;
      console.warn('Keine Daten gefunden für:', ort);
      return;
    }

    // Aktuellste Messung anzeigen
    const latest = parsed.reduce((a, b) => (a.ts > b.ts ? a : b));
    if ($tempEl) $tempEl.textContent = `${latest.temp.toFixed(1)}°`;




    




    // === SPRUCH ANZEIGEN ===
    const $spruchEl = document.querySelector('h2.spruch'); // dein Spruchfeld
const params2 = new URLSearchParams(location.search);
const stufe = params2.get('stufe') || localStorage.getItem('selectedStufe') || '';




// === ORT + STUFE klein ausgeben ===
const $ortUndStufe = document.querySelector('.ortundstufe');
if ($ortUndStufe) {
  const STUFE_LABELS = {
    gfroerli:   'gfrörli',
    solala:     'so lala',
    hertimnaeh: 'hert im nä'
  };
  const sKey    = normalizeStufe(stufe);
  const sLabel  = sKey ? (STUFE_LABELS[sKey] || stufe) : '—';
  const oLabel  = (ort || '—').toLowerCase();  // ort klein ausgeben
  $ortUndStufe.textContent = `${oLabel} · ${sLabel}`;

}





const result = getDecisionFor(latest.temp, stufe);
if ($spruchEl) $spruchEl.textContent = getSpruch(result);




    // === TAGESMITTEL DER LETZTEN 4 TAGE ANZEIGEN ===

// Hilfen: Date-Key in lokaler Zeit (YYYY-MM-DD) bauen
function dateKeyLocal(unixSec) {
  const d = new Date(unixSec * 1000); // lokal
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Tages-Durchschnitte für den Ort berechnen (Map: dateKey -> avg)
function buildDailyAverages(rowsForOrt) {
  const agg = new Map(); // dateKey -> {sum, count}
  for (const r of rowsForOrt) {
    const k = dateKeyLocal(r.ts);
    const entry = agg.get(k) || { sum: 0, count: 0 };
    entry.sum += r.temp;
    entry.count += 1;
    agg.set(k, entry);
  }
  const avg = new Map();
  for (const [k, v] of agg.entries()) {
    avg.set(k, v.count ? v.sum / v.count : null);
  }
  return avg; // Map(dateKey -> avgTemp)
}

// Buttons selektieren (die 4 <a class="footer-button"> in der Reihenfolge -1, -2, -3, -4)
const footerLinks = document.querySelectorAll('.footer-daten .footer-button');

// Aus parsed (bereits nur dieser Ort) die Tagesmittel bauen
const dailyAvgMap = buildDailyAverages(parsed);

// Heute in lokaler Zeit
const today = new Date();
today.setHours(0, 0, 0, 0);

// Für die letzten 4 vergangenen Tage füllen
for (let i = 1; i <= 4; i++) {
  const d = new Date(today);
  d.setDate(today.getDate() - i);
  const key = dateKeyLocal(Math.floor(d.getTime() / 1000));
  const avg = dailyAvgMap.get(key);

  // Text setzen (— falls keine Daten)
  const label = Number.isFinite(avg) ? `${avg.toFixed(1)}°` : '—';
  const link = footerLinks[footerLinks.length - i];
  if (link) {
    link.textContent = label;
    // optional: passender Deep-Link inkl. Ort & Datum (falls du das auf daten.html auswertest)
    link.href = `daten.html?ort=${encodeURIComponent(ort)}&date=${key}`;
    link.title = `Tagesmittel ${key}`;




    // Wochentag-Label über dem Button zeigen
const btn = link.closest('button');
if (btn) {
  // de-CH Kürzel
  const WD = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

  // Date-Objekt aus key (lokal)
  const [yy, mm, dd] = key.split('-').map(Number);
  const dateObj = new Date(yy, mm - 1, dd); // lokale Zeit
  const wd = WD[dateObj.getDay()];

  // Element anlegen/aktualisieren
  let labelEl = btn.previousElementSibling;
  if (!labelEl || !labelEl.classList.contains('footer-label')) {
    labelEl = document.createElement('div');
    labelEl.className = 'footer-label';
    btn.insertAdjacentElement('beforebegin', labelEl);
  }
  labelEl.textContent = wd;      // z. B. "Mo"
  labelEl.title = key;           // Tooltip mit Datum "YYYY-MM-DD"
}
  }
}







    console.log('Aktuellste Messung:', { ort, ...latest });
  } catch (err) {
    console.error('Fehler beim Laden der Temperatur:', err);
    if ($tempEl) $tempEl.textContent = 'Fehler bim Lade';
  }
  
})();

//   try {
//     // const rows = await fetch(API_URL, { cache: 'no-store' }).then(r => {
//     //   if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
//     //   return r.json();
//     // });

//     const parsed = rows
//       .filter(r => r.orte === ort)
//       .map(r => ({ temp: Number(r.aare_temp), ts: tsToUnix(r.timestamp) }))
//       .filter(r => Number.isFinite(r.temp) && Number.isFinite(r.ts));

//     if (!parsed.length) {
//       $tempEl.textContent = `keini aktuelle Date für ${ort}`;
//       $descEl.textContent = `${ort}${stufe ? ' · stufe: ' + stufe : ''}`;
//       console.warn('No rows for selected ort. Sample:', rows.slice(0,3));
//       return;
//     }

//     const latest = parsed.reduce((a, b) => (a.ts > b.ts ? a : b));
//     $tempEl.textContent = `${latest.temp.toFixed(1)}°C`;
//     $descEl.textContent = `${ort}${stufe ? ' · stufe: ' + stufe : ''}`;
//     $spruchEl.textContent = pickSpruch(latest.temp, stufe);
//   } catch (err) {
//     console.error('API error:', err);
//     $tempEl.textContent = 'Fehler bim Lade';
//   }



// // === AUSGEWÄHLTE GFRÖRLI-STUFE UND ORT ANZEIGEN ===
// const params = new URLSearchParams(window.location.search);
// const ortParam   = params.get('ort')   || localStorage.getItem('selectedOrt')   || '';
// const stufeParam = params.get('stufe') || localStorage.getItem('selectedStufe') || '';

// const STUFE_LABELS = {
//   gfroerli:  'gfrörli',
//   solala:    'so lala',
//   hertimnae: 'hert im nä'
// };

// const $ortOut   = document.getElementById('ausgabe-ort');
// const $stufeOut = document.getElementById('ausgabe-stufe');

// if ($ortOut)   $ortOut.textContent   = ortParam   ? `Ort: ${ortParam}` : 'Kein Ort gewählt';
// if ($stufeOut) $stufeOut.textContent = stufeParam ? `Gfrörli-Stufe: ${STUFE_LABELS[stufeParam] || stufeParam}` : 'Keine Stufe gewählt';

// if (ortParam)   localStorage.setItem('selectedOrt', ortParam);
// if (stufeParam) localStorage.setItem('selectedStufe', stufeParam);









const spruecheMap = new Map();

let temp = 15;

let stufe = "gfroerlistufe";


spruecheMap.get(temp + "_" + stufe);
spruecheMap.set("1_gfroerli", "nein");
spruecheMap.set("1_solala", "nein");
spruecheMap.set("1_hertimnaeh", "nein");

spruecheMap.set("2_gfroerli", "nein");
spruecheMap.set("2_solala", "nein");
spruecheMap.set("2_hertimnaeh", "nein!");

spruecheMap.set("3_gfroerli", "nein");
spruecheMap.set("3_solala", "nein");
spruecheMap.set("3_hertimnaeh", "nein");

spruecheMap.set("4_gfroerli", "nein");
spruecheMap.set("4_solala", "nein");
spruecheMap.set("4_hertimnaeh", "nein");

spruecheMap.set("5_gfroerli", "nein");
spruecheMap.set("5_solala", "nein");
spruecheMap.set("5_hertimnaeh", "nein");

spruecheMap.set("6_gfroerli", "nein");
spruecheMap.set("6_solala", "nein");
spruecheMap.set("6_hertimnaeh", "nein");

spruecheMap.set("7_gfroerli", "nein");
spruecheMap.set("7_solala", "nein");
spruecheMap.set("7_hertimnaeh", "nein");

spruecheMap.set("8_gfroerli", "nein");
spruecheMap.set("8_solala", "nein");
spruecheMap.set("8_hertimnaeh", "nein");

spruecheMap.set("9_gfroerli", "nein");
spruecheMap.set("9_solala", "nein");
spruecheMap.set("9_hertimnaeh", "nein");

spruecheMap.set("10_gfroerli", "nein");
spruecheMap.set("10_solala", "nein");
spruecheMap.set("10_hertimnaeh", "nein");

spruecheMap.set("11_gfroerli", "nein");
spruecheMap.set("11_solala", "nein");
spruecheMap.set("11_hertimnaeh", "nein");

spruecheMap.set("12_gfroerli", "nein");
spruecheMap.set("12_solala", "nein");
spruecheMap.set("12_hertimnaeh", "gehtschon");

spruecheMap.set("13_gfroerli", "nein");
spruecheMap.set("13_solala", "nein");
spruecheMap.set("13_hertimnaeh", "gehtschon");

spruecheMap.set("14_gfroerli", "nein");
spruecheMap.set("14_solala", "gehtschon");
spruecheMap.set("14_hertimnaeh", "gehtschon");

spruecheMap.set("15_gfroerli", "nein");
spruecheMap.set("15_solala", "gehtschon");
spruecheMap.set("15_hertimnaeh", "ja");

spruecheMap.set("16_gfroerli", "gehtschon");
spruecheMap.set("16_solala", "gehtschon");
spruecheMap.set("16_hertimnaeh", "ja");

spruecheMap.set("17_gfroerli", "gehtschon");
spruecheMap.set("17_solala", "ja");
spruecheMap.set("17_hertimnaeh", "unbedingt");

spruecheMap.set("18_gfroerli", "gehtschon");
spruecheMap.set("18_solala", "ja");
spruecheMap .set("18_hertimnaeh", "unbedingt");

spruecheMap.set("19_gfroerli", "ja");
spruecheMap.set("19_solala", "unbedingt");
spruecheMap.set("19_hertimnaeh", "unbedingt");

spruecheMap.set("20_gfroerli", "ja");
spruecheMap.set("20_solala", "unbedingt");
spruecheMap.set("20_hertimnaeh", "unbedingt");

spruecheMap.set("21_gfroerli", "unbedingt");
spruecheMap.set("21_solala", "unbedingt");
spruecheMap.set("21_hertimnaeh", "unbedingt");

spruecheMap.set("22_gfroerli", "unbedingt");
spruecheMap.set("22_solala", "unbedingt");
spruecheMap.set("22_hertimnaeh", "unbedingt");

spruecheMap.set("23_gfroerli", "unbedingt");
spruecheMap.set("23_solala", "unbedingt");
spruecheMap.set("23_hertimnaeh", "unbedingt");

spruecheMap.set("24_gfroerli", "unbedingt");
spruecheMap.set("24_solala", "unbedingt");
spruecheMap.set("24_hertimnaeh", "unbedingt");

spruecheMap.set("25_gfroerli", "unbedingt");
spruecheMap.set("25_solala", "unbedingt");
spruecheMap.set("25_hertimnaeh", "unbedingt");


// ---- 1) Stufe normalisieren (hertimnä → hertimnaeh etc.) ----
function normalizeStufe(raw) {
  if (!raw) return '';
  const s = String(raw).toLowerCase()
    .replace('ä', 'ae')
    .replace('ö', 'oe')
    .replace('ü', 'ue')
    .replace(/\s+/g, '');
  // auf erlaubte Keys mappen
  if (s.startsWith('gfroerli'))  return 'gfroerli';
  if (s.startsWith('solala'))    return 'solala';
  if (s.startsWith('hertimnae')) return 'hertimnaeh'; // dein Key in der Map
  return s;
}

// ---- 2) Entscheidung aus der großen spruecheMap holen ----
function getDecisionFor(tempFloat, stufeRaw) {
  if (!Number.isFinite(tempFloat)) return null;
  const stufe = normalizeStufe(stufeRaw);

  // Temperatur auf 1–25 clampen & runden (du kannst auch Math.floor nehmen)
  const t = Math.max(1, Math.min(25, Math.round(tempFloat)));
  const key = `${t}_${stufe}`;
  return spruecheMap.get(key) || null; // "nein" | "gehtschon" | "ja" | "unbedingt"
}

// ---- 3) Entscheidung → finaler Spruch ----
const RESULT_TEXT = {
  'nein':        'wirsch zum iiszapfe!',
  'gehtschon':   'eher no chli früsch!',
  'ja':          'pack din schnorchel ii!',
  'unbedingt':   'hüpf i chochtopf!'
};

// wenn keine stufe ausgewählt
function getSpruch(result) {
  return RESULT_TEXT[result] || 'meinsch chasches wage?';
}
