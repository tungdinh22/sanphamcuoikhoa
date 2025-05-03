import { firestore } from "../firebase.js";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore-lite.js";

///////////////////////////////////////////////////////
// ORDER MODEL & FUNCTIONS
///////////////////////////////////////////////////////

// Constructor for simplified order record
export function Order(email, total, qty) {
  this.created_by = email;
  this.created_at = new Date().toISOString();
  this.total = total;
  this.qty = qty;
  return { ...this };
}

// Add a new order record
export async function addOrder(email, total, qty) {
  const orderRef = collection(firestore, "order_history");
  const orderData = new Order(email, total, qty);

  try {
    const docRef = await addDoc(orderRef, orderData);
    const orderId = docRef.id;

    // Update with order_id (Firestore doc ID)
    await setDoc(docRef, { ...orderData, order_id: orderId });

    console.log("Order added with ID:", orderId);
  } catch (error) {
    console.error("Error adding order: ", error);
  }
}

// Get all orders by user
export async function getOrderHistoryByEmail(email) {
  const q = query(
    collection(firestore, "order_history"),
    where("created_by", "==", email)
  );
  const querySnapshot = await getDocs(q);

  const historyList = [];
  querySnapshot.forEach((docSnap) => {
    historyList.push({ id: docSnap.id, ...docSnap.data() });
  });

  return historyList;
}

// Get all orders (admin use)
export async function getAllOrderHistory() {
  const colRef = collection(firestore, "order_history");
  const snapshot = await getDocs(colRef);

  const historyList = [];
  snapshot.forEach((docSnap) => {
    historyList.push({ id: docSnap.id, ...docSnap.data() });
  });

  console.log("All order history:", historyList);
}
