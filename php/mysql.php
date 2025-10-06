<?php

require_once 'config.php';

try {
    $pdo = new PDO($dsn, $username, $password, $options);
} 
catch (PD0Exception $e) {
    die("Datenbankverbindungsfehler: ". $e->getMessage()")
}