<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nombre = htmlspecialchars($_POST["name"]);
  $correo = htmlspecialchars($_POST["email"]);
  $fecha = htmlspecialchars($_POST["date"]);

  // Datos para conexión local
  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "clinica";

  // Crear conexión
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Verificar conexión
  if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
  }

  // Insertar datos
  $stmt = $conn->prepare("INSERT INTO citas (nombre, correo, fecha) VALUES (?, ?, ?)");
  $stmt->bind_param("sss", $nombre, $correo, $fecha);

  if ($stmt->execute()) {
    $mensaje = "¡Hola $nombre! Tu cita para el día $fecha fue registrada exitosamente. Pronto nos contactaremos al correo $correo.";
  } else {
    $mensaje = "Hubo un error al registrar tu cita. Intenta nuevamente.";
  }

  $stmt->close();
  $conn->close();

  echo "<!DOCTYPE html>
  <html lang='es'>
  <head>
    <meta charset='UTF-8'>
    <title>Confirmación de cita</title>
    <style>
      body { font-family: 'Segoe UI', sans-serif; text-align: center; padding: 2rem; background-color: #e0f0ff; }
      .card { background-color: white; padding: 2rem; max-width: 600px; margin: auto; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
      .card h2 { color: #007bff; }
    </style>
  </head>
  <body>
    <div class='card'>
      <h2>Resultado del registro</h2>
      <p>$mensaje</p>
      <a href='proyect1.html' style='display: inline-block; margin-top: 1rem; color: #007bff; text-decoration: none;'>Volver a la página principal</a>
    </div>
  </body>
  </html>";
}
?>
