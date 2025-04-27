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
    productPrice.textContent = productInfo.price * 23000;
    productBrand.textContent = productInfo.brand;
    console.log(productInfo.highlights);
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

// bat su kien cho nut mua ngay ---------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const buyNowButton = document.querySelector("#payment_btn");

  if (buyNowButton) {
    buyNowButton.addEventListener("click", () => {
      // kiem tra chua dang nhap khong duoc mua
      if (!localStorage.getItem("isLoggedIn")) {
        alert("Vui lòng đăng nhập trước khi xem giỏ hàng!");
        window.location.href = "../html/dangnhap.html";
      } else {
        // Chuyển  đến trang thanh toán
        alert("Bạn đã chọn 'Mua ngay'. Chuyển hướng đến trang giỏ hàng ...");
        window.location.href = "giohang.html";
      }
    });
  }
});
