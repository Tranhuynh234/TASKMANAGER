<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../../config.php'; // Đã sửa đường dẫn

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $notificationId = $data['notification_id'] ?? 0;
    $userId = $_SESSION['user_id'] ?? 0;

    if ($userId === 0) {
        http_response_code(401);
        echo json_encode(['error' => 'Người dùng chưa đăng nhập.']);
        exit;
    }

    if (empty($notificationId)) {
        http_response_code(400);
        echo json_encode(['error' => 'ID thông báo không hợp lệ.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("UPDATE notifications SET is_read = TRUE WHERE notification_id = ? AND user_id = ?");
        $stmt->execute([$notificationId, $userId]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Không tìm thấy thông báo hoặc bạn không có quyền.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Lỗi cơ sở dữ liệu khi cập nhật thông báo: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Phương thức không được phép.']);
}
?>
