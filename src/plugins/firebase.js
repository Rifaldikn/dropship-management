// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field

const firebaseConfig = {
  apiKey: "AIzaSyAO1AgDGcgTv0oDkWnlgnuDAYBV5nUWmEs",
  authDomain: "dropship-management.firebaseapp.com",
  databaseURL: "https://dropship-management.firebaseio.com",
  projectId: "dropship-management",
  storageBucket: "dropship-management.appspot.com",
  messagingSenderId: "1023775929387",
  appId: "1:1023775929387:web:ff6e639cb34d99b67d266e",
  measurementId: "G-678VFEW6DD",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const customersCollection = db.collection("customers");
const productsCollection = db.collection("products");
const ordersCollection = db.collection("orders");
const suppliersCollection = db.collection("suppliers")

// Get a reference to the storage service, which is used to create references in your storage bucket
// const storage = firebasefirebase.storage().ref();.storage(
//   "https://console.firebase.google.com/project/dropship-management/storage/dropship-management.appspot.com/files"
// );
const storage = firebase.storage();

// export utils/refs
export {
  db,
  auth,
  customersCollection,
  productsCollection,
  ordersCollection,
  suppliersCollection,
  storage,
};
