const wrapper = document.querySelector('.container');
let musicImg = document.querySelector(".img-area img");
let musicName = document.querySelector(".song-details .name");
let musicArtist = document.querySelector(".song-details .artist");
let mainAudio = document.querySelector("#main-audio");
let playPauseBtn = document.querySelector(".play-pause");
let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");
let progressBar = document.querySelector(".progress-bar");
let progressArea = document.querySelector(".progress-area");

let musicList = document.querySelector(".music-list");
let showMoreBtn = document.querySelector("#more-music");
let hideMusicBtn = document.querySelector("#close");

let musicIndex = Math.floor(Math.random()*allMusic.length)+1;

window.addEventListener("load" , () => {
    loadMusic(musicIndex);
    playing_now();
})

function loadMusic(indexNo) {
    musicName.innerText = allMusic[indexNo-1].name;
    musicArtist.innerText = allMusic[indexNo-1].artist;
    musicImg.src = `images/${allMusic[indexNo-1].img}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNo-1].src}.mp3`;
}

function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").classList.remove("bi-play-fill");
    playPauseBtn.querySelector("i").classList.add("bi-pause-fill");
    mainAudio.play();
}
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").classList.remove("bi-pause-fill");
    playPauseBtn.querySelector("i").classList.add("bi-play-fill");
    mainAudio.pause();
}

playPauseBtn.addEventListener("click" ,  () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();//muzik durmussa pause musigi cagir degilse playMusic i cagir 
    playing_now();
});

prevBtn.addEventListener("click" , () => {
   if (musicIndex > 1 ) {
       musicIndex --;
   }else musicIndex=allMusic.length;
   // console.log(musicIndex)
    loadMusic(musicIndex);
    playMusic();
    playing_now();
});
nextBtn.addEventListener("click" , () => {
    next();
});
function  next() {
    if (musicIndex < 6 ) {
        musicIndex ++;
    }else musicIndex=1;
     //console.log(musicIndex)
     loadMusic(musicIndex);
     playMusic();
     playing_now();
}

mainAudio.addEventListener("timeupdate", (e) => {//muzik oynatildigi surece bu fonksiyon calisir
   // console.log(e);
    const currentTime = e.target.currentTime;//gecen zamani aldik 
   // console.log(currentTime);
    const duration = e.target.duration;
   // console.log(duration);
   
    let progressWidth = (currentTime / duration)*100;
    progressBar.style.width =progressWidth+"%";
    
    mainAudio.addEventListener("loadeddata" , () => {//data yuklenirken calisir sadece, toplam süre ve dakikayi hesaplayip gerekli elemente yazmak icin
        let musicDurationTime = document.querySelector(".duration");    
        //toplam sureyi hesaplama
        let audioduration = mainAudio.duration;//duration toplam zamani verir
        let totalMinute = Math.round(audioduration / 60);//burdada anlasilacagi uzere 60 a bölüp dakikaya dönüstürdük  
        let totalSecond = Math.floor(audioduration % 60);//60  a bölümünden kalani alip sniyeye ekledik
        if (totalSecond < 10) {
            totalSecond =`0${totalSecond}`;
        }
        musicDurationTime.textContent = totalMinute+":"+totalSecond;       
    });
    
    let musicCurrentTime = document.querySelector(".current");
        //muzik calarken gecen sure
        let min = Math.round(currentTime / 60);
        let sec = Math.floor(currentTime % 60);
        //console.log(sec)
        if (sec < 10) {
            sec =`0${sec}`;
        }
        musicCurrentTime.textContent = min+":"+sec; 
});
//oynatma cubugunu surukle birakl ile muzigi ileri geri alma
progressArea.addEventListener("click" , (e) =>{
    let progressWidthVal = progressArea.clientWidth;//progressbarin kendi uzunlugunu aldik
    console.log(progressWidthVal);
    let clickedOffSetX = e.offsetX;
    console.log(e.offsetX);//burda e nin icinde bulunan offsetX degerini yukarda cektik
    let songDuration = mainAudio.duration;//toplam dakikayi verir ama sayi olarak
   console.log(songDuration);
    console.log(mainAudio.currentTime);
    mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;//progressbarin uzunluguna progressbarin x konumunu bölersek ve toplam dakika ile carparsak  nerde oldugunu buluruz
    playMusic();
   // console.log(mainAudio.currentTime);
});


