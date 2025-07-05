<?php
session_start();

// include 'db_connect.php'; // Removed database connection as per simplification request

header('Content-Type: application/json');
$response = ['status' => 'error', 'message' => ''];

// As per the simplification request "bỏ post, bỏ mấy phần phức tạp đi",
// we will assume any access to this file for login purposes is a success,
// and simplify the login logic to always return a successful response
// with the provided email as username.
// The $_SERVER["REQUEST_METHOD"] check is removed, as well as database interaction.

    $email = trim($_POST['email'] ?? 'guest@example.com'); // Default email if not provided
    $password = $_POST['password'] ?? 'anypassword'; // Default password if not provided

    // Simulate successful login for any input
    $_SESSION['user_id'] = uniqid(); // Assign a unique ID for the session
    $_SESSION['username'] = $email; // Use the provided email as username for session
    $_SESSION['logged_in'] = true;

    $response['status'] = 'success';
    $response['message'] = 'Đăng nhập thành công!';
    $response['username'] = $email; // Return email as username

// Database interaction for logging login attempts is removed as per simplification.
// if (isset($conn)) {
//     $conn->close();
// }
echo json_encode($response);

?>