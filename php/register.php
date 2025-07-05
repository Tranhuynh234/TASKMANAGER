<?php
session_start();
// include 'db_connect.php'; // Removed database connection as per simplification request

header('Content-Type: application/json');
$response = ['status' => 'error', 'message' => ''];

// As per the simplification request "bỏ post, bỏ mấy phần phức tạp đi",
// and "chỉ 1 gmail bất kỳ 1 mật khẩu bất kỳ",
// this script will always simulate a successful registration
// for any provided email and password, without actual user creation or validation.
// The $_SERVER["REQUEST_METHOD"] check is removed, as well as database interaction and validation.

    $email = trim($_POST['email'] ?? 'newuser@example.com'); // Default email if not provided
    $password = $_POST['password'] ?? 'anypassword'; // Default password if not provided
    // $confirm_password is not used for validation anymore.

    // Simulate successful registration and immediate login
    $user_id = uniqid(); // Generate a unique ID for the new "user"
    $_SESSION['user_id'] = $user_id;
    $_SESSION['username'] = $email; // Use the provided email as username for session
    $_SESSION['logged_in'] = true;

    $response['status'] = 'success';
    $response['message'] = 'Đăng ký thành công! Bạn đã được đăng nhập.';
    $response['username'] = $email; // Return email for frontend confirmation

// Database interaction and complex validation removed.
// if (isset($conn)) {
//     $conn->close();
// }
echo json_encode($response);

?>