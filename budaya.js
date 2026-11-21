
// MENGAMBIL ELEMEN HTML
const cariBudaya = document.getElementById("cariBudaya");

const tombolFilter = document.querySelectorAll(".filter-btn");

const kartuBudaya = document.querySelectorAll(".budaya-card");

const pesanKosong = document.getElementById("pesanKosong");


// KATEGORI AKTIF
let kategoriAktif = "semua";


// FUNGSI MENAMPILKAN BUDAYA
function tampilkanBudaya() {

    const kataKunci = cariBudaya.value.toLowerCase().trim();

    let jumlahTampil = 0;

    kartuBudaya.forEach(function(kartu) {

        // Mengambil seluruh teks dalam kartu
        const isiBudaya = kartu.textContent.toLowerCase();

        // Mengambil kategori kartu
        const kategori = kartu.dataset.kategori;

        // Mengecek pencarian
        const cocokPencarian = isiBudaya.includes(kataKunci);

        // Mengecek kategori
        const cocokKategori =
            kategoriAktif === "semua" ||
            kategori === kategoriAktif;


        // Menampilkan atau menyembunyikan kartu
        if (cocokPencarian && cocokKategori) {

            kartu.style.display = "block";

            jumlahTampil++;

        } else {

            kartu.style.display = "none";

        }

    });


    // Pesan jika tidak ada hasil
    if (jumlahTampil === 0) {

        pesanKosong.style.display = "block";

    } else {

        pesanKosong.style.display = "none";

    }

}


// FITUR PENCARIAN
cariBudaya.addEventListener("input", tampilkanBudaya);


// FITUR FILTER
tombolFilter.forEach(function(tombol) {

    tombol.addEventListener("click", function() {

        // Menghapus kelas aktif dari semua tombol
        tombolFilter.forEach(function(btn) {

            btn.classList.remove("aktif");

        });


        // Mengaktifkan tombol yang dipilih
        tombol.classList.add("aktif");


        // Mengambil kategori yang dipilih
        kategoriAktif = tombol.dataset.filter;


        // Memperbarui tampilan
        tampilkanBudaya();

    });

});
