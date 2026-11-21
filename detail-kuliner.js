
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


// =================================
// 1. DATA INFORMASI KULINER
// =================================

const informasiKuliner = {

    "Nasi Gandul": {
        kategori: "Makanan Berat",
        lokasi: "Pati, Jawa Tengah",
        gambar: "images/nasi-gandul.jpg",
        deskripsi: "Nasi Gandul merupakan salah satu kuliner khas Pati berupa nasi dengan kuah gurih berbumbu rempah dan irisan daging sapi.",
        cerita: "Nasi Gandul dikenal sebagai salah satu hidangan yang melekat dengan identitas kuliner Kabupaten Pati. Hidangan ini biasanya disajikan dengan nasi, kuah berbumbu, dan irisan daging sapi.",
        bahan: "Nasi putih, daging sapi, santan, dan berbagai bumbu rempah.",
        rasa: "Gurih dengan aroma rempah yang khas.",
        unik: "Disajikan dengan kuah berbumbu yang menjadi ciri khas hidangan ini.",
        asal: "Dikenal sebagai kuliner khas Kabupaten Pati.",
        fakta: "Nasi Gandul merupakan salah satu makanan yang sering dicari pengunjung ketika mengenal kuliner khas Pati."
    },

    "Soto Kemiri": {
        kategori: "Makanan Berat",
        lokasi: "Desa Kemiri, Pati",
        gambar: "images/soto-kemiri.jpg",
        deskripsi: "Soto Kemiri merupakan kuliner khas Pati yang dikenal dengan kuah berbumbu kemiri dan olahan daging ayam.",
        cerita: "Soto Kemiri menjadi salah satu hidangan tradisional yang dikenal masyarakat Pati. Nama kuliner ini berkaitan dengan Desa Kemiri yang dikenal sebagai daerah asalnya.",
        bahan: "Daging ayam, kemiri, bawang, dan aneka bumbu soto.",
        rasa: "Gurih dengan aroma rempah dan kemiri.",
        unik: "Penggunaan kemiri menjadi salah satu ciri yang menonjol pada kuahnya.",
        asal: "Dikenal berasal dari Desa Kemiri, Kabupaten Pati.",
        fakta: "Nama Soto Kemiri menunjukkan keterkaitan kuliner ini dengan salah satu daerah di Kabupaten Pati."
    },

    "Sego Tewel": {
        kategori: "Makanan Berat",
        lokasi: "Tambakromo, Pati",
        gambar: "images/sego-tewel.jpg",
        deskripsi: "Sego Tewel merupakan hidangan nasi dengan sayur tewel atau nangka muda yang dimasak menggunakan bumbu tradisional.",
        cerita: "Sego Tewel menjadi salah satu pilihan kuliner tradisional yang dikenal di wilayah Pati. Hidangan sederhana ini memperlihatkan pemanfaatan bahan pangan lokal dalam masakan sehari-hari.",
        bahan: "Nasi, nangka muda, santan, dan bumbu masakan.",
        rasa: "Gurih dan kaya bumbu.",
        unik: "Menggunakan tewel atau nangka muda sebagai bahan utama sayurnya.",
        asal: "Dikenal di wilayah Tambakromo, Kabupaten Pati.",
        fakta: "Kata tewel merupakan sebutan untuk nangka muda yang digunakan dalam masakan."
    },

    "Petis Kambing Runting": {
        kategori: "Makanan Berat",
        lokasi: "Runting, Pati",
        gambar: "images/petis-kambing.jpg",
        deskripsi: "Petis Kambing Runting merupakan olahan daging kambing dengan kuah kental dan bumbu rempah yang dikenal sebagai kuliner khas Pati.",
        cerita: "Kuliner ini dikenal dari daerah Runting, Pati. Olahan kambing tersebut menjadi salah satu hidangan yang memperkaya ragam makanan tradisional di Kabupaten Pati.",
        bahan: "Daging kambing dan aneka bumbu rempah.",
        rasa: "Gurih dan kaya bumbu.",
        unik: "Menggunakan daging kambing dengan kuah berbumbu yang khas.",
        asal: "Dikenal dari daerah Runting, Kabupaten Pati.",
        fakta: "Nama Runting menjadi bagian penting dari identitas kuliner ini."
    },

    "Mangut Ndas Manyung": {
        kategori: "Makanan Berat",
        lokasi: "Wilayah pesisir Pati",
        gambar: "images/mangut-ndas-manyung.jpg",
        deskripsi: "Mangut Ndas Manyung merupakan olahan kepala ikan manyung yang dimasak dengan kuah berbumbu dan memiliki cita rasa khas.",
        cerita: "Mangut Ndas Manyung dikenal sebagai salah satu hidangan yang berkaitan dengan kekayaan hasil laut wilayah pesisir. Olahan ikan ini menjadi bagian dari ragam kuliner masyarakat pesisir Pati.",
        bahan: "Kepala ikan manyung, santan, cabai, dan bumbu rempah.",
        rasa: "Gurih, pedas, dan kaya rempah.",
        unik: "Menggunakan bagian kepala ikan manyung sebagai bahan utama.",
        asal: "Dikenal di kawasan pesisir Kabupaten Pati.",
        fakta: "Ikan manyung merupakan salah satu jenis ikan laut yang dimanfaatkan dalam berbagai olahan makanan."
    },

    "Lontong Balungan": {
        kategori: "Makanan Berat",
        lokasi: "Pati, Jawa Tengah",
        gambar: "images/lontong-balungan.jpg",
        deskripsi: "Lontong Balungan merupakan hidangan lontong yang disajikan bersama olahan tulang atau balungan dengan kuah berbumbu.",
        cerita: "Lontong Balungan menjadi salah satu pilihan kuliner yang dikenal dalam ragam makanan tradisional Pati. Perpaduan lontong dan olahan balungan memberikan karakter tersendiri pada hidangan ini.",
        bahan: "Lontong, balungan, dan bumbu kuah.",
        rasa: "Gurih dengan bumbu yang meresap.",
        unik: "Menggabungkan lontong dengan olahan balungan dalam satu hidangan.",
        asal: "Dikenal di wilayah Kabupaten Pati.",
        fakta: "Balungan merupakan istilah Jawa yang merujuk pada tulang."
    },

    "Kotokan Gereh Tongkol": {
        kategori: "Makanan Berat",
        lokasi: "Pati, Jawa Tengah",
        gambar: "images/kotokan-gereh-tongkol.jpg",
        deskripsi: "Kotokan Gereh Tongkol merupakan olahan ikan tongkol dengan kuah dan bumbu masakan tradisional.",
        cerita: "Olahan ikan menjadi bagian penting dari ragam makanan masyarakat, termasuk di wilayah Pati. Kotokan Gereh Tongkol memperlihatkan pemanfaatan ikan sebagai bahan masakan rumahan.",
        bahan: "Ikan tongkol, santan, cabai, dan bumbu masakan.",
        rasa: "Gurih dan berbumbu.",
        unik: "Menggunakan ikan tongkol sebagai bahan utama dalam olahan berkuah.",
        asal: "Dikenal dalam ragam kuliner masyarakat Pati.",
        fakta: "Ikan tongkol dapat diolah menjadi berbagai hidangan tradisional."
    },

    "Botok Masin": {
        kategori: "Makanan Berat",
        lokasi: "Pati, Jawa Tengah",
        gambar: "images/botok-masin.jpg",
        deskripsi: "Botok Masin merupakan salah satu olahan tradisional yang dikenal dalam ragam kuliner lokal Pati.",
        cerita: "Botok merupakan salah satu bentuk olahan makanan tradisional yang menggunakan bumbu dan bahan tertentu, kemudian dimasak dengan cara dikukus.",
        bahan: "Bahan dan komposisi Botok Masin dapat disesuaikan dengan resep lokal yang digunakan.",
        rasa: "Cita rasa mengikuti bahan dan bumbu pada resep Botok Masin.",
        unik: "Termasuk dalam ragam olahan tradisional yang menggunakan teknik pengukusan.",
        asal: "Dikenal dalam ragam kuliner lokal Pati.",
        fakta: "Teknik mengukus menjadi salah satu cara memasak yang banyak digunakan dalam makanan tradisional."
    },

    "Dumbeg": {
        kategori: "Jajanan",
        lokasi: "Pati, Jawa Tengah",
        gambar: "images/dumbeg.jpg",
        deskripsi: "Dumbeg merupakan jajanan tradisional berbahan tepung beras, santan, dan gula merah yang juga dikenal oleh masyarakat Pati.",
        cerita: "Dumbeg merupakan jajanan tradisional yang dikenal di wilayah Jawa Tengah, terutama Rembang. Makanan ini juga dapat ditemukan dalam ragam jajanan yang dikenal masyarakat Pati.",
        bahan: "Tepung beras, santan, dan gula merah.",
        rasa: "Manis dengan aroma khas bahan tradisional.",
        unik: "Dibungkus menggunakan daun lontar atau janur yang dibentuk menyerupai kerucut.",
        asal: "Dikenal sebagai jajanan tradisional Rembang dan juga ditemukan di Pati.",
        fakta: "Bentuk bungkus Dumbeg menjadi salah satu ciri visual yang mudah dikenali."
    },

    "Gethuk Runting": {
        kategori: "Jajanan",
        lokasi: "Runting, Pati",
        gambar: "images/gethuk-runting.jpg",
        deskripsi: "Gethuk Runting merupakan jajanan tradisional berbahan dasar singkong yang dikenal dari daerah Runting, Pati.",
        cerita: "Gethuk menjadi salah satu jenis jajanan tradisional berbahan singkong. Gethuk Runting turut dikenal sebagai bagian dari ragam jajanan daerah Pati.",
        bahan: "Singkong dan bahan tambahan sesuai resep yang digunakan.",
        rasa: "Memiliki cita rasa singkong yang khas dan cenderung manis.",
        unik: "Menggunakan singkong sebagai bahan dasar jajanan tradisional.",
        asal: "Dikenal dari daerah Runting, Kabupaten Pati.",
        fakta: "Singkong merupakan bahan pangan yang dapat diolah menjadi beragam makanan tradisional."
    },

    "Jenang Landoh": {
        kategori: "Jajanan",
        lokasi: "Landoh, Pati",
        gambar: "images/jenang-landoh.png",
        deskripsi: "Jenang Landoh merupakan jajanan tradisional bercita rasa manis yang dikenal dari daerah Landoh, Pati.",
        cerita: "Jenang merupakan salah satu jenis makanan tradisional yang dikenal di berbagai daerah. Jenang Landoh menjadi bagian dari ragam jajanan yang dikenal masyarakat Pati.",
        bahan: "Bahan pembuatan dapat mengikuti resep jenang Landoh yang digunakan.",
        rasa: "Manis dengan tekstur khas jenang.",
        unik: "Dikenal melalui nama daerah Landoh yang melekat pada kuliner ini.",
        asal: "Dikenal dari daerah Landoh, Kabupaten Pati.",
        fakta: "Nama Landoh menjadi penanda daerah yang berkaitan dengan jajanan ini."
    },

    "Tape Gembong": {
        kategori: "Jajanan",
        lokasi: "Gembong, Pati",
        gambar: "images/tape-gembong.jpg",
        deskripsi: "Tape Gembong merupakan olahan singkong melalui proses fermentasi yang dikenal dari daerah Gembong, Pati.",
        cerita: "Tape menjadi salah satu makanan tradisional hasil fermentasi. Tape Gembong dikenal sebagai salah satu produk olahan yang berkaitan dengan wilayah Gembong.",
        bahan: "Singkong dan ragi untuk proses fermentasi.",
        rasa: "Manis dengan sedikit rasa asam khas hasil fermentasi.",
        unik: "Dibuat melalui proses fermentasi singkong.",
        asal: "Dikenal dari daerah Gembong, Kabupaten Pati.",
        fakta: "Proses fermentasi membuat singkong mengalami perubahan rasa dan tekstur."
    },

    "Kue Moho": {
        kategori: "Jajanan",
        lokasi: "Pati, Jawa Tengah",
        gambar: "images/kue-moho.jpg",
        deskripsi: "Kue Moho merupakan jajanan tradisional berbentuk mekar dengan tekstur lembut dan cita rasa manis.",
        cerita: "Kue Moho menjadi salah satu jajanan tradisional yang dikenal di Pati. Bentuknya yang merekah membuat kue ini memiliki tampilan yang mudah dikenali.",
        bahan: "Bahan dasar dan komposisi mengikuti resep Kue Moho yang digunakan.",
        rasa: "Manis dengan tekstur lembut.",
        unik: "Memiliki bentuk bagian atas yang merekah atau mekar.",
        asal: "Dikenal sebagai salah satu jajanan tradisional di Pati.",
        fakta: "Bentuk Kue Moho yang mekar menjadi salah satu ciri khas tampilannya."
    },

    "Bandeng Presto Juwana": {
        kategori: "Oleh-oleh",
        lokasi: "Juwana, Pati",
        gambar: "images/bandeng-presto.jpg",
        deskripsi: "Bandeng Presto Juwana merupakan olahan ikan bandeng yang dimasak menggunakan teknik presto hingga durinya menjadi lunak.",
        cerita: "Juwana dikenal sebagai salah satu wilayah di Pati yang berkaitan erat dengan hasil perikanan. Bandeng Presto menjadi salah satu olahan ikan yang dikenal sebagai pilihan oleh-oleh.",
        bahan: "Ikan bandeng dan bumbu sesuai resep pengolahan.",
        rasa: "Gurih dengan bumbu yang meresap.",
        unik: "Menggunakan teknik presto untuk melunakkan duri ikan.",
        asal: "Dikenal sebagai produk olahan ikan dari Juwana, Kabupaten Pati.",
        fakta: "Teknik memasak bertekanan membantu melunakkan duri ikan bandeng."
    },

    "Otak-otak Bandeng": {
        kategori: "Oleh-oleh",
        lokasi: "Juwana, Pati",
        gambar: "images/otak-otak-bandeng.jpg",
        deskripsi: "Otak-otak Bandeng merupakan olahan ikan bandeng yang dipadukan dengan bumbu pilihan dan dikenal sebagai salah satu produk olahan ikan.",
        cerita: "Wilayah Juwana memiliki keterkaitan dengan hasil perikanan. Berbagai olahan ikan dikembangkan menjadi makanan yang dapat dinikmati maupun dijadikan buah tangan.",
        bahan: "Ikan bandeng dan bumbu sesuai resep pengolahan.",
        rasa: "Gurih dan berbumbu.",
        unik: "Mengolah ikan bandeng menjadi hidangan dengan bentuk dan penyajian berbeda.",
        asal: "Dikenal sebagai salah satu olahan ikan di wilayah Juwana, Pati.",
        fakta: "Ikan bandeng dapat diolah menjadi berbagai jenis makanan selain digoreng atau dibakar."
    },

    "Telur Lurik": {
        kategori: "Oleh-oleh",
        lokasi: "Batangan, Pati",
        gambar: "images/telur-lurik.jpg",
        deskripsi: "Telur Lurik merupakan kuliner yang tercantum dalam daftar Jelajah Pati. Informasi lebih lanjut mengenai produk ini dapat dilengkapi berdasarkan sumber lokal yang digunakan.",
        cerita: "Bagian ini dapat diisi dengan cerita mengenai Telur Lurik berdasarkan informasi dari produsen atau sumber kuliner setempat.",
        bahan: "Informasi bahan dapat disesuaikan dengan produk Telur Lurik yang kamu cantumkan.",
        rasa: "Informasi cita rasa perlu disesuaikan dengan produk yang dimaksud.",
        unik: "Keunikan produk dapat dijelaskan berdasarkan ciri khas Telur Lurik yang telah diverifikasi.",
        asal: "Informasi asal daerah dapat disesuaikan dengan sumber kuliner yang digunakan.",
        fakta: "Tambahkan fakta menarik setelah memperoleh informasi yang jelas mengenai Telur Lurik."
    },

    "Kerupuk Daging": {
        kategori: "Oleh-oleh",
        lokasi: "Kabupaten Pati",
        gambar: "images/kerupuk-daging.jpg",
        deskripsi: "Kerupuk Daging merupakan olahan kerupuk berbahan daging yang dapat dijadikan salah satu pilihan buah tangan.",
        cerita: "Kerupuk menjadi salah satu jenis makanan yang dapat diolah dengan berbagai bahan. Kerupuk Daging menambah ragam produk olahan yang dapat diperkenalkan dalam daftar kuliner Pati.",
        bahan: "Daging dan bahan tambahan sesuai resep kerupuk yang digunakan.",
        rasa: "Cita rasa gurih dengan karakter bahan daging.",
        unik: "Menggunakan daging sebagai salah satu bahan utama dalam pembuatan kerupuk.",
        asal: "Dicantumkan sebagai salah satu produk kuliner Kabupaten Pati.",
        fakta: "Kerupuk dapat menjadi pelengkap makanan maupun camilan."
    },

    "Jeruk Pamelo Gembong": {
        kategori: "Oleh-oleh",
        lokasi: "Gembong, Pati",
        gambar: "images/jeruk-pamelo.jpg",
        deskripsi: "Jeruk Pamelo Gembong merupakan buah berukuran besar yang dikenal sebagai salah satu produk pertanian dari daerah Gembong, Pati.",
        cerita: "Gembong merupakan salah satu wilayah di Kabupaten Pati yang dikenal dengan hasil pertaniannya. Jeruk Pamelo menjadi salah satu produk buah yang dapat diperkenalkan sebagai kekayaan daerah.",
        bahan: "Buah jeruk pamelo.",
        rasa: "Cita rasa dapat bervariasi, mulai dari manis hingga sedikit asam.",
        unik: "Memiliki ukuran buah yang relatif besar dibandingkan jeruk pada umumnya.",
        asal: "Dikenal dari daerah Gembong, Kabupaten Pati.",
        fakta: "Jeruk pamelo dikenal juga dengan sebutan jeruk bali."
    }

};


