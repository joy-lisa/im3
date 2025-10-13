// js/result.js

// const API_URL = 'https://im3hs25.jannastutz.ch/php/unload.php';

function tsToUnix(tsStr) {
  // "YYYY-MM-DD HH:MM:SS" -> treat as UTC
  const iso = tsStr.replace(' ', 'T') + 'Z';
  return Math.floor(new Date(iso).getTime() / 1000);
}

function pickSpruch(temp, stufe) {
  if (!Number.isFinite(temp)) return 'hüt wüsse mers nöd so rächt';
  if (temp < 10)  return 'iglu boue bringts meh';
  if (temp < 14)  return stufe === 'hertimnae' ? 'chli frisch, aber machbar' : 'bibelihaut vibes';
  if (temp < 18)  return 'wär seisch – ab i d Aare!';
  return 'summerfeeling pur';
}

(async function init() {
  const params = new URLSearchParams(location.search);
  let ort   = params.get('ort')   || sessionStorage.getItem('ort')   || '';
  let stufe = params.get('stufe') || sessionStorage.getItem('stufe') || '';

  const $tempEl   = document.querySelector('h1.temperatur');
  const $descEl   = document.querySelector('h3');         // “d uswau vom ort + gfroerlistufe”
  const $spruchEl = document.querySelector('h2.spruch');

  if (!ort) {
    $tempEl.textContent = 'Kein Ort gewählt';
    $descEl.textContent = 'bitte zrügg und Ort uswähle';
    return;
  }

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
})();



// === AUSGEWÄHLTE GFRÖRLI-STUFE UND ORT ANZEIGEN ===
const params = new URLSearchParams(window.location.search);
const ortParam   = params.get('ort')   || localStorage.getItem('selectedOrt')   || '';
const stufeParam = params.get('stufe') || localStorage.getItem('selectedStufe') || '';

const STUFE_LABELS = {
  gfroerli:  'gfrörli',
  solala:    'so lala',
  hertimnae: 'hert im nä'
};

const $ortOut   = document.getElementById('ausgabe-ort');
const $stufeOut = document.getElementById('ausgabe-stufe');

if ($ortOut)   $ortOut.textContent   = ortParam   ? `Ort: ${ortParam}` : 'Kein Ort gewählt';
if ($stufeOut) $stufeOut.textContent = stufeParam ? `Gfrörli-Stufe: ${STUFE_LABELS[stufeParam] || stufeParam}` : 'Keine Stufe gewählt';

if (ortParam)   localStorage.setItem('selectedOrt', ortParam);
if (stufeParam) localStorage.setItem('selectedStufe', stufeParam);







// bb=nein
// cc=gehtschon
// ee=ja
// ff=unbedingt


const spruecheMap = new Map();
spruecheMap.set("1_gfroerli", "bb");
spruecheMap.set("1_solala", "bb");
spruecheMap.set("1_hertimnaeh", "bb");

spruecheMap.set("2_gfroerli", "bb");
spruecheMap.set("2_solala", "bb");
spruecheMap.set("2_hertimnaeh", "bb!");

spruecheMap.set("3_gfroerli", "bb");
spruecheMap.set("3_solala", "bb");
spruecheMap.set("3_hertimnaeh", "bb");

spruecheMap.set("4_gfroerli", "bb");
spruecheMap.set("4_solala", "bb");
spruecheMap.set("4_hertimnaeh", "bb");

spruecheMap.set("5_gfroerli", "bb");
spruecheMap.set("5_solala", "bb");
spruecheMap.set("5_hertimnaeh", "bb");

spruecheMap.set("6_gfroerli", "bb");
spruecheMap.set("6_solala", "bb");
spruecheMap.set("6_hertimnaeh", "bb");

spruecheMap.set("7_gfroerli", "bb");
spruecheMap.set("7_solala", "bb");
spruecheMap.set("7_hertimnaeh", "bb");

spruecheMap.set("8_gfroerli", "bb");
spruecheMap.set("8_solala", "bb");
spruecheMap.set("8_hertimnaeh", "bb");

spruecheMap.set("9_gfroerli", "bb");
spruecheMap.set("9_solala", "bb");
spruecheMap.set("9_hertimnaeh", "bb");

spruecheMap.set("10_gfroerli", "bb");
spruecheMap.set("10_solala", "bb");
spruecheMap.set("10_hertimnaeh", "bb");

spruecheMap.set("11_gfroerli", "bb");
spruecheMap.set("11_solala", "bb");
spruecheMap.set("11_hertimnaeh", "bb");

spruecheMap.set("12_gfroerli", "bb");
spruecheMap.set("12_solala", "bb");
spruecheMap.set("12_hertimnaeh", "cc");

spruecheMap.set("13_gfroerli", "bb");
spruecheMap.set("13_solala", "bb");
spruecheMap.set("13_hertimnaeh", "cc");

spruecheMap.set("14_gfroerli", "bb");
spruecheMap.set("14_solala", "cc");
spruecheMap.set("14_hertimnaeh", "cc");

spruecheMap.set("15_gfroerli", "bb");
spruecheMap.set("15_solala", "cc");
spruecheMap.set("15_hertimnaeh", "ee");

spruecheMap.set("16_gfroerli", "cc");
spruecheMap.set("16_solala", "cc");
spruecheMap.set("16_hertimnaeh", "ee");

spruecheMap.set("17_gfroerli", "cc");
spruecheMap.set("17_solala", "ee");
spruecheMap.set("17_hertimnaeh", "ff");

spruecheMap.set("18_gfroerli", "cc");
spruecheMap.set("18_solala", "ee");
spruecheMap .set("18_hertimnaeh", "ff");

spruecheMap.set("19_gfroerli", "ee");
spruecheMap.set("19_solala", "ff");
spruecheMap.set("19_hertimnaeh", "ff");

spruecheMap.set("20_gfroerli", "ee");
spruecheMap.set("20_solala", "ff");
spruecheMap.set("20_hertimnaeh", "ff");

spruecheMap.set("21_gfroerli", "ff");
spruecheMap.set("21_solala", "ff");
spruecheMap.set("21_hertimnaeh", "ff");

spruecheMap.set("22_gfroerli", "ff");
spruecheMap.set("22_solala", "ff");
spruecheMap.set("22_hertimnaeh", "ff");

spruecheMap.set("23_gfroerli", "ff");
spruecheMap.set("23_solala", "ff");
spruecheMap.set("23_hertimnaeh", "ff");

spruecheMap.set("24_gfroerli", "ff");
spruecheMap.set("24_solala", "ff");
spruecheMap.set("24_hertimnaeh", "ff");

spruecheMap.set("25_gfroerli", "ff");
spruecheMap.set("25_solala", "ff");
spruecheMap.set("25_hertimnaeh", "ff");



let temp = 15;

let stufe = "gfroerlistufe";


spruecheMap.get(temp + "_" + stufe);