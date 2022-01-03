//-------------------------------Dom Manipulation------------------------------------------>
let genislik = document.querySelector('#genislik');
let yukseklik = document.querySelector('#yukseklik');
let arka_renk = document.querySelector('#arka_renk');
let kalinlik = document.querySelector('#kalinlik');
var cerceve_ = document.getElementById('tip');
let cerceve_renk = document.querySelector('#cerceve_renk');
let dis_bosluk = document.querySelector('#dis_bosluk');
let ic_bosluk = document.querySelector('#ic_bosluk');
let dondurme = document.querySelector('#rotate');

let olustur = document.querySelector('#olustur');
var sagTaraf = document.querySelector('.sag');
olustur.addEventListener('click', div_olustur);
let sayac = 0;

function div_olustur() {

    sayac++
    if (sayac < 2) {
        var new_div = document.createElement("CLASS");
        new_div.innerHTML = "yeni div";
        new_div.id = "neu_class"
        new_div.style.float = "left";
        document.getElementById('container').appendChild(new_div);


    }
    let neu_class = document.querySelector('#neu_class');

    neu_class.style.width = genislik.value + "px";
    neu_class.style.height = yukseklik.value + "px";
    neu_class.style.backgroundColor = arka_renk.value;
    neu_class.style.borderWidth = kalinlik.value;
    neu_class.style.borderStyle = cerceve_.value;
    neu_class.style.borderColor = cerceve_renk.value;
    neu_class.style.margin = dis_bosluk.value + "px";
    neu_class.style.padding = ic_bosluk.value + "px";
    neu_class.style.transform = "rotate(" + dondurme.value + "deg)";

    /*With Template Literal  `` 
    neu_class.style.cssText=`
    width:${genislik.value}px;
    height:${yukseklik.value}px;
    background-color:${arka_renk.value};
    border-width:${kalinlik.value};
    border-style:${cerceve_.value};
    border-color:${cerceve_renk.value};
    margin:${dis_bosluk.value}px;
    padding:${ic_bosluk}px;
    transform:rotate(${dondurme.value}deg);
    `
    */

}

/*---------------------------Top------------------------------*/
let yukarii = document.querySelector('#yukarii');
addEventListener("scroll", function () {
    const mesafe = window.scrollY;
    console.log(mesafe)
    if (mesafe < 300) {
        yukarii.classList.add("gizle");
    } else {
        yukarii.classList.remove("gizle");
    }
});
yukarii.addEventListener("click", yukari_cikar);

function yukari_cikar() {
    window.scrollTo(0, 0);
    console.clear();
}
yukarii.addEventListener("mousemove", function () {
    yukarii.innerHTML = "&uArr;";
})
yukarii.addEventListener("mouseout", function () {
    yukarii.innerHTML = "TOP";
})


/*------------------------Mouse Takip eden Goz------------------------------------*/
let goz_bebekleri = document.getElementsByClassName('goz-bebek');
addEventListener("mousemove", function () {
    var x = event.clientX;
    var x = x * 100 / window.innerWidth + "%"; //yuzde olarak almak icin
    var y = event.clientY;
    var y = y * 100 / window.innerHeight + "%";

    for (var i = 0; i < goz_bebekleri.length; i++) {
        goz_bebekleri[i].style.left = x;
        goz_bebekleri[i].style.top = y;
        goz_bebekleri[i].style.transform = "translate(-" + x + ",-" + y + ")";

    }
    /* alternative
          goz_bebekleri[0].style.left=x;
          goz_bebekleri[0].style.top=y;
           goz_bebekleri[1].style.left=x;
          goz_bebekleri[1].style.top=y;
    */



})
addEventListener("mouseout", function () {
    goz_bebekleri[1].style.left = 50 + "%";
    goz_bebekleri[1].style.top = 50 + "%";
    goz_bebekleri[0].style.left = 50 + "%";
    goz_bebekleri[0].style.top = 50 + "%";
})
/*------------------------Mouse Takip eden Goz Son------------------------------------*/


/*--------------------------Schere Stein Papier---------------------------------*/
var oyuncu_skor = document.getElementsByClassName("oyuncu_skor")[0];
var bilgisayar_skor = document.getElementsByClassName("bilgisayar_skor")[0];
let tas = document.querySelector('#tas');
let makas = document.querySelector('#makas');
let kagit = document.querySelector('#kagit');
let oyuncu_secimi = document.querySelector('#oyuncu_secimi')
let bilgisayar_secimi = document.querySelector('#bilgisayar_secimi');
let mesaj = document.querySelector('.mesaj');
//let reset=document.querySelector('.reset')
let oyuncu_sayi;
let oyuncu_sonuc;

let oyuncu = 0;
let pc = 0;
const secim = ["tas", "kagit", "makas"];
var rastgelesayi;


function bilgisayarSecim() {

    rastgelesayi = Math.floor(Math.random() * 3);
    bilgisayar_secimi.setAttribute("src", `images/${secim[rastgelesayi]}.png`)
    return rastgelesayi;
}


tas.addEventListener("click", function () {
    oyuncu_secimi.setAttribute("src", `images/tas.png`)
    oyuncu_sayi = "tas";
    oyuncu_sonuc = 0;
    bilgisayarSecim();
    //sonuc();
    sonuc2();
})
kagit.addEventListener("click", function () {
    oyuncu_secimi.setAttribute("src", `images/kagit.png`)
    oyuncu_sayi = "kagit";
    oyuncu_sonuc = 1;
    bilgisayarSecim();
    //sonuc();
    sonuc2();
})
makas.addEventListener("click", function () {
    oyuncu_secimi.setAttribute("src", `images/makas.png`)
    oyuncu_sayi = "makas";
    oyuncu_sonuc = 2;
    bilgisayarSecim();
    //sonuc();
    sonuc2();
})

function sonuc2() {
    if (rastgelesayi == oyuncu_sonuc) {
        mesaj.innerHTML = "Ausgleich";
    } else if (rastgelesayi == 0 && oyuncu_sonuc == 1) {
        mesaj.innerHTML = "Spieler won";
        oyuncu++;
        oyuncu_skor.innerHTML = oyuncu;
    } else if (rastgelesayi == 0 && oyuncu_sonuc == 2) {
        mesaj.innerHTML = "Computer won";
        pc++;
        bilgisayar_skor.innerHTML = pc;
    } else if (rastgelesayi == 1 && oyuncu_sonuc == 0) {
        mesaj.innerHTML = "Computer won";
        pc++;
        bilgisayar_skor.innerHTML = pc;
    } else if (rastgelesayi == 1 && oyuncu_sonuc == 2) {
        mesaj.innerHTML = "Spieler won";
        oyuncu++;
        oyuncu_skor.innerHTML = oyuncu;
    } else if (rastgelesayi == 2 && oyuncu_sonuc == 0) {
        mesaj.innerHTML = "Spieler won";
        oyuncu++;
        oyuncu_skor.innerHTML = oyuncu;
    } else if (rastgelesayi == 2 && oyuncu_sonuc == 1) {
        mesaj.innerHTML = "Computer won";
        pc++;
        bilgisayar_skor.innerHTML = pc;
    }
}

function reset() {
    bilgisayar_skor.innerHTML = "0";
    oyuncu_skor.innerHTML = "0";
    pc = 0;
    oyuncu = 0;
}