// =================================
// 2. MENGAMBIL NAMA KULINER DARI URL
// =================================

const parameterURL = new URLSearchParams(window.location.search);
const namaKuliner = parameterURL.get("nama");

const idReviewKuliner = "kuliner-" + namaKuliner;


// =================================
// 3. MENAMPILKAN DETAIL KULINER
// =================================

function tampilkanDetailKuliner() {

    const data = informasiKuliner[namaKuliner];

    if (!data) {
        document.getElementById("detailNama").textContent =
            "Kuliner Tidak Ditemukan";

        document.getElementById("detailKategori").textContent =
            "Informasi Tidak Tersedia";

        document.getElementById("detailLokasi").textContent = "";

        document.getElementById("detailDeskripsi").textContent =
            "Maaf, informasi kuliner yang kamu cari belum tersedia. Silakan kembali ke halaman Jelajah Kuliner.";

        document.getElementById("detailGambar").src =
            "images/nasi-gandul.jpg";

        document.getElementById("detailCerita").textContent =
            "Informasi kuliner belum tersedia.";

        document.getElementById("detailBahan").textContent =
            "Informasi belum tersedia.";

        document.getElementById("detailRasa").textContent =
            "Informasi belum tersedia.";

        document.getElementById("detailUnik").textContent =
            "Informasi belum tersedia.";

        document.getElementById("detailAsal").textContent =
            "Informasi belum tersedia.";

        document.getElementById("detailFakta").textContent =
            "Silakan pilih kuliner lain dari halaman Jelajah Kuliner.";

        document.getElementById("formReview").hidden = true;
        document.getElementById("belumLogin").hidden = true;
        document.getElementById("bagianReview").hidden = true;

        document.title = "Kuliner Tidak Ditemukan | Jelajah Pati";
        return;
    }

    document.getElementById("detailNama").textContent = namaKuliner;
    document.getElementById("detailKategori").textContent = data.kategori;
    document.getElementById("detailLokasi").textContent = "📍 " + data.lokasi;
    document.getElementById("detailDeskripsi").textContent = data.deskripsi;

    document.getElementById("detailGambar").src = data.gambar;
    document.getElementById("detailGambar").alt = namaKuliner;

    document.getElementById("detailCerita").textContent = data.cerita;
    document.getElementById("detailBahan").textContent = data.bahan;
    document.getElementById("detailRasa").textContent = data.rasa;
    document.getElementById("detailUnik").textContent = data.unik;
    document.getElementById("detailAsal").textContent = data.asal;
    document.getElementById("detailFakta").textContent = data.fakta;

    document.title = namaKuliner + " | Jelajah Pati";
}

