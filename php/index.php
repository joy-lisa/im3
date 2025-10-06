<?php
$name = "janna";

$jahrgang = 2009;
$groesse = 1.90;

echo $name; 
echo $groesse;

echo "mein name ist $name, ich bin jahre alt und $groesse m groß"; // ausgabe 

print_r($name); // ausgabe inkl. syntaxfehler

var_dump($name); // datentyp herausfinden

$alter = date("Y") - $jahrgang; // aktuelles jahr - geburtsjahr = alter
echo $alter;

if ($alter >= 18 || $groesse >= 1.60) { // die || bedeuten ODER bedingung
    echo "Du bist volljährig oder genug gross und darfst deshalb trinken.";
} elseif ($alter >= 16 && $groesse >= 1.60) { // die && bedeuten UND bedingung, beides muss wahr sein
    echo "Du bist minderjährig. trink bier";
} else {
    echo "Du bist minderjährig. kein eintritt";
}

function alterBerechnen($jahrgang) {
    $alter = 2025 - $jahrgang;
    return $alter;
}

function alterBerechnenNeu($jahrgang) {
    return date("Y") - $jahrgang;
}

// array
$fruechte = array(
    array("name" => "apfel", "jahrgang" => 2009, "groesse" => 1.90),
    array("name" => "banane"),
    array("name" => "erdbeere")
);

array_push($fruechte, "kiwi"); // neues element hinzufügen

echo $fruechte[0]["name"]; // apfel


?>

