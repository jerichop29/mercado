<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

header("Access-Control-Allow-Origin: *"); // Allow requests from any domain
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $name = htmlspecialchars($data["name"]);
    $email = htmlspecialchars($data["email"]);
    $message = htmlspecialchars($data["message"]);

    $mail = new PHPMailer(true);
    include_once __DIR__ . '/../config/email.config.php';
    try {
    
        $mail->send();
        echo json_encode(["status" => "success", "message" => "Email sent successfully"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Mailer Error: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}
?>