tampilkanDetailKuliner();


// =================================
// 4. PROFIL PENGGUNA DAN LOGIN
// =================================

const areaProfil = document.getElementById("areaProfil");
const belumLogin = document.getElementById("belumLogin");
const formReview = document.getElementById("formReview");

let penggunaLogin = null;
let namaPengguna = "Pengunjung";

// Mengarahkan pengguna kembali ke halaman detail
// setelah berhasil login melalui tombol review.

const linkLoginReview = belumLogin.querySelector("a");

if (linkLoginReview) {
    linkLoginReview.href =
        "login.html?redirect=" +
        encodeURIComponent(window.location.href);
}


// Memeriksa status login pengguna melalui Firebase.

onAuthStateChanged(auth, async (user) => {

    penggunaLogin = user;

    if (user) {

        try {
            const dokumenUser = await getDoc(
                doc(db, "users", user.uid)
            );

            if (dokumenUser.exists()) {
                namaPengguna =
                    dokumenUser.data().nama ||
                    user.displayName ||
                    "Pengguna";
            } else {
                namaPengguna = user.displayName || "Pengguna";
            }

        } catch (error) {
            console.error("Gagal mengambil profil:", error);
            namaPengguna = user.displayName || "Pengguna";
        }

        // Menampilkan email dan tombol logout di navbar.

        areaProfil.innerHTML = `
            <div class="profil-pengguna">

                <span class="email-pengguna"></span>

                <button
                    type="button"
                    id="tombolLogout"
                    class="btn-logout"
                >
                    Logout
                </button>

            </div>
        `;

        areaProfil.querySelector(".email-pengguna").textContent =
            user.email || "Email tidak tersedia";

        // Pengguna yang sudah login dapat memberikan review.

        belumLogin.hidden = true;
        formReview.hidden = false;

        // Fungsi logout.

        document.getElementById("tombolLogout")
            .addEventListener("click", async () => {

                try {
                    await signOut(auth);
                    window.location.reload();

                } catch (error) {
                    console.error("Gagal logout:", error);
                    alert("Gagal keluar dari akun.");
                }
            });

    } else {

        // Pengguna yang belum login.

        namaPengguna = "Pengunjung";

        areaProfil.innerHTML = `
            <a href="login.html" class="btn-login-nav">
                Login
            </a>
        `;

        // Form review disembunyikan.

        belumLogin.hidden = false;
        formReview.hidden = true;
    }
});


