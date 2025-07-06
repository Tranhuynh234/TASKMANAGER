<?php
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: ../html/signin.html?error=not_logged_in");
    exit();
}
$user = $_SESSION['user'];
?>

<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Trang cá nhân - Quản lý công việc</title>
  <link rel="stylesheet" href="../css/user.css"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
</head>
<body>
  <div class="container">
    <aside class="sidebar">
      <div class="avatar-box">
        <img id="profile-img" src="<?= $user['avatar'] ? '../uploads/' . $user['avatar'] : '../images/avatar.jpg' ?>" alt="Avatar" class="avatar"/>
        <h2 id="profile-name"><?= htmlspecialchars($user['name']) ?></h2>
      </div>
      <nav class="nav-menu">
        <a href="#" class="active"><i class="fas fa-user"></i> Thông tin cá nhân</a>
        <a href="#"><i class="fas fa-users"></i> Nhóm</a>
        <a href="#"><i class="fas fa-chart-bar"></i> Bảng thống kê</a>
        <a href="../php/logout.php"><i class="fas fa-sign-out-alt"></i> Đăng xuất</a>
      </nav>
    </aside>

    <main class="main-content">
      <section class="content-section">
        <h1 class="section-title">Thông tin cá nhân</h1>
        <div class="info-box">
          <div class="profile-section">
            <h3>Profile Photo</h3>
            <div class="profile-photo">
              <img id="profile-img-preview" src="<?= $user['avatar'] ? '../uploads/' . $user['avatar'] : '../images/avatar.jpg' ?>" alt="Avatar Preview" />
              <div class="photo-actions">
                <form action="upload_avatar.php" method="POST" enctype="multipart/form-data">
                  <input type="file" name="avatar" required />
                  <button type="submit">Thay ảnh</button>
                </form>
              </div>
            </div>

            <div class="info-row">
              <label>Name</label>
              <span><?= htmlspecialchars($user['name']) ?></span>
            </div>

            <div class="info-row">
              <label>Email address</label>
              <span><?= htmlspecialchars($user['email']) ?></span>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</body>
</html>