
import { auth, db } from "./js/firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    serverTimestamp,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";


/* =========================================
   1. MENGAMBIL NAMA TEMPAT DARI URL
========================================= */

const parameterURL = new URLSearchParams(window.location.search);

const namaTempat = parameterURL.get("nama");


/* =========================================
   2. DATA TEMPAT NONGKRONG
========================================= */

const dataNongkrong = {

    "Dama Coffee": {
        kategori: "Coffee Shop",
        lokasi: "Muktiharjo, Margorejo, Pati",
        gambar: "images/dama-coffee.jpg",

        deskripsi:
            "Dama Coffee merupakan salah satu pilihan tempat nongkrong di wilayah Muktiharjo, Margorejo, Pati. Tempat ini dapat menjadi pilihan bagi pengunjung yang ingin menikmati kopi sekaligus menghabiskan waktu bersama teman.",

        suasana:
            "Dama Coffee dapat menjadi tempat untuk menikmati waktu santai, berbincang, maupun sekadar melepas penat dari aktivitas sehari-hari.",

        dayaTarik:
            "Pengunjung dapat menikmati pilihan kopi dan menjadikan tempat ini sebagai salah satu tujuan untuk berkumpul bersama teman.",

        penutup:
            "Luangkan waktu sejenak dan nikmati suasana santai bersama orang-orang terdekat."
    },


    "Brotherhood Coffee": {
        kategori: "Coffee Shop",
        lokasi: "Kabupaten Pati",
        gambar: "images/brotherhood-coffee.jpeg",

        deskripsi:
            "Brotherhood Coffee merupakan salah satu tempat yang dapat dikunjungi untuk menikmati kopi di Kabupaten Pati. Tempat ini bisa menjadi pilihan untuk berkumpul dan menghabiskan waktu bersama teman.",

        suasana:
            "Tempat ini cocok dijadikan pilihan untuk mengobrol, bertukar cerita, dan menikmati waktu luang.",

        dayaTarik:
            "Pengunjung dapat menikmati kopi sambil menjadikan waktu berkumpul bersama teman terasa lebih menyenangkan.",

        penutup:
            "Terkadang, secangkir kopi dan obrolan sederhana menjadi cara menyenangkan untuk mengisi waktu."
    },


    "Funtriv Coffee Hub": {
        kategori: "Coffee Shop",
        lokasi: "Pati Wetan, Pati",
        gambar: "images/funtriv.jpg",

        deskripsi:
            "Funtriv Coffee Hub merupakan tempat nongkrong yang berada di kawasan Pati Wetan. Tempat ini menjadi salah satu pilihan untuk menikmati minuman dan menghabiskan waktu bersama teman.",

        suasana:
            "Funtriv Coffee Hub dapat menjadi tempat untuk bersantai dan menikmati waktu di sela-sela kesibukan.",

        dayaTarik:
            "Pengunjung dapat menjadikan tempat ini sebagai tujuan untuk menikmati minuman dan berbincang bersama teman.",

        penutup:
            "Jadikan waktu luangmu lebih berkesan dengan mengunjungi tempat yang nyaman untuk bersantai."
    },


    "Circa Cafe": {
        kategori: "Kafe & Eatery",
        lokasi: "Pati Lor, Pati",
        gambar: "images/circa-cafe.jpg",

        deskripsi:
            "Circa Cafe merupakan salah satu kafe di kawasan Pati Lor. Tempat ini dapat menjadi pilihan bagi pengunjung yang ingin menikmati makanan dan minuman dalam suasana santai.",

        suasana:
            "Kafe ini bisa dijadikan tempat untuk menghabiskan waktu bersama teman maupun menikmati waktu luang.",

        dayaTarik:
            "Salah satu hal yang bisa dinikmati di Circa Cafe adalah pilihan makanan dan minuman yang dapat menemani waktu bersantai.",

        penutup:
            "Temukan pengalaman bersantai yang menyenangkan di salah satu kafe pilihan di Pati."
    },


    "Selasar Coffee and Gelato": {
        kategori: "Kafe & Eatery",
        lokasi: "Muktiharjo, Margorejo, Pati",
        gambar: "images/selasar.jpg",

        deskripsi:
            "Selasar Coffee and Gelato merupakan tempat nongkrong yang menawarkan pilihan kopi dan gelato. Berlokasi di Muktiharjo, Margorejo, tempat ini dapat menjadi pilihan untuk menikmati waktu santai.",

        suasana:
            "Perpaduan pilihan minuman dan gelato dapat menemani waktu berkumpul maupun waktu santai bersama teman.",

        dayaTarik:
            "Kopi dan gelato menjadi daya tarik pilihan bagi pengunjung yang ingin menikmati sesuatu yang berbeda saat bersantai.",

        penutup:
            "Nikmati perpaduan kopi dan gelato untuk menemani waktu luangmu."
    },


    "Kopi Wolu": {
        kategori: "Coffee Shop",
        lokasi: "Pati Kidul, Pati",
        gambar: "images/kopi-wolu.jpg",

        deskripsi:
            "Kopi Wolu merupakan salah satu kedai kopi di kawasan Pati Kidul. Tempat ini dapat menjadi pilihan bagi pengunjung yang ingin menikmati kopi dan menghabiskan waktu bersama teman.",

        suasana:
            "Kopi Wolu bisa menjadi tempat untuk beristirahat sejenak, berbincang, dan menikmati waktu di luar aktivitas sehari-hari.",

        dayaTarik:
            "Pengunjung dapat menikmati kopi sebagai teman bersantai maupun saat berkumpul bersama teman.",

        penutup:
            "Temukan momen santai sederhana dengan menikmati kopi di Kopi Wolu."
    },


    "J Kopi": {
        kategori: "Coffee Shop",
        lokasi: "Kabupaten Pati",
        gambar: "images/j-kopi.jpeg",

        deskripsi:
            "J Kopi merupakan salah satu pilihan tempat untuk menikmati kopi di Kabupaten Pati. Tempat ini dapat dikunjungi saat ingin bersantai atau menghabiskan waktu bersama teman.",

        suasana:
            "J Kopi dapat menjadi pilihan untuk menikmati waktu luang dengan kegiatan sederhana seperti berbincang dan berkumpul.",

        dayaTarik:
            "Pilihan kopi menjadi hal yang dapat dinikmati oleh pengunjung yang ingin menghabiskan waktu di kedai kopi.",

        penutup:
            "Nikmati waktu santai dan obrolan menyenangkan bersama teman di J Kopi."
    },


    "HIKARI Café & Eatery": {
        kategori: "Kafe & Eatery",
        lokasi: "Jl. Tondonegoro No. 16, Pati",
        gambar: "images/hikari.jpg",

        deskripsi:
            "HIKARI Café & Eatery merupakan kafe dengan konsep modern bernuansa Jepang. Berlokasi di Jalan Tondonegoro, Pati, tempat ini menyediakan pilihan makanan dan minuman.",

        suasana:
            "Nuansa Jepang menjadi ciri konsep yang ditawarkan HIKARI Café & Eatery. Tempat ini dapat menjadi pilihan untuk bersantai maupun berkumpul.",

        dayaTarik:
            "Konsep bernuansa Jepang serta pilihan makanan dan minuman menjadi hal yang menarik untuk dikenali dari kafe ini.",

        penutup:
            "Kenali pengalaman nongkrong dengan nuansa Jepang di HIKARI Café & Eatery."
    },


    "Santé All Day": {
        kategori: "Kafe & Eatery",
        lokasi: "Jl. Pemuda No. 214, Pati",
        gambar: "images/sante-all-day.jpg",

        deskripsi:
            "Santé All Day merupakan tempat nongkrong di Jalan Pemuda, Pati. Tempat ini menawarkan pilihan makanan dan minuman serta dikenal dengan konsep art space.",

        suasana:
            "Konsep art space memberikan karakter tersendiri pada tempat ini. Pengunjung dapat menjadikannya pilihan untuk menikmati waktu santai.",

        dayaTarik:
            "Konsep art space serta pilihan makanan dan minuman menjadi bagian menarik dari Santé All Day.",

        penutup:
            "Bagi yang ingin mencari suasana nongkrong dengan sentuhan seni, Santé All Day bisa masuk daftar tempat yang ingin dikunjungi."
    },


    "Sinestesa": {
        kategori: "Coffee Shop",
        lokasi: "Muktiharjo, Margorejo, Pati",
        gambar: "images/sinestesa.jpg",

        deskripsi:
            "Sinestesa merupakan salah satu tempat untuk menikmati kopi di kawasan Muktiharjo, Margorejo, Pati. Tempat ini memiliki pilihan area indoor maupun outdoor.",

        suasana:
            "Adanya pilihan area indoor dan outdoor memberikan alternatif bagi pengunjung dalam menikmati waktu bersantai.",

        dayaTarik:
            "Pilihan area indoor dan outdoor serta pengalaman menikmati kopi menjadi daya tarik yang dapat dinikmati pengunjung.",

        penutup:
            "Pilih suasana yang kamu sukai dan nikmati waktu santai di Sinestesa."
    },


    "Mora Social Brew": {
        kategori: "Kafe & Eatery",
        lokasi: "Ngarus, Pati",
        gambar: "images/mora.jpg",

        deskripsi:
            "Mora Social Brew merupakan salah satu kafe yang berada di kawasan Ngarus, Pati. Tempat ini menyediakan pilihan makanan dan minuman untuk menemani waktu berkumpul.",

        suasana:
            "Mora Social Brew dapat menjadi pilihan tempat untuk menghabiskan waktu bersama teman maupun menikmati waktu luang.",

        dayaTarik:
            "Pilihan makanan dan minuman menjadi hal yang dapat dinikmati ketika berkunjung ke tempat ini.",

        penutup:
            "Jadikan Mora Social Brew sebagai salah satu tujuan untuk menikmati waktu bersama teman."
    },


    "Senara": {
        kategori: "Kafe & Eatery",
        lokasi: "Kabupaten Pati",
        gambar: "images/senara.jpg",

        deskripsi:
            "Senara merupakan salah satu pilihan tempat nongkrong di Kabupaten Pati. Tempat ini dapat menjadi alternatif bagi pengunjung yang ingin bersantai dan menghabiskan waktu bersama teman.",

        suasana:
            "Senara dapat dijadikan pilihan untuk menikmati waktu luang, berbincang, dan berkumpul bersama orang terdekat.",

        dayaTarik:
            "Pengalaman menghabiskan waktu bersama teman menjadi salah satu hal yang dapat dinikmati ketika berkunjung.",

        penutup:
            "Setiap tempat memiliki daya tariknya sendiri. Kenali Senara dan temukan suasana yang kamu sukai."
    },


    "Toko Kopi Saka": {
        kategori: "Coffee Shop",
        lokasi: "Kabupaten Pati",
        gambar: "images/tokokopi-saka.jpg",

        deskripsi:
            "Toko Kopi Saka merupakan salah satu pilihan tempat untuk menikmati kopi di Kabupaten Pati. Tempat ini dapat dikunjungi untuk mengisi waktu luang.",

        suasana:
            "Toko Kopi Saka bisa menjadi pilihan untuk menikmati waktu santai, baik sendiri maupun bersama teman.",

        dayaTarik:
            "Pengalaman menikmati kopi dan menghabiskan waktu di kedai kopi menjadi hal yang dapat dinikmati pengunjung.",

        penutup:
            "Nikmati waktu luang dengan suasana santai di Toko Kopi Saka."
    },


    "Arara Coffee & Co.": {
        kategori: "Coffee Shop",
        lokasi: "Jl. Diponegoro, Puri, Pati",
        gambar: "images/arara-coffee.jpg",

        deskripsi:
            "Arara Coffee & Co. merupakan coffee shop yang berada di kawasan Jalan Diponegoro, Puri, Pati. Tempat ini menyediakan pilihan kopi, minuman non-kopi, dan makanan.",

        suasana:
            "Pilihan menu yang beragam dapat menemani pengunjung saat ingin bersantai maupun berkumpul bersama teman.",

        dayaTarik:
            "Pilihan kopi, minuman non-kopi, dan makanan menjadi hal yang dapat dinikmati ketika berkunjung ke Arara Coffee & Co.",

        penutup:
            "Temukan pilihan minuman dan makanan untuk menemani waktu santaimu di Arara Coffee & Co."
    },


    "Kedai Sendika": {
        kategori: "Coffee Shop",
        lokasi: "Sarirejo, Pati",
        gambar: "images/kedai-sendika.jpg",

        deskripsi:
            "Kedai Sendika merupakan kedai kopi di kawasan Sarirejo, Pati. Tempat ini memiliki konsep coffee and book space yang menggabungkan pengalaman menikmati kopi dengan suasana membaca.",

        suasana:
            "Konsep coffee and book space memberikan pilihan suasana bagi pengunjung yang ingin menikmati waktu lebih santai sambil membaca.",

        dayaTarik:
            "Perpaduan konsep kedai kopi dan ruang membaca menjadi ciri menarik dari Kedai Sendika.",

        penutup:
            "Bagi pecinta kopi dan buku, konsep coffee and book space bisa menjadi pengalaman yang menarik untuk dicoba."
    },


    "Kaizen Coffee & Eatery": {
        kategori: "Kafe & Eatery",
        lokasi: "Jl. Dr. Setia Budi No. 24, Pati",
        gambar: "images/kaizen.jpg",

        deskripsi:
            "Kaizen Coffee & Eatery merupakan tempat nongkrong di Jalan Dr. Setia Budi, Pati. Tempat ini menyediakan pilihan kopi dan makanan untuk menemani waktu santai.",

        suasana:
            "Kaizen Coffee & Eatery dapat menjadi salah satu pilihan untuk menikmati waktu luang dan berkumpul bersama teman.",

        dayaTarik:
            "Pilihan kopi dan makanan menjadi hal yang dapat dinikmati oleh pengunjung ketika datang ke tempat ini.",

        penutup:
            "Nikmati waktu berkumpul dan pilihan sajian di Kaizen Coffee & Eatery."
    },


    "Tjoklat Djoeang": {
        kategori: "Coffee Shop",
        lokasi: "Jl. P. Sudirman No. 30, Pati",
        gambar: "images/tjoklat-djoeang.jpg",

        deskripsi:
            "Tjoklat Djoeang merupakan salah satu tempat nongkrong di Jalan P. Sudirman, Pati. Tempat ini menawarkan minuman kopi dan cokelat serta pilihan makanan ringan.",

        suasana:
            "Tempat ini dapat menjadi pilihan untuk menikmati minuman dan makanan ringan sambil menghabiskan waktu bersama teman.",

        dayaTarik:
            "Pilihan minuman kopi dan cokelat menjadi daya tarik yang dapat dinikmati oleh pengunjung.",

        penutup:
            "Untuk pencinta kopi maupun cokelat, Tjoklat Djoeang bisa menjadi salah satu tempat yang menarik untuk dikunjungi."
    },


    "Traffa Coffee n Eatery": {
        kategori: "Kafe & Eatery",
        lokasi: "Jl. Kembang Joyo, Pati",
        gambar: "images/traffa-coffee.jpeg",

        deskripsi:
            "Traffa Coffee n Eatery merupakan tempat nongkrong di Jalan Kembang Joyo, Pati. Tempat ini menyediakan pilihan kopi dan makanan untuk menemani waktu bersama teman.",

        suasana:
            "Traffa Coffee n Eatery dapat menjadi pilihan untuk bersantai, berbincang, dan menikmati waktu luang.",

        dayaTarik:
            "Pilihan kopi dan makanan menjadi bagian yang dapat dinikmati ketika berkunjung ke tempat ini.",

        penutup:
            "Isi waktu luangmu dengan menikmati kopi dan makanan bersama orang-orang terdekat."
    }

};


