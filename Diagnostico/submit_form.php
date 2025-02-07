<?php
// Conectar a la base de datos
$servername = "localhost";  // Usualmente localhost para Laragon
$username = "root";         // Usuario por defecto en Laragon
$password = "";             // No tiene contraseña por defecto
$dbname = "contact_messages";   // El nombre de tu base de datos

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar si la conexión es correcta
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los valores enviados desde el formulario
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$queryType = $_POST['queryType'];
$message = $_POST['message'];
$consent = isset($_POST['consent']) ? 1 : 0; // Convertir el checkbox en booleano

// Preparar la consulta SQL para insertar los datos
$sql = "INSERT INTO contact_messages (firstName, lastName, email, queryType, message, consent) 
        VALUES ('$firstName', '$lastName', '$email', '$queryType', '$message', '$consent')";

// Ejecutar la consulta y verificar si se insertó correctamente
if ($conn->query($sql) === TRUE) {
    echo "Mensaje enviado con éxito";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>