<?php
session_start();
header('Content-Type: application/json');
require_once 'config.php'; // Include configuration

$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$confirm_password = $_POST['confirm_password'] ?? '';

if (empty($email) || empty($password) || empty($confirm_password)) {
    echo json_encode(['status' => 'error', 'message' => 'Vui lòng điền đầy đủ thông tin.']);
    exit();
}

if ($password !== $confirm_password) {
    echo json_encode(['status' => 'error', 'message' => 'Mật khẩu xác nhận không khớp.']);
    exit();
}

try {
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT user_id FROM users WHERE username = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo json_encode(['status' => 'error', 'message' => 'Email này đã được đăng ký.']);
        exit();
    }

    // Hash the password before storing (IMPORTANT for security)
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Insert new user into the database
    $stmt = $pdo->prepare("INSERT INTO users (username, password_hash) VALUES (?, ?)");
    $stmt->execute([$email, $password_hash]);

    $user_id = $pdo->lastInsertId();

    // Set session variables for the newly registered user
    $_SESSION['user_id'] = $user_id;
    $_SESSION['user'] = [
        'user_id' => $user_id,
        'email'   => $email,
        'name'    => '', // Empty for initial registration, user fills later
        'dob'     => '', // Empty for initial registration, user fills later
        'avatar'  => 'default.jpg' // Default avatar (using a placeholder for `DEFAULT_AVATAR` as it's not defined in `config.php`)
    ];
    $_SESSION['logged_in'] = true;

    echo json_encode(['status' => 'success', 'message' => 'Đăng ký thành công!', 'username' => $email]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Lỗi đăng ký: ' . $e->getMessage()]);
}
?>