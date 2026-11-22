
/* =====================================
   1. IMPORT FIREBASE
===================================== */

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


/* =====================================
   2. DATA DESTINASI WISATA
===================================== */

const dataWisata = {

    "waduk-gunungrowo": {
        nama: "Waduk Gunung Rowo",
        kategori: "Wisata Alam",
        lokasi: "Kabupaten Pati",
        alamat: "Desa Sitiluhur, Kecamatan Gembong, Kabupaten Pati, Jawa Tengah",
        gambar: "images/waduk-gunungrowo.jpg",

        ringkasan:
            "Nikmati pemandangan waduk dengan suasana alam yang menarik di Kabupaten Pati.",

        deskripsi:
            "Waduk Gunung Rowo merupakan salah satu destinasi wisata alam di Kabupaten Pati. Tempat ini dikenal dengan pemandangan perairan waduk dan lingkungan perbukitan di sekitarnya. Suasana alamnya dapat menjadi pilihan bagi pengunjung yang ingin menikmati pemandangan dan bersantai.",

        tiket:
            "› Tiket Masuk: Rp3.000 – Rp5.000 per orang\n" +
            "› Parkir Motor: Rp2.000 – Rp3.000\n" +
            "› Parkir Mobil: Rp3.000 – Rp5.000",

        jam:
            "› Setiap hari, pukul 07.00 – 17.00 WIB",

        dayaTarik: [
            {
                ikon: "🌄",
                judul: "Pemandangan Alam",
                isi: "Menikmati pemandangan waduk dan lingkungan alam sekitarnya."
            },
            {
                ikon: "📸",
                judul: "Spot Fotografi",
                isi: "Mengabadikan pemandangan alam sebagai kenang-kenangan."
            },
            {
                ikon: "🌿",
                judul: "Suasana Alam",
                isi: "Menikmati suasana terbuka dan pemandangan perbukitan."
            }
        ]
    },


    "gua-pancur": {
        nama: "Gua Pancur",
        kategori: "Wisata Alam",
        lokasi: "Kayen, Pati",
        alamat: "Desa Jimbaran, Kecamatan Kayen, Kabupaten Pati, Jawa Tengah",
        gambar: "images/gua-pancur.jpg",

        ringkasan:
            "Destinasi wisata alam yang menawarkan pengalaman mengenal kawasan gua.",

        deskripsi:
            "Gua Pancur merupakan salah satu destinasi wisata alam di Desa Jimbaran, Kecamatan Kayen, Kabupaten Pati. Kawasan ini memiliki daya tarik berupa gua alami yang menawarkan pengalaman wisata susur gua bagi pengunjung yang ingin mengenal keindahan alam bawah tanah.",

        tiket:
            "❀ Tiket Masuk Kawasan: Sekitar Rp5.000 per orang\n" +
            "❀ Biaya Susur Gua: Sekitar Rp15.000 – Rp20.000 per orang\n" +
            "❀ Perlengkapan keamanan biasanya termasuk dalam paket susur gua",

        jam:
            "❀ Jam Buka Kawasan: 07.00 – 17.00 WIB\n" +
            "❀ Waktu Susur Gua: 08.00 – 14.00 WIB",

        dayaTarik: [
            {
                ikon: "⛰️",
                judul: "Gua Alami",
                isi: "Mengenal kawasan gua alami yang menjadi daya tarik wisata di Kabupaten Pati."
            },
            {
                ikon: "🔦",
                judul: "Susur Gua",
                isi: "Merasakan pengalaman menjelajahi bagian dalam gua dengan perlengkapan keamanan."
            },
            {
                ikon: "📷",
                judul: "Pengalaman Wisata",
                isi: "Mengabadikan pengalaman berkunjung dan menikmati keunikan kawasan Gua Pancur."
            }
        ]
    },


    "pantai-banyutowo": {
        nama: "Pantai Banyutowo",
        kategori: "Wisata Pantai",
        lokasi: "Dukuhseti, Pati",
        alamat: "Desa Banyutowo, Kecamatan Dukuhseti, Kabupaten Pati, Jawa Tengah",
        gambar: "images/pantai-banyutowo.jpeg",

        ringkasan:
            "Destinasi pesisir untuk menikmati pemandangan dan suasana pantai.",

        deskripsi:
            "Pantai Banyutowo merupakan salah satu destinasi wisata pesisir di Kabupaten Pati. Kawasan ini dapat menjadi pilihan untuk menikmati suasana pantai, melihat pemandangan laut, serta mengenal kehidupan masyarakat di kawasan pesisir.",

        tiket:
            "✦ Tiket Masuk: Rp5.000 per orang\n" +
            "✦ Parkir Motor: Rp3.000\n" +
            "✦ Parkir Mobil: Rp5.000",

        jam:
            "✦ Setiap hari, 24 jam\n" +
            "✦ Disarankan berkunjung saat hari masih terang",

        dayaTarik: [
            {
                ikon: "🌊",
                judul: "Pemandangan Laut",
                isi: "Menikmati pemandangan laut di kawasan pesisir Pati."
            },
            {
                ikon: "🚣",
                judul: "Suasana Pesisir",
                isi: "Mengenal suasana dan aktivitas masyarakat di kawasan pantai."
            },
            {
                ikon: "📸",
                judul: "Fotografi",
                isi: "Mengabadikan pemandangan pantai dan suasana sekitarnya."
            }
        ]
    },


    "hutan-pinus-pangonan": {
        nama: "Hutan Pinus Pangonan",
        kategori: "Wisata Alam",
        lokasi: "Tlogowungu, Pati",
        alamat: "Desa Gunungsari, Kecamatan Tlogowungu, Kabupaten Pati, Jawa Tengah",
        gambar: "images/hutan-pinuspati.jpg",

        ringkasan:
            "Kawasan wisata alam dengan suasana pepohonan pinus yang menarik.",

        deskripsi:
            "Hutan Pinus Pangonan merupakan destinasi wisata alam yang menawarkan suasana kawasan pepohonan pinus. Lingkungan yang didominasi pepohonan dapat menjadi pilihan bagi pengunjung yang ingin menikmati suasana alam dan menghabiskan waktu di luar ruangan.",

        tiket:
            "➤ Tiket Masuk: Rp3.000 per orang\n" +
            "➤ Parkir Motor: Rp3.000\n" +
            "➤ Parkir Mobil: Rp5.000",

        jam:
            "➤ Setiap hari, pukul 07.00 – 17.00 WIB",

        dayaTarik: [
            {
                ikon: "🌲",
                judul: "Pepohonan Pinus",
                isi: "Menikmati kawasan yang didominasi oleh pepohonan pinus."
            },
            {
                ikon: "🌿",
                judul: "Suasana Alam",
                isi: "Menghabiskan waktu dengan menikmati lingkungan alami."
            },
            {
                ikon: "📷",
                judul: "Spot Foto",
                isi: "Mengabadikan suasana hutan sebagai latar fotografi."
            }
        ]
    },


    "agrowisata-jollong": {
        nama: "Agrowisata Jollong",
        kategori: "Agrowisata",
        lokasi: "Kabupaten Pati",
        alamat: "Desa Sitiluhur, Kecamatan Gembong, Kabupaten Pati, Jawa Tengah",
        gambar: "images/wisata-agrojollong.jpg",

        ringkasan:
            "Destinasi agrowisata dengan suasana perkebunan dan pemandangan alam.",

        deskripsi:
            "Agrowisata Jollong merupakan salah satu destinasi wisata di Kabupaten Pati yang menawarkan pengalaman menikmati kawasan perkebunan dan lingkungan alam. Tempat ini dapat menjadi pilihan untuk mengenal suasana agrowisata sekaligus menikmati pemandangan di sekitarnya.",

        tiket:
            "◆ Tiket Masuk: Rp10.000 – Rp15.000 per orang\n" +
            "◆ Parkir: Sekitar Rp2.000\n" +
            "◆ Wahana atau aktivitas tambahan dikenakan biaya tersendiri",

        jam:
            "◆ Senin – Jumat: 08.00 – 17.00 WIB\n" +
            "◆ Sabtu: 07.00 – 17.00 WIB\n" +
            "◆ Minggu: 07.30 – 17.00 WIB",

        dayaTarik: [
            {
                ikon: "🌱",
                judul: "Kawasan Perkebunan",
                isi: "Mengenal lingkungan perkebunan yang menjadi daya tarik agrowisata."
            },
            {
                ikon: "🏞️",
                judul: "Pemandangan Alam",
                isi: "Menikmati pemandangan alam di sekitar kawasan wisata."
            },
            {
                ikon: "📸",
                judul: "Wisata Keluarga",
                isi: "Menjadi salah satu pilihan untuk menghabiskan waktu bersama."
            }
        ]
    },


    "lorotan-semar": {
        nama: "Lorotan Semar",
        kategori: "Wisata Alam",
        lokasi: "Kayen, Pati",
        alamat: "Dukuh Ngalingan, Desa Sumbersari, Kecamatan Kayen, Kabupaten Pati, Jawa Tengah",
        gambar: "images/lorotan-semar.jpg",

        ringkasan:
            "Destinasi wisata alam berupa air terjun dengan suasana yang menyegarkan.",

        deskripsi:
            "Lorotan Semar merupakan salah satu destinasi wisata alam di wilayah Kayen, Kabupaten Pati. Tempat ini dikenal dengan daya tarik aliran air dan lingkungan alam di sekitarnya. Keindahan alamnya dapat menjadi pilihan bagi pengunjung yang ingin mengenal destinasi wisata alam di Pati.",

        tiket:
            "❀ Tiket Masuk: Sekitar Rp3.000 per orang\n" +
            "❀ Parkir Motor: Sekitar Rp3.000\n" +
            "❀ Parkir Mobil: Sekitar Rp5.000\n" +
            "❀ Tarif dapat berubah sewaktu-waktu sesuai kebijakan pengelola",

        jam:
            "❀ Setiap hari, pukul 07.00 sampai 17.00 WIB.",

        dayaTarik: [
            {
                ikon: "💧",
                judul: "Aliran Air",
                isi: "Menikmati daya tarik aliran air di kawasan wisata."
            },
            {
                ikon: "🌳",
                judul: "Lingkungan Alami",
                isi: "Mengenal suasana alam di sekitar destinasi."
            },
            {
                ikon: "📷",
                judul: "Pemandangan",
                isi: "Mengabadikan keindahan lingkungan wisata."
            }
        ]
    },


    "bukit-pengusen": {
        nama: "Bukit Pengusen",
        kategori: "Wisata Alam",
        lokasi: "Gunungwungkal, Pati",
        alamat: "Desa Gulangpongge, Kecamatan Gunungwungkal, Kabupaten Pati, Jawa Tengah",
        gambar: "images/bukit-pengusen.jpg",

        ringkasan:
            "Destinasi perbukitan yang menawarkan pemandangan alam dan suasana sejuk.",

        deskripsi:
            "Bukit Pengusen merupakan salah satu destinasi wisata alam di wilayah Gunungwungkal, Kabupaten Pati. Kawasan perbukitan ini dapat menjadi pilihan bagi pengunjung yang ingin menikmati pemandangan alam dari area yang lebih tinggi.",

        tiket:
            "✦ Paket Sunrise: Sekitar Rp5.000 per orang\n" +
            "✦ Camping dengan tenda sendiri: Sekitar Rp20.000 per tenda\n" +
            "✦ Paket Camping: Mulai sekitar Rp60.000\n" +
            "✦ Biaya dapat berbeda sesuai paket yang dipilih",

        jam:
            "✦ Setiap hari, sekitar pukul 16.00 – 23.00 WIB",

        dayaTarik: [
            {
                ikon: "⛰️",
                judul: "Pemandangan Perbukitan",
                isi: "Menikmati pemandangan alam dari kawasan perbukitan."
            },
            {
                ikon: "🌄",
                judul: "Suasana Alam",
                isi: "Menikmati lingkungan alam yang menjadi daya tarik kawasan."
            },
            {
                ikon: "📸",
                judul: "Spot Fotografi",
                isi: "Mengabadikan pemandangan alam dari kawasan bukit."
            }
        ]
    }

};


