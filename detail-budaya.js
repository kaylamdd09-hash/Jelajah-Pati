
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
   1. DATA INFORMASI BUDAYA
===================================== */

const informasiBudaya = {

    "Batik Bakaran": {
        kategori: "Kerajinan",
        lokasi: "Desa Bakaran, Kecamatan Juwana",
        gambar: "images/batik-bakaran.jpg",

        deskripsi:
            "Batik Bakaran merupakan kerajinan batik khas Kabupaten Pati yang berasal dari Desa Bakaran. Batik ini dikenal dengan teknik batik tulis dan motif remekan yang memiliki tampilan khas.",

        cerita:
            "Batik Bakaran menjadi salah satu warisan kerajinan masyarakat Juwana yang terus dipertahankan dari generasi ke generasi. Proses pembuatannya membutuhkan ketelitian dan keterampilan, mulai dari menggambar motif hingga memberikan warna pada kain. Keberadaan batik ini menunjukkan bahwa masyarakat Pati memiliki kekayaan seni kerajinan yang bernilai.",

        makna:
            "Batik Bakaran menjadi bentuk identitas masyarakat setempat sekaligus ungkapan kreativitas dalam menghasilkan karya seni.",

        keunikan:
            "Dikenal dengan motif remekan yang memiliki pola khas. Proses pembuatannya menggunakan teknik batik tulis.",

        nilai:
            "Mengandung nilai kreativitas, ketekunan, keterampilan, dan pelestarian warisan budaya daerah.",

        fakta:
            "Desa Bakaran di Kecamatan Juwana dikenal sebagai salah satu sentra batik khas Kabupaten Pati."
    },


    "Tradisi Meron": {
        kategori: "Tradisi",
        lokasi: "Kecamatan Sukolilo",
        gambar: "images/tradisi-meron.jpg",

        deskripsi:
            "Tradisi Meron merupakan kegiatan budaya masyarakat Sukolilo yang dilaksanakan sebagai bentuk rasa syukur sekaligus memperingati Maulid Nabi Muhammad SAW.",

        cerita:
            "Tradisi Meron menjadi salah satu kegiatan tahunan yang melibatkan masyarakat setempat. Perayaan ini ditandai dengan arak-arakan meron yang dihias menggunakan berbagai hasil bumi dan makanan. Masyarakat berkumpul untuk mengikuti rangkaian kegiatan sebagai bentuk kebersamaan dan pelestarian tradisi yang telah diwariskan.",

        makna:
            "Meron menjadi ungkapan rasa syukur kepada Tuhan sekaligus bentuk penghormatan dalam memperingati kelahiran Nabi Muhammad SAW.",

        keunikan:
            "Memiliki arak-arakan meron yang dihias dengan berbagai hasil bumi dan makanan sehingga menjadi daya tarik tersendiri.",

        nilai:
            "Mengajarkan rasa syukur, kebersamaan, gotong royong, dan kepedulian terhadap tradisi masyarakat.",

        fakta:
            "Tradisi Meron dikenal sebagai salah satu perayaan budaya masyarakat Sukolilo yang melibatkan partisipasi warga."
    },


    "Wayang Topeng Kedung Panjang": {
        kategori: "Kesenian",
        lokasi: "Desa Soneyan, Kecamatan Margoyoso",
        gambar: "images/wayang-topeng.jpg",

        deskripsi:
            "Wayang Topeng Kedung Panjang merupakan kesenian pertunjukan tradisional yang menggunakan topeng sebagai bagian penting dalam penampilannya.",

        cerita:
            "Kesenian topeng menjadi salah satu bentuk ekspresi seni tradisional yang memadukan gerak, penampilan, dan cerita. Penggunaan topeng memberikan karakter tersendiri pada setiap tokoh yang ditampilkan. Kesenian ini menjadi bagian dari kekayaan budaya masyarakat Pati yang perlu dikenal dan dijaga keberlangsungannya.",

        makna:
            "Pertunjukan ini menjadi sarana untuk menyampaikan cerita dan pesan melalui karakter tokoh yang diperankan.",

        keunikan:
            "Penggunaan topeng menjadi ciri khas penampilan dan membantu menggambarkan karakter dalam pertunjukan.",

        nilai:
            "Mengandung nilai seni, kreativitas, kebersamaan, dan penghargaan terhadap kesenian tradisional.",

        fakta:
            "Kesenian topeng memanfaatkan bentuk dan karakter topeng sebagai unsur penting dalam membangun penampilan tokoh."
    },


    "Ketoprak Pati": {
        kategori: "Kesenian",
        lokasi: "Kabupaten Pati",
        gambar: "images/ketoprak-pati.jpg",

        deskripsi:
            "Ketoprak merupakan seni pertunjukan tradisional Jawa yang memadukan dialog, cerita, musik gamelan, dan akting para pemain.",

        cerita:
            "Pertunjukan ketoprak biasanya menghadirkan cerita kehidupan masyarakat, kisah sejarah, maupun cerita tradisional. Para pemain menyampaikan cerita melalui dialog dan gerakan yang diiringi musik gamelan. Kesenian ini menjadi salah satu media hiburan sekaligus sarana untuk mengenalkan nilai-nilai budaya Jawa kepada masyarakat.",

        makna:
            "Ketoprak menjadi sarana hiburan dan penyampaian pesan moral melalui cerita yang ditampilkan di atas panggung.",

        keunikan:
            "Menggabungkan seni peran, dialog berbahasa Jawa, kostum tradisional, serta iringan musik gamelan.",

        nilai:
            "Mengandung nilai pendidikan, kebersamaan, kreativitas, dan pelestarian cerita serta budaya Jawa.",

        fakta:
            "Dalam pertunjukan ketoprak, musik gamelan memiliki peran penting untuk mengiringi suasana dan jalannya cerita."
    },


    "Gong Cik": {
        kategori: "Kesenian",
        lokasi: "Desa Pasucen, Kecamatan Trangkil",
        gambar: "images/gong-cik.png",

        deskripsi:
            "Gong Cik merupakan salah satu kesenian tradisional yang dikenal sebagai bagian dari kekayaan budaya masyarakat Desa Pasucen, Kecamatan Trangkil.",

        cerita:
            "Kesenian Gong Cik menjadi salah satu bentuk ekspresi seni masyarakat setempat. Keberadaannya menunjukkan adanya kreativitas masyarakat dalam mengembangkan dan mempertahankan kesenian tradisional. Pengenalan kesenian daerah seperti ini penting agar generasi muda semakin mengenal kekayaan budaya di lingkungan sekitarnya.",

        makna:
            "Menjadi bentuk ekspresi budaya dan identitas kesenian masyarakat setempat.",

        keunikan:
            "Memiliki nama dan identitas tersendiri sebagai kesenian yang dikenal di lingkungan masyarakat Desa Pasucen.",

        nilai:
            "Mengandung nilai kreativitas, kebersamaan, dan kepedulian terhadap keberlangsungan kesenian daerah.",

        fakta:
            "Gong Cik termasuk kesenian lokal yang berkaitan dengan identitas budaya masyarakat Desa Pasucen."
    },


    "Sedekah Bumi": {
        kategori: "Tradisi",
        lokasi: "Berbagai wilayah di Kabupaten Pati",
        gambar: "images/sedekah-bumi.jpg",

        deskripsi:
            "Sedekah Bumi merupakan tradisi masyarakat sebagai ungkapan rasa syukur atas hasil bumi dan rezeki yang diperoleh dari lingkungan tempat tinggal mereka.",

        cerita:
            "Tradisi Sedekah Bumi masih dikenal di berbagai wilayah Kabupaten Pati. Kegiatan ini biasanya melibatkan masyarakat dalam rangkaian acara bersama. Selain menjadi ungkapan rasa syukur, tradisi ini juga menjadi kesempatan bagi warga untuk berkumpul, mempererat hubungan sosial, dan mempertahankan kebiasaan yang diwariskan oleh generasi sebelumnya.",

        makna:
            "Mengungkapkan rasa syukur atas hasil bumi, rezeki, dan kehidupan yang diberikan oleh Tuhan.",

        keunikan:
            "Pelaksanaannya dapat berbeda di setiap desa, menyesuaikan kebiasaan dan tradisi masyarakat setempat.",

        nilai:
            "Mengajarkan rasa syukur, gotong royong, kebersamaan, dan kepedulian terhadap lingkungan.",

        fakta:
            "Sedekah Bumi dapat ditemukan di berbagai daerah di Indonesia dengan nama dan bentuk pelaksanaan yang berbeda-beda."
    },


    "Sedekah Laut": {
        kategori: "Tradisi",
        lokasi: "Wilayah pesisir Juwana dan Tayu",
        gambar: "images/sedekah-laut.jpeg",

        deskripsi:
            "Sedekah Laut merupakan tradisi masyarakat pesisir sebagai bentuk rasa syukur atas hasil laut dan rezeki yang diperoleh oleh para nelayan.",

        cerita:
            "Masyarakat pesisir memiliki hubungan yang erat dengan laut sebagai sumber mata pencaharian. Melalui tradisi Sedekah Laut, masyarakat mengadakan kegiatan bersama sebagai ungkapan rasa syukur dan doa untuk keselamatan. Tradisi ini juga menjadi momen berkumpulnya masyarakat dalam menjaga kebersamaan dan warisan budaya pesisir.",

        makna:
            "Menjadi ungkapan rasa syukur atas hasil laut serta doa dan harapan agar masyarakat pesisir memperoleh keselamatan.",

        keunikan:
            "Berkaitan erat dengan kehidupan masyarakat nelayan dan memiliki rangkaian kegiatan yang dapat berbeda di setiap wilayah pesisir.",

        nilai:
            "Mengandung nilai rasa syukur, kebersamaan, gotong royong, dan penghormatan terhadap alam.",

        fakta:
            "Tradisi Sedekah Laut memiliki hubungan erat dengan kehidupan masyarakat pesisir yang menggantungkan mata pencaharian pada hasil laut."
    },


    "Tradisi Lamporan": {
        kategori: "Tradisi",
        lokasi: "Desa Soneyan dan Gunungsari, Kabupaten Pati",
        gambar: "images/tradisi-lamporan.jpg",

        deskripsi:
            "Tradisi Lamporan merupakan tradisi turun-temurun masyarakat Pati yang dilaksanakan sebagai doa untuk memohon keselamatan dan menolak berbagai marabahaya.",

        cerita:
            "Tradisi Lamporan dikenal melalui kegiatan kirab obor yang dilakukan oleh masyarakat. Dalam pelaksanaannya, warga mengikuti arak-arakan mengelilingi desa yang diiringi kesenian tradisional. Kegiatan ini menjadi bagian dari kebiasaan masyarakat dalam menjaga tradisi sekaligus mempererat hubungan antarwarga.",

        makna:
            "Menjadi simbol doa dan harapan masyarakat agar lingkungan tempat tinggal diberikan keselamatan dan dijauhkan dari marabahaya.",

        keunikan:
            "Dikenal dengan kirab obor yang mengelilingi desa serta keterlibatan masyarakat dalam rangkaian kegiatan tradisional.",

        nilai:
            "Mengandung nilai kebersamaan, gotong royong, rasa syukur, dan pelestarian tradisi leluhur.",

        fakta:
            "Kirab obor menjadi salah satu unsur yang paling mudah dikenali dari pelaksanaan tradisi Lamporan."
    },


    "Tari Pesantenan": {
        kategori: "Kesenian",
        lokasi: "Kabupaten Pati",
        gambar: "images/tari-pesantenan.jpg",

        deskripsi:
            "Tari Pesantenan merupakan drama tari yang mengangkat kisah sejarah berdirinya Kadipaten Pati dan menggambarkan perjalanan masyarakat pada masa awal terbentuknya wilayah Pati.",

        cerita:
            "Melalui perpaduan gerak tari dan unsur drama, Tari Pesantenan menyampaikan cerita mengenai sejarah dan perjalanan Kadipaten Pati. Pertunjukan ini menjadi salah satu cara untuk mengenalkan kisah daerah melalui seni pertunjukan. Dengan demikian, masyarakat dapat mengenal sejarah Pati melalui bentuk penyampaian yang menarik.",

        makna:
            "Menggambarkan sejarah dan perjalanan terbentuknya wilayah Pati sebagai bagian dari identitas daerah.",

        keunikan:
            "Menggabungkan unsur tari dan drama untuk menyampaikan kisah sejarah daerah.",

        nilai:
            "Mengandung nilai sejarah, kreativitas, kecintaan terhadap daerah, dan penghargaan terhadap warisan budaya.",

        fakta:
            "Nama Pesantenan berkaitan dengan kisah sejarah wilayah Pati yang diangkat sebagai bagian dari pertunjukan."
    }

};


