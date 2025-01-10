// kiem tra xem co dang nhap chua -------------------------------------------
if (localStorage.getItem("isLoggedIn")) {
  document.getElementById("account").textContent = "Order History";
  document.getElementById("account").href = "../html/lichsumuahang.html";
} else {
  document.getElementById("account").textContent = "Login";
  document.getElementById("account").href = "../html/dangnhap.html";
  //   khong cho click vao cart khi chua dang nhap
  document.getElementById("cart").addEventListener("click", (event) => {
    event.preventDefault();
    alert("Vui lòng đăng nhập trước khi xem giỏ hàng!");
    window.location.href = "../html/dangnhap.html";
  });

  //   khong cho click vao "payment - mua ngay" khi chua dang nhap
  document.getElementById("payment_btn").addEventListener("click", (event) => {
    event.preventDefault();
    alert("Vui lòng đăng nhập trước khi xem giỏ hàng!");
    window.location.href = "../html/dangnhap.html";
  });
}
