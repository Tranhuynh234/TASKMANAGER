<?php
session_start();
require_once 'config.php'; // Include configuration

// Clear all session variables
$_SESSION = array();

// If the session cookie is used, delete it
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Destroy the session
session_destroy();

// Redirect to the sign-in page
header("Location: " . SIGNIN_PAGE);
exit();
?>