<?php
use PHPMailer\PHPMailer\PHPMailer;

require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

$mail = new PHPMailer();

// data

$smtpUsername = 'prudkyi@yahoo.com';
$smtpPassword = 'q1234567890Serhii';
$email = 'prudkyi@yahoo.com';
$name = 'serg';

// SMTP setting

$mail->isSMTP();
$mail->Host = "smtp.mail.yahoo.com";
$mail->SMTPAuth = true;
$mail->Username = $smtpUsername;
$mail->Password = $smtpPassword;
$mail->Port = 587; // 587
$mail->SMTPSecure = 'tls'; // tls
$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);

// email setting

$mail->isHTML(true);
$mail->setFrom($email, $name);
$mail->addAddress('prudcky.workroom@gmail.com');
$mail->Subject = 'theme';
$mail->Body = 'test mail';

if(!$mail->send()){
    echo "Mailer Error: " . $mail->ErrorInfo;
}else{
    echo "Message sent!";
}


