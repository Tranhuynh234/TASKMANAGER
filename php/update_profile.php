<?php
session_start();
header('Content-Type: application/json');

// Kiểm tra đăng nhập
if (!isset($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'Chưa đăng nhập']);
    exit();
}

// Lấy dữ liệu JSON từ body
$raw_input = file_get_contents("php://input");
$data = json_decode($raw_input, true);

// Validate input data structure
if (!is_array($data) || !isset($data['field']) || !isset($data['value'])) {
    echo json_encode(['success' => false, 'message' => 'Dữ liệu cập nhật không hợp lệ.']);
    exit();
}

$field = $data['field'];
$value = $data['value'];

// Cập nhật toàn bộ nếu là 'full'
if ($field === 'full' && is_array($value)) {
    // Validate individual fields from the 'full' update
    $name = trim($value['name'] ?? '');
    $dob = trim($value['dob'] ?? '');
    // Email is read-only from the client-side form, but we still update it in session
    $email = filter_var($value['email'] ?? '', FILTER_VALIDATE_EMAIL); 

    if (empty($name)) {
        echo json_encode(['success' => false, 'message' => 'Họ Tên không được để trống.']);
        exit();
    }
    if (empty($dob)) {
        echo json_encode(['success' => false, 'message' => 'Ngày sinh không được để trống.']);
        exit();
    }
    if (!$email) {
        echo json_encode(['success' => false, 'message' => 'Email không hợp lệ.']);
        exit();
    }

    // Update session user data
    $_SESSION['user']['name'] = $name;
    $_SESSION['user']['dob'] = $dob;
    $_SESSION['user']['email'] = $email;

    echo json_encode(['success' => true, 'message' => 'Cập nhật thông tin đầy đủ thành công!']);
    exit();
}

// Cập nhật từng trường riêng (chỉ name, dob, email, avatar - email/avatar thường được xử lý khác)
$allowed_fields = ['name', 'dob', 'email', 'avatar']; // Allow avatar update too if you implement it
if (in_array($field, $allowed_fields)) {
    $updated_value = trim($value);

    // Basic validation for single fields
    if ($field === 'email' && !filter_var($updated_value, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Email không hợp lệ.']);
        exit();
    }
    // For name/dob, just check if empty if needed
    if (($field === 'name' || $field === 'dob') && empty($updated_value)) {
        echo json_encode(['success' => false, 'message' => "Trường '{$field}' không được để trống."]);
        exit();
    }


    $_SESSION['user'][$field] = $updated_value;
    echo json_encode(['success' => true, 'message' => "Cập nhật trường '{$field}' thành công!"]);
    exit();
}

// Nếu không hợp lệ
echo json_encode(['success' => false, 'message' => 'Trường cập nhật không hợp lệ.']);
exit();
?>