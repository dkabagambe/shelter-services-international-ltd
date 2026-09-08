<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$payload = json_decode(file_get_contents('php://input'), true);
$adminEmail = 'info@shelterservicesinternational.com';

if (!is_array($payload) || !filter_var($payload['email'] ?? '', FILTER_VALIDATE_EMAIL) ||
    !is_string($payload['name'] ?? '') || !is_string($payload['message'] ?? '')) {
    http_response_code(400);
    echo json_encode(['error' => 'Incomplete message']);
    exit;
}

function clean_text($value) {
    return htmlspecialchars((string)($value ?? ''), ENT_QUOTES, 'UTF-8');
}

$title = ($payload['kind'] ?? '') === 'newsletter' ? 'Newsletter subscription' : 'Contact form inquiry';
$html = '<!doctype html><html><body>' .
    '<h2>' . clean_text($title) . '</h2>' .
    '<p><strong>Name:</strong> ' . clean_text($payload['name']) . '<br>' .
    '<strong>Email:</strong> ' . clean_text($payload['email']) . '<br>' .
    '<strong>Phone:</strong> ' . clean_text($payload['phone'] ?? '-') . '<br>' .
    '<strong>Company:</strong> ' . clean_text($payload['company'] ?? '-') . '</p>' .
    '<p>' . nl2br(clean_text($payload['message'])) . '</p>' .
    '</body></html>';

$headers = "MIME-Version: 1.0\r\n" .
    "Content-Type: text/html; charset=UTF-8\r\n" .
    "From: Shelter Services International <info@shelterservicesinternational.com>\r\n" .
    "Reply-To: " . $payload['email'] . "\r\n";

$sent = mail($adminEmail, $title, $html, $headers);
if (!$sent) {
    error_log('Contact email failed for ' . $payload['email']);
    http_response_code(503);
    echo json_encode(['error' => 'Email service could not send the message']);
    exit;
}

http_response_code(204);
