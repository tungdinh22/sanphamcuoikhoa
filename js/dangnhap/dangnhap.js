import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { addUser, getUserByEmail } from "./user.entity.js";
const auth = getAuth();
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  function showSignup() {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  }

  function showLogin() {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  }

  window.showSignup = showSignup;
  window.showLogin = showLogin;

  // ==== ĐĂNG NHẬP ====
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Đăng nhập thành công!");
        localStorage.setItem("currentUser",email);
        location.href = "../index.html";
      } catch (err) {
        console.error(err);
        alert("Sai tài khoản hoặc mật khẩu!");
      }
  });

  // ==== ĐĂNG KÝ ====
  signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();

    if (!email  || !password || !confirmPassword) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await addUser(email); // Ghi thêm dữ liệu Firestore
        alert("Đăng ký thành công!");
        showLogin();
      } catch (err) {
        console.error(err);
        alert("Email đã được sử dụng hoặc có lỗi xảy ra!");
      }
  });
});