/* =====================================
   2. MENGAMBIL NAMA BUDAYA DARI URL
===================================== */

const parameterURL = new URLSearchParams(window.location.search);

const namaBudaya = parameterURL.get("nama");


/* =====================================
   3. MENGAMBIL ELEMEN HTML
===================================== */

const detailKategori = document.getElementById("detailKategori");
const detailNama = document.getElementById("detailNama");
const detailLokasi = document.getElementById("detailLokasi");
const detailDeskripsi = document.getElementById("detailDeskripsi");
const detailGambar = document.getElementById("detailGambar");

const detailCerita = document.getElementById("detailCerita");
const detailMakna = document.getElementById("detailMakna");
const detailKeunikan = document.getElementById("detailKeunikan");
const detailNilai = document.getElementById("detailNilai");
const detailFakta = document.getElementById("detailFakta");


/* =====================================
   4. MENAMPILKAN DETAIL BUDAYA
===================================== */

function tampilkanDetailBudaya() {

    const budaya = informasiBudaya[namaBudaya];

    // Jika nama budaya tidak ditemukan
    if (!budaya) {

        detailKategori.textContent = "Informasi";
        detailNama.textContent = "Budaya Tidak Ditemukan";

        detailLokasi.textContent = "";

        detailDeskripsi.textContent =
            "Maaf, informasi budaya yang kamu cari belum tersedia.";

        detailCerita.textContent =
            "Silakan kembali ke halaman budaya dan pilih salah satu budaya yang tersedia.";

        detailMakna.textContent = "-";
        detailKeunikan.textContent = "-";
        detailNilai.textContent = "-";
        detailFakta.textContent =
            "Pilih budaya dari daftar yang tersedia untuk membaca informasi lengkapnya.";

        detailGambar.style.display = "none";

        document.title = "Budaya Tidak Ditemukan - Jelajah Pati";

        return;
    }


    // Menampilkan informasi budaya
    detailKategori.textContent = budaya.kategori;

    detailNama.textContent = namaBudaya;

    detailLokasi.textContent =
        "📍 " + budaya.lokasi;

    detailDeskripsi.textContent = budaya.deskripsi;

    detailGambar.src = budaya.gambar;
    detailGambar.alt = namaBudaya;

    detailGambar.style.display = "block";

    detailCerita.textContent = budaya.cerita;

    detailMakna.textContent = budaya.makna;

    detailKeunikan.textContent = budaya.keunikan;

    detailNilai.textContent = budaya.nilai;

    detailFakta.textContent = budaya.fakta;


    // Mengubah judul tab browser
    document.title =
        namaBudaya + " - Jelajah Pati";

}