/* =====================================
   3. MENGAMBIL DESTINASI YANG DIPILIH
===================================== */

const parameter = new URLSearchParams(window.location.search);
const idWisata = parameter.get("tempat");

const wisata = dataWisata[idWisata];

const gambarUtama = document.getElementById("fotoWisata");


/* =====================================
   4. MENAMPILKAN INFORMASI WISATA
===================================== */

if (wisata) {

    document.title = wisata.nama + " | Jelajah Pati";

    document.getElementById("breadcrumbNama").textContent =
        wisata.nama;

    document.getElementById("captionLokasi").textContent =
        wisata.lokasi;

    document.getElementById("kategoriWisata").textContent =
        wisata.kategori;

    document.getElementById("namaWisata").textContent =
        wisata.nama;

    document.getElementById("lokasiWisata").textContent =
        "📍 " + wisata.lokasi;

    document.getElementById("ringkasanWisata").textContent =
        wisata.ringkasan;

    document.getElementById("tiketWisata").textContent =
        wisata.tiket;

    document.getElementById("jamWisata").textContent =
        wisata.jam;

    document.getElementById("alamatWisata").textContent =
        wisata.alamat;

    document.getElementById("deskripsiWisata").textContent =
        wisata.deskripsi;


    /* MENAMPILKAN GAMBAR UTAMA */

    if (gambarUtama) {
        gambarUtama.src = wisata.gambar;
        gambarUtama.alt = wisata.nama;

        gambarUtama.onerror = function () {
            this.alt = "Foto " + wisata.nama + " belum tersedia";
        };
    }


    /* MEMBUKA LOKASI MELALUI GOOGLE MAPS */

    const tombolMaps = document.getElementById("tombolMaps");

    if (tombolMaps) {
        tombolMaps.href =
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(wisata.nama + " " + wisata.alamat);
    }


    /* =====================================
       5. MENAMPILKAN DAYA TARIK
    ===================================== */

    const daftarDayaTarik =
        document.getElementById("daftarDayaTarik");

    if (daftarDayaTarik) {

        daftarDayaTarik.innerHTML = "";

        wisata.dayaTarik.forEach(function (item) {

            const kartu = document.createElement("div");
            kartu.className = "daya-tarik-item";

            const ikon = document.createElement("span");
            ikon.textContent = item.ikon;

            const judul = document.createElement("h3");
            judul.textContent = item.judul;

            const isi = document.createElement("p");
            isi.textContent = item.isi;

            kartu.append(ikon, judul, isi);

            daftarDayaTarik.appendChild(kartu);

        });
    }


    /* =====================================
       6. REKOMENDASI DESTINASI LAIN
    ===================================== */

    const rekomendasi =
        document.getElementById("rekomendasiWisata");

    if (rekomendasi) {

        rekomendasi.innerHTML = "";

        Object.keys(dataWisata)

            .filter(function (id) {
                return id !== idWisata;
            })

            .slice(0, 3)

            .forEach(function (id) {

                const item = dataWisata[id];

                const kartu = document.createElement("article");
                kartu.className = "rekomendasi-card";

                const gambar = document.createElement("img");
                gambar.src = item.gambar;
                gambar.alt = item.nama;

                gambar.onerror = function () {
                    this.alt = "Foto " + item.nama + " belum tersedia";
                };

                const isi = document.createElement("div");

                const kategori = document.createElement("span");
                kategori.textContent = item.kategori;

                const judul = document.createElement("h3");
                judul.textContent = item.nama;

                const link = document.createElement("a");
                link.href = "detail-wisata.html?tempat=" + id;
                link.textContent = "Lihat Destinasi →";

                isi.append(kategori, judul, link);

                kartu.append(gambar, isi);

                rekomendasi.appendChild(kartu);

            });
    }


} else {

    /* =====================================
       7. JIKA DESTINASI TIDAK DITEMUKAN
    ===================================== */

    const detailContainer =
        document.querySelector(".detail-container");

    if (detailContainer) {

        detailContainer.innerHTML = `

            <div style="text-align:center; padding:80px 20px;">

                <h2>Destinasi Tidak Ditemukan</h2>

                <p style="margin:15px 0;">
                    Maaf, informasi wisata yang kamu cari belum tersedia.
                </p>

                <a href="wisata.html"
                   style="color:#315b3c; font-weight:bold;">
                    Kembali ke Daftar Wisata
                </a>

            </div>

        `;
    }
}


