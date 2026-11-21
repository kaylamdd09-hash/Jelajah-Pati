
import { auth, db } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

const loginForm = document.getElementById("loginForm");
const pesan = document.getElementById("pesan");

// =====================================
// FITUR TAMPIL / SEMBUNYIKAN PASSWORD
// =====================================

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function() {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "🙈";
        togglePassword.setAttribute("aria-label", "Sembunyikan password");
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "👁";
        togglePassword.setAttribute("aria-label", "Tampilkan password");
    }

});

// Mengambil alamat halaman tujuan
const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect");

// Memastikan alamat tujuan berasal dari website sendiri
function halamanTujuan() {
    if (!redirect) return "index.html";

    try {
        const url = new URL(redirect);

        if (url.origin === window.location.origin &&
            !["/login.html", "/register.html"].includes(url.pathname)) {
            return url.href;
        }
    } catch (error) {
        console.log("Alamat tujuan tidak valid.");
    }

    return "index.html";
}

// Mempertahankan alamat tujuan ketika pengguna memilih daftar
const linkDaftar = document.querySelector(".register-link a");

if (linkDaftar && redirect) {
    linkDaftar.href = "register.html?redirect=" +
        encodeURIComponent(redirect);
}

loginForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        pesan.textContent = "Sedang masuk...";
        pesan.style.color = "#bd7898";

        const hasil = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const userRef = doc(db, "users", hasil.user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            pesan.textContent = "Data akun tidak ditemukan.";
            pesan.style.color = "red";
            return;
        }

        const dataUser = userSnap.data();

        pesan.textContent = "Login berhasil!";
        pesan.style.color = "green";

        setTimeout(() => {
            if (dataUser.role === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = halamanTujuan();
            }
        }, 1000);

    } catch (error) {
        console.error("Kesalahan login:", error);

        if (
            error.code === "auth/invalid-credential" ||
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
        ) {
            pesan.textContent = "Email atau password salah!";
        } else if (error.code === "auth/invalid-email") {
            pesan.textContent = "Format email tidak valid!";
        } else {
            pesan.textContent = "Login gagal. Silakan coba lagi.";
        }

        pesan.style.color = "red";
    }
});
