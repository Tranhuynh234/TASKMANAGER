$(document).ready(function() {

    // --- 1. Khai báo Hằng số và Biến Toàn cục ---
    // Task Elements
    const taskList = $('#taskList');
    const taskModal = $('#taskModal');
    const addTaskBtn = $('#addTaskBtn');
    const closeModalBtn = $('#closeModal');
    const cancelBtn = $('#cancelBtn');
    const taskForm = $('#taskForm');
    const modalTitle = $('#modalTitle');

    const taskIdInput = $('#taskId');
    const taskTypeInput = $('#taskType');
    const taskTitleInput = $('#taskTitle');
    const taskDescriptionInput = $('#taskDescription');
    const subtasksListDiv = $('#subtasksList');
    const addSubtaskBtn = $('#addSubtaskBtn');
    const taskStartDateInput = $('#taskStartDate');
    const taskDueDateInput = $('#taskDueDate');
    const taskPriorityInput = $('#taskPriority');
    const taskStatusInput = $('#taskStatus');
    const subtasksContainer = $('#subtasks-container');

    // Search Elements
    const searchIconContainer = $('.search-icon-container');
    const searchInputContainer = $('.search-input-container');
    const searchInput = $('#searchInput');

    // Filter Buttons
    const filterButtons = $('.filter-btn');

    // Task Filters
    const taskFilterButtons = $('#taskSection .filter-btn');
    let currentTaskFilter = 'all'; // Filter state for Task Section

    // Group Filters
    const groupFilterButtons = $('#groupSection .filter-btn');
    let currentGroupFilter = 'all'; // Filter state for Group Section

    // Job Filters
    const jobFilterButtons = $('#jobSection .filter-btn');
    let currentJobFilter = 'all'; // Filter state for Job Section

    // Study Filters
    const studyFilterButtons = $('#studySection .filter-btn');
    let currentStudyFilter = 'all'; // Filter state for Study Section

    // Personal Filters
    const personalFilterButtons = $('#personalSection .filter-btn');
    let currentPersonalFilter = 'all'; // Filter state for Personal Section

    // Group Task Integration Elements (NEW)
    const groupSelectContainer = $('#groupSelectContainer');
    const taskGroupInput = $('#taskGroup');

    // Dark Mode Toggle
    const darkModeToggle = $('#darkModeToggle');
    const body = $('body');

    // Section Elements (for display toggling)
    const tasksSection = $('#taskSection');
    const calendarSection = $('#calendarSection');
    const statisticsSection = $('#statisticsSection');
    const groupSection = $('#groupSection');
    const jobSection = $('#jobSection');
    const studySection = $('#studySection');
    const personalSection = $('#personalSection');

    // Sidebar Navigation Buttons
    const tasksViewBtn = $('#tasksViewBtn');
    const calendarViewBtn = $('#calendarViewBtn');
    const statisticsViewBtn = $('#statisticsViewBtn');
    const groupCategoryLink = $('#groupCategoryLink');
    const workCategoryLink = $('#workCategoryLink');
    const studyCategoryLink = $('#studyCategoryLink');
    const personalCategoryLink = $('#personalCategoryLink');

    // Calendar Elements
    const currentMonthYearSpan = $('#currentMonthYear');
    const calendarDatesDiv = $('#calendarDates');
    const prevMonthBtn = $('#prevMonthBtn');
    const nextMonthBtn = $('#nextMonthBtn');

    // Calendar Detail Modal Elements
    const calendarTaskDetailModal = $('#calendarTaskDetailModal');
    const closeCalendarDetailModalBtn = $('#closeCalendarDetailModal');
    const closeCalendarDetailModalBottomBtn = $('#closeCalendarDetailModalBottom');
    const calendarDetailDateSpan = $('#calendarDetailDate');
    const calendarDetailTaskList = $('#calendarDetailTaskList');

    // Chart Elements (Updated for new statistics section)
    const statusChartCanvas = $('#statusChart');
    let statusChartInstance; // To hold the Chart.js instance
    const chartTitle = $('#chartTitle');
    const statisticsFilterButtons = $('.statistics-filters .filter-btn');

    // Stats Cards
    const totalTasksStat = $('#totalTasks');
    const todoTasksStat = $('#todoTasks'); // Chưa bắt đầu
    const inProgressTasksStat = $('#inProgressTasks'); // Đang thực hiện
    const completedTasksStat = $('#completedTasks'); // Hoàn thành
    const overdueTasksStat = $('#overdueTasks'); // Quá hạn


    // Group Management Elements
    const groupList = $('#groupList');
    const groupModal = $('#groupModal');
    const createGroupBtn = $('#createGroupBtn');
    const closeGroupModalBtn = $('#closeGroupModal');
    const cancelGroupBtn = $('#cancelGroupBtn');
    const groupForm = $('#groupForm');
    const groupModalTitle = $('#groupModalTitle');
    const groupIdInput = $('#groupId');
    const groupNameInput = $('#groupName');
    const groupDescriptionInput = $('#groupDescription');
    const groupMembersInput = $('#groupMembers');
    const groupStartDateInput = $('#groupStartDate');
    const groupDueDateInput = $('#groupDueDate');
    const groupPriorityInput = $('#groupPriority');
    const groupStatusInput = $('#groupStatus');

    // Job Management Elements
    const jobList = $('#jobList');
    const jobModal = $('#jobModal');
    const addJobBtn = $('#addJobBtn');
    const closeJobModalBtn = $('#closeJobModal');
    const cancelJobBtn = $('#cancelJobBtn');
    const jobForm = $('#jobForm');
    const jobModalTitle = $('#jobModalTitle');
    const jobIdInput = $('#jobId');
    const jobTitleInput = $('#jobTitle');
    const jobDescriptionInput = $('#jobDescription');
    const jobCompanyInput = $('#jobCompany');
    const jobLocationInput = $('#jobLocation');
    const jobSalaryInput = $('#jobSalary');
    const jobStatusInput = $('#jobStatus');
    const jobApplicationLinkInput = $('#jobApplicationLink');

    // Study Management Elements
    const createStudyTaskBtn = $('#createStudyTaskBtn');
    const studyTaskList = $('#studyTaskList');
    const studyModal = $('#studyModal');
    const studyForm = $('#studyForm');
    const studyIdInput = $('#studyId');
    const studyTitleInput = $('#studyTitle');
    const studyDescriptionInput = $('#studyDescription');
    const studyStartDateInput = $('#studyStartDate');
    const studyDueDateInput = $('#studyDueDate');
    const studyPriorityInput = $('#studyPriority');
    const studyStatusInput = $('#studyStatus');

    // Personal Management Elements
    const createPersonalTaskBtn = $('#createPersonalTaskBtn');
    const personalTaskList = $('#personalTaskList');
    const personalModal = $('#personalModal');
    const personalForm = $('#personalForm');
    const personalModalTitle = $('#personalModalTitle');
    const personalIdInput = $('#personalId');
    const personalTitleInput = $('#personalTitle');
    const personalDescriptionInput = $('#personalDescription');
    const personalStartDateInput = $('#personalStartDate');
    const personalDueDateInput = $('#personalDueDate');
    const personalPriorityInput = $('#personalPriority');
    const personalStatusInput = $('#personalStatus');

    // Notification Elements (NEW)
    const notificationBell = $('#notificationBell');
    const notificationsDropdown = $('#notificationsDropdown');
    const notificationCountBadge = $('.notification-badge'); // Giữ lại nếu bạn muốn cập nhật số lượng
    const notificationList = $('#notificationList');
    const markAllAsReadBtn = $('#markAllAsReadBtn');
    const viewAllNotificationsLink = $('#viewAllNotifications');


    // Global State Variables
    let currentMainFilter = 'all'; // For status filters (all, inprogress, done, overdue)
    let currentFilterBy = 'none'; // Can be 'type' or 'category'
    let currentFilterValue = 'all'; // The value to filter by ('individual', 'group', 'work', 'study', 'personal')
    let searchTerm = '';
    let currentTask = null; // Used for editing tasks
    let currentStatisticsFilter = 'all-tasks'; // Default filter for statistics section


    // Calendar State
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // --- 2. Local Storage & Initial Data Loading ---
    function saveTasksToLocalStorage(tasksData) {
        localStorage.setItem('tasks', JSON.stringify(tasksData));
    }

    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    function saveGroupsToLocalStorage(groupsData) {
        localStorage.setItem('groups', JSON.stringify(groupsData));
    }

    function loadGroupsFromLocalStorage() {
        const storedGroups = localStorage.getItem('groups');
        return storedGroups ? JSON.parse(storedGroups) : [];
    }

    function saveJobsToLocalStorage(jobsData) {
        localStorage.setItem('jobs', JSON.stringify(jobsData));
    }

    function loadJobsFromLocalStorage() {
        const storedJobs = localStorage.getItem('jobs');
        return storedJobs ? JSON.parse(storedJobs) : [];
    }

    // Initialize with sample data if local storage is empty
    let tasks = loadTasksFromLocalStorage();
    let groups = loadGroupsFromLocalStorage();
    let jobs = loadJobsFromLocalStorage();

    if (tasks.length === 0) {
        tasks = [
            // Sample Individual Tasks (10)
            {
                id: 'ind1', type: 'individual', title: 'Hoàn thành báo cáo hàng quý', description: 'Viết và nộp báo cáo hoạt động quý 2.',
                subtasks: [{text: 'Thu thập dữ liệu', completed: true}, {text: 'Phân tích số liệu', completed: false}, {text: 'Viết nội dung', completed: false}, {text: 'Kiểm tra lỗi', completed: false}],
                startDate: '2025-07-01', dueDate: '2025-07-15', priority: 'high', status: 'inprogress', category: 'work'
            },
            {
                id: 'ind2', type: 'individual', title: 'Học lập trình JavaScript nâng cao', description: 'Hoàn thành khóa học JavaScript trên Udemy.',
                subtasks: [{text: 'Module 1: ES6+', completed: true}, {text: 'Module 2: Async/Await', completed: true}, {text: 'Module 3: React cơ bản', completed: false}, {text: 'Làm dự án nhỏ', completed: false}],
                startDate: '2025-06-20', dueDate: '2025-08-30', priority: 'medium', status: 'inprogress', category: 'study'
            },
            {
                id: 'ind3', type: 'individual', title: 'Tập thể dục 30 phút mỗi ngày', description: 'Duy trì thói quen tập luyện hàng ngày.',
                subtasks: [{text: 'Chạy bộ 3km', completed: false}, {text: 'Tập gym', completed: false}, {text: 'Yoga 15 phút', completed: false}],
                startDate: '2025-07-01', dueDate: '2025-07-05', priority: 'low', status: 'todo', category: 'personal'
            },
            {
                id: 'ind4', type: 'individual', title: 'Sửa lỗi website khách hàng A', description: 'Khắc phục các lỗi hiển thị trên trang chủ.',
                subtasks: [{text: 'Xác định lỗi', completed: true}, {text: 'Chỉnh sửa CSS', completed: true}, {text: 'Kiểm thử lại', completed: true}, {text: 'Deploy bản vá', completed: true}],
                startDate: '2025-06-25', dueDate: '2025-06-28', priority: 'high', status: 'done', category: 'work'
            },
            {
                id: 'ind5', type: 'individual', title: 'Đọc sách "Clean Code"', description: 'Đọc hết cuốn sách về Clean Code.',
                subtasks: [{text: 'Chương 1-5', completed: false}, {text: 'Chương 6-10', completed: false}, {text: 'Chương 11-15', completed: false}],
                startDate: '2025-07-05', dueDate: '2025-07-30', priority: 'medium', status: 'todo', category: 'study'
            },
            {
                id: 'ind6', type: 'individual', title: 'Chuẩn bị bài thuyết trình', description: 'Chuẩn bị nội dung và slide cho buổi thuyết trình tuần tới.',
                subtasks: [{text: 'Nghiên cứu chủ đề', completed: true}, {text: 'Viết dàn ý', completed: false}, {text: 'Thiết kế slide', completed: false}, {text: 'Luyện tập', completed: false}],
                startDate: '2025-06-28', dueDate: '2025-07-05', priority: 'high', status: 'inprogress', category: 'work'
            },
            {
                id: 'ind7', type: 'individual', title: 'Dọn dẹp nhà cửa', description: 'Tổng vệ sinh toàn bộ căn hộ.',
                subtasks: [{text: 'Lau sàn', completed: false}, {text: 'Dọn bếp', completed: false}, {text: 'Vệ sinh phòng tắm', completed: false}],
                startDate: '2025-07-06', dueDate: '2025-07-06', priority: 'low', status: 'todo', category: 'personal'
            },
            {
                id: 'ind8', type: 'individual', title: 'Mua quà sinh nhật cho mẹ', description: 'Tìm và mua món quà phù hợp cho mẹ.',
                subtasks: [{text: 'Lên ý tưởng', completed: true}, {text: 'Tham khảo cửa hàng', completed: true}, {text: 'Mua sắm', completed: true}, {text: 'Gói quà', completed: true}],
                startDate: '2025-06-15', dueDate: '2025-06-20', priority: 'medium', status: 'done', category: 'personal'
            },
            {
                id: 'ind9', type: 'individual', title: 'Lên kế hoạch du lịch cuối năm', description: 'Nghiên cứu địa điểm và đặt vé cho chuyến đi.',
                subtasks: [{text: 'Chọn địa điểm', completed: false}, {text: 'Xem xét ngân sách', completed: false}, {text: 'Đặt vé máy bay/tàu', completed: false}, {text: 'Đặt phòng khách sạn', completed: false}],
                startDate: '2025-07-10', dueDate: '2025-07-10', priority: 'low', status: 'todo', category: 'personal'
            },
            {
                id: 'ind10', type: 'individual', title: 'Cập nhật CV', description: 'Thêm kinh nghiệm và kỹ năng mới vào CV.',
                subtasks: [{text: 'Liệt kê kinh nghiệm mới', completed: true}, {text: 'Viết mô tả kỹ năng', completed: false}, {text: 'Kiểm tra định dạng', completed: false}],
                startDate: '2025-06-20', dueDate: '2025-07-01', priority: 'medium', status: 'inprogress', category: 'work'
            },
            // Sample Group Tasks (5)
            {
                id: 'grp1', type: 'group', title: 'Dự án website công ty', description: 'Phát triển trang web giới thiệu sản phẩm mới.',
                subtasks: [
                    {text: 'Thiết kế giao diện', completed: false, member: 'An'},
                    {text: 'Phát triển Backend', completed: false, member: 'Bình'},
                    {text: 'Tích hợp API', completed: false, member: 'Cường'},
                    {text: 'Kiểm thử toàn diện', completed: false, member: 'An'}
                ],
                startDate: '2025-06-01', dueDate: '2025-07-15', priority: 'high', status: 'inprogress', category: 'group',
                membersProgress: {
                    'An': [{text: 'Thiết kế giao diện', completed: false}, {text: 'Kiểm thử toàn diện', completed: false}],
                    'Bình': [{text: 'Phát triển Backend', completed: false}],
                    'Cường': [{text: 'Tích hợp API', completed: false}]
                },
                groupId: 'g1' // Thêm dòng này
            },
            {
                id: 'grp2', type: 'group', title: 'Tổ chức sự kiện cuối năm', description: 'Lập kế hoạch và thực hiện tiệc tổng kết cuối năm.',
                subtasks: [
                    {text: 'Lên ngân sách', completed: true, member: 'An'},
                    {text: 'Chọn địa điểm', completed: true, member: 'Bình'},
                    {text: 'Thuê âm thanh ánh sáng', completed: false, member: 'An'},
                    {text: 'Lên danh sách khách mời', completed: false, member: 'Cường'}
                ],
                startDate: '2025-09-01', dueDate: '2025-12-15', priority: 'medium', status: 'inprogress', category: 'group',
                membersProgress: {
                    'An': [{text: 'Lên ngân sách', completed: true}, {text: 'Thuê âm thanh ánh sáng', completed: false}],
                    'Bình': [{text: 'Chọn địa điểm', completed: true}],
                    'Cường': [{text: 'Lên danh sách khách mời', completed: false}]
                },
                groupId: 'g2' // Thêm dòng này
            },
            {
                id: 'grp3', type: 'group', title: 'Nghiên cứu thị trường mới', description: 'Phân tích tiềm năng thị trường sản phẩm X.',
                subtasks: [
                    {text: 'Thu thập khảo sát', completed: false, member: 'Đạt'},
                    {text: 'Phân tích dữ liệu', completed: false, member: 'Thảo'},
                    {text: 'Viết báo cáo', completed: false, member: 'Đạt'}
                ],
                startDate: '2025-07-15', dueDate: '2025-08-15', priority: 'high', status: 'todo', category: 'group', // Changed category to 'group'
                membersProgress: {
                    'Đạt': [{text: 'Thu thập khảo sát', completed: false}, {text: 'Viết báo cáo', completed: false}],
                    'Thảo': [{text: 'Phân tích dữ liệu', completed: false}]
                },
                groupId: 'g1' // Thêm dòng này (ví dụ)
            },
            {
                id: 'grp4', type: 'group', title: 'Đào tạo nhân viên mới', description: 'Tổ chức các buổi huấn luyện cho nhân sự mới.',
                subtasks: [
                    {text: 'Lên giáo trình', completed: true, member: 'Lan'},
                    {text: 'Chuẩn bị tài liệu', completed: true, member: 'Mai'},
                    {text: 'Giảng dạy Module 1', completed: true, member: 'Lan'},
                    {text: 'Đánh giá học viên', completed: true, member: 'Mai'}
                ],
                startDate: '2025-06-01', dueDate: '2025-06-30', priority: 'low', status: 'done', category: 'group',
                membersProgress: {
                    'Lan': [{text: 'Lên giáo trình', completed: true}, {text: 'Giảng dạy Module 1', completed: true}],
                    'Mai': [{text: 'Chuẩn bị tài liệu', completed: true}, {text: 'Đánh giá học viên', completed: true}]
                },
                groupId: 'g3' // Thêm dòng này
            },
            {
                id: 'grp5', type: 'group', title: 'Cải tiến quy trình sản xuất', description: 'Đề xuất và triển khai giải pháp tối ưu hóa.',
                subtasks: [
                    {text: 'Khảo sát hiện trạng', completed: false, member: 'Sơn'},
                    {text: 'Phân tích điểm yếu', completed: false, member: 'Hà'},
                    {text: 'Đề xuất giải pháp', completed: false, member: 'Sơn'},
                    {text: 'Triển khai thử nghiệm', completed: false, member: 'Hà'}
                ],
                startDate: '2025-07-01', dueDate: '2025-07-08', priority: 'high', status: 'inprogress', category: 'group', // Changed category to 'group'
                membersProgress: {
                    'Sơn': [{text: 'Khảo sát hiện trạng', completed: false}, {text: 'Đề xuất giải pháp', completed: false}],
                    'Hà': [{text: 'Phân tích điểm yếu', completed: false}, {text: 'Triển khai thử nghiệm', completed: false}]
                },
                groupId: 'g1' // Thêm dòng này (ví dụ)
            }
        ];
        saveTasksToLocalStorage(tasks);
    }

    if (groups.length === 0) {
        groups = [
            { id: 'g1', name: 'Nhóm Phát triển Web', description: 'Phát triển các dự án web cho khách hàng.', members: ['An', 'Bình', 'Cường'], startDate: '2025-06-01', dueDate: '2025-07-30', priority: 'high', status: 'inprogress' },
            { id: 'g2', name: 'Nhóm Marketing', description: 'Lên kế hoạch và triển khai các chiến dịch marketing.', members: ['Đạt', 'Thảo'], startDate: '2025-07-01', dueDate: '2025-08-15', priority: 'medium', status: 'todo' },
            { id: 'g3', name: 'Nhóm Thiết kế', description: 'Thiết kế giao diện người dùng và trải nghiệm người dùng.', members: ['Lan', 'Mai', 'Sơn'], startDate: '2025-05-20', dueDate: '2025-06-25', priority: 'low', status: 'done' }
        ];
        saveGroupsToLocalStorage(groups);
    }

    if (jobs.length === 0) {
        jobs = [
            { id: 'j1', title: 'Frontend Developer', description: 'Phát triển giao diện người dùng cho ứng dụng web.', company: 'Tech Solutions Inc.', location: 'Hà Nội', salary: '1000 - 1500 USD/tháng', status: 'Đã nộp đơn', applicationLink: 'https://example.com/job1', eventDate: '2025-07-10' }, // Thêm eventDate
            { id: 'j2', title: 'Backend Engineer', description: 'Xây dựng và duy trì các API backend.', company: 'Global Innovations', location: 'TP.HCM', salary: '1200 - 1800 USD/tháng', status: 'Đang tìm kiếm', applicationLink: '', eventDate: '2025-07-15' }, // Thêm eventDate
            { id: 'j3', title: 'UI/UX Designer', description: 'Thiết kế trải nghiệm người dùng trực quan và hấp dẫn.', company: 'Creative Minds Studio', location: 'Đà Nẵng', salary: '800 - 1200 USD/tháng', status: 'Đã phỏng vấn', applicationLink: 'https://example.com/job3', eventDate: '2025-07-20' } // Thêm eventDate
        ];
        saveJobsToLocalStorage(jobs);
    }


    // --- 3. Utility Functions ---
    function generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const hasTime = dateString.includes('T') || dateString.includes(':');

        if (hasTime) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
            return date.toLocaleDateString('vi-VN', options);
        } else {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            return date.toLocaleDateString('vi-VN', options);
        }
    }

    function getPriorityClass(priority) {
        switch (priority) {
            case 'high': return 'priority-high';
            case 'medium': return 'priority-medium';
            case 'low': return 'priority-low';
            default: return '';
        }
    }

    function getPriorityText(priority) {
        switch (priority) {
            case 'high': return 'Cao';
            case 'medium': return 'Trung bình';
            case 'low': return 'Thấp';
            default: return '';
        }
    }

    // Helper to determine overall task status (including overdue)
    function getTaskOverallStatus(task) {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const dueDateObj = new Date(task.dueDate);
        dueDateObj.setHours(0, 0, 0, 0);
        const isOverdue = task.status !== 'done' && dueDateObj < now;

        if (isOverdue) return 'overdue';
        return task.status;
    }

    function getStatusText(status) {
        switch (status) {
            case 'todo': return 'Chưa bắt đầu';
            case 'inprogress': return 'Đang thực hiện';
            case 'done': return 'Hoàn thành';
            case 'overdue': return 'Quá hạn';
            // Job statuses
            case 'Đang tìm kiếm': return 'Đang tìm kiếm';
            case 'Đã nộp đơn': return 'Đã nộp đơn';
            case 'Đã phỏng vấn': return 'Đã phỏng vấn';
            case 'Đã nhận được offer': return 'Đã nhận được offer';
            case 'Đã từ chối': return 'Đã từ chối';
            default: return '';
        }
    }

    // Helper to calculate members progress for group tasks
    function calculateMembersProgress(subtasks) {
        const progress = {};
        subtasks.forEach(subtask => {
            if (subtask.member) {
                if (!progress[subtask.member]) {
                    progress[subtask.member] = [];
                }
                progress[subtask.member].push({
                    text: subtask.text,
                    completed: subtask.completed
                });
            }
        });
        return progress;
    }

    // --- 4. Render Functions ---

    // Render Main Task List
    function renderTasks() {
        taskList.empty();
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const filteredTasks = tasks.filter(task => {
            // Apply sidebar type/category filter
            if (currentFilterBy === 'type') {
                if (currentFilterValue !== 'all' && task.type !== currentFilterValue) {
                    return false;
                }
            } else if (currentFilterBy === 'category') {
                if (currentFilterValue !== 'all' && task.category !== currentFilterValue) {
                    return false;
                }
            }

            const matchesSearch = searchTerm === '' ||
                                  task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));

            if (!matchesSearch) return false;

            // Apply main status/type filter
            const overallStatus = getTaskOverallStatus(task);
            switch (currentTaskFilter) {
                case 'all': return true;
                case 'todo': return overallStatus === 'todo';
                case 'inprogress': return overallStatus === 'inprogress';
                case 'done': return overallStatus === 'done';
                case 'overdue': return overallStatus === 'overdue';
                default: return true;
            }
        });

        if (filteredTasks.length === 0) {
            taskList.append('<p class="no-tasks-message" style="text-align: center; color: #777;">Không tìm thấy tác vụ nào phù hợp.</p>');
            return;
        } else {
            $('.no-tasks-message').remove();
        }

        filteredTasks.forEach((task, index) => {
            const priorityClass = getPriorityClass(task.priority);
            const priorityText = getPriorityText(task.priority);

            const overallStatus = getTaskOverallStatus(task);
            let statusClass = '';
            let statusText = '';
            switch (overallStatus) {
                case 'todo': statusClass = 'status-todo'; statusText = 'Chưa bắt đầu'; break;
                case 'inprogress': statusClass = 'status-inprogress'; statusText = 'Đang thực hiện'; break;
                case 'done': statusClass = 'status-done'; statusText = 'Hoàn thành'; break;
                case 'overdue': statusClass = 'status-overdue'; statusText = 'Quá hạn'; break;
            }

            const totalSubtasks = task.subtasks ? task.subtasks.length : 0;
            const completedSubtasks = task.subtasks ? task.subtasks.filter(sub => sub.completed).length : 0;
            const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

            let groupTagHtml = '';
            if (task.groupId) {
                const group = groups.find(g => g.id === task.groupId);
                if (group) {
                    groupTagHtml = `<div class="task-group-tag"><small>Nhóm: ${group.name}</small></div>`;
                }
            }

            let taskItemHtml = `
                <div class="task-item" data-id="${task.id}" data-type="${task.type}" data-status="${overallStatus}" data-category="${task.category}">
                    ${groupTagHtml}
                    <div class="task-item-header">
                        <span class="task-title">${task.title}</span>
                        <span class="task-priority ${priorityClass}">${priorityText}</span>
                    </div>
                    <p class="task-description">${task.description}</p>
                    <p class="task-dates">
                        <i class="far fa-calendar-alt"></i> Bắt đầu: ${formatDate(task.startDate)} - Hạn chót: ${formatDate(task.dueDate)}
                    </p>
                    <ul class="subtasks-list">
            `;
            if (task.subtasks && task.subtasks.length > 0) {
                task.subtasks.forEach((subtask, subIndex) => {
                    taskItemHtml += `
                        <li class="subtask-item ${subtask.completed ? 'completed' : ''}">
                            <input type="checkbox" id="subtask-${task.id}-${subIndex}" data-task-id="${task.id}" data-subtask-index="${subIndex}" ${subtask.completed ? 'checked' : ''}>
                            <label for="subtask-${task.id}-${subIndex}">${subtask.text}</label>
                            ${task.type === 'group' && subtask.member ? `<span style="font-size: 0.8em; color: #999; margin-left: 5px;">(${subtask.member})</span>` : ''}
                        </li>
                    `;
                });
            } else {
                 taskItemHtml += `<li><small>Không có nhiệm vụ con</small></li>`;
            }
            taskItemHtml += `
                    </ul>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${progress}%;"></div>
                        <span class="progress-text">${Math.round(progress)}%</span>
                    </div>
            `;

            if (task.type === 'group' && task.membersProgress && Object.keys(task.membersProgress).length > 0) {
                taskItemHtml += `
                    <div class="group-members-progress">
                        <h4>Tiến độ thành viên:</h4>
                        ${Object.entries(task.membersProgress).map(([member, memberSubtasks]) => {
                            const memberTotalSubtasks = memberSubtasks.length;
                            const memberCompletedSubtasks = memberSubtasks.filter(sub => sub.completed).length;
                            let memberProgress = 0;
                            if (memberTotalSubtasks > 0) {
                                memberProgress = (memberCompletedSubtasks / memberTotalSubtasks) * 100;
                            }

                            let displayWidth = memberProgress;
                            let noProgressClass = '';

                            if (memberProgress === 0 && memberTotalSubtasks > 0) {
                                displayWidth = 0;
                                noProgressClass = 'no-progress';
                            } else if (memberProgress > 0 && memberProgress < 1 && memberTotalSubtasks > 0) {
                                // Ensures progress bar is visible even for very small progress
                                displayWidth = 1;
                            }

                            return `
                                <div class="member-progress-item">
                                    <strong>${member}:</strong>
                                    <div class="progress-bar-small">
                                        <span class="${noProgressClass}" style="width: ${displayWidth}%;"></span>
                                        <span class="progress-text-small">${Math.round(memberProgress)}%</span>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;
            }

            taskItemHtml += `
                    <div class="task-actions">
                        <span class="task-status ${statusClass}">${statusText}</span>
                        <button class="btn btn-edit edit-task" data-id="${task.id}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-delete delete-task" data-id="${task.id}"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `;

            const taskElement = $(taskItemHtml);

            taskElement.css({opacity: 0, transform: 'translateY(10px)'}).appendTo('#taskList')
                .delay(100 * index)
                .animate({opacity: 1, translateY: '0px'}, 400);
        });
    }

    // Update Task Progress (used after subtask completion change)
    function updateTaskProgress(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        const totalSubtasks = task.subtasks ? task.subtasks.length : 0;
        const completedSubtasks = task.subtasks ? task.subtasks.filter(sub => sub.completed).length : 0;
        const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

        const $taskItem = $(`.task-item[data-id="${taskId}"]`);

        $taskItem.find('.progress-bar').css('width', `${progress}%`);
        $taskItem.find('.progress-text').text(`${Math.round(progress)}%`);

        // Determine new task status based on overall progress
        let newStatus = task.status; // Keep original status if no subtasks
        if (totalSubtasks > 0) { // Only update status based on subtasks if they exist
            if (progress === 100) {
                newStatus = 'done';
            } else if (completedSubtasks > 0) { // If some subtasks completed
                newStatus = 'inprogress';
            } else { // No subtasks completed
                newStatus = 'todo';
            }
        }

        // Apply overdue logic to newStatus
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const dueDateObj = new Date(task.dueDate);
        dueDateObj.setHours(0, 0, 0, 0);
        const isOverdue = newStatus !== 'done' && dueDateObj < now;

        if (isOverdue) {
            newStatus = 'overdue';
        }

        // Only update DOM if status actually changed
        if ($taskItem.attr('data-status') !== newStatus) {
            $taskItem.attr('data-status', newStatus);

            let statusClass = '';
            let statusText = '';
            switch (newStatus) {
                case 'todo': statusClass = 'status-todo'; statusText = 'Chưa bắt đầu'; break;
                case 'inprogress': statusClass = 'status-inprogress'; statusText = 'Đang thực hiện'; break;
                case 'done': statusClass = 'status-done'; statusText = 'Hoàn thành'; break;
                case 'overdue': statusClass = 'status-overdue'; statusText = 'Quá hạn'; break;
            }

            const $taskStatusSpan = $taskItem.find('.task-actions .task-status');
            $taskStatusSpan.removeClass('status-todo status-inprogress status-done status-overdue').addClass(statusClass).text(statusText);
        }

        // Update group member progress bars
        if (task.type === 'group' && task.membersProgress) {
            for (const member in task.membersProgress) {
                const memberTotalSubtasks = task.membersProgress[member].length;
                const memberCompletedSubtasks = task.membersProgress[member].filter(sub => sub.completed).length;
                let memberProgress = 0;
                if (memberTotalSubtasks > 0) {
                    memberProgress = (memberCompletedSubtasks / memberTotalSubtasks) * 100;
                }

                let displayWidth = memberProgress;
                let noProgressClass = '';

                if (memberProgress === 0 && memberTotalSubtasks > 0) {
                    displayWidth = 0;
                    noProgressClass = 'no-progress';
                } else if (memberProgress > 0 && memberProgress < 1 && memberTotalSubtasks > 0) {
                    // Ensures progress bar is visible even for very small progress
                    displayWidth = 1;
                }

                const $memberProgressItem = $taskItem.find(`.member-progress-item:has(strong:contains("${member}"))`);
                const memberProgressBar = $memberProgressItem.find('.progress-bar-small span:first-child');
                const memberProgressText = $memberProgressItem.find('.progress-text-small');

                memberProgressBar.css('width', `${displayWidth}%`);
                if (noProgressClass === 'no-progress') {
                    memberProgressBar.addClass('no-progress');
                } else {
                    memberProgressBar.removeClass('no-progress');
                }
                memberProgressText.text(`${Math.round(memberProgress)}%`);
            }
        }
        saveTasksToLocalStorage(tasks); // Save changes
        renderCalendar(); // Cập nhật lịch khi tiến độ tác vụ thay đổi
        renderStatisticsChart(); // Cập nhật biểu đồ thống kê
        renderGroups(); // Cập nhật phần nhóm để hiển thị tác vụ liên quan
    }

    // Render Calendar - Phiên bản hoàn chỉnh
    function renderCalendar() {
        calendarDatesDiv.empty();
        currentMonthYearSpan.text(new Date(currentYear, currentMonth).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' }));

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Adjust for Monday start (getDay() returns 0 for Sunday, 1 for Monday, etc.)
        const startDayIndex = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1; // 0 (Sunday) -> 6, 1 (Monday) -> 0

        // Fill leading empty days
        for (let i = 0; i < startDayIndex; i++) {
            calendarDatesDiv.append('<div class="calendar-day inactive"></div>');
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const isCurrentDay = date.toDateString() === today.toDateString();
            const dateString = date.toISOString().split('T')[0];

            // 1. Collect all events for this day
            let allEventsForDay = [];
            
            // Tasks (includes Regular, Group, Study, Personal)
            // CHỈ LỌC CÁC TÁC VỤ CÓ NGÀY BẮT ĐẦU HOẶC NGÀY KẾT THÚC TRÙNG VỚI NGÀY HIỆN TẠI
            const tasksForDay = tasks.filter(task => {
                const taskStartDate = task.startDate ? new Date(task.startDate) : null;
                const taskDueDate = task.dueDate ? new Date(task.dueDate) : null;
                
                const isStartDate = taskStartDate && taskStartDate.toISOString().split('T')[0] === dateString;
                const isDueDate = taskDueDate && taskDueDate.toISOString().split('T')[0] === dateString;
                
                return isStartDate || isDueDate; // Chỉ hiển thị nếu là ngày bắt đầu hoặc ngày kết thúc
            }).map(task => ({ 
                ...task, 
                type: 'task', // Phân biệt đây là một "task" (chung)
                eventType: task.type || 'task', // Loại cụ thể của task (individual, group, study, personal)
                isStartDate: task.startDate && new Date(task.startDate).toISOString().split('T')[0] === dateString,
                isDueDate: task.dueDate && new Date(task.dueDate).toISOString().split('T')[0] === dateString
            }));

            allEventsForDay = allEventsForDay.concat(tasksForDay);

            // Jobs
            // CHỈ LỌC CÁC CÔNG VIỆC CÓ eventDate TRÙNG VỚI NGÀY HIỆN TẠI
            const jobsForDay = jobs.filter(job => {
                return job.eventDate && new Date(job.eventDate).toISOString().split('T')[0] === dateString;
            }).map(job => ({
                ...job,
                type: 'job', // Phân biệt đây là một "job"
                eventType: 'job' // Loại cụ thể là job
            }));

            allEventsForDay = allEventsForDay.concat(jobsForDay);

            // 2. Generate indicators
            let indicatorsHtml = '<div class="calendar-task-indicators">';
            if (allEventsForDay.length > 0) {
                // Sắp xếp ưu tiên theo quy tắc mới: quá hạn > chưa bắt đầu > đang làm > hoàn thành > công việc
                const sortedEvents = allEventsForDay.sort((a, b) => {
                    const statusOrder = { 'overdue': 0, 'todo': 1, 'inprogress': 2, 'done': 3 };
                    
                    // Ưu tiên công việc (job) lên đầu tiên nếu có
                    if (a.eventType === 'job' && b.eventType !== 'job') return -1;
                    if (a.eventType !== 'job' && b.eventType === 'job') return 1;
                    
                    // Nếu cả hai đều là task hoặc cả hai đều là job, sắp xếp theo trạng thái
                    const aStatus = a.eventType === 'task' ? getTaskOverallStatus(a) : 'job'; // Gán 'job' cho job event để sắp xếp
                    const bStatus = b.eventType === 'task' ? getTaskOverallStatus(b) : 'job';

                    const aPriority = statusOrder[aStatus] !== undefined ? statusOrder[aStatus] : 4; // 4 cho 'job'
                    const bPriority = statusOrder[bStatus] !== undefined ? statusOrder[bStatus] : 4;

                    return aPriority - bPriority;
                });

                // Hiển thị tối đa 4 chấm (3 sự kiện + 1 chấm "more")
                const maxVisibleDots = 4;
                const dotsToShow = Math.min(sortedEvents.length, maxVisibleDots - 1); // Số chấm sự kiện thực tế sẽ hiển thị

                sortedEvents.slice(0, dotsToShow).forEach(event => {
                    let dotClass = '';
                    let tooltipText = event.title;
                    
                    if (event.eventType === 'job') {
                        dotClass = 'status-job-dot'; // Tím
                        tooltipText += ' (Công việc)';
                    } else {
                        const overallStatus = getTaskOverallStatus(event);
                        switch (overallStatus) {
                            case 'overdue': dotClass = 'status-overdue-dot'; break; // Đỏ
                            case 'todo': dotClass = 'status-todo-dot'; break; // Xanh dương
                            case 'inprogress': dotClass = 'status-inprogress-dot'; break; // Vàng
                            case 'done': dotClass = 'status-done-dot'; break; // Xanh lá
                        }
                    }
                    
                    indicatorsHtml += `<div class="calendar-task-indicator ${dotClass}" 
                        data-tooltip="${tooltipText}"></div>`;
                });
                
                // Hiển thị chấm "more" nếu có nhiều hơn 3 sự kiện
                if (sortedEvents.length > maxVisibleDots - 1) {
                    indicatorsHtml += `<div class="calendar-task-indicator status-more-dot"
                        data-tooltip="+${sortedEvents.length - (maxVisibleDots - 1)} sự kiện khác"></div>`;
                }
            }
            indicatorsHtml += '</div>';

            // 3. Create day element
            const dayClass = isCurrentDay ? 'current-day' : '';
            calendarDatesDiv.append(`
                <div class="calendar-day ${dayClass}" data-date="${dateString}">
                    <span class="day-number">${day}</span>
                    ${indicatorsHtml}
                </div>
            `);
        }

        // Add tooltip functionality (được gọi sau khi các chấm được thêm vào DOM)
        $('.calendar-task-indicator[data-tooltip]').each(function() {
            const tooltipText = $(this).data('tooltip');
            $(this).hover(function() {
                // Tạo tooltip div và thêm vào body hoặc ngay cạnh indicator
                const tooltipDiv = $('<div class="calendar-tooltip"></div>').text(tooltipText);
                $(this).append(tooltipDiv);
            }, function() {
                // Xóa tooltip khi chuột rời đi
                $(this).find('.calendar-tooltip').remove();
            });
        });
    }

    // Render Statistics Chart (Updated for Doughnut Chart and Filters)
    function renderStatisticsChart() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let filteredData = [];
        let chartLabels = [];
        let chartData = [];
        let chartColors = [];
        let chartBorderColors = [];
        let totalCount = 0;

        // Reset stat cards
        totalTasksStat.text(0);
        todoTasksStat.text(0);
        inProgressTasksStat.text(0);
        completedTasksStat.text(0);
        overdueTasksStat.text(0);

        if (currentStatisticsFilter === 'all-tasks') {
            chartTitle.text('Phân Phối Trạng Thái Tất Cả Công Việc');
            const allTasks = [...tasks]; // Combine all tasks and groups for overall stats

            const stats = {
                todo: 0,
                inprogress: 0,
                done: 0,
                overdue: 0
            };

            allTasks.forEach(item => {
                const overallStatus = getTaskOverallStatus(item);
                if (stats[overallStatus] !== undefined) {
                    stats[overallStatus]++;
                }
            });

            chartLabels = ['Chưa bắt đầu', 'Đang thực hiện', 'Hoàn thành', 'Quá hạn'];
            chartData = [stats.todo, stats.inprogress, stats.done, stats.overdue];
            chartColors = [
                'rgba(76, 201, 240, 1)', // Chưa bắt đầu (Blue)
                'rgb(255, 248, 120)',  // Đang thực hiện (Yellow)
                'rgba(76, 240, 147, 0.86)',  // Hoàn thành (Green)
                'rgba(243, 70, 73, 0.95)'    // Quá hạn (Red)
            ];
            chartBorderColors = [
                'rgba(76, 201, 240, 1)',
                'rgb(255, 248, 120)',
                'rgba(76, 240, 147, 0.86)',
                'rgba(243, 70, 73, 0.95)'
            ];
            totalCount = allTasks.length;

            totalTasksStat.text(totalCount);
            todoTasksStat.text(stats.todo);
            inProgressTasksStat.text(stats.inprogress);
            completedTasksStat.text(stats.done);
            overdueTasksStat.text(stats.overdue);

        } else if (currentStatisticsFilter === 'job') {
            chartTitle.text('Phân Phối Trạng Thái Công Việc');
            filteredData = jobs; // Lấy dữ liệu từ mảng 'jobs'

            const stats = {
                'Đang tìm kiếm': 0,
                'Đã nộp đơn': 0,
                'Đã phỏng vấn': 0,
                'Đã nhận được offer': 0,
                'Đã từ chối': 0
            };

            filteredData.forEach(job => {
                if (stats[job.status] !== undefined) {
                    stats[job.status]++;
                }
            });

            chartLabels = Object.keys(stats);
            chartData = Object.values(stats);
            chartColors = [
                'rgba(76, 201, 240, 1)',
                'rgb(255, 248, 120)',
                'rgb(255, 248, 120)',
                'rgba(76, 240, 147, 0.86)',
                'rgba(243, 70, 73, 0.95)'
            ];
            chartBorderColors = [
                'rgba(76, 201, 240, 1)',
                'rgb(255, 248, 120)',
                'rgb(255, 248, 120)',
                'rgba(76, 240, 147, 0.86)',
                'rgba(243, 70, 73, 0.95)'
            ];
            totalCount = filteredData.length;

            totalTasksStat.text(totalCount);
            // Cập nhật các thẻ thống kê dựa trên trạng thái công việc
            todoTasksStat.text(stats['Đang tìm kiếm']);
            inProgressTasksStat.text(stats['Đã nộp đơn'] + stats['Đã phỏng vấn']);
            completedTasksStat.text(stats['Đã nhận được offer']);
            overdueTasksStat.text(stats['Đã từ chối']);

        }else { // individual, group, study, personal (lọc từ mảng tasks)
            // Điều chỉnh tiêu đề cho phù hợp
            let filterTitle = '';
            switch (currentStatisticsFilter) {
                case 'individual': filterTitle = 'Tác vụ Cá nhân (Chung)'; break; // Đổi tên để rõ ràng hơn
                case 'group': filterTitle = 'Tác vụ Nhóm'; break; // Đã thêm case 'group' vào đây
                case 'study': filterTitle = 'Tác vụ Học tập'; break;
                case 'personal': filterTitle = 'Tác vụ Cá nhân'; break;
                case 'work': filterTitle = 'Tác vụ Công việc'; break; // Thêm case 'work'
                default: filterTitle = 'Tác vụ'; break; // Fallback
            }
            chartTitle.text(`Phân Phối Trạng Thái ${filterTitle}`);

            // Lọc dữ liệu dựa trên category
            // Nếu currentStatisticsFilter là 'individual', bạn cần lọc các tác vụ không thuộc 'group', 'study', 'personal', 'work'
            if (currentStatisticsFilter === 'individual') {
                filteredData = tasks.filter(task =>
                    task.category !== 'group' &&
                    task.category !== 'study' &&
                    task.category !== 'personal' &&
                    task.category !== 'work'
                );
            } else {
                // Logic này sẽ xử lý 'group', 'study', 'personal', 'work' và các category khác
                filteredData = tasks.filter(task => task.category === currentStatisticsFilter);
            }

            const stats = {
                todo: 0,
                inprogress: 0,
                done: 0,
                overdue: 0
            };

            filteredData.forEach(item => {
                const overallStatus = getTaskOverallStatus(item);
                if (stats[overallStatus] !== undefined) {
                    stats[overallStatus]++;
                }
            });

            chartLabels = ['Chưa bắt đầu', 'Đang thực hiện', 'Hoàn thành', 'Quá hạn'];
            chartData = [stats.todo, stats.inprogress, stats.done, stats.overdue];
            chartColors = [
                'rgba(76, 201, 240, 1)', // Chưa bắt đầu (Blue)
                'rgb(255, 248, 120)',  // Đang thực hiện (Yellow)
                'rgba(76, 240, 147, 0.86)',  // Hoàn thành (Green)
                'rgba(243, 70, 73, 0.95)'    // Quá hạn (Red)
            ];
            chartBorderColors = [
                'rgba(76, 201, 240, 1)',
                'rgb(255, 248, 120)',
                'rgba(76, 240, 147, 0.86)',
                'rgba(243, 70, 73, 0.95)'
            ];
            totalCount = filteredData.length;

            totalTasksStat.text(totalCount);
            todoTasksStat.text(stats.todo);
            inProgressTasksStat.text(stats.inprogress);
            completedTasksStat.text(stats.done);
            overdueTasksStat.text(stats.overdue);
        }

        // Hủy biểu đồ cũ nếu có
        if (statusChartInstance) {
            statusChartInstance.destroy();
        }

        // Vẽ biểu đồ mới
        const ctx = statusChartCanvas[0].getContext('2d');
        statusChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: chartLabels,
                datasets: [{
                    data: chartData,
                    backgroundColor: chartColors,
                    borderColor: chartBorderColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: getComputedStyle(document.body).getPropertyValue('--stats-text-color')
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }

    // Update chart colors when dark mode changes
    function updateChartColors() {
        const textColor = getComputedStyle(document.body).getPropertyValue('--stats-text-color');
        
        if (statusChartInstance) {
            statusChartInstance.options.plugins.legend.labels.color = textColor;
            statusChartInstance.update();
        }
    }


    // Render Groups List
    function renderGroups() {
        groupList.empty();

        // Lọc nhóm dựa trên currentGroupFilter
        const filteredGroups = groups.filter(group => {
            //const overallStatus = getTaskOverallStatus(group); // Giả định rằng group có thuộc tính status
            const groupStatus = group.status; // Lấy trạng thái trực tiếp từ đối tượng nhóm
            switch (currentGroupFilter) {
                case 'all': return true;
                case 'todo': return groupStatus === 'todo';
                case 'inprogress': return groupStatus === 'inprogress';
                case 'done': return groupStatus === 'done';
                case 'overdue':
                    // Để xác định nhóm quá hạn, cần so sánh group.dueDate với ngày hiện tại
                    const now = new Date();
                    now.setHours(0, 0, 0, 0);
                    const groupDueDateObj = new Date(group.dueDate);
                    groupDueDateObj.setHours(0, 0, 0, 0);
                    return groupStatus !== 'done' && groupDueDateObj < now;
                default: return true;
            }
        });

        if (filteredGroups.length === 0) {
            groupList.append('<p class="no-groups-message" style="text-align: center; color: #777;">Chưa có nhóm nào.</p>');
            return;
        } else {
            $('.no-groups-message').remove();
        }

        filteredGroups.forEach(group => {
            // BỔ SUNG: Lọc các tác vụ thuộc nhóm này
            const tasksInGroup = tasks.filter(task => task.groupId === group.id);
            let tasksInGroupHtml = '';
            if (tasksInGroup.length > 0) {
                tasksInGroupHtml += `
                    <div class="group-tasks-list">
                        <h4>Tác vụ của nhóm:</h4>
                        <ul>
                `;
                tasksInGroup.forEach(task => {
                    const overallStatus = getTaskOverallStatus(task);
                    let statusClass = '';
                    switch (overallStatus) {
                        case 'todo': statusClass = 'status-todo'; break;
                        case 'inprogress': statusClass = 'status-inprogress'; break;
                        case 'done': statusClass = 'status-done'; break;
                        case 'overdue': statusClass = 'status-overdue'; break;
                    }
                    tasksInGroupHtml += `
                            <li>
                                <span class="task-title-small">${task.title}</span>
                                <span class="task-status-small ${statusClass}">${getStatusText(overallStatus)}</span>
                            </li>
                    `;
                });
                tasksInGroupHtml += `
                        </ul>
                    </div>
                `;
            } else {
                tasksInGroupHtml += `<p class="no-tasks-message" style="font-size: 0.9em; color: #999; margin-top: 10px;">Chưa có tác vụ nào cho nhóm này.</p>`;
            }

            const groupItemHtml = `
                <div class="team-card" data-id="${group.id}">
                    <h3>${group.name}</h3>
                    <p>${group.description}</p>
                    <div class="team-meta-info">
                        <div><i class="far fa-calendar-alt"></i> Bắt đầu: ${formatDate(group.startDate)}</div>
                        <div><i class="far fa-calendar-check"></i> Hạn chót: ${formatDate(group.dueDate)}</div>
                        <div><i class="fas fa-exclamation-circle"></i> Độ ưu tiên: <span class="priority-${group.priority}">${getPriorityText(group.priority)}</span></div>
                        <div><i class="fas fa-info-circle"></i> Trạng thái: <span class="status-${group.status}">${getStatusText(group.status)}</span></div>
                    </div>
                    <div class="team-members">
                        <h4>Thành viên:</h4>
                        <div class="member-avatars">
                            ${group.members.map(member => `<div class="member-avatar">${member.charAt(0).toUpperCase()}</div>`).join('')}
                        </div>
                    </div>
                    ${tasksInGroupHtml}
                    <div class="team-actions-footer">
                        <button class="btn btn-edit edit-group" data-id="${group.id}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-delete delete-group" data-id="${group.id}"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `;
            groupList.append(groupItemHtml);
        });
    }

    // Render Job List
    function renderJobs() {
        jobList.empty();

        const jobsToRender = jobs;

        if (jobsToRender.length === 0) {
            jobList.append('<p class="no-jobs-message" style="text-align: center; color: #777;">Chưa có công việc nào được thêm.</p>');
            return;
        } else {
            $('.no-jobs-message').remove();
        }

        jobsToRender.forEach(job => {
            const jobItemHtml = `
                <div class="job-item" data-id="${job.id}" data-status="${job.status}">
                    <h3>${job.title}</h3>
                    <p>${job.description}</p>
                    <div class="job-meta">
                        <div><i class="fas fa-building"></i> ${job.company}</div>
                        <div><i class="fas fa-map-marker-alt"></i> ${job.location || 'N/A'}</div>
                        <div><i class="fas fa-money-bill-wave"></i> ${job.salary || 'N/A'}</div>
                        <div><i class="fas fa-info-circle"></i> ${getStatusText(job.status)}</div>
                    </div>
                    <div class="job-actions">
                        ${job.applicationLink ? `<a href="${job.applicationLink}" target="_blank" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Ứng tuyển</a>` : ''}
                        <button class="btn btn-edit edit-job" data-id="${job.id}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-delete delete-job" data-id="${job.id}"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `;
            jobList.append(jobItemHtml);
        });
    }

    // Render Study Tasks List
    function renderStudyTasks() {
        studyTaskList.empty(); // Xóa danh sách hiện tại
        const allStudyTasks = tasks.filter(task => task.category === 'study'); // Lọc tác vụ học tập

        const filteredStudyTasks = allStudyTasks.filter(task => {
            const overallStatus = getTaskOverallStatus(task);
            switch (currentStudyFilter) { // Sử dụng currentStudyFilter
                case 'all': return true;
                case 'todo': return overallStatus === 'todo';
                case 'inprogress': return overallStatus === 'inprogress';
                case 'done': return overallStatus === 'done';
                case 'overdue': return overallStatus === 'overdue';
                default: return true;
            }
        });

        if (filteredStudyTasks.length === 0) {
            studyTaskList.append('<p class="no-tasks-message" style="text-align: center; color: #777;">Không có tác vụ học tập nào được tìm thấy.</p>');
            return;
        }

        filteredStudyTasks.forEach(task => {
            const priorityClass = getPriorityClass(task.priority);
            const priorityText = getPriorityText(task.priority);
            const overallStatus = getTaskOverallStatus(task);
            let statusClass = '';
            let statusText = '';
            switch (overallStatus) {
                case 'todo': statusClass = 'status-todo'; statusText = 'Chưa bắt đầu'; break;
                case 'inprogress': statusClass = 'status-inprogress'; statusText = 'Đang thực hiện'; break;
                case 'done': statusClass = 'status-done'; statusText = 'Hoàn thành'; break;
                case 'overdue': statusClass = 'status-overdue'; statusText = 'Quá hạn'; break;
            }

            const taskItemHtml = `
                <div class="study-task-item" data-id="${task.id}" data-category="study">
                    <div class="task-item-header">
                        <span class="task-title">${task.title}</span>
                        <span class="task-priority ${priorityClass}">${priorityText}</span>
                    </div>
                    <p class="task-description">${task.description}</p>
                    <p class="task-dates">
                        <i class="far fa-calendar-alt"></i> Bắt đầu: ${formatDate(task.startDate)} - Hạn chót: ${formatDate(task.dueDate)}
                    </p>
                    <div class="task-actions">
                        <span class="task-status ${statusClass}">${statusText}</span>
                        <button class="btn btn-edit edit-study-task" data-id="${task.id}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-delete delete-study-task" data-id="${task.id}"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `;
            studyTaskList.append(taskItemHtml);
        });
    }

    // Render Personal Tasks List
    function renderPersonalTasks() {
        personalTaskList.empty();
        const allPersonalTasks = tasks.filter(task => task.category === 'personal');

        const filteredPersonalTasks = allPersonalTasks.filter(task => {
            const overallStatus = getTaskOverallStatus(task);
            switch (currentPersonalFilter) {
                case 'all': return true;
                case 'todo': return overallStatus === 'todo';
                case 'inprogress': return overallStatus === 'inprogress';
                case 'done': return overallStatus === 'done';
                case 'overdue': return overallStatus === 'overdue';
                default: return true;
            }
        });

        if (filteredPersonalTasks.length === 0) {
            personalTaskList.append('<p class="no-tasks-message" style="text-align: center; color: #777;">Không có tác vụ cá nhân nào được tìm thấy.</p>');
            return;
        }

        filteredPersonalTasks.forEach(task => {
            const priorityClass = getPriorityClass(task.priority);
            const priorityText = getPriorityText(task.priority);
            const overallStatus = getTaskOverallStatus(task);
            let statusClass = '';
            let statusText = '';
            switch (overallStatus) {
                case 'todo': statusClass = 'status-todo'; statusText = 'Chưa bắt đầu'; break;
                case 'inprogress': statusClass = 'status-inprogress'; statusText = 'Đang thực hiện'; break;
                case 'done': statusClass = 'status-done'; statusText = 'Hoàn thành'; break;
                case 'overdue': statusClass = 'status-overdue'; statusText = 'Quá hạn'; break;
            }

            const taskItemHtml = `
                <div class="task-item" data-id="${task.id}" data-category="personal">
                    <div class="task-item-header">
                        <span class="task-title">${task.title}</span>
                        <span class="task-priority ${priorityClass}">${priorityText}</span>
                    </div>
                    <p class="task-description">${task.description}</p>
                    <p class="task-dates">
                        <i class="far fa-calendar-alt"></i> Bắt đầu: ${formatDate(task.startDate)} - Hạn chót: ${formatDate(task.dueDate)}
                    </p>
                    <div class="task-actions">
                        <span class="task-status ${statusClass}">${statusText}</span>
                        <button class="btn btn-edit edit-personal-task" data-id="${task.id}"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-delete delete-personal-task" data-id="${task.id}"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `;
            personalTaskList.append(taskItemHtml);
        });
    }

    // --- 5. Modal Management Functions ---

    // Task Modal
    function openTaskModal(task = null) {
        taskForm[0].reset();
        taskIdInput.val('');
        subtasksListDiv.empty(); // Clear subtasks list
        currentTask = task; // Set currentTask for subtask completion preservation

        // Reset visibility for subtask section
        subtasksContainer.show();
        addSubtaskBtn.show();
        taskTypeInput.prop('disabled', false); // Enable type selection for new tasks

        // Logic for group dropdown
        groupSelectContainer.hide(); // Hide by default
        taskGroupInput.empty(); // Clear previous options

        if (task) {
            modalTitle.text('Chỉnh sửa tác vụ');
            taskIdInput.val(task.id);
            taskTypeInput.val(task.type);
            taskTypeInput.prop('disabled', true); // Disable type change for existing tasks
            taskTitleInput.val(task.title);
            taskDescriptionInput.val(task.description);
            taskStartDateInput.val(task.startDate);
            taskDueDateInput.val(task.dueDate);
            taskPriorityInput.val(task.priority);
            taskStatusInput.val(task.status);

            if (task.subtasks && task.subtasks.length > 0) {
                task.subtasks.forEach(sub => addSubtaskInput(sub.text, sub.member, task.type));
            }
            // If it's a group task, show and populate the group dropdown
            if (task.type === 'group') {
                groupSelectContainer.show();
                loadGroupOptions(); // Populate group options
                if (task.groupId) {
                    taskGroupInput.val(task.groupId);
                }
            }
            // Manually trigger change to ensure correct subtask input display
            taskTypeInput.trigger('change');

        } else {
            modalTitle.text('Thêm tác vụ mới');
            taskTypeInput.val('individual'); // Default to individual
            taskTypeInput.prop('disabled', false); // Đảm bảo enabled cho tác vụ mới
            const today = new Date().toISOString().split('T')[0];
            taskStartDateInput.val(today);
            taskDueDateInput.val(today);
            taskTypeInput.trigger('change'); // Apply default type setting
        }

        taskModal.addClass('show');
    }

    function closeTaskModal() {
        taskModal.removeClass('show');
    }

    function addSubtaskInput(text = '', member = '', type = 'individual') {
        const isGroupTask = (type === 'group' || taskTypeInput.val() === 'group'); // Check current modal type or passed type
        const subtaskHtml = `
            <div class="subtask-input-group">
                <input type="text" class="form-control subtask-input" value="${text}" placeholder="Tên nhiệm vụ con" required>
                ${isGroupTask ? `
                    <input type="text" class="form-control subtask-member-input" value="${member || ''}" placeholder="Gán cho thành viên">
                ` : ''}
                <button type="button" class="remove-subtask-btn"><i class="fas fa-times"></i></button>
            </div>
        `;
        subtasksListDiv.append(subtaskHtml);
    }

    // Group Modal
    function openGroupModal(group = null) {
        groupForm[0].reset();
        groupIdInput.val('');
        // Đặt giá trị mặc định cho ngày hiện tại khi tạo mới
        const today = new Date().toISOString().split('T')[0];

        if (group) {
            groupModalTitle.text('Chỉnh sửa nhóm');
            groupIdInput.val(group.id);
            groupNameInput.val(group.name);
            groupDescriptionInput.val(group.description);
            groupMembersInput.val(group.members.join(', '));
            groupStartDateInput.val(group.startDate); // Điền ngày bắt đầu
            groupDueDateInput.val(group.dueDate);     // Điền ngày hết hạn
            groupPriorityInput.val(group.priority);   // Điền độ ưu tiên
            groupStatusInput.val(group.status);       // Điền trạng thái
        } else {
            groupModalTitle.text('Tạo nhóm mới');
            groupStartDateInput.val(today); // Đặt ngày bắt đầu là hôm nay
            groupDueDateInput.val(today);   // Đặt ngày hết hạn là hôm nay
            groupPriorityInput.val('medium'); // Mặc định ưu tiên trung bình
            groupStatusInput.val('todo');     // Mặc định trạng thái "Chưa bắt đầu"
        }
        groupModal.addClass('show');
    }

    function closeGroupModal() {
        groupModal.removeClass('show');
    }

    // Job Modal
    function openJobModal(job = null) {
        jobForm[0].reset();
        jobIdInput.val('');
        if (job) {
            jobModalTitle.text('Chỉnh sửa công việc');
            jobIdInput.val(job.id);
            jobTitleInput.val(job.title);
            jobDescriptionInput.val(job.description);
            jobCompanyInput.val(job.company);
            jobLocationInput.val(job.location);
            jobSalaryInput.val(job.salary);
            jobStatusInput.val(job.status);
            jobApplicationLinkInput.val(job.applicationLink);
        } else {
            jobModalTitle.text('Thêm công việc mới');
        }
        jobModal.addClass('show');
    }

    function closeJobModal() {
        jobModal.removeClass('show');
    }

    // Study Modal
    function openStudyTaskModal(task = null) {
        studyForm[0].reset(); // Reset form
        studyIdInput.val(''); // Clear ID
        if (task) {
            studyModalTitle.text('Chỉnh sửa tác vụ học tập');
            studyIdInput.val(task.id);
            studyTitleInput.val(task.title);
            studyDescriptionInput.val(task.description);
            studyStartDateInput.val(task.startDate);
            studyDueDateInput.val(task.dueDate);
            studyPriorityInput.val(task.priority);
            studyStatusInput.val(task.status);
        } else {
            studyModalTitle.text('Thêm tác vụ học tập mới'); // Set title
            const today = new Date().toISOString().split('T')[0];
            studyStartDateInput.val(today);
            studyDueDateInput.val(today);
        }
        studyModal.addClass('show'); // Hiển thị modal
    }

    function closeStudyModal() {
        studyModal.removeClass('show'); // Ẩn modal
    }

    // Personal Modal
    function openPersonalModal(task = null) {
        personalForm[0].reset();
        personalIdInput.val('');
        if (task) {
            personalModalTitle.text('Chỉnh sửa tác vụ cá nhân');
            personalIdInput.val(task.id);
            personalTitleInput.val(task.title);
            personalDescriptionInput.val(task.description);
            personalStartDateInput.val(task.startDate);
            personalDueDateInput.val(task.dueDate);
            personalPriorityInput.val(task.priority);
            personalStatusInput.val(task.status);
        } else {
            personalModalTitle.text('Thêm tác vụ cá nhân mới');
            const today = new Date().toISOString().split('T')[0];
            personalStartDateInput.val(today);
            personalDueDateInput.val(today);
        }
        personalModal.addClass('show');
    }

    function closePersonalModal() {
        personalModal.removeClass('show');
    }

    // --- 6. Event Listeners ---

    // Task Modal Events
    addTaskBtn.on('click', () => openTaskModal());
    closeModalBtn.on('click', closeTaskModal);
    cancelBtn.on('click', closeTaskModal);
    $(document).on('click', function(event) {
        if ($(event.target).is(taskModal)) {
            closeTaskModal();
        }
    });

    taskForm.on('submit', function(e) {
        e.preventDefault();

        const id = taskIdInput.val() || generateUniqueId();
        const type = taskTypeInput.val();
        const title = taskTitleInput.val();
        const description = taskDescriptionInput.val();

        // Get groupId if it's a group task
        const groupId = (type === 'group') ? taskGroupInput.val() : undefined;

        // Validate for group tasks (must select a group)
        if (type === 'group' && !groupId) {
            alert('Vui lòng chọn nhóm cho tác vụ này.');
            return;
        }

        const subtasks = [];
        subtasksListDiv.find('.subtask-input-group').each(function() {
            const subtaskText = $(this).find('.subtask-input').val();
            const memberNameInput = $(this).find('.subtask-member-input');
            const memberName = memberNameInput.length > 0 ? memberNameInput.val().trim() : undefined;

            if (subtaskText) {
                // Find existing subtask to preserve completion status for individual and group
                let existingCompleted = false;
                if (currentTask && currentTask.subtasks) {
                    const foundSub = currentTask.subtasks.find(s => s.text === subtaskText && (s.member === memberName || s.member === undefined));
                    if (foundSub) {
                        existingCompleted = foundSub.completed;
                    }
                }
                subtasks.push({
                    text: subtaskText,
                    completed: existingCompleted,
                    member: type === 'group' ? memberName : undefined
                });
            }
        });

        const startDate = taskStartDateInput.val();
        const dueDate = taskDueDateInput.val();
        const priority = taskPriorityInput.val();
        const status = taskStatusInput.val(); // Status set from form (todo, inprogress, done)

        let membersProgress = {};
        if (type === 'group') {
            const uniqueMembers = [...new Set(subtasks.map(s => s.member).filter(Boolean))];
            uniqueMembers.forEach(member => {
                membersProgress[member] = subtasks.filter(s => s.member === member).map(s => ({text: s.text, completed: s.completed}));
            });
        }

        // Determine task category based on the currently active sidebar filter
        let taskCategory = 'personal'; // Default category
        if (type === 'group') {
            taskCategory = 'group'; // Group tasks implicitly have 'group' category
        } else if (type === 'study') { // Thêm logic này
            taskCategory = 'study'; // Study tasks implicitly have 'study' category
        } else { // If not group or study, determine based on current sidebar filter or default to 'personal'
            const activeSidebarLink = $('.sidebar-menu a.active');
            if (activeSidebarLink.length > 0) {
                const categoryData = activeSidebarLink.data('category-filter');
                if (categoryData && categoryData !== 'all') {
                    taskCategory = categoryData;
                } else if (activeSidebarLink.attr('id') === 'tasksViewBtn') {
                    // If on main tasks view, and not group/study, default to 'work' or 'personal'
                    // For simplicity, let's default to 'work' if not explicitly personal
                    taskCategory = 'work'; 
                }
            }
        }

        const newTaskData = {
            id, type, title, description, subtasks, startDate, dueDate, priority, status,
            category: taskCategory,
            membersProgress: type === 'group' ? membersProgress : undefined,
            groupId: groupId // Add groupId here
        };

        const existingTaskIndex = tasks.findIndex(t => t.id === id);

        if (existingTaskIndex > -1) {
            tasks[existingTaskIndex] = newTaskData;
        } else {
            tasks.push(newTaskData);
        }

        saveTasksToLocalStorage(tasks); // Save tasks after adding/editing
        closeTaskModal();
        renderTasks(); // Re-render with new data and current filters
        renderCalendar(); // Update calendar
        renderStatisticsChart(); // Update chart
        renderGroups(); // Update group section to reflect new tasks
    });

    // Edit task - (Delegated event listener)
    taskList.on('click', '.edit-task', function() {
        const taskId = $(this).data('id');
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            openTaskModal(task);
        }
    });

    // Delete task - (Delegated event listener)
    taskList.on('click', '.delete-task', function() {
        const $taskItem = $(this).closest('.task-item');
        const taskId = $taskItem.data('id');

        if (confirm('Bạn có chắc chắn muốn xóa tác vụ này?')) {
            tasks = tasks.filter(task => task.id !== taskId);
            saveTasksToLocalStorage(tasks); // Save tasks after deleting

            $taskItem.fadeOut(300, function () {
                renderTasks(); // Re-render to update the list
                renderCalendar();
                renderStatisticsChart();
                renderGroups(); // Update group section
            });
        }
    });

    // Add subtask input field (Delegated event listener)
    addSubtaskBtn.on('click', function() {
        addSubtaskInput('', '', taskTypeInput.val()); // Pass current modal type
    });

    // Remove subtask input field (Delegated event listener)
    $(document).on('click', '.remove-subtask-btn', function() {
        $(this).closest('.subtask-input-group').remove();
    });

    // Handle subtask checkbox change (Delegated event listener)
    taskList.on('change', '.subtasks-list input[type="checkbox"]', function() {
        const taskId = $(this).data('task-id');
        const subtaskIndex = $(this).data('subtask-index');
        const isChecked = this.checked;

        const task = tasks.find(t => t.id === taskId);

        if (task && task.subtasks && task.subtasks[subtaskIndex]) {
            task.subtasks[subtaskIndex].completed = isChecked;
            $(this).parent().toggleClass('completed', isChecked); // Update visual state

            // If it's a group task subtask with a member, update member's progress too
            if (task.type === 'group' && task.subtasks[subtaskIndex].member) {
                const memberName = task.subtasks[subtaskIndex].member;
                if (task.membersProgress && task.membersProgress[memberName]) {
                    const memberSubtask = task.membersProgress[memberName].find(sub => sub.text === task.subtasks[subtaskIndex].text);
                    if (memberSubtask) {
                        memberSubtask.completed = isChecked;
                    }
                }
            }
            updateTaskProgress(taskId); // Re-calculate and update progress/status
        }
    });

    // Toggle subtasks and group members display based on task type in modal
    taskTypeInput.on('change', function() {
        const selectedType = $(this).val();
        subtasksListDiv.empty(); // Clear existing subtask inputs

        // Logic for group dropdown
        if (selectedType === 'group') {
            groupSelectContainer.show();
            loadGroupOptions(); // Populate group options
        } else {
            groupSelectContainer.hide();
        }

        if (selectedType === 'individual' || selectedType === 'study') {
            subtasksContainer.show();
            addSubtaskBtn.show();
        } else { // group
            subtasksContainer.show(); // Always show for group to allow adding subtasks
            addSubtaskBtn.show();
        }
    });

    // Search functionality
    searchIconContainer.on('click', function() {
        searchInputContainer.toggleClass('active');
        if (searchInputContainer.hasClass('active')) {
            searchInput.focus();
        } else {
            searchInput.val('');
            searchTerm = ''; // Clear search term
            renderTasks(); // Re-render without search filter
        }
    });

    searchInput.on('input', function() {
        searchTerm = $(this).val();
        renderTasks(); // Re-render with search filter
    });

    // Filter tasks by status (Task Section)
    taskFilterButtons.on('click', function() {
        taskFilterButtons.removeClass('active');
        $(this).addClass('active');
        currentTaskFilter = $(this).data('filter');
        renderTasks();
    });

    // Filter groups by status (Group Section)
    groupFilterButtons.on('click', function() {
        groupFilterButtons.removeClass('active');
        $(this).addClass('active');
        currentGroupFilter = $(this).data('filter');
        renderGroups();
    });

    // Filter jobs by status (Job Section)
    /*jobFilterButtons.on('click', function() {
        jobFilterButtons.removeClass('active');
        $(this).addClass('active');
        currentJobFilter = $(this).data('filter');
        renderJobs();
    });*/

    // Filter study tasks by status (Study Section)
    studyFilterButtons.on('click', function() {
        studyFilterButtons.removeClass('active');
        $(this).addClass('active');
        currentStudyFilter = $(this).data('filter');
        renderStudyTasks();
    });

    // Filter personal tasks by status (Personal Section)
    personalFilterButtons.on('click', function() {
        personalFilterButtons.removeClass('active');
        $(this).addClass('active');
        currentPersonalFilter = $(this).data('filter');
        renderPersonalTasks();
    });

    // Dark Mode Toggle Logic
    darkModeToggle.on('change', function() {
        if (this.checked) {
            body.addClass('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.removeClass('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
        updateChartColors(); // Update chart colors on dark mode change
    });

    // Calendar Navigation Events
    prevMonthBtn.on('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextMonthBtn.on('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    // Calendar Day Click Event (to show tasks for that day)
    calendarDatesDiv.on('click', '.calendar-day:not(.inactive)', function() {
        const selectedDate = $(this).data('date');
        const dateObj = new Date(selectedDate);
        const formattedDate = dateObj.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        calendarDetailDateSpan.text(formattedDate);
        calendarDetailTaskList.empty();

        let allEventsForSelectedDate = [];

        // 1. Tác vụ chung (Individual, Group, Study, Personal, Work)
        // CHỈ LỌC CÁC TÁC VỤ CÓ NGÀY BẮT ĐẦU HOẶC NGÀY KẾT THÚC TRÙNG VỚI NGÀY ĐƯỢC CHỌN
        const tasksForSelectedDate = tasks.filter(task => {
            const taskStartDate = task.startDate ? new Date(task.startDate) : null;
            const taskDueDate = task.dueDate ? new Date(task.dueDate) : null;

            const isStartDate = taskStartDate && taskStartDate.toISOString().split('T')[0] === selectedDate;
            const isDueDate = taskDueDate && taskDueDate.toISOString().split('T')[0] === selectedDate;
            
            return isStartDate || isDueDate; // Chỉ hiển thị nếu là ngày bắt đầu hoặc ngày kết thúc
        }).map(task => ({ ...task, eventType: 'task' })); // Thêm eventType để phân biệt

        allEventsForSelectedDate = allEventsForSelectedDate.concat(tasksForSelectedDate);

        // 2. Công việc (Jobs)
        // CHỈ LỌC CÁC CÔNG VIỆC CÓ eventDate TRÙNG VỚI NGÀY ĐƯỢC CHỌN
        const jobsForSelectedDate = jobs.filter(job => {
            const jobEventDate = job.eventDate ? new Date(job.eventDate) : null;
            return jobEventDate && jobEventDate.toISOString().split('T')[0] === selectedDate;
        }).map(job => ({
            id: job.id,
            title: job.title,
            description: `Công ty: ${job.company}, Trạng thái: ${job.status}`,
            status: job.status, // Sử dụng status của job
            priority: 'medium', // Mặc định
            eventType: 'job', // Thêm eventType để phân biệt
            company: job.company,
            location: job.location,
            salary: job.salary,
            applicationLink: job.applicationLink
        }));

        allEventsForSelectedDate = allEventsForSelectedDate.concat(jobsForSelectedDate);

        if (allEventsForSelectedDate.length === 0) {
            calendarDetailTaskList.append('<p style="text-align: center; color: #777;">Không có sự kiện nào trong ngày này.</p>');
        } else {
            // Sắp xếp các sự kiện theo loại hoặc trạng thái nếu cần
            const sortedEvents = allEventsForSelectedDate.sort((a, b) => {
                const statusOrder = { 'overdue': 0, 'todo': 1, 'inprogress': 2, 'done': 3 };
                
                // Ưu tiên công việc (job) lên đầu tiên nếu có
                if (a.eventType === 'job' && b.eventType !== 'job') return -1;
                if (a.eventType !== 'job' && b.eventType === 'job') return 1;
                
                // Nếu cả hai đều là task hoặc cả hai đều là job, sắp xếp theo trạng thái
                const aStatus = a.eventType === 'task' ? getTaskOverallStatus(a) : 'job'; // Gán 'job' cho job event để sắp xếp
                const bStatus = b.eventType === 'task' ? getTaskOverallStatus(b) : 'job';

                const aPriority = statusOrder[aStatus] !== undefined ? statusOrder[aStatus] : 4; // 4 cho 'job'
                const bPriority = statusOrder[bStatus] !== undefined ? statusOrder[bStatus] : 4;

                return aPriority - bPriority;
            });

            sortedEvents.forEach(event => {
                let detailHtml = '';
                if (event.eventType === 'task') {
                    const overallStatus = getTaskOverallStatus(event);
                    let statusClass = '';
                    let statusText = '';
                    switch (overallStatus) {
                        case 'todo': statusClass = 'status-todo'; statusText = 'Chưa bắt đầu'; break;
                        case 'inprogress': statusClass = 'status-inprogress'; statusText = 'Đang thực hiện'; break;
                        case 'done': statusClass = 'status-done'; statusText = 'Hoàn thành'; break;
                        case 'overdue': statusClass = 'status-overdue'; statusText = 'Quá hạn'; break;
                    }

                    let priorityClass = '';
                    let priorityText = '';
                    switch (event.priority) {
                        case 'high': priorityClass = 'priority-high'; priorityText = 'Cao'; break;
                        case 'medium': priorityClass = 'priority-medium'; priorityText = 'Trung bình'; break;
                        case 'low': priorityClass = 'priority-low'; priorityText = 'Thấp'; break;
                    }

                    let taskTypeDisplay = '';
                    if (event.type === 'group') {
                        taskTypeDisplay = 'Nhóm';
                    } else if (event.category === 'study') {
                        taskTypeDisplay = 'Học tập';
                    } else if (event.category === 'personal') {
                        taskTypeDisplay = 'Cá nhân';
                    } else if (event.category === 'work') {
                        taskTypeDisplay = 'Công việc';
                    } else {
                        taskTypeDisplay = 'Cá nhân (chung)';
                    }

                    detailHtml = `
                        <div class="detail-item">
                            <h4>
                                ${event.title}
                                <span class="detail-status ${statusClass}">${statusText}</span>
                            </h4>
                            <p><span class="detail-label">Mô tả:</span> ${event.description || 'Không có'}</p>
                            <p><span class="detail-label">Ngày bắt đầu:</span> ${formatDate(event.startDate)}</p>
                            <p><span class="detail-label">Hạn chót:</span> ${formatDate(event.dueDate)}</p>
                            <p><span class="detail-label">Độ ưu tiên:</span> <span class="detail-priority ${priorityClass}">${priorityText}</span></p>
                            <p><span class="detail-label">Loại:</span> ${taskTypeDisplay}</p>
                        </div>
                    `;
                } else if (event.eventType === 'job') {
                    // Ánh xạ trạng thái công việc sang class CSS nếu có
                    let jobStatusClass = '';
                    let jobStatusText = event.status;
                    switch (event.status) {
                        case 'Đang tìm kiếm': jobStatusClass = 'status-todo'; break;
                        case 'Đã nộp đơn': jobStatusClass = 'status-inprogress'; break;
                        case 'Đã phỏng vấn': jobStatusClass = 'status-inprogress'; break;
                        case 'Đã nhận được offer': jobStatusClass = 'status-done'; break;
                        case 'Đã từ chối': jobStatusClass = 'status-overdue'; break;
                    }

                    detailHtml = `
                        <div class="detail-item">
                            <h4>
                                ${event.title}
                                <span class="detail-status ${jobStatusClass}">${jobStatusText}</span>
                            </h4>
                            <p><span class="detail-label">Công ty:</span> ${event.company}</p>
                            <p><span class="detail-label">Địa điểm:</span> ${event.location || 'N/A'}</p>
                            <p><span class="detail-label">Mức lương:</span> ${event.salary || 'N/A'}</p>
                            ${event.applicationLink ? `<p><span class="detail-label">Link ứng tuyển:</span> <a href="${event.applicationLink}" target="_blank">Xem</a></p>` : ''}
                            <p><span class="detail-label">Loại:</span> Công việc</p>
                        </div>
                    `;
                }
                calendarDetailTaskList.append(detailHtml);
            });
        }
        calendarTaskDetailModal.addClass('show');
    });

    closeCalendarDetailModalBtn.on('click', () => calendarTaskDetailModal.removeClass('show'));
    closeCalendarDetailModalBottomBtn.on('click', () => calendarTaskDetailModal.removeClass('show'));
    calendarTaskDetailModal.on('click', function(e) {
        if ($(e.target).is('#calendarTaskDetailModal')) {
            calendarTaskDetailModal.removeClass('show');
        }
    });

    // Group Management Events
    createGroupBtn.on('click', () => openGroupModal());
    closeGroupModalBtn.on('click', closeGroupModal);
    cancelGroupBtn.on('click', closeGroupModal);
    $(document).on('click', function(event) {
        if ($(event.target).is(groupModal)) {
            closeGroupModal();
        }
    });

    groupForm.on('submit', function(e) {
        e.preventDefault();
        const id = groupIdInput.val() || generateUniqueId();
        const name = groupNameInput.val();
        const description = groupDescriptionInput.val();
        const members = groupMembersInput.val().split(',').map(m => m.trim()).filter(m => m !== '');
        const startDate = groupStartDateInput.val();
        const dueDate = groupDueDateInput.val();
        const priority = groupPriorityInput.val();
        const status = groupStatusInput.val();

        const newGroupData = { id, name, description, members, startDate, dueDate, priority, status };
        const existingGroupIndex = groups.findIndex(g => g.id === id);

        if (existingGroupIndex > -1) {
            groups[existingGroupIndex] = newGroupData;
        } else {
            groups.push(newGroupData);
        }
        saveGroupsToLocalStorage(groups);
        closeGroupModal();
        renderGroups();
        // Update tasks that might be linked to this group (e.g., if group name changed)
        renderTasks();
        renderCalendar();
        renderStatisticsChart();
    });

    groupList.on('click', '.edit-group', function() {
        const groupId = $(this).data('id');
        const group = groups.find(g => g.id === groupId);
        if (group) {
            openGroupModal(group);
        }
    });

    groupList.on('click', '.delete-group', function() {
        const groupId = $(this).data('id');
        if (confirm('Bạn có chắc chắn muốn xóa nhóm này? Các tác vụ thuộc nhóm này sẽ không còn liên kết với nhóm nào.')) {
            groups = groups.filter(group => group.id !== groupId);
            // Optionally, update tasks that were linked to this group
            tasks.forEach(task => {
                if (task.groupId === groupId) {
                    task.groupId = undefined; // Remove group association
                    // You might want to change task.type to 'individual' here if desired
                    // task.type = 'individual';
                    // task.category = 'personal'; // Or some other default category
                }
            });
            saveGroupsToLocalStorage(groups);
            saveTasksToLocalStorage(tasks); // Save updated tasks
            renderGroups();
            renderTasks(); // Re-render tasks to reflect changes
            renderCalendar();
            renderStatisticsChart();
        }
    });

    // Job Management Events
    addJobBtn.on('click', () => openJobModal());
    closeJobModalBtn.on('click', closeJobModal);
    cancelJobBtn.on('click', closeJobModal);
    $(document).on('click', function(event) {
        if ($(event.target).is(jobModal)) {
            closeJobModal();
        }
    });

    jobForm.on('submit', function(e) {
        e.preventDefault();
        const id = jobIdInput.val() || generateUniqueId();
        const title = jobTitleInput.val();
        const description = jobDescriptionInput.val();
        const company = jobCompanyInput.val();
        const location = jobLocationInput.val();
        const salary = jobSalaryInput.val();
        const status = jobStatusInput.val();
        const applicationLink = jobApplicationLinkInput.val();

        const newJobData = { id, title, description, company, location, salary, status, applicationLink };
        const existingJobIndex = jobs.findIndex(j => j.id === id);

        if (existingJobIndex > -1) {
            jobs[existingJobIndex] = newJobData;
        } else {
            jobs.push(newJobData);
        }
        saveJobsToLocalStorage(jobs);
        closeJobModal();
        renderJobs();
        renderStatisticsChart(); // Update chart
        renderCalendar(); // Update calendar for job events
    });

    jobList.on('click', '.edit-job', function() {
        const jobId = $(this).data('id');
        const job = jobs.find(j => j.id === jobId);
        if (job) {
            openJobModal(job);
        }
    });

    jobList.on('click', '.delete-job', function() {
        const jobId = $(this).data('id');
        if (confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
            jobs = jobs.filter(job => job.id !== jobId);
            saveJobsToLocalStorage(jobs);
            renderJobs();
            renderStatisticsChart(); // Update chart
            renderCalendar(); // Update calendar for job events
        }
    });

    // Study Management Events
    createStudyTaskBtn.on('click', () => openStudyTaskModal());
    studyModal.find('.close-button').on('click', closeStudyModal);
    studyModal.find('#cancelStudyBtn').on('click', closeStudyModal);
    $(document).on('click', function(event) {
        if ($(event.target).is(studyModal)) {
            closeStudyModal();
        }
    });

    studyForm.on('submit', function(e) {
        e.preventDefault();
        const id = studyIdInput.val() || generateUniqueId();
        const title = studyTitleInput.val().trim();
        const description = studyDescriptionInput.val().trim();
        const startDate = studyStartDateInput.val();
        const dueDate = studyDueDateInput.val();
        const priority = studyPriorityInput.val();
        const status = studyStatusInput.val();

        if (!title) {
            alert('Tiêu đề tác vụ không được để trống.');
            return;
        }

        const newStudyTask = {
            id, type: 'individual', title, description, subtasks: [], startDate, dueDate, priority, status, category: 'study'
        };

        const existingTaskIndex = tasks.findIndex(task => task.id === id);
        if (existingTaskIndex > -1) {
            tasks[existingTaskIndex] = newStudyTask;
        } else {
            tasks.push(newStudyTask);
        }

        saveTasksToLocalStorage(tasks);
        closeStudyModal();
        renderStudyTasks();
        renderCalendar();
        renderStatisticsChart();
    });

    studyTaskList.on('click', '.edit-study-task', function() {
        const taskId = $(this).data('id');
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            openStudyTaskModal(task);
        }
    });

    studyTaskList.on('click', '.delete-study-task', function() {
        const taskId = $(this).data('id');
        if (confirm('Bạn có chắc chắn muốn xóa tác vụ học tập này?')) {
            tasks = tasks.filter(task => task.id !== taskId);
           saveTasksToLocalStorage(tasks);
            renderStudyTasks();
            renderCalendar();
            renderStatisticsChart();
        }
    });

    // Personal Management Events
    createPersonalTaskBtn.on('click', () => openPersonalModal());
    personalModal.find('.close-button').on('click', closePersonalModal);
    personalModal.find('#cancelPersonalBtn').on('click', closePersonalModal);
    $(document).on('click', function(event) {
        if ($(event.target).is(personalModal)) {
            closePersonalModal();
        }
    });

    personalForm.on('submit', function(e) {
        e.preventDefault();
        const id = personalIdInput.val() || generateUniqueId();
        const title = personalTitleInput.val();
        const description = personalDescriptionInput.val();
        const startDate = personalStartDateInput.val();
        const dueDate = personalDueDateInput.val();
        const priority = personalPriorityInput.val();
        const status = personalStatusInput.val();

        const newPersonalTaskData = {
            id, type: 'individual', title, description, subtasks: [], startDate, dueDate, priority, status, category: 'personal'
        };

        const existingTaskIndex = tasks.findIndex(t => t.id === id);
        if (existingTaskIndex > -1) {
            tasks[existingTaskIndex] = newPersonalTaskData;
        } else {
            tasks.push(newPersonalTaskData);
        }
        saveTasksToLocalStorage(tasks);
        closePersonalModal();
        renderPersonalTasks();
        renderCalendar();
        renderStatisticsChart();
    });

    personalTaskList.on('click', '.edit-personal-task', function() {
        const taskId = $(this).data('id');
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            openPersonalModal(task);
        }
    });

    personalTaskList.on('click', '.delete-personal-task', function() {
        const taskId = $(this).data('id');
        if (confirm('Bạn có chắc chắn muốn xóa tác vụ cá nhân này?')) {
            tasks = tasks.filter(task => task.id !== taskId);
           saveTasksToLocalStorage(tasks);
            renderPersonalTasks();
            renderCalendar();
            renderStatisticsChart();
        }
    });









    // Notification Dropdown Toggle (NEW)
    notificationBell.on('click', function(e) {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền lên body
        notificationsDropdown.toggleClass('show');

        checkForUpcomingTasks(); // Cập nhật thông báo khi mở dropdown
    });






    

    // Close dropdown when clicking outside (NEW)
    $(document).on('click', function(e) {
        if (!notificationsDropdown.is(e.target) && notificationsDropdown.has(e.target).length === 0 && !notificationBell.is(e.target)) {
            notificationsDropdown.removeClass('show');
        }
    });

    // Example: Mark all as read button (you'll need to implement actual logic)
    markAllAsReadBtn.on('click', function() {
        alert('Đánh dấu tất cả thông báo là đã đọc!');
        // Logic để xóa thông báo hoặc cập nhật trạng thái
        notificationList.empty().append('<li class="no-notifications">Không có thông báo mới.</li>');
        notificationCountBadge.text('0'); // Cập nhật số lượng
        notificationsDropdown.removeClass('show'); // Ẩn dropdown sau khi đọc
    });

    // Example: View all notifications link (you'll need to implement actual logic)
    viewAllNotificationsLink.on('click', function(e) {
        e.preventDefault();
        alert('Chuyển đến trang xem tất cả thông báo!');
        // Logic để chuyển hướng người dùng đến trang thông báo chi tiết
        notificationsDropdown.removeClass('show'); // Ẩn dropdown
    });

    // Function to add a new notification (example)
    function addNotification(message) {
        const currentCount = parseInt(notificationCountBadge.text());
        notificationCountBadge.text(currentCount + 1);

        // Remove "no notifications" message if present
        if (notificationList.find('.no-notifications').length) {
            notificationList.empty();
        }

        const newNotificationHtml = `<li>${message}</li>`;
        notificationList.prepend(newNotificationHtml); // Add new notification to the top
    }

    // Example usage: Add some sample notifications after a delay
    setTimeout(() => {
        addNotification('Bạn có một tác vụ mới: "Hoàn thành báo cáo hàng quý".');
    }, 2000);
    setTimeout(() => {
        addNotification('Nhóm "Phát triển Web" đã cập nhật tiến độ.');
    }, 4000);
    setTimeout(() => {
        addNotification('Hạn chót tác vụ "Tập thể dục 30 phút" sắp đến.');
    }, 6000);

    // --- 7. Sidebar Navigation & Section Toggling ---
    $('.sidebar-menu a').on('click', function(e) {
        e.preventDefault();
        $('.sidebar-menu a').removeClass('active');
        $(this).addClass('active');

        // Ẩn tất cả các section chính
        tasksSection.hide();
        calendarSection.hide();
        statisticsSection.hide();
        groupSection.hide();
        jobSection.hide();
        studySection.hide();
        personalSection.hide();

        const targetViewId = $(this).attr('id');
        const categoryFilter = $(this).data('category-filter'); // Giữ nguyên categoryFilter

        // Hàm tiện ích để đặt lại bộ lọc và render
        function resetAndRender(filterButtons, renderFunction) {
            filterButtons.removeClass('active');
            filterButtons.filter('[data-filter="all"]').addClass('active');
            // Reset the specific filter variable for the section
            if (filterButtons === taskFilterButtons) currentTaskFilter = 'all';
            else if (filterButtons === groupFilterButtons) currentGroupFilter = 'all';
            else if (filterButtons === jobFilterButtons) currentJobFilter = 'all';
            else if (filterButtons === studyFilterButtons) currentStudyFilter = 'all';
            else if (filterButtons === personalFilterButtons) currentPersonalFilter = 'all';
            renderFunction();
        }

        if (targetViewId === 'tasksViewBtn') {
           tasksSection.show();
            // Đặt lại bộ lọc tác vụ chính
            currentFilterBy = 'none'; // Đặt lại các bộ lọc phụ
            currentFilterValue = 'all';
            resetAndRender(taskFilterButtons, renderTasks);
        } else if (targetViewId === 'calendarViewBtn') {
            calendarSection.show();
            renderCalendar();
        } else if (targetViewId === 'statisticsViewBtn') {
            statisticsSection.show();
            // Reset statistics filter to 'all-tasks' and render
            statisticsFilterButtons.removeClass('active');
            statisticsFilterButtons.filter('[data-filter="all-tasks"]').addClass('active');
            currentStatisticsFilter = 'all-tasks';
            renderStatisticsChart();
        } else if (categoryFilter) { // Xử lý các category link
            if (categoryFilter === 'group') {
                groupSection.show();
                resetAndRender(groupFilterButtons, renderGroups);
            } else if (categoryFilter === 'work') {
                jobSection.show();
                resetAndRender(jobFilterButtons, renderJobs);
            } else if (categoryFilter === 'study') {
                studySection.show();
                resetAndRender(studyFilterButtons, renderStudyTasks);
            } else if (categoryFilter === 'personal') {
                personalSection.show();
                resetAndRender(personalFilterButtons, renderPersonalTasks);
            } else { // Nếu là 'all' hoặc các category khác không có section riêng
                tasksSection.show();
                currentFilterBy = 'category';
                currentFilterValue = categoryFilter;
                resetAndRender(taskFilterButtons, renderTasks);
            }
        }
    });

    // Statistics Filter Buttons Event Listener (Đã sửa để chỉ cập nhật filter và render chart)
    $('.statistics-filters .filter-btn').on('click', function() {
        const selectedFilter = $(this).data('filter');
        currentStatisticsFilter = selectedFilter;

        // Cập nhật nút active
        $('.statistics-filters .filter-btn').removeClass('active');
        $(this).addClass('active');

        // Chỉ gọi renderStatisticsChart, không ẩn/hiện section ở đây
        renderStatisticsChart();
    });


    // --- 8. Initial Load & Dark Mode Check ---
    // Initial render calls
    renderTasks();
    renderCalendar();
    renderStatisticsChart(); // Initial render for the new statistics chart
    renderGroups(); // Render groups on initial load
    renderJobs(); // Render jobs on initial load
    renderStudyTasks(); // Render study tasks on initial load
    renderPersonalTasks(); // Render personal tasks on initial load

    // Trigger dark mode check on window load as well, for robustness
    $(window).on('load', function() {
        if (localStorage.getItem('darkMode') === 'enabled') {
            body.addClass('dark-mode');
            darkModeToggle.prop('checked', true);
        } else {
            body.removeClass('dark-mode');
            darkModeToggle.prop('checked', false);
        }
        updateChartColors(); // Ensure chart colors are correct on initial load based on dark mode
    });

    // Helper to load group options into the dropdown (used by task modal)
    function loadGroupOptions() {
        taskGroupInput.empty();
        taskGroupInput.append('<option value="">--- Chọn nhóm ---</option>');

        if (groups.length === 0) {
            taskGroupInput.append('<option value="" disabled>Chưa có nhóm nào</option>');
            return;
        }

        groups.forEach(group => {
            taskGroupInput.append(`<option value="${group.id}">${group.name}</option>`);
        });
    }






    function checkForUpcomingTasks() {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Đặt giờ về 0 để so sánh chỉ ngày

        // Lấy tất cả các tác vụ
        const allTasks = [...tasks]; // Kết hợp tất cả tác vụ

        // Lọc các tác vụ có ngày bắt đầu hoặc ngày kết thúc trùng với ngày hiện tại
        const upcomingTasks = allTasks.filter(task => {
            const taskStartDate = task.startDate ? new Date(task.startDate) : null;
            const taskDueDate = task.dueDate ? new Date(task.dueDate) : null;

            return (taskStartDate && taskStartDate.toDateString() === today.toDateString()) ||
                (taskDueDate && taskDueDate.toDateString() === today.toDateString());
        });

        // Cập nhật số lượng thông báo
        const notificationCount = upcomingTasks.length;
        notificationCountBadge.text(notificationCount); // Cập nhật badge thông báo

        // Nếu có thông báo, thêm thông báo vào danh sách
        if (notificationCount > 0) {
            notificationList.empty(); // Xóa danh sách thông báo cũ
            upcomingTasks.forEach(task => {
                const taskMessage = `Tác vụ "${task.title}" đến hạn vào ngày ${formatDate(task.dueDate)}`;
                notificationList.append(`<li>${taskMessage}</li>`);
            });
        }
    }


    // Gọi hàm kiểm tra thông báo khi trang được tải
    checkForUpcomingTasks();
    // Gọi hàm kiểm tra thông báo khi người dùng nhấp vào nút "Lịch"
    calendarViewBtn.on('click', function() {
        calendarSection.show();
        renderCalendar(); // Render lịch
        checkForUpcomingTasks(); // Kiểm tra thông báo
    });

});
