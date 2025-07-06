<?php
session_start();
header('Content-Type: application/json');
require_once 'config.php'; // Include configuration

// Check if the user is logged in (session 'user' exists)
if (!isset($_SESSION['user'])) {
    echo json_encode(['error' => 'Not logged in', 'message' => 'Bạn chưa đăng nhập']);
    exit();
}

$user = $_SESSION['user'];

// Prepare the response data, using defaults if fields are not set
$response = [
    'name'   => $user['name'] ?? '',
    'email'  => $user['email'] ?? '',
    'dob'    => $user['dob'] ?? '',
    // Ensure avatar uses the defined default if not set in session
    'avatar' => $user['avatar'] ?? DEFAULT_AVATAR
];

echo json_encode($response);
?>