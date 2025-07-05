<?php
session_start();
include 'db.php';

if (!isset($_SESSION['user'])) {
    die('Bạn chưa đăng nhập');
}

$user = $_SESSION['user'];
$userId = $user['id'];

// Kiểm tra file đã upload
if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = '../images/avatars/';
    $fileName = basename($_FILES['avatar']['name']);
    $fileExt = pathinfo($fileName, PATHINFO_EXTENSION);
    $newFileName = 'avatar_' . $userId . '_' . time() . '.' . $fileExt;
    $targetPath = $uploadDir . $newFileName;

    $allowedExt = ['jpg', 'jpeg', 'png', 'gif'];
    if (!in_array(strtolower($fileExt), $allowedExt)) {
        die('Chỉ cho phép file ảnh (jpg, png, gif)');
    }

    if (move_uploaded_file($_FILES['avatar']['tmp_name'], $targetPath)) {
        // Cập nhật DB
        $stmt = $conn->prepare("UPDATE users SET avatar = ? WHERE id = ?");
        $stmt->bind_param("si", $newFileName, $userId);
        $stmt->execute();

        // Cập nhật session
        $_SESSION['user']['avatar'] = $newFileName;

        // Trả về kết quả
        header("Location: ../html/user.html?success=avatar_updated");
        exit();
    } else {
        die('Lỗi khi tải ảnh lên');
    }
} else {
    die('Không có file tải lên');
}
?>