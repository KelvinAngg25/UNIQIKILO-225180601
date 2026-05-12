var listProduk = [
    {gambar : "Asset_Tugas/Pria/Produk1.jpg" ,kategori: "Kaos", ukuran : "Pria, XS-3XL", judul : "T-Shirt Soft Touch Kerah Bulat Lengan Panjang", harga: 129, diskon: 199, jenis : "Pria"}, 
    {gambar : "Asset_Tugas/Pria/Produk2.jpg",kategori: "Jaket", ukuran : "Pria, XS-3XL", judul : "Jaket Ritsleting DRY-EX Proteksi Sinar UV", diskon: "-", harga: 399, jenis : "Pria"},
    {gambar : "Asset_Tugas/Pria/Produk3.jpg",kategori: "Kaos", ukuran : "Pria, XS-3XL", judul : "UT (T-Shirt) The Super Mario Galaxy Movie", diskon: "-", harga:199, jenis : "Pria"},
    {gambar : "Asset_Tugas/Pria/Produk4.jpg",kategori: "Jaket", ukuran : "Pria, S-XL", judul : "Jaket Coach Peanuts", harga: 699, diskon: 899, jenis : "Pria"},
    {gambar : "Asset_Tugas/Wanita/Produk5.jpg",kategori: "Kemeja", ukuran : "Wanita, S-3XL", judul : "Kemeja Body Denim Lengan", diskon: "-", harga: 349, jenis : "Wanita"},
    {gambar : "Asset_Tugas/Wanita/Produk6.jpg",kategori: "Kemeja", ukuran : "Wanita, S-3XL", judul : "Kemeja Oxford Boxy Lengan Pendek", diskon: "-", harga: 349, jenis : "Wanita"},
    {gambar : "Asset_Tugas/Wanita/Produk7.jpg",kategori: "Kaos", ukuran : "Wanita, XS-M", judul : "ALRISM Katun T-Shirt", harga: 129, diskon: 199, jenis : "Wanita"},
    {gambar : "Asset_Tugas/Wanita/Produk8.jpg",kategori: "Jaket", ukuran : "Wanita, M-XL", judul : "Jaket Aktif Ultra Stretch Ritsleting", harga: 399, diskon: 499, jenis : "Wanita"},
    {gambar : "Asset_Tugas/Anak/Produk9.jpg",kategori: "Kaos", ukuran : "Anak, 4-5Y (110cm)-14Y (160cm)", judul : "KIDS Alrism Katun T- Shirt Garis Kerah Bulat", diskon: "-", harga: 149, jenis : "Anak"},
    {gambar : "Asset_Tugas/Anak/Produk10.jpg",kategori: "Kaos", ukuran : "Anak, 4-5Y (110cm)-14Y (160cm)", judul : "KIDS Alrism Katun T- Shirt Grafis Kerah Bulat", diskon: "-", harga: 149, jenis : "Anak"}]

var keranjang = [];
var hasilproduk = document.querySelector('#hasilproduk');

var isiproduk = document.querySelector('#isicard');  


var hasilKategori = document.querySelector('#kategori')
var hasilUrutkan = document.querySelector('#urutkan')

function filter() {
    var isiKategori = hasilKategori.value;
    var isiRadio = document.querySelector('input[name="radio"]:checked').value;
    var isiUrutkan = hasilUrutkan.value;
    var hasil = [];
    for (var i = 0; i < listProduk.length; i++) {
        hasil.push(listProduk[i]);
    }

    if (isiKategori != "") {
        for (var i = hasil.length-1 ; i >= 0 ; i--) {
            if (hasil[i].kategori != isiKategori) {
                hasil.splice(i, 1);
            }
        }
    }
    if (isiRadio != "") {
        for (var i = hasil.length-1 ; i >= 0 ; i--) {
            if (hasil[i].jenis != isiRadio) {
                hasil.splice(i, 1);
            }
        }
    }

    if (isiUrutkan != "") {
        if (isiUrutkan === "termurah") {
            for (var i = 0 ; i < hasil.length-1 ; i++) {
                for (var j = 0 ; j < hasil.length-i-1 ; j++) {
                    var temp = hasil[j+1];
                    if (temp.harga < hasil[j].harga) {
                        hasil[j+1] = hasil[j];
                        hasil[j] = temp;
                    }
                }
            }
        } else {
            for (var i = 0 ; i < hasil.length-1 ; i++) {
                for (var j = 0 ; j < hasil.length-i-1 ; j++) {
                    var temp = hasil[j+1];
                    if (temp.harga > hasil[j].harga) {
                        hasil[j+1] = hasil[j];
                        hasil[j] = temp;
                    }
                }
            }
        }
    }
    isiproduk.innerHTML = "";
    for (var i = 0; i < hasil.length; i++) {
        printProduk(hasil[i]);
    }
    cetakTulisanHasil(hasil);
}

