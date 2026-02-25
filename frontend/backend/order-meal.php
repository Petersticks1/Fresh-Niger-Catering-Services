<?php
/**
 * Royal Flave – Meal order handler
 * Sanitize inputs, send email notification, return success/error.
 * Configure: $to_email, mail server.
 */
header('Content-Type: application/json');
$to_email = 'orders@freshniger.com'; // Set your email

$raw = file_get_contents('php://input');
$data = json_decode($raw, true) ?: [];
$name = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$items = isset($data['items']) ? $data['items'] : [];
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Valid email is required.']);
    exit;
}

$body = "New meal order\n\nName: $name\nEmail: $email\nItems: " . json_encode($items, JSON_PRETTY_PRINT) . "\n\nMessage: $message";
$subject = 'Royal Flave – Meal Order from ' . $name;
$headers = 'From: ' . $email . "\r\n" . 'Reply-To: ' . $email . "\r\n" . 'X-Mailer: PHP/' . phpversion();

$sent = @mail($to_email, $subject, $body, $headers);
echo json_encode(['success' => (bool) $sent, 'message' => $sent ? 'Order received. We will confirm shortly.' : 'Sorry, we could not process your order. Please try again or contact us.']);
exit;
