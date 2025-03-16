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
    if (username === "tung28" && password === "123456789") {
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