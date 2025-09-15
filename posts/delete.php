<?php
$notesFile = "notes.json";
$notes = file_exists($notesFile) ? json_decode(file_get_contents($notesFile), true) : [];

if (isset($_GET["id"])) {
    $id = $_GET["id"];
    $notes = array_filter($notes, fn($note) => $note["id"] !== $id);
    file_put_contents($notesFile, json_encode(array_values($notes)));
}

header("Location: index.php");
exit;
