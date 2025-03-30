
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore-lite.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDpehRDNHro0jeECF61yJ-voE6ciqOj_AM",
    authDomain: "jsi31-tung.firebaseapp.com",
    databaseURL: "https://jsi31-tung-default-rtdb.firebaseio.com",
    projectId: "jsi31-tung",
    storageBucket: "jsi31-tung.firebasestorage.app",
    messagingSenderId: "87952887885",
    appId: "1:87952887885:web:a64637bbc211726f42cc04",
    measurementId: "G-VMD3RNB7QE"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  
// initialize firebase
export cost firebaseApp =await initializeApp(firebaseConfig);
  export const firestore = await getFirestore(firebaseApp);
  
