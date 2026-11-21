
import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

const registerForm = document.getElementById("registerForm");
const pesan = document.getElementById("pesan");

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

// Mempertahankan alamat tujuan ketika kembali ke login
const linkLogin = document.querySelector(".login-link a");

if (linkLogin && redirect) {
    linkLogin.href = "login.html?redirect=" +
        encodeURIComponent(redirect);
}

registerForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const konfirmasiPassword =
        document.getElementById("konfirmasiPassword").value;

    if (!nama || !email || !password || !konfirmasiPassword) {
        pesan.textContent = "Semua kolom harus diisi!";
        pesan.style.color = "red";
        return;
    }

    if (password !== konfirmasiPassword) {
        pesan.textContent = "Konfirmasi password tidak cocok!";
        pesan.style.color = "red";
        return;
    }

    if (password.length < 6) {
        pesan.textContent = "Password minimal 6 karakter!";
        pesan.style.color = "red";
        return;
    }

    try {
        pesan.textContent = "Sedang membuat akun...";
        pesan.style.color = "#bd7898";

        const hasil = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await updateProfile(hasil.user, {
            displayName: nama
        });

        await setDoc(doc(db, "users", hasil.user.uid), {
            nama: nama,
            email: email,
            role: "user",
            dibuatPada: serverTimestamp()
        });

        pesan.textContent = "Pendaftaran berhasil!";
        pesan.style.color = "green";

        setTimeout(() => {
            window.location.href = halamanTujuan();
        }, 1000);

    } catch (error) {
        console.error("Kesalahan pendaftaran:", error);

        if (error.code === "auth/email-already-in-use") {
            pesan.textContent = "Email sudah terdaftar!";
        } else if (error.code === "auth/invalid-email") {
            pesan.textContent = "Format email tidak valid!";
        } else if (error.code === "auth/weak-password") {
            pesan.textContent = "Password terlalu lemah!";
        } else {
            pesan.textContent = "Pendaftaran gagal. Coba lagi.";
        }

        pesan.style.color = "red";
    }
});
