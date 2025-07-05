<?php
error_reporting(E_ALL); // Bật tất cả báo cáo lỗi
ini_set('display_errors', 1); // Hiển thị lỗi trực tiếp trên trang

require_once __DIR__ . '/../../config.php'; // Đảm bảo đường dẫn đúng tới config.php

$userId = $_SESSION['user_id'] ?? 0;

if ($userId === 0) {
    http_response_code(401); // Unauthorized
    echo json_encode(['error' => 'Người dùng chưa đăng nhập.']);
    exit;
}

try {
    // Sử dụng biến $pdo đã được định nghĩa trong config.php
    $stmt = $pdo->prepare("SELECT task_id, title, description, status, priority, due_date, assigned_to_user_id FROM tasks WHERE user_id = ? ORDER BY due_date ASC, priority DESC");
    $stmt->execute([$userId]);
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($tasks);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Lỗi cơ sở dữ liệu khi lấy tác vụ: ' . $e->getMessage() . '. SQL: ' . $stmt->queryString]);
}
?>