function printProduk(produk) {
    if (produk.diskon != "-") {
        isiproduk.innerHTML += `
            <div class="card border-light-subtle" style="width: 14rem; height: 32rem;">
                <img src="${produk.gambar}" alt="..." style="width: 224px; height: 290px; margin-left: -13px; margin-top:-1px; border-top-left-radius : 5px; border-top-right-radius : 5px;">
                <div class="card-body text-start" style=" display: flex; flex-direction : column;">
                <div>                     
                    <span class="badge text-bg-dark" style="width: 100%;">${produk.kategori}</span><p></p>
                    <p class="card-text text-black-50 ukuran mb-1">${produk.ukuran}</p>
                    <p class="card-title namaPakaian mb-1" style="font-weight: bold">${produk.judul}</p>
                    <p class="card-text hargapakaian text-danger mb-0" style="font-size: 16px; font-weight: bold">Rp${produk.harga}.000</p>
                    <p class="card-text hargadiskon text-secondary" style="font-weight: bold"><strike>Rp${produk.diskon}.000</strike></p>
                </div>
                    <div class="mt-auto">
                    <button class="btn btn-dark" style="font-size: 12px; width: 100%;" onclick="tambahKeranjang('${produk.judul}')">Tambah ke Keranjang</button>
                    </div>
                </div>
            </div>
        `
    } else {
        isiproduk.innerHTML += `
            <div class="card border-light-subtle" style="width: 14rem; height: 32rem;">
                <img src="${produk.gambar}" alt="..." style="width: 224px; height: 290px; margin-left: -13px; margin-top:-1px;border-top-left-radius : 5px; border-top-right-radius : 5px;">
                <div class="card-body text-start" style=" display: flex; flex-direction : column;">
                <div>                     
                    <span class="badge text-bg-dark" style="width: 100%;">${produk.kategori}</span><p></p>
                    <p class="card-text text-black-50 ukuran mb-1">${produk.ukuran}</p>
                    <p class="card-title namaPakaian mb-1" style="font-weight: bold">${produk.judul}</p>
                    <p class="card-text hargapakaian text-dark mb-0" style="font-size: 16px; font-weight: bold">Rp${produk.harga}.000</p>
                </div>
                    <div class="mt-auto">
                        <button class="btn btn-dark" style="font-size: 12px; width: 100%;" onclick="tambahKeranjang('${produk.judul}')">Tambah ke Keranjang</button>
                    </div>
                </div>
            </div>
        `
    }
}


function cetakTulisanHasil(hasil) {
    hasilproduk.innerHTML = `<h4 style="font-weight: bold;">Hasil: ${hasil.length} Produk</h4>`
}

function tambahKeranjang(produk) {
    var temp = ""
    if (keranjang.length == 0) {
        for(var i = 0; i < listProduk.length ; i++) {
            if (listProduk[i].judul == produk) {
                keranjang.push(listProduk[i])
                keranjang[0].totalbelanja = 0;
                keranjang[0].totalharga = 0;
            }
        }
    }
    var ada = false;
    for(var i = 0; i < keranjang.length ; i++) {
        if (keranjang[i].judul == produk) {
            ada = true;
            keranjang[i].totalbelanja += 1;
            keranjang[i].totalharga += keranjang[i].harga;
            totalHargaKeranjang += keranjang[i].harga;
        }
    }
    if (ada == false) {
        for(var i = 0; i < listProduk.length ; i++) {
            if (listProduk[i].judul == produk) {
                keranjang.push(listProduk[i])
                keranjang[keranjang.length-1].totalbelanja = 1;
                keranjang[keranjang.length-1].totalharga = keranjang[keranjang.length-1].harga;
                totalHargaKeranjang += keranjang[keranjang.length-1].harga;
            }
        }
    }
    alert("Produk Berhasil Ditambahkan Ke Keranjang");
}
var home = document.querySelector('#home');
var cart = document.querySelector('#keranjang');
var navbarHome = document.querySelector('#produk');
var navbarCart = document.querySelector('#cart');
var isiKeranjang = document.querySelector('#isiKeranjang');
var isiTotalHarga = document.querySelector('#totalHargaKeranjang');
var totalHargaKeranjang = 0;
function gantiTampilanHome() {
    home.classList.add('hidden')
    cart.classList.remove('hidden')

    navbarHome.classList.remove('fw-bold')
    navbarCart.classList.add('fw-bold')

    navbarHome.classList.remove('text-dark')
    navbarCart.classList.add('text-dark')

    navbarHome.classList.add('text-secondary')
    navbarCart.classList.remove('text-secondary')
    
    cetakIsiKeranjang();
}

