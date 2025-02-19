<?php

        $mail->isSMTP();
        $mail->Host = $_ENV['SMTP_HOST']; // Change this to your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['SMTP_USER']; // Your email
        $mail->Password = $_ENV['SMTP_PASS']; // Your email password or App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $_ENV['SMTP_PORT'];
        // 
        // Email Content
        $mail->setFrom($email, $name);
        $mail->addAddress('recipient@example.com'); // Change to recipient's email
        $mail->isHTML(true);
        $mail->Subject = 'Approval Aplication Update';
        $mail->Body    = "<p><strong>Name:</strong> $name</p><p><strong>Email:</strong> $email</p><p><strong>Message:</strong> $message</p>";
?>
