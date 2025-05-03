import { firestore } from "../firebase.js";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore-lite.js";

// User constructor
export default function User(email, cart = []) {
  this.email = email;
  this.cart = cart; // only product IDs
  return this;
}

// Local cache
let users = [];

// Get all users
export async function getUserList() {
  const usersRef = collection(firestore, "users");
  const querySnapshot = await getDocs(usersRef);
  users = []; // clear cache

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const userObject = new User(data.email, data.cart || []);
    users.push(userObject);
  });

  console.log(users);
}

// Add new user (with optional initial cart)
export async function addUser(email, cart = []) {
  const usersRef = collection(firestore, "users");
  const userData = new User(email, cart);

  try {
    await addDoc(usersRef, userData);
    console.log(`User ${email} created.`);
  } catch (error) {
    console.error("Error adding user: ", error);
  }
}

// Get a user by email (with document ID)
export async function getUserByEmail(email) {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docSnap = querySnapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.log("No such user!");
    return null;
  }
}

// Update user cart (replace with new array of product IDs)
export async function updateUserCart(email, newCart) {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userRef = userDoc.ref;
    try {
      await setDoc(userRef, { cart: newCart }, { merge: true });
      console.log(`Cart updated for user ${email}.`);
    } catch (error) {
      console.error("Error updating cart: ", error);
    }
  } else {
    console.error(`User with email ${email} not found.`);
  }
}