function cetakIsiKeranjang() {
    isiKeranjang.innerHTML = "";
    if (keranjang.length == 0) {
        isiKeranjang.innerHTML = `
            <div class="container" id="isikeranjang" style="margin-top: 30px;">
                <div class="isi col-12 d-flex" style=" height: 200px; align-items: center; text-align: center; flex-direction: column; justify-content: center">
                    <h4 class="fw-bold">Keranjang Kamu Kosong</h4>
                    <h5 class="text-secondary mb-4">Yuk Belanja Dulu di Halaman Produk</h5>
                    <button type="button" class="btn btn-dark" onclick="gantiTampilanCart()">Belanja Sekarang</button>
                </div>
            </div>
        `
    } else {
        for(var i = 0; i < keranjang.length ; i++) {
            var isiHargaTotal = keranjang[i].totalharga
            if (keranjang[i].totalharga >= 1000) {
                isiHargaTotal = keranjang[i].totalharga / 1000;
            }
            isiKeranjang.innerHTML += `
                <div class="container">
                    <div class="card mb-3 shadow sm" style="width: 100%; height: 287.5px; border: none;">
                    <div class="row g-0" style="align-items: center">
                        <div class="col-md-2">
                        <img src="${keranjang[i].gambar}" class="img-fluid rounded-start" alt="..." width="250" style="margin-top: -1px">
                        </div>
                        <div class="col-md-4">
                        <div class="card-body">
                            <p class="card-title fw-bold">${keranjang[i].judul}</p>
                            <p class="card-text text-secondary">${keranjang[i].ukuran}</p>
                            <h5 class="card-text">Rp${keranjang[i].harga}.000</p>
                        </div>
                        </div>
                        <div class="col-md-3">
                        <div class="d-flex" style="align-items: center; justify-content: center;">
                            <button type="button" class="btn btn-outline-secondary" onclick="kurangKeranjang('${keranjang[i].judul}')">-</button>
                            <p class="ms-2 me-2 mt-3">${keranjang[i].totalbelanja}</p>
                            <button type="button" class="btn btn-outline-secondary" onclick="nambahKeranjang('${keranjang[i].judul}')">+</button>
                        </div>
                        </div>
                            <div class="col-md-3" style="text-align: end;">
                                <div class="card-body">
                                    <h5 class="card-title">Rp${isiHargaTotal}.000</h5>
                                    <button type="button" class="btn btn-danger" onclick="hapusIsi('${keranjang[i].judul}')">Hapus</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    }
    if (keranjang.length == 0) {
        isiTotalHarga.innerHTML = `<h3 class="fw-bold">Total: Rp0</h3>`;
    } else {
        if (totalHargaKeranjang < 1000) {
            isiTotalHarga.innerHTML = `<h3 class="fw-bold">Total: Rp${totalHargaKeranjang}.000</h3>`;
        } else {
            var isiHargaDepan = totalHargaKeranjang / 1000;
            isiTotalHarga.innerHTML = `<h3 class="fw-bold">Total: Rp${isiHargaDepan}.000</h3>`;
        }
    }
}

function kurangKeranjang(judul) {
    for(var i = 0; i < keranjang.length ; i++) {
        if (judul == keranjang[i].judul) {
            keranjang[i].totalbelanja -= 1
            keranjang[i].totalharga -= keranjang[i].harga
            totalHargaKeranjang -= keranjang[i].harga
            if (keranjang[i].totalbelanja <= 0) {
                keranjang.splice(i,1);
            }
        }
    }
    cetakIsiKeranjang();
}

function nambahKeranjang(judul) {
    for(var i = 0; i < keranjang.length ; i++) {
        if (judul == keranjang[i].judul) {
            keranjang[i].totalbelanja += 1
            keranjang[i].totalharga += keranjang[i].harga
            totalHargaKeranjang += keranjang[i].harga
        }
    }
    cetakIsiKeranjang();
}

function hapusIsi(judul) {
    for(var i = 0; i < keranjang.length ; i++) {
        if (judul == keranjang[i].judul) {
            totalHargaKeranjang -= keranjang[i].totalharga
            keranjang.splice(i,1)
        }
    }
    cetakIsiKeranjang();
}
 
function hapusKeranjang() {
    keranjang = [];
    cetakIsiKeranjang();
}

function gantiTampilanCart() {
    home.classList.remove('hidden')
    cart.classList.add('hidden')

    navbarHome.classList.add('fw-bold')
    navbarCart.classList.remove('fw-bold')

    navbarHome.classList.add('text-dark')
    navbarCart.classList.remove('text-dark')
    
    navbarHome.classList.remove('text-secondary')
    navbarCart.classList.add('text-secondary')
}

for (var i = 0; i < listProduk.length ; i++) {
    printProduk(listProduk[i]);
}
