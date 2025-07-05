<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../../config.php'; // Đã sửa đường dẫn

// Kiểm tra xem người dùng đã đăng nhập chưa
$userId = $_SESSION['user_id'] ?? 0;
if ($userId === 0) {
    http_response_code(401); // Unauthorized
    echo json_encode(['error' => 'Người dùng chưa đăng nhập.']);
    exit();
}

// Chỉ cho phép phương thức POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Phương thức không được phép.']);
    exit();
}

// Đọc dữ liệu JSON được gửi trong body của request
$data = json_decode(file_get_contents('php://input'), true);

// Lấy dữ liệu từ mảng $data, cung cấp giá trị mặc định nếu không tồn tại
$title = $data['title'] ?? '';
$description = $data['description'] ?? null; // Mô tả có thể là null
$dueDate = $data['due_date'] ?? null;     // Ngày đáo hạn có thể là null
$priority = $data['priority'] ?? 'medium'; // Mặc định ưu tiên là 'medium'
$status = $data['status'] ?? 'todo';     // Mặc định trạng thái là 'todo'

// Lấy ID người được giao, có thể là null nếu không được chỉ định
$assignedToUserId = $data['assigned_to_user_id'] ?? null;
// Nếu assignedToUserId là một chuỗi rỗng (từ dropdown "Không giao"), chuyển thành null
if ($assignedToUserId === '') {
    $assignedToUserId = null;
}

// Kiểm tra các trường dữ liệu bắt buộc (title và due_date)
if (empty($title) || empty($dueDate)) {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'Tiêu đề và ngày đáo hạn là bắt buộc.']);
    exit();
}

try {
    // Chuẩn bị câu lệnh SQL INSERT với PDO
    // Sử dụng placeholders (?) để chống SQL injection
    $sql = "INSERT INTO tasks (title, description, due_date, status, priority, user_id, assigned_to_user_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);

    // Thực thi câu lệnh với các giá trị đã lấy được
    $stmt->execute([$title, $description, $dueDate, $status, $priority, $userId, $assignedToUserId]);

    // Trả về phản hồi thành công và ID của tác vụ vừa được thêm
    echo json_encode(['success' => true, 'task_id' => $pdo->lastInsertId()]);

} catch (PDOException $e) {
    // Xử lý lỗi cơ sở dữ liệu
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Lỗi cơ sở dữ liệu khi thêm tác vụ: ' . $e->getMessage()]);
}
?>