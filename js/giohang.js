let cart = [
    { name: 'Điện thoại', price: 200000, quantity: 1 },
    { name: 'Laptop', price: 300000, quantity: 2 },
    { name: 'Màn Hình', price: 500000, quantity: 1 }
];

// Hiển thị giỏ hàng
function displayCart() {
    const cartTable = document.querySelector("#cart tbody");
    cartTable.innerHTML = ''; // Xóa các hàng cũ

    let total = 0;

    cart.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price.toLocaleString()} VND</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            </td>
            <td>${(item.price * item.quantity).toLocaleString()} VND</td>
            <td><button onclick="removeItem(${index})">Xóa</button></td>
        `;

        cartTable.appendChild(row);

        total += item.price * item.quantity;
    });

    document.getElementById("total").textContent = total.toLocaleString();
}

// Cập nhật số lượng sản phẩm
function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    displayCart();
}

// Xóa sản phẩm khỏi giỏ hàng
function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}

// Hàm thanh toán
function checkout() {
    alert('Cảm ơn bạn đã mua hàng!');
    cart = [];  // Xóa giỏ hàng
    displayCart();
}

// Hiển thị giỏ hàng khi tải trang
window.onload = displayCart;