/* =====================================
   5. MENJALANKAN FUNGSI
===================================== */

tampilkanDetailBudaya();


/* =====================================
   6. FITUR REVIEW BUDAYA
===================================== */

const formReview = document.getElementById("formReview");
const belumLogin = document.getElementById("belumLogin");
const daftarReview = document.getElementById("daftarReview");

const ratingReview = document.getElementById("ratingReview");
const komentarReview = document.getElementById("komentarReview");
const tombolReview = document.getElementById("tombolReview");
const pesanReview = document.getElementById("pesanReview");

// ID unik untuk setiap budaya
const idBudayaReview = namaBudaya
    ? "budaya-" + namaBudaya.toLowerCase().replace(/\s+/g, "-")
    : "";

// Mengatur link login agar kembali ke halaman budaya ini
const linkLoginReview = belumLogin.querySelector("a");

if (linkLoginReview) {
    linkLoginReview.href =
        "login.html?redirect=" + encodeURIComponent(window.location.href);
}


/* =====================================
   7. MENAMPILKAN REVIEW
===================================== */

async function tampilkanReview() {

    daftarReview.innerHTML = "<p>Memuat review...</p>";

    if (!idBudayaReview) {
        daftarReview.innerHTML =
            '<p class="review-kosong">Review belum tersedia.</p>';
        return;
    }

    try {

        const q = query(
            collection(db, "reviews"),
            where("wisataId", "==", idBudayaReview)
        );

        const hasil = await getDocs(q);

        daftarReview.innerHTML = "";

        if (hasil.empty) {
            daftarReview.innerHTML =
                '<p class="review-kosong">Belum ada review untuk budaya ini.</p>';
            return;
        }

        const daftarData = hasil.docs.map((dokumen) => ({
            ...dokumen.data()
        }));

        // Mengurutkan review dari yang terbaru
        daftarData.sort((a, b) => {
            const waktuA = a.dibuatPada?.toMillis?.() || 0;
            const waktuB = b.dibuatPada?.toMillis?.() || 0;

            return waktuB - waktuA;
        });

        daftarData.forEach((data) => {

            const kartu = document.createElement("div");
            kartu.className = "review-card";

            const header = document.createElement("div");
            header.className = "review-header";

            const nama = document.createElement("span");
            nama.className = "review-nama";
            nama.textContent = data.nama || "Pengunjung";

            const rating = document.createElement("span");
            rating.className = "review-rating";

            const nilaiRating = Number(data.rating) || 0;
            rating.textContent =
                "★".repeat(Math.max(0, Math.min(5, nilaiRating))) +
                "☆".repeat(5 - Math.max(0, Math.min(5, nilaiRating)));

            const komentar = document.createElement("p");
            komentar.className = "review-komentar";
            komentar.textContent = data.komentar || "";

            const tanggal = document.createElement("span");
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

            header.appendChild(nama);
            header.appendChild(rating);

            kartu.appendChild(header);
            kartu.appendChild(komentar);
            kartu.appendChild(tanggal);

            daftarReview.appendChild(kartu);
        });

    } catch (error) {

        console.error("Gagal mengambil review:", error);

        daftarReview.innerHTML =
            '<p class="review-kosong">Review belum dapat ditampilkan.</p>';
    }
}