// =================================
// 5. MENAMPILKAN REVIEW DARI FIRESTORE
// =================================

const daftarReview = document.getElementById("daftarReview");

async function tampilkanReview() {

    if (!informasiKuliner[namaKuliner]) {
        return;
    }

    daftarReview.innerHTML =
        `<p class="review-kosong">Memuat review...</p>`;

    try {

        const koleksiReview = collection(db, "reviews");

        const queryReview = query(
            koleksiReview,
            where("wisataId", "==", idReviewKuliner)
        );

        const hasilReview = await getDocs(queryReview);

        daftarReview.innerHTML = "";

        if (hasilReview.empty) {
            daftarReview.innerHTML = `
                <p class="review-kosong">
                    Belum ada review untuk kuliner ini.
                    Jadilah orang pertama yang memberikan ulasan!
                </p>
            `;
            return;
        }

        const semuaReview = [];

        hasilReview.forEach((dokumen) => {
            semuaReview.push(dokumen.data());
        });

        // Mengurutkan review dari yang terbaru.

        semuaReview.sort((a, b) => {
            const waktuA = a.dibuatPada?.toMillis?.() || 0;
            const waktuB = b.dibuatPada?.toMillis?.() || 0;

            return waktuB - waktuA;
        });

        semuaReview.forEach((data) => {

            const kartu = document.createElement("div");
            kartu.className = "review-card";

            const nama = document.createElement("h4");
            nama.textContent = data.nama || "Pengunjung";

            const rating = document.createElement("div");
            rating.className = "review-rating";

            const jumlahRating = Math.max(
                0,
                Math.min(5, Number(data.rating) || 0)
            );

            rating.textContent =
                "★".repeat(jumlahRating) +
                "☆".repeat(5 - jumlahRating);

            const komentar = document.createElement("p");
            komentar.textContent = data.komentar || "";

            const tanggal = document.createElement("small");
            tanggal.className = "review-tanggal";

            if (data.dibuatPada?.toDate) {
                tanggal.textContent =
                    data.dibuatPada.toDate().toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    });
            } else {
                tanggal.textContent = "Baru saja";
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
                Review belum dapat dimuat. Silakan coba lagi.
            </p>
        `;
    }
}

// Review tetap ditampilkan meskipun pengunjung belum login.

tampilkanReview();


// =================================
// 6. MENGIRIM REVIEW KE FIRESTORE
// =================================

formReview.addEventListener("submit", async function(event) {

    event.preventDefault();

    const pesanReview = document.getElementById("pesanReview");
    const tombolKirim = document.getElementById("tombolKirimReview");

    const pilihanRating =
        document.querySelector('input[name="rating"]:checked');

    const komentar =
        document.getElementById("komentarReview").value.trim();

    pesanReview.textContent = "";

    // Memeriksa ulang status login langsung dari Firebase.

    if (!auth.currentUser) {

        penggunaLogin = null;

        pesanReview.textContent =
            "Silakan login terlebih dahulu untuk memberikan review.";

        formReview.hidden = true;
        belumLogin.hidden = false;

        return;
    }

    // Mengambil pengguna yang sedang login.

    penggunaLogin = auth.currentUser;

    if (!pilihanRating) {
        pesanReview.textContent =
            "Silakan pilih rating terlebih dahulu.";
        return;
    }

    if (komentar.length < 3) {
        pesanReview.textContent =
            "Review minimal terdiri dari 3 karakter.";
        return;
    }

    if (!informasiKuliner[namaKuliner]) {
        pesanReview.textContent =
            "Data kuliner tidak ditemukan.";
        return;
    }

    tombolKirim.disabled = true;
    tombolKirim.textContent = "Mengirim...";

    try {

        await addDoc(collection(db, "reviews"), {

            userId: penggunaLogin.uid,

            nama: namaPengguna,

            email: penggunaLogin.email || "",

            // ID khusus kuliner agar tidak tercampur dengan wisata.

            wisataId: idReviewKuliner,

            // Nama kuliner disimpan pada field yang sama
            // agar konsisten dengan struktur review wisata.

            namaWisata: namaKuliner,

            // Penanda jenis review.

            jenis: "kuliner",

            rating: Number(pilihanRating.value),

            komentar: komentar,

            dibuatPada: serverTimestamp()

        });

        formReview.reset();

        pesanReview.textContent =
            "Review berhasil dikirim!";

        await tampilkanReview();

    } catch (error) {

        console.error("Gagal mengirim review:", error);

        pesanReview.textContent =
            "Review gagal dikirim. Periksa koneksi internet dan Firebase.";

    } finally {

        tombolKirim.disabled = false;
        tombolKirim.textContent = "Kirim Review";
    }
});