//Tekrar butonunu degistirmek
const repeatBtn = document.querySelector("#repeat-plist");
repeatBtn.addEventListener("click" , () => {//bu fonksiyon sadece css ve htmli degistirir yani görüntüyü asagida ise muzik islemleri icin ayri bir fonksiyon bulunmaktadir
    let getClass = repeatBtn.classList;
    //console.log(getClass.value)
    
    switch (getClass.value) {
        case  "bi bi-arrow-repeat":
                repeatBtn.classList.remove("bi-arrow-repeat");
                repeatBtn.classList.add("bi-arrow-left-right");
                repeatBtn.setAttribute("title", "Lied geloopt");
                break;
        case "bi bi-arrow-left-right":
            repeatBtn.classList.remove("bi-arrow-left-right");
            repeatBtn.classList.add("bi-shuffle");
            repeatBtn.setAttribute("title", "Zufallswiedergabe");
            break;
        case "bi bi-shuffle":
            repeatBtn.classList.remove("bi-shuffle");
            repeatBtn.classList.add("bi-arrow-repeat");
            repeatBtn.setAttribute("title", "Playlist geloopt");
            break;

    }
});

//simdi de muzigi tekrar ettirme playlisti tekrar ettitme islemleri
mainAudio.addEventListener("ended" , () => {
    let getClass = repeatBtn.classList;
    // console.log(getClass.value)
    
    switch (getClass.value) {
        case  "bi bi-arrow-repeat"://normal akis yani bitince siradakine gecer
                next();
                break;
        case "bi bi-arrow-left-right"://tekrar ayni parcayi yurutme
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "bi bi-shuffle"://rastgele caldirir
            let randIndex = Math.floor((Math.random()*allMusic.length)+1);
            console.log(randIndex)
            do{
                randIndex = Math.floor((Math.random()*allMusic.length)+1)
            }while(musicIndex == randIndex)
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic()
            playing_now();
           // loadMusic(musicIndex);
            break;
    }  
});


//Music Liste
showMoreBtn.addEventListener("click" , () => {
    musicList.classList.toggle("show");//css kisminda tanimlamistik
});
hideMusicBtn.addEventListener("click" , () => {
    showMoreBtn.click();
});

let ulTag = document.querySelector(".container ul");

for (let i = 0; i < allMusic.length; i++) {
    let litag;
    litag =`<li li-index="${i+1}">
        <div class="row">
            <span>${allMusic[i].name}</span>
            <p>${allMusic[i].artist}</p>
        </div>
        <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
            <span id="${allMusic[i].src}" class="audio-duration">00:00</span>
        </li>
    `;
   // ulTag.innerHTML +=litag;
    ulTag.insertAdjacentHTML("beforeend", litag);

    let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);//spana id ata
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);//audio ya class ata asagida kullanilacak surelerin hesaplanip sapana tekrar yazilmasi icin
   // console.log(liAudioTag);
    //console.log(liAudioDuration);

    liAudioTag.addEventListener("loadeddata" , () => {
        let audioduration = liAudioTag.duration;//duration toplam zamani verir
        let totalMinute = Math.round(audioduration / 60);//burdada anlasilacagi uzere 60 a bölüp dakikaya dönüstürdük  
        let totalSecond = Math.floor(audioduration % 60);//60  a bölümünden kalani alip sniyeye ekledik
        if (totalSecond < 10) {
            totalSecond =`0${totalSecond}`;
        }
        liAudioDuration.innerHTML = `${totalMinute}:${totalSecond}`;
        liAudioDuration.setAttribute("t-duration", `${totalMinute}:${totalSecond}`);
    })
}

const allLiTag = ulTag.querySelectorAll("li");
//console.log(allLiTag);
function playing_now() {
   // console.log(musicIndex);
    for (let j = 0; j < allLiTag.length; j++) {
        let audioTag =allLiTag[j].querySelector(".audio-duration")

         if (allLiTag[j].classList.contains("playing")) {
            allLiTag[j].classList.remove("playing");
            audioTag.innerHTML=audioTag.getAttribute("t-duration");//biz sureleri yukarda 211 nci satirda t-duration attribiutunun icine atmistik ordan cekecez
        }

        if (allLiTag[j].getAttribute("li-index") == musicIndex) {
            allLiTag[j].classList.add("playing");
            audioTag.innerHTML="Şuan Çalıyor"
        }
        allLiTag[j].setAttribute("onclick" , "clicked(this)");
        
    }
};

function clicked(element) {//tiklanan li elemaninin icindeki muzigin calmasi icin..
    let getLiIndex = element.getAttribute("li-index");
    //console.log(getLiIndex);
   // musicIndex = Number(getLiIndex)+1;
   // console.log(musicIndex);
   musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playing_now();

}

