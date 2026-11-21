
// =========================================
// 1. MENGAMBIL ELEMEN HTML
// =========================================

// Mengambil kolom pencarian
const kolomCari = document.getElementById("cariWisata");

// Mengambil semua kartu wisata
const semuaKartu = document.querySelectorAll(".wisata-card");

// Mengambil pesan ketika wisata tidak ditemukan
const pesanKosong = document.getElementById("pesanKosong");

// Mengambil semua tombol kategori
const tombolKategori = document.querySelectorAll(".btn-filter-kategori");

// Menyimpan kategori yang sedang dipilih
let kategoriAktif = "semua";


// =========================================
// 2. FUNGSI PENCARIAN DAN FILTER KATEGORI
// =========================================

function tampilkanWisata() {

    // Mengambil kata yang diketik
    const kataKunci = kolomCari.value.toLowerCase().trim();

    // Menghitung jumlah wisata yang ditemukan
    let jumlahDitemukan = 0;

    // Memeriksa setiap kartu wisata
    semuaKartu.forEach(function (kartu) {

        // Mengambil seluruh teks dalam kartu
        const informasiWisata = kartu.textContent.toLowerCase();

        // Mengambil nama kategori pada kartu
        const kategoriKartu = kartu.querySelector(".kategori")
            .textContent.toLowerCase().trim();

        // Memeriksa kesesuaian pencarian
        const cocokPencarian =
            informasiWisata.includes(kataKunci);

        // Memeriksa kesesuaian kategori
        const cocokKategori =
            kategoriAktif === "semua" ||
            kategoriKartu === kategoriAktif;

        // Menampilkan kartu jika kedua kondisi sesuai
        if (cocokPencarian && cocokKategori) {

            kartu.style.display = "block";
            jumlahDitemukan++;

        } else {

            kartu.style.display = "none";

        }

    });

    // Menampilkan pesan jika tidak ada wisata ditemukan
    if (pesanKosong) {
        pesanKosong.style.display =
            jumlahDitemukan === 0 ? "block" : "none";
    }

}


// =========================================
// 3. MENJALANKAN FITUR PENCARIAN
// =========================================

kolomCari.addEventListener("input", function () {

    tampilkanWisata();

});


// =========================================
// 4. MENJALANKAN FILTER KATEGORI
// =========================================

tombolKategori.forEach(function (tombol) {

    tombol.addEventListener("click", function () {

        // Mengambil kategori yang dipilih
        kategoriAktif = tombol.dataset.kategori;

        // Menghapus status aktif dari semua tombol
        tombolKategori.forEach(function (item) {
            item.classList.remove("active");
        });

        // Memberikan status aktif pada tombol terpilih
        tombol.classList.add("active");

        // Memperbarui daftar wisata
        tampilkanWisata();

    });

});


// =========================================
// 5. MENAMPILKAN SEMUA WISATA SAAT AWAL
// =========================================

tampilkanWisata();