/* =====================================
   8. MENGATUR PROFIL PENGGUNA
===================================== */

const areaProfil = document.getElementById("areaProfil");
const belumLogin = document.getElementById("belumLogin");
const formReview = document.getElementById("formReview");

// Tombol kembali ke dashboard admin
const tombolDashboardAdmin =
    document.getElementById("tombolDashboardAdmin");

let penggunaAktif = null;
let namaPengguna = "Pengunjung";


/* MEMANTAU STATUS LOGIN */

onAuthStateChanged(auth, async function (user) {

    penggunaAktif = user;

    // Secara default tombol dashboard admin disembunyikan
    if (tombolDashboardAdmin) {
        tombolDashboardAdmin.hidden = true;
    }

    if (user) {

        /* MEMERIKSA HAK AKSES ADMIN */

        try {

            const tokenResult = await user.getIdTokenResult(true);

            if (tombolDashboardAdmin) {
                tombolDashboardAdmin.hidden =
                    tokenResult.claims.admin !== true;
            }

        } catch (error) {

            console.error("Gagal memeriksa hak akses admin:", error);

            if (tombolDashboardAdmin) {
                tombolDashboardAdmin.hidden = true;
            }

        }


        // Mengambil nama pengguna dari Firestore
        try {

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {

                namaPengguna =
                    userSnap.data().nama || "Pengguna";

            } else {

                namaPengguna =
                    user.displayName || "Pengguna";
            }

        } catch (error) {

            console.error("Gagal mengambil profil:", error);

            namaPengguna =
                user.displayName || "Pengguna";
        }


        // Menampilkan email dan tombol Logout
        if (areaProfil) {

            areaProfil.innerHTML = `
                <div class="profil-pengguna">
                    <span class="email-pengguna"></span>

                    <button
                        type="button"
                        id="tombolLogout"
                        class="btn-logout">
                        Logout
                    </button>
                </div>
            `;

            areaProfil.querySelector(".email-pengguna").textContent =
                user.email || "Email tidak tersedia";


            // Fungsi Logout
            document.getElementById("tombolLogout")
                .addEventListener("click", async function () {

                    try {

                        await signOut(auth);
                        window.location.reload();

                    } catch (error) {

                        console.error("Gagal logout:", error);
                        alert("Logout gagal. Silakan coba lagi.");

                    }

                });
        }


        // Pengguna login boleh memberikan review
        if (formReview) {
            formReview.hidden = false;
        }

        if (belumLogin) {
            belumLogin.hidden = true;
        }

    } else {

        namaPengguna = "Pengunjung";

        // Menyembunyikan tombol dashboard admin
        if (tombolDashboardAdmin) {
            tombolDashboardAdmin.hidden = true;
        }

        // Menampilkan tombol Login
        if (areaProfil) {

            areaProfil.innerHTML = `
                <a href="login.html" class="btn-login-nav">
                    Login
                </a>
            `;
        }

        // Pengguna belum login tidak boleh mengirim review
        if (formReview) {
            formReview.hidden = true;
        }

        if (belumLogin) {
            belumLogin.hidden = false;
        }
    }

    // Review tetap bisa dilihat oleh semua pengunjung
    await tampilkanReview();

});


