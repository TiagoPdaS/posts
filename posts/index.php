<?php
// Carrega notas existentes
$notesFile = "notes.json";
$notes = file_exists($notesFile) ? json_decode(file_get_contents($notesFile), true) : [];

// Se foi enviado formulário, adiciona nova nota
if ($_SERVER["REQUEST_METHOD"] === "POST" && !empty($_POST["note"])) {
    $newNote = [
        "id" => uniqid(),
        "text" => htmlspecialchars($_POST["note"]),
        "color" => $_POST["color"] ?? "#fef08a" // cor padrão (amarelo)
    ];
    $notes[] = $newNote;
    file_put_contents($notesFile, json_encode($notes));
    header("Location: index.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>App de Notas</title>
  <link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#2563eb">

  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>📒 Minhas Notas</h1>

    <form method="POST" class="note-form">
      <textarea name="note" placeholder="Digite sua nota..." required></textarea>
      <select name="color">
        <option value="#fde635ff">Amarelo</option>
        <option value="#217deeff">Azul</option>
        <option value="#23b720ff">Verde</option>
        <option value="#f80606ff">Vermelho</option>
      </select>
      <button type="submit">Adicionar</button>
    </form>

    <div class="notes">
      <?php foreach ($notes as $note): ?>
        <div class="note" style="background-color: <?= $note['color'] ?>">
          <p><?= $note['text'] ?></p>
          <a href="delete.php?id=<?= $note['id'] ?>" class="delete">✖</a>
        </div>
      <?php endforeach; ?>
    </div>
  </div>

  <script>
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
      .then(() => console.log("Service Worker registrado!"))
      .catch((err) => console.error("Erro ao registrar Service Worker:", err));
  }
</script>

</body>
</html>
