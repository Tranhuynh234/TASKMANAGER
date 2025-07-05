<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../../config.php';

$userId = $_SESSION['user_id'] ?? 0;

if ($userId === 0) {
    http_response_code(401);
    echo json_encode(['error' => 'Người dùng chưa đăng nhập.']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT user_id, username, full_name FROM users ORDER BY username ASC");
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($users);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Lỗi cơ sở dữ liệu khi lấy người dùng: ' . $e->getMessage()]);
}
?>