/* =========================================
   3. MENGAMBIL ELEMEN HTML
========================================= */

const detailCard = document.getElementById("detailCard");
const tidakDitemukan = document.getElementById("tidakDitemukan");

const detailGambar = document.getElementById("detailGambar");
const detailKategori = document.getElementById("detailKategori");
const detailNama = document.getElementById("detailNama");
const detailLokasi = document.getElementById("detailLokasi");
const detailDeskripsi = document.getElementById("detailDeskripsi");
const detailDeskripsiLengkap = document.getElementById("detailDeskripsiLengkap");
const detailSuasana = document.getElementById("detailSuasana");
const detailDayaTarik = document.getElementById("detailDayaTarik");
const detailPenutup = document.getElementById("detailPenutup");
const detailMaps = document.getElementById("detailMaps");
const detailMapsBawah = document.getElementById("detailMapsBawah");


/* =========================================
   4. MENAMPILKAN DETAIL TEMPAT
========================================= */

const tempat = dataNongkrong[namaTempat];


/* Membuat ID khusus untuk setiap tempat */
function buatIdTempat(nama) {
    return "nongkrong-" + nama
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

const idTempat = tempat ? buatIdTempat(namaTempat) : "";


if (tempat) {

    detailNama.textContent = namaTempat;
    detailKategori.textContent = tempat.kategori;

    detailLokasi.textContent = tempat.lokasi;

    detailDeskripsi.textContent = tempat.deskripsi;
    detailDeskripsiLengkap.textContent = tempat.deskripsi;

    detailSuasana.textContent = tempat.suasana;
    detailDayaTarik.textContent = tempat.dayaTarik;
    detailPenutup.textContent = tempat.penutup;

    detailGambar.src = tempat.gambar;
    detailGambar.alt = "Foto " + namaTempat;

    detailGambar.onerror = function () {
        this.style.display = "none";
    };


    /* =====================================
       5. MEMBUAT LINK GOOGLE MAPS
    ===================================== */

    const kataKunciLokasi =
        namaTempat + ", " + tempat.lokasi + ", Pati, Jawa Tengah";

    const linkGoogleMaps =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(kataKunciLokasi);

    detailMaps.href = linkGoogleMaps;
    detailMapsBawah.href = linkGoogleMaps;


    /* =====================================
       6. MENGUBAH JUDUL TAB BROWSER
    ===================================== */

    document.title = namaTempat + " - Jelajah Pati";

    detailCard.style.display = "block";
    tidakDitemukan.style.display = "none";


} else {

    detailCard.style.display = "none";
    tidakDitemukan.style.display = "block";

    document.title = "Tempat Tidak Ditemukan - Jelajah Pati";

}


/* =========================================
   7. ELEMEN REVIEW DAN PROFIL
========================================= */

const areaProfil = document.getElementById("areaProfil");

const belumLogin = document.getElementById("belumLogin");
const formReview = document.getElementById("formReview");
const daftarReview = document.getElementById("daftarReview");

const komentarReview = document.getElementById("komentarReview");
const pesanReview = document.getElementById("pesanReview");
const tombolKirimReview = document.getElementById("tombolKirimReview");

let namaPengguna = "Pengunjung";


/* =========================================
   8. MENAMPILKAN NAVBAR SESUAI LOGIN
========================================= */

onAuthStateChanged(auth, async function(user) {

    if (user) {

        namaPengguna = user.displayName || "Pengguna";

        // Mengambil nama pengguna dari Firestore
        try {

            const dokumenPengguna = await getDoc(
                doc(db, "users", user.uid)
            );

            if (dokumenPengguna.exists()) {
                namaPengguna =
                    dokumenPengguna.data().nama || namaPengguna;
            }

        } catch (error) {
            console.error("Gagal mengambil profil pengguna:", error);
        }


        // Menampilkan email dan tombol logout
        areaProfil.innerHTML = "";

        const profil = document.createElement("div");
        profil.className = "profil-pengguna";

        const email = document.createElement("span");
        email.className = "email-pengguna";
        email.textContent = user.email || "";

        const tombolLogout = document.createElement("button");
        tombolLogout.className = "btn-logout";
        tombolLogout.textContent = "Logout";

        tombolLogout.addEventListener("click", async function() {

            try {
                await signOut(auth);
                window.location.reload();

            } catch (error) {
                console.error("Gagal logout:", error);
                alert("Logout gagal. Silakan coba lagi.");
            }

        });

        profil.appendChild(email);
        profil.appendChild(tombolLogout);
        areaProfil.appendChild(profil);


        // Pengguna login boleh mengisi review
        formReview.hidden = false;
        belumLogin.hidden = true;

    } else {

        namaPengguna = "Pengunjung";

        areaProfil.innerHTML = `
            <a href="login.html" class="btn-login-nav">Login</a>
        `;

        // Pengunjung belum login hanya bisa membaca review
        formReview.hidden = true;
        belumLogin.hidden = false;

    }


    // Memuat review setelah status login diketahui
    await tampilkanReview();

});


/* =========================================
   9. MENAMPILKAN REVIEW DARI FIRESTORE
========================================= */

async function tampilkanReview() {

    if (!tempat) return;

    daftarReview.innerHTML = `
        <p class="review-kosong">Memuat review...</p>
    `;

    try {

        const kumpulanReview = collection(db, "reviews");

        const queryReview = query(
            kumpulanReview,
            where("wisataId", "==", idTempat)
        );

        const hasilReview = await getDocs(queryReview);

        daftarReview.innerHTML = "";

        if (hasilReview.empty) {

            daftarReview.innerHTML = `
                <p class="review-kosong">
                    Belum ada review untuk tempat ini.
                    Jadilah pengunjung pertama yang memberikan review!
                </p>
            `;

            return;
        }


        // Mengurutkan review dari yang terbaru
        const daftarData = hasilReview.docs.map(function(dokumen) {
            return dokumen.data();
        });

        daftarData.sort(function(a, b) {

            const waktuA = a.dibuatPada?.toMillis
                ? a.dibuatPada.toMillis()
                : 0;

            const waktuB = b.dibuatPada?.toMillis
                ? b.dibuatPada.toMillis()
                : 0;

            return waktuB - waktuA;

        });


        daftarData.forEach(function(data) {

            const kartu = document.createElement("div");
            kartu.className = "review-card";

            const nama = document.createElement("h4");
            nama.textContent = data.nama || "Pengunjung";

            const rating = document.createElement("div");
            rating.className = "review-rating";

            const nilaiRating = Number(data.rating) || 0;
            rating.textContent =
                "★".repeat(nilaiRating) +
                "☆".repeat(5 - nilaiRating);

            const komentar = document.createElement("p");
            komentar.textContent = data.komentar || "";

            const tanggal = document.createElement("span");
            tanggal.className = "review-tanggal";

            if (data.dibuatPada?.toDate) {

                tanggal.textContent =
                    data.dibuatPada.toDate().toLocaleDateString(
                        "id-ID",
                        {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        }
                    );

            } else {
                tanggal.textContent = "Tanggal tidak tersedia";
            }

            kartu.appendChild(nama);
            kartu.appendChild(rating);
            kartu.appendChild(komentar);
            kartu.appendChild(tanggal);

            daftarReview.appendChild(kartu);

        });


    } catch (error) {

        console.error("Gagal mengambil review:", error);

        daftarReview.innerHTML = `
            <p class="review-kosong">
                Review belum dapat ditampilkan.
                Silakan coba muat ulang halaman.
            </p>
        `;

    }

}


/* =========================================
   10. MENGIRIM REVIEW KE FIRESTORE
========================================= */

formReview.addEventListener("submit", async function(event) {

    event.preventDefault();

    const user = auth.currentUser;

    if (!user) {

        alert("Silakan login terlebih dahulu untuk memberikan review.");

        window.location.href =
            "login.html?redirect=" +
            encodeURIComponent(window.location.href);

        return;
    }


    const ratingTerpilih = formReview.querySelector(
        'input[name="rating"]:checked'
    );

    const rating = ratingTerpilih
        ? ratingTerpilih.value
        : "";

    const komentar = komentarReview.value.trim();


    if (rating === "") {

        pesanReview.textContent =
            "Silakan pilih rating terlebih dahulu.";

        return;
    }


    if (komentar === "") {

        pesanReview.textContent =
            "Komentar tidak boleh kosong.";

        return;
    }


    tombolKirimReview.disabled = true;
    tombolKirimReview.textContent = "Mengirim...";

    pesanReview.textContent = "";


    try {

        await addDoc(collection(db, "reviews"), {

            userId: user.uid,
            nama: namaPengguna,
            email: user.email || "",

            wisataId: idTempat,
            namaWisata: namaTempat,
            jenis: "tempatnongkrong",

            rating: Number(rating),
            komentar: komentar,

            dibuatPada: serverTimestamp()

        });


        pesanReview.textContent =
            "Review berhasil dikirim! Terima kasih sudah berbagi pengalaman.";

        formReview.reset();

        await tampilkanReview();


    } catch (error) {

        console.error("Gagal mengirim review:", error);

        pesanReview.textContent =
            "Review gagal dikirim. Silakan coba lagi.";

    }


    tombolKirimReview.disabled = false;
    tombolKirimReview.textContent = "Kirim Review";

});