/* =====================================
   9. MENAMPILKAN REVIEW DARI FIRESTORE
===================================== */

const daftarReview = document.getElementById("daftarReview");

async function tampilkanReview() {

    if (!daftarReview || !wisata) return;

    daftarReview.innerHTML = "<p>Memuat review...</p>";

    try {

        const kumpulanReview = collection(db, "reviews");

        const pencarianReview = query(
            kumpulanReview,
            where("wisataId", "==", idWisata)
        );

        const hasilReview = await getDocs(pencarianReview);

        daftarReview.innerHTML = "";

        if (hasilReview.empty) {

            daftarReview.innerHTML = `
                <p>Belum ada review untuk destinasi ini.</p>
            `;

            return;
        }

        const dataReview = [];

        hasilReview.forEach(function (dokumen) {

            dataReview.push(dokumen.data());

        });

        // Mengurutkan review dari yang terbaru
        dataReview.sort(function (a, b) {

            const waktuA = a.dibuatPada?.toMillis?.() || 0;
            const waktuB = b.dibuatPada?.toMillis?.() || 0;

            return waktuB - waktuA;

        });


        dataReview.forEach(function (item) {

            const kartu = document.createElement("div");
            kartu.className = "review-card";

            const nama = document.createElement("h3");
            nama.textContent = item.nama || "Pengguna";

            const rating = document.createElement("div");
            rating.className = "review-rating";

            const jumlahBintang = Math.max(
                0,
                Math.min(5, Number(item.rating) || 0)
            );

            rating.textContent =
                "★".repeat(jumlahBintang) +
                "☆".repeat(5 - jumlahBintang);

            const komentar = document.createElement("p");
            komentar.textContent = item.komentar || "";

            const tanggal = document.createElement("small");

            if (item.dibuatPada && item.dibuatPada.toDate) {

                tanggal.textContent =
                    item.dibuatPada.toDate().toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    });

            } else {

                tanggal.textContent = "Baru saja";

            }

            kartu.append(nama, rating, komentar, tanggal);

            daftarReview.appendChild(kartu);

        });

    } catch (error) {

        console.error("Gagal mengambil review:", error);

        daftarReview.innerHTML = `
            <p>Review belum dapat ditampilkan. Silakan coba lagi.</p>
        `;

    }

}


