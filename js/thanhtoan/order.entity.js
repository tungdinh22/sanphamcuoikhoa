import { getUserByEmail, updateUserOrders } from "../login/user.entity.js";

// Order constructor
export default function Order(
  index,
  currentUserEmail,
  email,
  fullname,
  phone,
  address,
  paymentMethod,
  note = "",
  shipping = 30000,
  cart,
  status = "pending"
) {
  this.index = index;
  this.email = email;
  this.fullname = fullname;
  this.phone = phone;
  this.address = address;
  this.paymentMethod = paymentMethod;
  this.note = note;
  this.shipping = shipping;
  this.cart = cart;
  this.createdAt = Date.now(); // serverTimestamp() is not available in this context
  this.createdBy = currentUserEmail;
  this.status = status;

  // khong luu tru trong DB bang object truc tiep => json
  this.toJSON = function () {
    return {
      index: this.index,
      email: this.email,
      fullname: this.fullname,
      phone: this.phone,
      address: this.address,
      paymentMethod: this.paymentMethod,
      note: this.note,
      shipping: this.shipping,
      cart: this.cart,
      createdAt: this.createdAt,
      createdBy: this.createdBy,
      status: this.status,
    };
  };

  return this;
}

// Local cache
let orders = [];

// Get orders from Firestore for a given user
export async function getOrders(email) {
  const user = await getUserByEmail(email);
  orders = user.orders || [];
  console.log(orders); // Log the orders for debugging
  return orders;
}

// Add a new order
export async function addOrder(
  currentUserEmail,
  email,
  fullname,
  phone,
  address,
  paymentMethod,
  note = "",
  shipping = 30000,
  cart
) {
  const user = await getUserByEmail(currentUserEmail);
  const currentOrders = user.orders || [];

  const newOrder = new Order(
    currentOrders.length,
    currentUserEmail,
    email,
    fullname,
    phone,
    address,
    paymentMethod,
    note,
    shipping,
    cart
  );

  currentOrders.push(newOrder.toJSON());
  console.log(orders); // Log the orders for debugging

  try {
    await updateUserOrders(currentUserEmail, orders); // use email as ID
    console.log("New order added.");
  } catch (error) {
    console.error("Error adding new order: ", error);
  }
}

// Update order status
export async function updateOrderStatus(email, index, newStatus) {
  const user = await getUserByEmail(email);
  const currentOrders = user.orders || [];

  const updatedOrders = currentOrders.map((order) => {
    if (order.index === index) {
      order.status = newStatus;
    }
    return order;
  });

  orders = updatedOrders;

  try {
    await updateUserOrders(email, updatedOrders); // ✅ use email as ID
    console.log(`Order #${index} status updated to ${newStatus}.`);
  } catch (error) {
    console.error("Error updating order status: ", error);
  }
}
