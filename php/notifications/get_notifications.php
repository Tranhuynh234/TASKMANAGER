<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../../config.php'; // Đã sửa đường dẫn

$userId = $_SESSION['user_id'] ?? 0;

if ($userId === 0) {
    http_response_code(401);
    echo json_encode(['error' => 'Người dùng chưa đăng nhập.']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT notification_id, message, type, is_read, created_at, task_id FROM notifications WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$userId]);
    $notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($notifications);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Lỗi cơ sở dữ liệu khi lấy thông báo: ' . $e->getMessage()]);
}
?>