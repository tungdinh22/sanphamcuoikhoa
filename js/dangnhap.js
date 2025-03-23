// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpehRDNHro0jeECF61yJ-voE6ciqOj_AM",
  authDomain: "jsi31-tung.firebaseapp.com",
  databaseURL: "https://jsi31-tung-default-rtdb.firebaseio.com",
  projectId: "jsi31-tung",
  storageBucket: "jsi31-tung.firebasestorage.app",
  messagingSenderId: "87952887885",
  appId: "1:87952887885:web:a64637bbc211726f42cc04",
  measurementId: "G-VMD3RNB7QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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

    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        console.log("Đăng nhập với:", email, password);
        alert("Đăng nhập thành công!");
        // Thêm xử lý đăng nhập thực tế ở đây (API, Firebase, v.v.)
    });

    document.getElementById("signup-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("signup-username").value;
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (!username || !password || !confirmPassword) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        console.log("Đăng ký với:", username, password);
        alert("Đăng ký thành công!");
        showLogin(); // Chuyển về trang đăng nhập sau khi đăng ký
    });
});