<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$payload = json_decode(file_get_contents('php://input'), true);
$adminEmail = 'info@shelterservicesinternational.com';

if (!is_array($payload) || !filter_var($payload['customerEmail'] ?? '', FILTER_VALIDATE_EMAIL) ||
    !is_string($payload['customerName'] ?? '') || !is_array($payload['items'] ?? []) ||
    !is_numeric($payload['totalPrice'] ?? null)) {
    http_response_code(400);
    echo json_encode(['error' => 'Incomplete order']);
    exit;
}

function clean_text($value) {
    return htmlspecialchars((string)($value ?? ''), ENT_QUOTES, 'UTF-8');
}

$orderId = strtoupper(substr((string)$payload['orderId'], 0, 8));
$rows = '';
foreach ($payload['items'] as $item) {
    $product = $item['product'] ?? [];
    $name = clean_text($product['name'] ?? 'Product');
    $quantity = (float)($item['quantity'] ?? 0);
    $price = (float)($product['price'] ?? 0);
    $rows .= '<tr><td>' . $name . '</td><td>' . $quantity . ' kg</td><td>$' . number_format($quantity * $price, 2) . '</td></tr>';
}

$html = '<!doctype html><html><body>' .
    '<h2>Order #' . clean_text($orderId) . '</h2>' .
    '<p>Thank you, ' . clean_text($payload['customerName']) . '. Your order request has been received.</p>' .
    '<table cellpadding="8" cellspacing="0" border="1"><thead><tr><th>Product</th><th>Quantity</th><th>Amount</th></tr></thead><tbody>' . $rows . '</tbody></table>' .
    '<p><strong>Total quantity:</strong> ' . clean_text($payload['totalQty'] ?? 0) . ' kg<br><strong>Subtotal:</strong> $' . number_format((float)$payload['totalPrice'], 2) . '</p>' .
    '<p><strong>Company:</strong> ' . clean_text($payload['customerCompany'] ?? '-') . '<br><strong>Phone:</strong> ' . clean_text($payload['customerPhone'] ?? '-') . '<br><strong>Location:</strong> ' . clean_text($payload['city'] ?? '-') . ', ' . clean_text($payload['country'] ?? '-') . '<br><strong>Notes:</strong> ' . clean_text($payload['notes'] ?? 'None') . '</p>' .
    '</body></html>';

$from = 'info@shelterservicesinternational.com';
$headers = "MIME-Version: 1.0\r\n" .
    "Content-Type: text/html; charset=UTF-8\r\n" .
    "From: Shelter Services International <" . $from . ">\r\n";

$customerSent = mail($payload['customerEmail'], 'Order receipt #' . $orderId, $html, $headers);
$adminHeaders = $headers . 'Reply-To: ' . $payload['customerEmail'] . "\r\n";
$adminSent = mail($adminEmail, 'New order #' . $orderId, $html, $adminHeaders);

if (!$customerSent || !$adminSent) {
    error_log('Order email failed for order #' . $orderId);
    http_response_code(503);
    echo json_encode(['error' => 'Email service could not send the message']);
    exit;
}

http_response_code(204);
