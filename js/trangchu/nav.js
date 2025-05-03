document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser");

  const accountLink = document.getElementById("account");
  const cartBtn = document.getElementById("cart");
  const logoutBtn = document.getElementById("logout");
  const loginBtn = document.getElementById("login");
  const paymentBtn = document.getElementById("payment_btn");

  if (currentUser) {
    // ✅ Đã đăng nhập
    accountLink.textContent = "Order History";
    accountLink.href = "../html/lichsumuahang.html";

    cartBtn.style.display = "inline-block";
    logoutBtn.style.display = "inline-block";
    if (loginBtn) loginBtn.style.display = "none";

    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      alert("Bạn đã đăng xuất.");
      location.reload();
    });
  } else {
    // ❌ Chưa đăng nhập
    accountLink.textContent = "Login";
    accountLink.href = "../html/dangnhap.html";

    cartBtn.style.display = "none";
    logoutBtn.style.display = "none";
    if (loginBtn) loginBtn.style.display = "inline-block";

    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Vui lòng đăng nhập trước khi xem giỏ hàng!");
      location.href = "../html/dangnhap.html";
    });

    if (paymentBtn) {
      paymentBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Vui lòng đăng nhập trước khi thanh toán!");
        location.href = "../html/dangnhap.html";
      });
    }
  }
});
