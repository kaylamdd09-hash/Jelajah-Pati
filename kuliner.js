// MENGAMBIL ELEMEN HTML
const kolomCari = document.getElementById("cariKuliner");
const semuaKartu = document.querySelectorAll(".kuliner-card");
const tombolFilter = document.querySelectorAll(".filter-btn");
const pesanKosong = document.getElementById("pesanKosong");

let kategoriAktif = "semua";


// FITUR PENCARIAN DAN FILTER
function tampilkanKuliner() {
    const kataKunci = kolomCari.value.toLowerCase();
    let jumlahTampil = 0;

    semuaKartu.forEach(function(kartu) {

        const namaKuliner = kartu.querySelector("h3")
            .textContent.toLowerCase();

        const kategori = kartu.dataset.kategori;

        // MENCARI NAMA KULINER
        const cocokNama = namaKuliner.includes(kataKunci);

        // MEMILIH KATEGORI
        const cocokKategori =
            kategoriAktif === "semua" ||
            kategori === kategoriAktif;

        // MENAMPILKAN KARTU YANG SESUAI
        if (cocokNama && cocokKategori) {
            kartu.style.display = "block";
            jumlahTampil++;
        } else {
            kartu.style.display = "none";
        }
    });

    // PESAN JIKA KULINER TIDAK DITEMUKAN
    pesanKosong.style.display =
        jumlahTampil === 0 ? "block" : "none";
}


// FITUR PENCARIAN
kolomCari.addEventListener("input", function() {
    tampilkanKuliner();
});


// FITUR FILTER KATEGORI
tombolFilter.forEach(function(tombol) {

    tombol.addEventListener("click", function() {

        // MENGHAPUS STATUS AKTIF DARI TOMBOL LAIN
        tombolFilter.forEach(function(btn) {
            btn.classList.remove("aktif");
        });

        // MEMBERIKAN STATUS AKTIF PADA TOMBOL DIPILIH
        tombol.classList.add("aktif");

        // MENGAMBIL KATEGORI YANG DIPILIH
        kategoriAktif = tombol.dataset.kategori;

        tampilkanKuliner();
    });
});