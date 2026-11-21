
const cariNongkrong = document.getElementById("cariNongkrong");

const tombolFilter = document.querySelectorAll(".filter-btn");

const kartuNongkrong = document.querySelectorAll(".nongkrong-card");

const pesanKosong = document.getElementById("pesanKosong");

let kategoriAktif = "semua";


function tampilkanNongkrong() {

    const kataKunci = cariNongkrong.value.toLowerCase().trim();

    let jumlahTampil = 0;

    kartuNongkrong.forEach(function(kartu) {

        const isiTempat = kartu.textContent.toLowerCase();

        const kategori = kartu.dataset.kategori;

        const cocokPencarian = isiTempat.includes(kataKunci);

        const cocokKategori =
            kategoriAktif === "semua" ||
            kategori === kategoriAktif;

        if (cocokPencarian && cocokKategori) {

            kartu.style.display = "block";

            jumlahTampil++;

        } else {

            kartu.style.display = "none";

        }

    });

    pesanKosong.style.display =
        jumlahTampil === 0 ? "block" : "none";

}


// PENCARIAN
cariNongkrong.addEventListener("input", tampilkanNongkrong);


// FILTER KATEGORI
tombolFilter.forEach(function(tombol) {

    tombol.addEventListener("click", function() {

        tombolFilter.forEach(function(btn) {
            btn.classList.remove("aktif");
        });

        tombol.classList.add("aktif");

        kategoriAktif = tombol.dataset.filter;

        tampilkanNongkrong();

    });

});