/* =====================================
   10. MENGIRIM REVIEW KE FIRESTORE
===================================== */

if (formReview) {

    formReview.addEventListener("submit", async function (event) {

        event.preventDefault();

        const user = auth.currentUser;

        // Memastikan pengguna sudah login
        if (!user) {

            alert("Silakan login terlebih dahulu untuk memberikan review.");

            window.location.href =
                "login.html?redirect=" +
                encodeURIComponent(window.location.href);

            return;
        }

        if (!wisata) {

            alert("Destinasi wisata tidak ditemukan.");
            return;

        }

        // Mengambil elemen rating dan komentar
        const inputRating =
            formReview.querySelector(
                '[name="rating"], #ratingReview, #rating'
            );

        const inputKomentar =
            formReview.querySelector(
                '[name="komentar"], #komentarReview, #isiReview, textarea'
            );

        const pesanReview =
            document.getElementById("pesanReview");

        if (!inputRating || !inputKomentar) {

            alert("Kolom rating atau komentar belum ditemukan.");

            return;
        }

        const rating =
            formReview.querySelector('input[name="rating"]:checked')?.value ||
            inputRating.value;

        const komentar = inputKomentar.value.trim();

        if (!rating || Number(rating) < 1 || Number(rating) > 5) {

            alert("Silakan pilih rating dari 1 sampai 5.");

            return;
        }

        if (komentar === "") {

            alert("Silakan isi komentar terlebih dahulu.");

            return;
        }

        const tombolKirim =
            formReview.querySelector('[type="submit"]');

        try {

            if (tombolKirim) {
                tombolKirim.disabled = true;
                tombolKirim.textContent = "Mengirim...";
            }

            if (pesanReview) {
                pesanReview.textContent = "Review sedang dikirim...";
            }

            // Menyimpan review ke Firestore
            await addDoc(collection(db, "reviews"), {

                userId: user.uid,

                nama: namaPengguna,

                email: user.email || "",

                wisataId: idWisata,

                namaWisata: wisata.nama,

                rating: Number(rating),

                komentar: komentar,

                dibuatPada: serverTimestamp()

            });

            if (pesanReview) {
                pesanReview.textContent = "Review berhasil dikirim!";
            }

            formReview.reset();

            await tampilkanReview();

        } catch (error) {

            console.error("Gagal mengirim review:", error);

            if (pesanReview) {
                pesanReview.textContent =
                    "Review gagal dikirim. Silakan coba lagi.";
            } else {
                alert("Review gagal dikirim. Silakan coba lagi.");
            }

        } finally {

            if (tombolKirim) {
                tombolKirim.disabled = false;
                tombolKirim.textContent = "Kirim Review";
            }

        }

    });

}

/* =====================================
   11. MENAMPILKAN REVIEW SAAT HALAMAN DIBUKA
===================================== */

tampilkanReview();
