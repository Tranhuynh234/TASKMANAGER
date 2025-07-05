<?php
// Đảm bảo đường dẫn đến db_connect.php là chính xác
include '../php/task/db_connect.php';

// Thiết lập header để trả về JSON
header('Content-Type: application/json');

// Lấy dữ liệu JSON từ request body
$input = json_decode(file_get_contents('php://input'), true);

// Lấy các trường dữ liệu từ input
$id = $input['id'] ?? null; // ID sẽ có nếu là cập nhật, null nếu là thêm mới
$title = $input['title'] ?? '';
$description = $input['description'] ?? null; // Có thể null
$startDate = $input['startDate'] ?? null; // Có thể null
$dueDate = $input['dueDate'] ?? null; // Có thể null
$priority = $input['priority'] ?? 'medium';
$status = $input['status'] ?? 'todo';
$category = $input['category'] ?? 'personal'; // Lấy category

// Chuyển đổi mảng subtasks và membersProgress thành chuỗi JSON để lưu vào DB
$subtasks_json = json_encode($input['subtasks'] ?? []);
$members_progress_json = json_encode($input['membersProgress'] ?? []);

// Kiểm tra dữ liệu bắt buộc
if (empty($title)) {
    echo json_encode(['success' => false, 'message' => 'Tiêu đề tác vụ không được để trống.']);
    exit();
}

try {
    if ($id) {
        // Cập nhật tác vụ hiện có
        $sql = "UPDATE tasks SET 
                    title = ?, 
                    description = ?, 
                    start_date = ?, 
                    due_date = ?, 
                    priority = ?, 
                    status = ?, 
                    category = ?, 
                    subtasks_json = ?, 
                    members_progress_json = ? 
                WHERE id = ?";
        $stmt = $conn->prepare($sql);
        // "sssssssssi" là kiểu dữ liệu cho các tham số: 9 chuỗi (string) và 1 số nguyên (integer)
        $stmt->bind_param("sssssssssi", 
            $title, $description, $startDate, $dueDate, $priority, $status, $category, 
            $subtasks_json, $members_progress_json, $id
        );
    } else {
        // Thêm tác vụ mới
        $sql = "INSERT INTO tasks (
                    title, description, start_date, due_date, priority, status, category, 
                    subtasks_json, members_progress_json
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        // "sssssssss" là kiểu dữ liệu cho các tham số: 9 chuỗi (string)
        $stmt->bind_param("sssssssss", 
            $title, $description, $startDate, $dueDate, $priority, $status, $category, 
            $subtasks_json, $members_progress_json
        );
    }

    // Thực thi câu lệnh SQL
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Lưu tác vụ thành công.']);
    } else {
        // Lỗi khi thực thi câu lệnh
        echo json_encode(['success' => false, 'message' => 'Lỗi khi lưu tác vụ: ' . $stmt->error]);
    }

    $stmt->close();

} catch (mysqli_sql_exception $e) {
    // Bắt lỗi SQL exception
    echo json_encode(['success' => false, 'message' => 'Lỗi cơ sở dữ liệu: ' . $e->getMessage()]);
} catch (Exception $e) {
    // Bắt các lỗi khác
    echo json_encode(['success' => false, 'message' => 'Đã xảy ra lỗi: ' . $e->getMessage()]);
} finally {
    // Đảm bảo đóng kết nối
    $conn->close();
}
?>
