import { updateUserCart } from "../dangnhap/user.entity.js";
import { addOrder } from "../lichsu/order.entity.js";

document
  .getElementById("checkout-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Ngăn gửi form mặc định

    const name = document.getElementById("nameoncard").value.trim();
    const cardNumber = document.getElementById("creditcard").value.trim();
    const month = document.getElementById("expMonth").value;
    const year = document.getElementById("expYear").value;
    const cvv = document.getElementById("cvv").value.trim();

    // Kiểm tra các trường bắt buộc
    if (
      !name ||
      !cardNumber ||
      !month ||
      !year ||
      !cvv ||
      month === "Choose month" ||
      year === "Choose year"
    ) {
      alert("Vui lòng điền đầy đủ thông tin thanh toán!");
      return;
    }

    // Kiểm tra số thẻ phải là 16 chữ số
    const cardRegex = /^\d{16}$/;
    if (!cardRegex.test(cardNumber)) {
      alert("Số thẻ không hợp lệ. Phải gồm 16 chữ số.");
      return;
    }

    // Kiểm tra CVV là 3 hoặc 4 chữ số
    const cvvRegex = /^\d{3,4}$/;
    if (!cvvRegex.test(cvv)) {
      alert("CVV không hợp lệ. Phải gồm 3 hoặc 4 chữ số.");
      return;
    }

    // thanh toan thanh cong --------------------------------------
    // lay du lieu email
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) return;
    // lay du lieu cart
    const currentCart = JSON.parse(localStorage.getItem("currentCart"));
    if (!currentCart) return;

    // xoa du lieu gio hang (lam moi)
    await updateUserCart(currentUser, []);

    // cap nhat lich su mua hang -> new order
    const total = currentCart.total;
    const qty = currentCart.cart.length;
    await addOrder(currentUser, total, qty);

    // xoa du lieu local storage
    localStorage.removeItem("currentCart");
    localStorage.removeItem("currentProduct");
    //chuyển trang
    alert("Thanh toán thành công!");
    window.location.href = "../html/lichsumuahang.html";
  });
