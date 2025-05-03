import { getProductById } from "../trangchu/main.js";
import { getUserByEmail, updateUserCart } from "../dangnhap/user.entity.js";

async function removeFromCart(productId) {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) return;

  const user = await getUserByEmail(currentUser);
  const currentCart = user.cart;

  // Remove only the first match of the productId
  const updatedCart = currentCart.filter((id) => id != productId);
  await updateUserCart(currentUser, updatedCart);
  renderCart(); // Re-render the cart after update
}

// Render current user's cart
async function renderCart() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) return;

  const user = await getUserByEmail(currentUser);
  const cartList = user.cart;
  console.log(cartList);
  const tableBody = document.getElementById("cart-table");

  // Clear existing rows
  tableBody.innerHTML = "";

  //   neu chua co mon hang nao thi chuyen huong sang home => mua sam
  if (!cartList.length) {
    alert("Hien tai chua co hang trong gio, mua sam thoi nao!");
    location.href = "../index.html";
    return;
  }

  let totalCart = 0;
  cartList.forEach(async (productId) => {
    const row = document.createElement("tr");
    const product = await getProductById(productId);
    totalCart += product.price;

    row.innerHTML = `
        <td>${product.name}</td>
        <td>${formatVND(product.price * 25000)}</td>
        <td><button>x</button> </td>
      `;
    row.onclick = async (e) => {
      const del_btn = e.target;
      if (del_btn.innerText == "x") {
        await removeFromCart(productId);
      }
    };
    tableBody.appendChild(row);
    renderTotalCart(totalCart);
  });
}

renderCart();

// tinh tong gio hang
function renderTotalCart(total) {
  document.getElementById("total").innerText = formatVND(total * 25000);
}

function formatVND(amount) {
  if (isNaN(amount)) return "0 ₫";
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
}

// Chuyen trang thanh toan --------------------------------
document
  .getElementById("checkout_btn")
  .addEventListener("click", async function () {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) return;

    const user = await getUserByEmail(currentUser);
    const cartList = user.cart;
    // luu tam gia tri tong don hang
    const totalCart = document.getElementById("total").innerText;
    localStorage.setItem(
      "currentCart",
      JSON.stringify({ cart: cartList, total: totalCart })
    );
    // chuyen trang
    location.href = "./payment.html";
  });
