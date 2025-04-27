import { getUserByEmail, updateUserCart } from "../login/user.entity.js";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  query,
  serverTimestamp,
  where,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore-lite.js";
import { firestore } from "../home/firebase.js";

export default function CartItem(productId, quantity) {
  this.productId = productId;
  this.quantity = quantity;
  return this;
}

let cart = [
  { productId: 1, quantity: 2 },
  { productId: 2, quantity: 3 },
]; // khoi tao gio hang rong
export async function getCart(email) {
  const user = await getUserByEmail(email);
  cart = user.cart || []; // neu khong co cart thi khoi tao cart rong
  return cart;
}

// kiem tra gio hang trung san pham ben code JS add_to_cart.js
export async function addCartItem(productId, quantity) {
  // tao object cart theo cau truc nay
  const cartData = {
    productId,
    quantity,
    createdAt: serverTimestamp(),
  };
  cart.push(cartData); // them san pham vao gio hang
  //   cap nhat gio hang vao Firebase
  updateUserCart(email, cart).catch((error) => {
    console.error("Error updating user cart: ", error);
  });
}

export async function updateCartItem(productId, quantity) {
  //   kiem item trung id de update so luong moi
  cart.forEach((item) => {
    if (item.productId === productId) {
      item.quantity = quantity;
    }
  });
  //   cap nhat gio hang vao Firebase
  updateUserCart(email, cart).catch((error) => {
    console.error("Error updating user cart: ", error);
  });
}

export function removeCartItem(productId) {
  //   kiem item trung id de xoa object trong danh sach JS
  cart = cart.filter((item) => item.productId !== productId);
  // cap nhat gio hang vao Firebase
  updateUserCart(email, cart).catch((error) => {
    console.error("Error updating user cart: ", error);
  });
}
