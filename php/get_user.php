<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user'])) {
    echo json_encode(['error' => 'Chưa đăng nhập']);
    exit();
}

// Trả về name, email, avatar
$user = $_SESSION['user'];
$response = [
    'name' => $user['name'] ?? 'Chưa có tên',
    'email' => $user['email'] ?? 'Chưa có email',
    'avatar' => $user['avatar'] ?? 'default.jpg'
];

echo json_encode($response);
?>