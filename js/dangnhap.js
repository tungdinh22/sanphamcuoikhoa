// Chức năng chuyển giữa  đăng nhập và đăng ký --------------------------------
function showSignup() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
}

function showLogin() {
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

// Chức năng xử lý đăng nhập ----------------------------------------------
document.getElementById("login").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    
    // Kiểm tra tài khoản 
    if (username === "tung" && password === "123456789") {
        alert("Đăng nhập thành công!");
        localStorage.setItem("isLoggedIn", true);
        // chuyển hướng 
        window.location.href = "../index.html";
    } else {
        alert("Tên đăng nhập hoặc mật khẩu sai!");
    }
});

// xử lý đăng ký ---------------------------------------------------------
document.getElementById("signup").addEventListener("submit", function(event) {
    event.preventDefault();

    const signupUsername = document.getElementById("signup-username").value;
    const signupPassword = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    
    if (signupPassword !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }
    
    // Kiểm tra điều kiện đăng ký 
    if (signupUsername && signupPassword) {
        alert("Đăng ký thành công!");
        showLogin(); // Quay lại  đăng nhập sau khi đăng ký xong
    } else {
        alert("Vui lòng điền đầy đủ thông tin!");
    }
});