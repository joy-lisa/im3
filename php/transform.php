<?php
declare(strict_types=1);


// oder db.php, bootstrap.php, etc.

// Rohdaten aus extract.php laden
$AareData = include 'extract.php';

// Falls extract.php JSON liefert → dekodieren
if (is_string($AareData)) {
    $data = json_decode($AareData, true, 512, JSON_THROW_ON_ERROR);
} else {
    $data = $AareData;
} 

if (!is_array($data)) {
    throw new RuntimeException('Unerwartetes Datenformat aus extract.php – erwartet Array oder JSON-String.');
}

/** @var array<string,string> $keyToName Mapping: key → name */
$keyToName = [];
foreach ($data['cities'] ?? [] as $city) {
    if (isset($city['key'], $city['name'])) {
        $keyToName[(string)$city['key']] = (string)$city['name'];
    }
}

/** @var array<int,array{orte:string,aare_temp:float,timestamp:string}> $transformedData */
$transformedData = [];

// Transformation: nur orte, aare_temp, timestamp
foreach (($data['values'] ?? []) as $key => $obj) {
    if (!is_array($obj)) {
        continue;
    }

    if (!array_key_exists('temperature', $obj) || $obj['temperature'] === null) {
        // aare_temp ist NOT NULL → ohne Temperatur überspringen
        continue;
    }

    // Ortsname aus Mapping, Fallback: key
    $orte = $keyToName[$key] ?? (string)$key;

    // varchar(11): sicherheitshalber hart kürzen
    $orte = mb_substr($orte, 0, 11, 'UTF-8');

    // Temperatur runden (DECIMAL(11,1))
    $aareTemp = round((float)$obj['temperature'], 1);

    // UNIX → 'Y-m-d H:i:s' (UTC) für TIMESTAMP-Spalte
    $tsUnix = isset($obj['timestamp']) ? (int)$obj['timestamp'] : null;
    $ts     = $tsUnix ? gmdate('Y-m-d H:i:s', $tsUnix) : gmdate('Y-m-d H:i:s');

    $transformedData[] = [
        'orte'      => $orte,
        'aare_temp' => $aareTemp,
        'timestamp' => $ts,
    ];
    // echo "✅ Transformiert: $orte, $aareTemp, $ts\n";
}

// Nichts zu tun?
if ($transformedData === []) {
    echo "ℹ️ Keine gültigen Datensätze gefunden. Abbruch.\n";
    return;
}

