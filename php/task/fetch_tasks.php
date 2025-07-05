    <?php
    // Đảm bảo đường dẫn đến db_connect.php là chính xác
    include '../php/task/db_connect.php'; // Điều chỉnh đường dẫn nếu db_connect.php không nằm ở thư mục cha

    // Thiết lập header để trả về JSON
    header('Content-Type: application/json');

    // Lấy các tham số từ request GET
    $status = $_GET['status'] ?? 'all';
    $keyword = $_GET['keyword'] ?? '';
    $category = $_GET['category'] ?? 'all'; // <-- Lấy tham số category

    $sql = "SELECT * FROM tasks WHERE 1=1";
    $params = [];
    $types = "";

    // Lọc theo trạng thái
    if ($status !== 'all') {
        $sql .= " AND status = ?";
        $params[] = $status;
        $types .= "s";
    }

    // Lọc theo từ khóa tìm kiếm (tìm trong title và description)
    if (!empty($keyword)) {
        $sql .= " AND (title LIKE ? OR description LIKE ?)";
        $params[] = "%" . $keyword . "%";
        $params[] = "%" . $keyword . "%";
        $types .= "ss";
    }

    // Lọc theo category (nếu không phải 'all')
    if ($category !== 'all') {
        $sql .= " AND category = ?";
        $params[] = $category;
        $types .= "s";
    }

    // Chuẩn bị và thực thi câu lệnh SQL
    $stmt = $conn->prepare($sql);

    if (!empty($params)) {
        $stmt->bind_param($types, ...$params);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $tasks = [];
    while ($row = $result->fetch_assoc()) {
        // Giải mã các trường JSON từ database
        $row['subtasks'] = json_decode($row['subtasks_json'] ?? '[]', true);
        $row['membersProgress'] = json_decode($row['members_progress_json'] ?? '[]', true);

        // Đảm bảo các trường ngày tháng có định dạng chuẩn cho JS
        $row['startDate'] = $row['start_date'];
        $row['dueDate'] = $row['due_date'];

        // Xóa các trường thô không cần thiết
        unset($row['subtasks_json']);
        unset($row['members_progress_json']);
        unset($row['start_date']);
        unset($row['due_date']);

        $tasks[] = $row;
    }

    echo json_encode($tasks);

    $stmt->close();
    $conn->close();
    ?>
  