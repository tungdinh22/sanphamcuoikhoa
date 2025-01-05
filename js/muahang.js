

document.addEventListener("DOMContentLoaded", () => {
    const buyNowButton = document.querySelector(".muangay");

    if (buyNowButton) {
        buyNowButton.addEventListener("click", () => {
            // Chuyển  đến trang thanh toán
            alert("Bạn đã chọn 'Mua ngay'. Chuyển hướng đến trang thanh toán...");
            window.location.href = "giohang.html"; 
        });
    }
});