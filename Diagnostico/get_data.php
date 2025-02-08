<?php
header('Content-Type: application/json'); // Asegurar que la respuesta sea JSON

// Conectar a la base de datos
$servername = "localhost";  // Usualmente localhost para Laragon
$username = "root";         // Usuario por defecto en Laragon
$password = "";             // No tiene contraseña por defecto
$dbname = "contact_messages";   // El nombre de tu base de datos

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar si la conexión es correcta
if ($conn->connect_error) {
    die(json_encode(['error' => 'Conexión fallida: ' . $conn->connect_error]));
}

// Obtener los datos de la base de datos
$sql = "SELECT id, firstName, lastName, email, queryType, message, consent, submitted_at FROM contact_messages";
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Cerrar la conexión
$conn->close();

// Devolver los datos en formato JSON
echo json_encode($data);
?>