/* =====================================
   8. CEK STATUS LOGIN DAN NAVBAR
===================================== */

const areaProfil = document.getElementById("areaProfil");

let penggunaLogin = null;
let namaPengguna = "Pengunjung";

onAuthStateChanged(auth, async (user) => {

    penggunaLogin = user;

    if (user) {

        // Mengambil nama pengguna dari Firestore
        try {

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {

                namaPengguna =
                    userSnap.data().nama ||
                    user.displayName ||
                    "Pengguna";

            } else {

                namaPengguna = user.displayName || "Pengguna";
            }

        } catch (error) {

            console.error("Gagal mengambil profil:", error);

            namaPengguna = user.displayName || "Pengguna";
        }

        // Menampilkan email dan tombol Logout di navbar
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

        // Menampilkan form review
        formReview.hidden = false;
        belumLogin.hidden = true;

        // Fungsi Logout
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

        namaPengguna = "Pengunjung";

        // Menampilkan tombol Login di navbar
        areaProfil.innerHTML = `
            <a href="login.html" class="btn-login-nav">
                Login
            </a>
        `;

        // Menyembunyikan form review
        formReview.hidden = true;
        belumLogin.hidden = false;
    }

    // Review tetap ditampilkan untuk semua pengunjung
    await tampilkanReview();
});


