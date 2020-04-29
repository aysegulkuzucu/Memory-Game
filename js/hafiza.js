// Değişken bildirimleri
const hamleS = document.querySelector('.hamleSayisi');
const hamleM = document.querySelector('.hamleMetni');
const zamanSa = document.querySelector('#zaman .saat');
const zamaDk = document.querySelector('#zaman .dakika');
const zamanSn = document.querySelector('#zaman .saniye');
const kutucuk = document.querySelector('#basitModel');
const kutuKapat = document.querySelector('.carpi-butonu');
const kutuYenidenBtn = document.querySelector('.yeniden-butonu');
const tasarimHamle = document.querySelector('.kutu-tasarim .hamleSayisi');
const tasarimSaat = document.querySelector('.kutu-tasarim .saat');
const tasarimDakika = document.querySelector('.kutu-tasarim .dk');
const tasarimSaniye = document.querySelector('.kutu-tasarim .saniye');
const kare = document.querySelector('.kare'); 

const kartlar = [].slice.call(kare.children); // Kartlar listesini al

let acilanKartlar = [];  // Açılan kartların listesi
let hamle = 0; // Yanlış hamle sayısı
let karsilastirma = 0; // Karşılaştırma sayısı
let gecenSaniye = 0; // Oyun başladığından bu yana geçen toplam saniye
let sa = 0; // saat
let dak = 0; //dakika
let sn = 0; // saniye
let zaman = undefined; // zaman
let oyunBasladi = false; // Oyun durumu

// Kart sembolleri listesi oluşturma
//ikonlar asagıdaki linkte
//https://fontawesome.com/icons?d=listing&s=brands&m=free
let cardSymbols = ['android', 'slack', 'github', 'meetup', 'linux', 'steam', 'apple', 'stack-overflow',
                    'android', 'slack', 'github', 'meetup', 'linux', 'steam', 'apple', 'stack-overflow'];

kare.addEventListener('click', acilanKart);   // Kartlara bağlı tıklama etkinliği
kutuKapat.addEventListener('click', kapat);   // Çıkan kutuyu kapatmak için x (çarpı) düğmesine tıklayın
kutuYenidenBtn.addEventListener('click', oyunYeniden);  // Oyunu yeniden başlatmak için kutucuk'un yeniden düğmesine tıklayın

oyunYeniden(); // Yeni oyuna Başla

function acilanKart(event) { // Karta 'open (açık)' ve 'show (göster)' sınıfları ekleme işlevi
    zamanBasla();
    var target = event.target;
    const parent = target.parentElement;
    if (parent.classList.contains('kart')) {
        target = parent;
    }
    if (!acilanKartlar.includes(target)) {
        target.classList.add('acik', 'goster');
        acilanKartlar.push(target);
        esitKontrol();
    }
}
function zamanBasla() {
    if (!oyunBasladi) {
        oyunBasladi = true;
        zaman = setInterval(ayarlananZaman, 1000);
    }
}
function zamanDur() {
    oyunBasladi = false;
    clearInterval(zaman);
}
function ayarlananZaman() {
    let kalanSaniye = ++gecenSaniye;
    sa = parseInt(kalanSaniye / 3600);
    zamanSa.textContent = stringifyZaman(sa);
    kalanSaniye = kalanSaniye % 3600;
    dak = parseInt(kalanSaniye / 60)
    zamaDk.textContent = stringifyZaman(dak);
    kalanSaniye = kalanSaniye % 60;
    sn = kalanSaniye;
    zamanSn.textContent = stringifyZaman(sn);
}
// Kart için 'open' ve 'show' sınıflarını kaldırma işlevi
function kartTers(kart) {
    setTimeout(() => {
        kart.classList.remove('acik', 'goster');
    }, 500)
}
// Karta 'eslesme' sınıfı ekleme işlevi
function kartEsles(kart) {
    setTimeout(() => {
        kart.classList.add('eslesme', 'sicrama');
    }, 500)
}
function esitKontrol() {
    const length = acilanKartlar.length;
    if (length === 2) {

        const last = acilanKartlar[1];
        const preLast = acilanKartlar[0];

        if (last.children[0].classList.toString() ===
            preLast.children[0].classList.toString()) {
            eslesmeMiktari();
            kartEsles(last);
            kartEsles(preLast);
        } else {
            kartTers(last);
            kartTers(preLast);
        }
        hamleMiktari();
        acilanKartlar = [];
        sonucKontrol();
    }
}
function eslesmeMiktari() {
    karsilastirma++;
}
function hamleMiktari() {
    hamle++;
    hamleS.textContent = hamle;
    if (hamle === 1) {
        hamleM.textContent = ' . Hamle';
    } else {
        hamleM.textContent = ' . Hamle';
    }
}
function sonucKontrol() {
    if (karsilastirma === 8) {
        zamanDur();
        kutuAc();
    }
}
function oyunYeniden() {
    kapat();
    skorSifirla();
    kareSifirla();
}
function skorSifirla() {
    hamle = 0; // Hamle sayısını sıfırlar
    hamleS.textContent = hamle;
    karsilastirma = 0; //  karsilastirmaları sıfırlar
    gecenSaniye = 0; // zamanı sıfırlar
    sa = 0;
    dak = 0;
    sn = 0;
    zamanSa.textContent = '00';
    zamaDk.textContent = '00';
    zamanSn.textContent = '00';

    zamanDur(); // Zamanı durduran fonksiyon
}
function kareSifirla() {

    acilanKartlar = []; // "acilanKartlar" dizisini temizle
    cardSymbols = shuffle(cardSymbols); //Kart üzerindeki sembolleri karıştırır
    kartlar.forEach((kart, index) => { // Tüm kartlar üzerinde yineleme
        kart.classList.remove('acik', 'goster', 'eslesme', 'sicrama');  // Sınıfları kaldır
        removeClassByPrefix(kart.children[0], 'fa-'); // Sembolleri kaldır
        const symbol = `fa-${cardSymbols[index]}`; // kartlara yeni semboller ekle
        kart.children[0].classList.add(symbol);
    });
}
function kutuAc() {
    tasarimSaat.textContent = sa > 0 ? `${sa} saat, ` : '';
    tasarimDakika.textContent = dak > 0 ? `${dak} dakika ve ` : '';
    tasarimSaniye.textContent = `${sn} saniye içinde`;
    tasarimHamle.textContent = `${hamle} hamle yaparak`;
    kutucuk.style.display = 'block';
}
function kapat() {
    kutucuk.style.display = 'none';
0
}
// yardımcı Fonsiyonlar

function removeClassByPrefix(el, prefix, replace = '') {
    var regx = new RegExp('\\b' + prefix + '(.*)?\\b', 'g');
    el.className = el.className.replace(regx, replace);
    return el;
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function stringifyZaman(val) {
    var valString = val + '';
    return valString.length >= 2 ? `${val}` : `0${val}`;
}