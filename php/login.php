<?php
session_start();
header('Content-Type: application/json');
require_once 'config.php'; // Include configuration

// Basic input validation
$email = trim($_POST['email'] ?? 'guest@example.com');
// In a real application, you would validate the password against a hashed one from a database.
// For this simple session-based system, we're just accepting it.
$password = $_POST['password'] ?? '';

if (empty($email)) {
    echo json_encode(['status' => 'error', 'message' => 'Email không được để trống.']);
    exit();
}

// SIMULATE successful login - In a real app, you'd verify email/password from a DB
// For demonstration, we'll allow any email and populate the session.

// Initialize user session with necessary fields
$_SESSION['user'] = [
    'name'   => '', // Empty name to prompt for update, or fetch from DB
    'dob'    => '', // Empty DOB to prompt for update, or fetch from DB
    'email'  => $email,
    'avatar' => DEFAULT_AVATAR // Default avatar
];

echo json_encode(['status' => 'success', 'message' => 'Đăng nhập thành công!', 'username' => $email]);
exit();
?>