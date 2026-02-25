<?php
/**
 * Altair Attic – Career application handler
 * Sanitize inputs, send to HR email, redirect with message.
 */
$to_email = 'hello@altair-attic.com'; // Set your email

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../careers.html');
    exit;
}

$name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$role = isset($_POST['role']) ? trim(strip_tags($_POST['role'])) : '';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: ../careers.html?apply=error');
    exit;
}

$body = "Career application – Altair Attic\n\nName: $name\nEmail: $email\nRole: $role\n\nMessage:\n$message";
$subject = 'Altair Attic – Job Application: ' . $role . ' from ' . $name;
$headers = 'From: ' . $email . "\r\n" . 'Reply-To: ' . $email . "\r\n" . 'X-Mailer: PHP/' . phpversion();

$sent = @mail($to_email, $subject, $body, $headers);
header('Location: ../careers.html?apply=' . ($sent ? 'sent' : 'error'));
exit;