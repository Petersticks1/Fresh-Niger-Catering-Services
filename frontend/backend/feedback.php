<?php
/**
 * Royal Flave – Customer feedback handler
 * Sanitize inputs, send to support email, redirect with message.
 */
$to_email = 'support@freshniger.com'; // Set your email

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../customer-service.html');
    exit;
}

$name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: ../customer-service.html?feedback=error');
    exit;
}

$body = "Feedback from Royal Flave website\n\nName: $name\nEmail: $email\n\nMessage:\n$message";
$subject = 'Royal Flave – Customer Feedback from ' . $name;
$headers = 'From: ' . $email . "\r\n" . 'Reply-To: ' . $email . "\r\n" . 'X-Mailer: PHP/' . phpversion();

$sent = @mail($to_email, $subject, $body, $headers);
header('Location: ../customer-service.html?feedback=' . ($sent ? 'sent' : 'error'));
exit;