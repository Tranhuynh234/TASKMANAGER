<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $taskId = $data['task_id'] ?? 0;
    $userId = $_SESSION['user_id'] ?? 0;

    if ($userId === 0) {
        http_response_code(401);
        echo json_encode(['error' => 'Người dùng chưa đăng nhập.']);
        exit;
    }

    if (empty($taskId)) {
        http_response_code(400);
        echo json_encode(['error' => 'ID tác vụ không hợp lệ.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM tasks WHERE task_id = ? AND user_id = ?");
        $stmt->execute([$taskId, $userId]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(404); // Not Found or Not Authorized
            echo json_encode(['error' => 'Không tìm thấy tác vụ hoặc bạn không có quyền xóa.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Lỗi cơ sở dữ liệu khi xóa tác vụ: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Phương thức không được phép.']);
}
?>