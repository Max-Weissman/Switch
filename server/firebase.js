
const { initializeApp } = require ("firebase/app");
const { getFirestore } = require ("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyB5Kz_RR8pWDmofMFiHUowGireZhwWflpA",
  authDomain: "switch-4d274.firebaseapp.com",
  projectId: "switch-4d274",
  storageBucket: "switch-4d274.appspot.com",
  messagingSenderId: "105911639580",
  appId: "1:105911639580:web:0e8a45456034acace289d9",
  measurementId: "G-LEJJ45ELHE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db