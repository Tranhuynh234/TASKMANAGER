<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $taskId = $data['task_id'] ?? 0;
    $title = $data['title'] ?? null;
    $description = $data['description'] ?? null;
    $status = $data['status'] ?? null;
    $priority = $data['priority'] ?? null;
    $dueDate = $data['due_date'] ?? null;
    $assignedToUserId = $data['assigned_to_user_id'] ?? null;
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

    $setClauses = [];
    $params = [];

    if ($title !== null) {
        $setClauses[] = 'title = ?';
        $params[] = $title;
    }
    if ($description !== null) {
        $setClauses[] = 'description = ?';
        $params[] = $description;
    }
    if ($status !== null) {
        $setClauses[] = 'status = ?';
        $params[] = $status;
    }
    if ($priority !== null) {
        $setClauses[] = 'priority = ?';
        $params[] = $priority;
    }
    if ($dueDate !== null) {
        $setClauses[] = 'due_date = ?';
        $params[] = $dueDate;
    }
    if ($assignedToUserId !== null) {
        $setClauses[] = 'assigned_to_user_id = ?';
        $params[] = $assignedToUserId;
    }


    if (empty($setClauses)) {
        http_response_code(400);
        echo json_encode(['error' => 'Không có dữ liệu để cập nhật.']);
        exit;
    }

    $sql = "UPDATE tasks SET " . implode(', ', $setClauses) . " WHERE task_id = ? AND user_id = ?";
    $params[] = $taskId;
    $params[] = $userId;

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Không tìm thấy tác vụ hoặc bạn không có quyền sửa.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Lỗi cơ sở dữ liệu khi cập nhật tác vụ: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Phương thức không được phép.']);
}
?>