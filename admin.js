
/* =====================================
   1. IMPORT FIREBASE
===================================== */

import { auth, db } from "./js/firebase.js";

import {
    onAuthStateChanged,
    signOut,
    getIdTokenResult
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

import {
    collection,
    getDocs,
    doc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";


/* =====================================
   2. MENGAMBIL ELEMEN HTML
===================================== */

const adminEmail = document.getElementById("adminEmail");
const pesanAdmin = document.getElementById("pesanAdmin");

const totalPengguna = document.getElementById("totalPengguna");
const totalUlasan = document.getElementById("totalUlasan");

const tabelUlasan = document.getElementById("tabelUlasan");
const tabelPengguna = document.getElementById("tabelPengguna");

const logoutBtn = document.getElementById("logoutBtn");

const halamanDashboard = document.getElementById("halamanDashboard");
const halamanUlasan = document.getElementById("halamanUlasan");
const halamanPengguna = document.getElementById("halamanPengguna");

const judulHalaman = document.getElementById("judulHalaman");

const menuItems = document.querySelectorAll(".menu-item");

const aksesUlasan = document.getElementById("aksesUlasan");
const aksesPengguna = document.getElementById("aksesPengguna");

const aktivitasTerbaru = document.getElementById("aktivitasTerbaru");


/* =====================================
   3. MENAMPILKAN PESAN
===================================== */

function tampilkanPesan(pesan, warna = "red") {

    pesanAdmin.textContent = pesan;
    pesanAdmin.style.color = warna;

}


/* =====================================
   4. NAVIGASI MENU ADMIN
===================================== */

function tampilkanHalaman(menu) {

    halamanDashboard.hidden = menu !== "dashboard";
    halamanUlasan.hidden = menu !== "ulasan";
    halamanPengguna.hidden = menu !== "pengguna";

    menuItems.forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.menu === menu
        );

    });

    const judul = {
        dashboard: "Dashboard",
        ulasan: "Data Ulasan",
        pengguna: "Data Pengguna"
    };

    judulHalaman.textContent = judul[menu];

}


// Navigasi dari sidebar

menuItems.forEach(item => {

    item.addEventListener("click", function(e) {

        e.preventDefault();

        tampilkanHalaman(this.dataset.menu);

    });

});


// Navigasi dari Akses Cepat

aksesUlasan.addEventListener("click", function() {

    tampilkanHalaman("ulasan");

});

aksesPengguna.addEventListener("click", function() {

    tampilkanHalaman("pengguna");

});


/* =====================================
   5. FORMAT TANGGAL
===================================== */

function formatTanggal(timestamp) {

    if (!timestamp) return "-";

    let tanggal;

    if (typeof timestamp.toDate === "function") {

        tanggal = timestamp.toDate();

    } else {

        tanggal = new Date(timestamp);

    }

    if (isNaN(tanggal.getTime())) return "-";

    return tanggal.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

}


/* =====================================
   6. MENGAMANKAN TEKS HTML
===================================== */

function escapeHTML(teks) {

    return String(teks ?? "").replace(/[&<>"']/g, karakter => {

        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[karakter];

    });

}


/* =====================================
   7. AKTIVITAS TERBARU
===================================== */

function muatAktivitasTerbaru(daftarDokumen) {

    const daftarUlasan = [...daftarDokumen].sort((a, b) => {

        const tanggalA =
            a.data().dibuatPada?.toMillis?.() || 0;

        const tanggalB =
            b.data().dibuatPada?.toMillis?.() || 0;

        return tanggalB - tanggalA;

    }).slice(0, 5);


    if (daftarUlasan.length === 0) {

        aktivitasTerbaru.innerHTML = `
            <p class="aktivitas-kosong">
                Belum ada aktivitas ulasan.
            </p>
        `;

        return;
    }


    aktivitasTerbaru.innerHTML = daftarUlasan.map(dokumen => {

        const data = dokumen.data();

        return `
            <div class="aktivitas-item">

                <div class="aktivitas-icon">
                    ✎
                </div>

                <div class="aktivitas-detail">

                    <strong>
                        ${escapeHTML(data.nama || data.email || "Pengguna")}
                    </strong>

                    <p>
                        Memberikan ulasan untuk
                        ${escapeHTML(data.namaWisata || "objek")}
                    </p>

                    <p>
                        Rating: ${escapeHTML(data.rating || "-")} ⭐
                    </p>

                    <div class="aktivitas-tanggal">
                        ${escapeHTML(formatTanggal(data.dibuatPada))}
                    </div>

                </div>

            </div>
        `;

    }).join("");

}


/* =====================================
   8. MENAMPILKAN DATA ULASAN
===================================== */

