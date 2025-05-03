import { getUserByEmail, updateUserCart } from "../dangnhap/user.entity.js";

function getImageUrl(product_name) {
  return `https://free-e-store-api.onrender.com/images/products/${product_name}`;
}

// load thong tin san pham --------------------------------------------
function loadProductInfo() {
  const productInfo = JSON.parse(localStorage.getItem("currentProduct"));

  if (productInfo) {
    // lay cac element de hien thi thong tin san pham (tu html)
    const productImage = document.querySelector("#product_image");
    const productName = document.querySelector("#product_name");
    const productPrice = document.querySelector("#product_price");
    const productBrand = document.querySelector("#product_brand");
    const productHighlight = document.querySelector("#product_highlight");

    productImage.src = getImageUrl(productInfo.images[1]);
    productName.textContent = productInfo.name.toUpperCase();
    productPrice.textContent = formatVND(productInfo.price * 25000);
    productBrand.textContent = productInfo.brand;
    productHighlight.innerHTML = productInfo.highlights.join("<br>");
  } else {
    // Nếu không có thông tin sản phẩm, chuyển hướng về trang chủ
    alert("Không tìm thấy thông tin sản phẩm. Chuyển hướng về trang chủ...");
    window.location.href = "../index.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadProductInfo();
});

// Format number as VND currency
function formatVND(amount) {
    if (isNaN(amount)) return "0 ₫";
    return Number(amount).toLocaleString("vi-VN") + " ₫";
  }
  

// bat su kien cho nut mua ngay ---------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const buyNowButton = document.querySelector("#payment_btn");

  if (buyNowButton) {
    buyNowButton.addEventListener("click", async () => {
      // kiem tra chua dang nhap khong duoc mua
      if (!localStorage.getItem("currentUser")) {
        alert("Vui lòng đăng nhập trước khi xem giỏ hàng!");
        window.location.href = "../html/dangnhap.html";
      } else {
        await addCurrentProductInCart();
        //   chuyen den trang gio hang
        alert("Chuyển hướng đến trang giỏ hàng ...");
        window.location.href = "giohang.html";
      }
    });
  }
});

async function addCurrentProductInCart() {
  // lay gio hang cu cua nguoi dung => them vao
  const currentEmail = localStorage.getItem("currentUser");
  const user = await getUserByEmail(currentEmail); // lay user thong qua email luu trong local storage
  const productInfo = JSON.parse(localStorage.getItem("currentProduct"));
  // lay lai gio hang cu trong user data
  const newCart = user.cart;
  // kiem tra neu san pham da co trong gio hang => khong them nua
  const duplicateItem = newCart.find(
    (productId) => productId == productInfo.id
  );
  if (!duplicateItem) {
    // theem san pham vao gio hang
    newCart.push(productInfo.id);
    // cap nhat len firestore
    await updateUserCart(currentEmail, newCart);
  }
}
