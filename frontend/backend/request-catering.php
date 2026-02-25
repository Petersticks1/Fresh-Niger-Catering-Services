<?php
/**
 * Royal Flave – Catering request handler
 * Sanitize inputs, send email notification, return success/error.
 */
header('Content-Type: application/json');
$to_email = 'catering@freshniger.com'; // Set your email

$raw = file_get_contents('php://input');
$data = json_decode($raw, true) ?: [];
$name = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$phone = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$event_type = isset($data['event_type']) ? trim(strip_tags($data['event_type'])) : '';
$guests = isset($data['guests']) ? trim(strip_tags($data['guests'])) : '';
$date = isset($data['date']) ? trim(strip_tags($data['date'])) : '';
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Valid email is required.']);
    exit;
}

$body = "Catering request\n\nName: $name\nEmail: $email\nPhone: $phone\nEvent type: $event_type\nGuests: $guests\nDate: $date\n\nMessage: $message";
$subject = 'Royal Flave – Catering Request from ' . $name;
$headers = 'From: ' . $email . "\r\n" . 'Reply-To: ' . $email . "\r\n" . 'X-Mailer: PHP/' . phpversion();

$sent = @mail($to_email, $subject, $body, $headers);
echo json_encode(['success' => (bool) $sent, 'message' => $sent ? 'Request received. We will get back to you with a quote.' : 'Sorry, we could not send your request. Please try again or contact us.']);
exit;