/* =====================================
   9. MENGIRIM REVIEW
===================================== */

formReview.addEventListener("submit", async function (event) {

    event.preventDefault();

    const user = auth.currentUser;

    // Pastikan pengguna sudah login
    if (!user) {

        pesanReview.textContent =
            "Silakan login terlebih dahulu untuk memberikan review.";

        return;
    }

    const rating = Number(ratingReview.value);
    const komentar = komentarReview.value.trim();

    if (!rating || rating < 1 || rating > 5) {

        pesanReview.textContent =
            "Silakan pilih penilaian terlebih dahulu.";

        return;
    }

    if (!komentar) {

        pesanReview.textContent =
            "Komentar tidak boleh kosong.";

        return;
    }

    tombolReview.disabled = true;
    pesanReview.textContent = "Mengirim review...";

    try {

        // Menggunakan nama dari profil Firestore
        const namaReviewer = namaPengguna;

        // Menyimpan review ke Firestore
        await addDoc(collection(db, "reviews"), {

            userId: user.uid,
            nama: namaReviewer,
            email: user.email || "",
            wisataId: idBudayaReview,
            namaWisata: namaBudaya,
            rating: rating,
            komentar: komentar,
            dibuatPada: serverTimestamp(),
            jenis: "budaya"

        });

        formReview.reset();

        pesanReview.textContent =
            "Review berhasil dikirim!";

        await tampilkanReview();

    } catch (error) {

        console.error("Gagal mengirim review:", error);

        pesanReview.textContent =
            "Review gagal dikirim. Silakan coba lagi.";

    } finally {

        tombolReview.disabled = false;
    }

});
