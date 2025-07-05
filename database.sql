-- Tạo database mới
CREATE DATABASE IF NOT EXISTS task_manager_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Sử dụng database
USE task_manager_db;

-- Xóa bảng cũ nếu tồn tại để đảm bảo cấu trúc mới được áp dụng
DROP TABLE IF EXISTS tasks;

-- Tạo bảng tasks
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE, -- <--- ĐÃ THÊM TRƯỜNG start_date
    due_date DATE,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    status ENUM('todo', 'inprogress', 'done') DEFAULT 'todo',
    category VARCHAR(50) DEFAULT 'personal', -- 'personal', 'work', 'study', 'group'
    subtasks_json TEXT, -- Lưu trữ JSON của subtasks
    members_progress_json TEXT -- Lưu trữ JSON của members progress
);

-- Thêm dữ liệu mẫu (đã bao gồm category và JSON cho subtasks/members_progress)
INSERT INTO tasks (title, description, start_date, due_date, priority, status, category, subtasks_json, members_progress_json) VALUES
-- Tác vụ học tập (Cá nhân)
('Hoàn thành báo cáo dự án', 'Viết báo cáo tổng kết môn học Lập trình Web', '2023-11-01', '2023-12-15', 'high', 'inprogress', 'study',
    '[{"text":"Nghiên cứu tài liệu","completed":true},{"text":"Viết dàn ý","completed":false},{"text":"Hoàn thiện nội dung","completed":false}]',
    NULL),
-- Tác vụ công việc (Cá nhân)
('Thiết kế giao diện người dùng', 'Thiết kế wireframe cho ứng dụng quản lý tác vụ', '2023-11-20', '2023-12-10', 'medium', 'todo', 'work',
    '[{"text":"Phân tích yêu cầu","completed":false},{"text":"Vẽ wireframe","completed":false},{"text":"Tạo mockup","completed":false}]',
    NULL),
-- Tác vụ cá nhân (Cá nhân)
('Kiểm thử tính năng đăng nhập', 'Kiểm tra tính năng đăng nhập với các trường hợp khác nhau', '2023-11-25', '2023-12-05', 'low', 'done', 'personal',
    '[{"text":"Test case 1","completed":true},{"text":"Test case 2","completed":true},{"text":"Test case 3","completed":true}]',
    NULL),
-- Tác vụ nhóm (Group)
('Dự án website công ty', 'Phát triển trang web giới thiệu sản phẩm mới.', '2023-10-01', '2023-12-30', 'high', 'inprogress', 'group',
    '[{"text":"Thiết kế giao diện","completed":false,"member":"An"},{"text":"Phát triển Backend","completed":false,"member":"Bình"},{"text":"Tích hợp API","completed":false,"member":"Cường"},{"text":"Kiểm thử toàn diện","completed":false,"member":"An"}]',
    '{"An":[{"text":"Thiết kế giao diện","completed":false},{"text":"Kiểm thử toàn diện","completed":false}],"Bình":[{"text":"Phát triển Backend","completed":false}],"Cường":[{"text":"Tích hợp API","completed":false}]}'),
-- Một tác vụ nhóm khác (Group)
('Tổ chức sự kiện cuối năm', 'Lập kế hoạch và thực hiện tiệc tổng kết cuối năm.', '2023-09-01', '2023-12-15', 'medium', 'inprogress', 'group',
    '[{"text":"Lên ngân sách","completed":true,"member":"An"},{"text":"Chọn địa điểm","completed":true,"member":"Bình"},{"text":"Thuê âm thanh ánh sáng","completed":false,"member":"An"},{"text":"Lên danh sách khách mời","completed":false,"member":"Cường"}]',
    '{"An":[{"text":"Lên ngân sách","completed":true},{"text":"Thuê âm thanh ánh sáng","completed":false}],"Bình":[{"text":"Chọn địa điểm","completed":true}],"Cường":[{"text":"Lên danh sách khách mời","completed":false}]}');