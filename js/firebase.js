
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCa866PSb1wCgTHpuLL5S76t8XG9o57ni8",
    authDomain: "jelajah-pati.firebaseapp.com",
    projectId: "jelajah-pati",
    storageBucket: "jelajah-pati.firebasestorage.app",
    messagingSenderId: "530280895077",
    appId: "1:530280895077:web:03b3007aeac98e8933ec8c"
};

// Menghubungkan aplikasi dengan Firebase
const app = initializeApp(firebaseConfig);

// Mengaktifkan Firebase Authentication
export const auth = getAuth(app);

// Menghubungkan Cloud Firestore
export const db = getFirestore(app);