async function muatUlasan() {

    tabelUlasan.innerHTML = `
        <tr>
            <td colspan="6">Memuat data ulasan...</td>
        </tr>
    `;

    try {

        const hasil = await getDocs(
            collection(db, "reviews")
        );

        totalUlasan.textContent = hasil.size;

        // Memperbarui aktivitas terbaru
        muatAktivitasTerbaru(hasil.docs);


        if (hasil.empty) {

            tabelUlasan.innerHTML = `
                <tr>
                    <td colspan="6">Belum ada ulasan.</td>
                </tr>
            `;

            return;
        }


        tabelUlasan.innerHTML = hasil.docs.map((dokumen, index) => {

            const data = dokumen.data();

            return `
                <tr>

                    <td>${index + 1}</td>

                    <td>
                        ${escapeHTML(data.nama || data.email || "-")}
                    </td>

                    <td>
                        ${escapeHTML(data.namaWisata || "-")}
                    </td>

                    <td>
                        ${escapeHTML(data.rating || "-")} ⭐
                    </td>

                    <td>
                        ${escapeHTML(data.komentar || "-")}
                    </td>

                    <td>

                        <button
                            type="button"
                            class="hapus-btn"
                            data-id="${escapeHTML(dokumen.id)}"
                        >
                            Hapus
                        </button>

                    </td>

                </tr>
            `;

        }).join("");


    } catch (error) {

        console.error("Gagal mengambil ulasan:", error);

        tabelUlasan.innerHTML = `
            <tr>
                <td colspan="6">
                    Gagal memuat data ulasan.
                </td>
            </tr>
        `;

    }

}


/* =====================================
   9. MENGHAPUS ULASAN
===================================== */

tabelUlasan.addEventListener("click", async function(e) {

    const tombol = e.target.closest(".hapus-btn");

    if (!tombol) return;

    const idUlasan = tombol.dataset.id;

    const konfirmasi = confirm(
        "Apakah kamu yakin ingin menghapus ulasan ini?"
    );

    if (!konfirmasi) return;


    try {

        tombol.disabled = true;
        tombol.textContent = "Menghapus...";

        await deleteDoc(
            doc(db, "reviews", idUlasan)
        );

        tampilkanPesan(
            "Ulasan berhasil dihapus.",
            "green"
        );

        await muatUlasan();


    } catch (error) {

        console.error("Gagal menghapus ulasan:", error);

        tampilkanPesan(
            "Gagal menghapus ulasan. Periksa hak akses Admin."
        );

        tombol.disabled = false;
        tombol.textContent = "Hapus";

    }

});


/* =====================================
   10. MENAMPILKAN DATA PENGGUNA
===================================== */

async function muatPengguna() {

    tabelPengguna.innerHTML = `
        <tr>
            <td colspan="4">Memuat data pengguna...</td>
        </tr>
    `;

    try {

        const hasil = await getDocs(
            collection(db, "users")
        );

        totalPengguna.textContent = hasil.size;


        if (hasil.empty) {

            tabelPengguna.innerHTML = `
                <tr>
                    <td colspan="4">Belum ada pengguna.</td>
                </tr>
            `;

            return;
        }


        tabelPengguna.innerHTML = hasil.docs.map((dokumen, index) => {

            const data = dokumen.data();

            return `
                <tr>

                    <td>${index + 1}</td>

                    <td>
                        ${escapeHTML(data.nama || "-")}
                    </td>

                    <td>
                        ${escapeHTML(data.email || "-")}
                    </td>

                    <td>
                        ${escapeHTML(data.role || "user")}
                    </td>

                </tr>
            `;

        }).join("");


    } catch (error) {

        console.error("Gagal mengambil pengguna:", error);

        tabelPengguna.innerHTML = `
            <tr>
                <td colspan="4">
                    Gagal memuat data pengguna.
                </td>
            </tr>
        `;

    }

}


/* =====================================
   11. MEMUAT DATA DASHBOARD
===================================== */

async function muatDashboard() {

    await Promise.all([
        muatUlasan(),
        muatPengguna()
    ]);

}


/* =====================================
   12. MEMERIKSA LOGIN DAN HAK ADMIN
===================================== */

onAuthStateChanged(auth, async function(user) {

    if (!user) {

        window.location.replace("login.html");

        return;
    }


    try {

        const tokenResult = await getIdTokenResult(user, true);


        // Memeriksa Custom Claims Admin

        if (tokenResult.claims.admin !== true) {

            alert("Kamu tidak memiliki akses sebagai Admin.");

            await signOut(auth);

            window.location.replace("login.html");

            return;
        }


        // Menampilkan email Admin

        adminEmail.textContent = user.email || "Admin";


        tampilkanPesan(
            "Dashboard berhasil dimuat.",
            "green"
        );


        // Memuat data website

        await muatDashboard();


    } catch (error) {

        console.error("Pemeriksaan Admin gagal:", error);

        tampilkanPesan(
            "Gagal memeriksa hak akses atau memuat dashboard."
        );

    }

});


/* =====================================
   13. LOGOUT ADMIN
===================================== */

logoutBtn.addEventListener("click", async function() {

    const konfirmasi = confirm(
        "Apakah kamu yakin ingin logout?"
    );

    if (!konfirmasi) return;


    try {

        await signOut(auth);

        window.location.replace("login.html");


    } catch (error) {

        console.error("Gagal logout:", error);

        tampilkanPesan(
            "Gagal logout. Silakan coba lagi."
        );

    }

});
