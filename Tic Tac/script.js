const selcetBox = document.querySelector(".select-box"),
    selectX_Btn = selcetBox.querySelector(".playerX"),
    selectO_Btn = selcetBox.querySelector(".playerO");
let playBoard = document.querySelector(".play-board"),
    players = document.querySelector(".players"),
    allBox = document.querySelectorAll(".play-area span"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector("button");

window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectX_Btn.onclick = () => {
        selcetBox.classList.add("hide");
        playBoard.classList.add("show");
    };
    selectO_Btn.onclick = () => {
        selcetBox.classList.add("hide");
        playBoard.classList.add("show");
        //players.setAttribute("class" , "players active");
        players.setAttribute("class", "players active player");
    };
};

let playerXicon = "bi bi-x-lg";
let playerOicon = "bi bi-circle";
let playerSign = "X";
let runBot = true;

//kullanici tiklama olayi
function clickedBox(element) {
    //console.log(element)
    if (players.classList.contains("player")) {
        element.innerHTML = `<i class="${playerOicon}"></i>`;
        players.classList.add("active");
        playerSign = "O";
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<i class="${playerXicon}"></i>`;
        players.classList.add("active");
        playerSign = "X";
        element.setAttribute("id", playerSign);
    }
    selectWinner();
    players.style.pointerEvents = "none";
    element.style.pointerEvents = "none"; //ayni elemente ayni islem bir daha yapilmasin icin yani eventi bir kere uygula demek

    //bilgisayarin biraz gecikmeli oynamasi icin
    let randomDelayTime = (Math.random() * 1000 + 200).toFixed();
    console.log(randomDelayTime);
    setTimeout(() => {
        bot(runBot);
    }, randomDelayTime);
}

//Bilgisayar tiklama
function bot() {
    let array = [];
    let arrayX = [];
    let arrayO = [];
    if (runBot) {
        //if runBot is true
        playerSign = "O"; //change the playerSign to O so if player has chosen X then bot will O
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                //eger spanin cocugu yoksa yani i elementi yani tiklanmamissa bossa
                array.push(i);
            } else if (allBox[i].childElementCount != 0) {
                if (allBox[i].children[0].classList.value.length == 10) { //bi bi-x-lg bu classin uzunlugu 10 a esit digeri daha fazla oyle kiyasladik
                    arrayX.push(i);
                } else {
                    arrayO.push(i);
                }
            }
        }
        console.log("X : " + arrayX)
        console.log("O : " + arrayO)

        let rndBox = array[Math.floor(Math.random() * array.length)];
        if (array.length > 0) {
            if (players.classList.contains("player")) {
                allBox[rndBox].innerHTML = `<i class="${playerXicon}"></i>`;
                players.classList.remove("active");
                playerSign = "X";
                allBox[rndBox].setAttribute("id", playerSign);
            } else {
                if ((arrayX.includes(0) && arrayX.includes(1)) && array.includes(2) || (arrayX.includes(8) && arrayX.includes(5)) && array.includes(2) || (arrayX.includes(6) && arrayX.includes(4)) && array.includes(2)) {
                    allBox[2].innerHTML = `<i class="${playerOicon}"></i>`;
                    players.classList.remove("active");
                    playerSign = "O";
                    allBox[2].setAttribute("id", playerSign);
                    allBox[2].style.pointerEvents = "none";
                    players.style.pointerEvents = "auto";
                } else if ((arrayX.includes(1) && arrayX.includes(2)) && array.includes(0) || (arrayX.includes(3) && arrayX.includes(6)) && array.includes(0) || (arrayX.includes(8) && arrayX.includes(4)) && array.includes(0)) {
                    allBox[0].innerHTML = `<i class="${playerOicon}"></i>`;
                    players.classList.remove("active");
                    playerSign = "O";
                    allBox[0].setAttribute("id", playerSign);
                    allBox[0].style.pointerEvents = "none";
                    players.style.pointerEvents = "auto";
                } else if ((arrayX.includes(0) && arrayX.includes(3)) && array.includes(1) || (arrayX.includes(4) && arrayX.includes(7)) && array.includes(1)) {
                    allBox[1].innerHTML = `<i class="${playerOicon}"></i>`;
                    players.classList.remove("active");
                    playerSign = "O";
                    allBox[1].setAttribute("id", playerSign);
                    allBox[1].style.pointerEvents = "none";
                    players.style.pointerEvents = "auto";
                } else if ((arrayX.includes(0) && arrayX.includes(3)) && array.includes(6) || (arrayX.includes(2) && arrayX.includes(4)) && array.includes(6) || (arrayX.includes(8) && arrayX.includes(7)) && array.includes(6)) {
                    allBox[6].innerHTML = `<i class="${playerOicon}"></i>`;
                    players.classList.remove("active");
                    playerSign = "O";
                    allBox[6].setAttribute("id", playerSign);
                    allBox[6].style.pointerEvents = "none";
                    players.style.pointerEvents = "auto";
                } else if ((arrayX.includes(3) && arrayX.includes(4)) && array.includes(5) || (arrayX.includes(2) && arrayX.includes(8)) && array.includes(5)) {
                    allBox[5].innerHTML = `<i class="${playerOicon}"></i>`;
                    players.classList.remove("active");
                    playerSign = "O";
                    allBox[5].setAttribute("id", playerSign);
                    allBox[5].style.pointerEvents = "none";
                    players.style.pointerEvents = "auto";
                } else if ((arrayX.includes(4) && arrayX.includes(5)) && array.includes(3) || (arrayX.includes(0) && arrayX.includes(6)) && array.includes(3)) {
                    allBox[3].innerHTML = `<i class="${playerOicon}"></i>`;
                    players.classList.remove("active");
                    playerSign = "O";
                    allBox[3].setAttribute("id", playerSign);
                    allBox[3].style.pointerEvents = "none";
                    players.style.pointerEvents = "auto";
                } else if ((arrayX.includes(1) && arrayX.includes(4)) && array.includes(7) || (arrayX.includes(6) && arrayX.includes(8)) && array.includes(7)) {
                    allBox[7].innerHTML = `<i class="${playerOicon}"></i>`;
                    players.classList.remove("active");
                    playerSign = "O";
                    allBox[7].setAttribute("id", playerSign);
                    allBox[7].style.pointerEvents = "none";
                    players.style.pointerEvents = "auto";
                } else if ((arrayX.includes(6) && arrayX.includes(7)) && array.includes(8) || (arrayX.includes(2) && arrayX.includes(5)) && array.includes(8) || (arrayX.includes(0) && arrayX.includes(4)) && array.includes(8)) {
                    allBox[8].innerHTML = `<i class="${playerOicon}"></i>`;
                    players.classList.remove("active");
                    playerSign = "O";
                    allBox[8].setAttribute("id", playerSign);
                    allBox[8].style.pointerEvents = "none";
                    players.style.pointerEvents = "auto";
                } else if ((arrayX.includes(0) && arrayX.includes(8)) && array.includes(4) || (arrayX.includes(2) && arrayX.includes(6)) && array.includes(4) || (arrayX.includes(0) && arrayX.includes(8)) && array.includes(4) || (arrayX.includes(1) && arrayX.includes(7)) && array.includes(4)) {
                    allBox[4].innerHTML = `<i class="${playerOicon}"></i>`;
                    players.classList.remove("active");
                    playerSign = "O";
                    allBox[4].setAttribute("id", playerSign);
                    allBox[4].style.pointerEvents = "none";
                    players.style.pointerEvents = "auto";
                } else {
                    allBox[rndBox].innerHTML = `<i class="${playerOicon}"></i>`;
                    players.classList.remove("active");
                    playerSign = "O";
                    allBox[rndBox].setAttribute("id", playerSign);
                    allBox[rndBox].style.pointerEvents = "none";
                }
            }
            selectWinner();
        }
        // allBox[rndBox].style.pointerEvents = "none";
        players.style.pointerEvents = "auto";
        console.log("bos olanlar : " + array);
        playerSign = "X";
    }
}

//kazanani belirle

function getClass(classname) {
    //tum box larin id lerini al sana gelen
    return document.querySelector(".box" + classname).id;
}

function cehckClass(val1, val2, val3, sign) {
    if (
        getClass(val1) == sign &&
        getClass(val2) == sign &&
        getClass(val3) == sign
    ) {
        return true;
    }
}

function selectWinner() {
    if (
        //yukarda checkClass fonksiyonu ile kazanma surecini yaptik ve simdi burda da bu durumlardan herhangi biri dogru ise durumunu degerlendiriyoruz
        cehckClass(1, 2, 3, playerSign) ||
        cehckClass(4, 5, 6, playerSign) ||
        cehckClass(6, 7, 8, playerSign) ||
        cehckClass(1, 4, 7, playerSign) ||
        cehckClass(2, 5, 8, playerSign) ||
        cehckClass(3, 6, 9, playerSign) ||
        cehckClass(1, 5, 9, playerSign) ||
        cehckClass(3, 5, 7, playerSign)
    ) {
        console.log(playerSign + " " + " hat gewonnen");
        runBot = false; //passing the false boolen value to runBot so bot won't run again
        bot(runBot); //calling bot function
        setTimeout(() => {
            //after match won by someone then hide the playboard and show the result box after 700ms
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700); //1s = 1000ms
        wonText.innerHTML = `Player <p>${playerSign}</p> hat das Spiel gewonnen!`;
    } else {
        //if all boxes/element have id value and still no one win then draw the match
        if (
            getClass(1) != "" &&
            getClass(2) != "" &&
            getClass(3) != "" &&
            getClass(4) != "" &&
            getClass(5) != "" &&
            getClass(6) != "" &&
            getClass(7) != "" &&
            getClass(8) != "" &&
            getClass(9) != ""
        ) {
            runBot = false; //passing the false boolen value to runBot so bot won't run again
            bot(runBot); //calling bot function
            setTimeout(() => {
                //after match drawn then hide the playboard and show the result box after 700ms
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 500);
            wonText.textContent = "Ausgegleich!"; //displaying draw match text
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload(); //reload the current page on replay button click
};
