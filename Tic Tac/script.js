const selcetBox = document.querySelector('.select-box'),
selectX_Btn = selcetBox.querySelector(".playerX"),
selectO_Btn = selcetBox.querySelector(".playerO");
let playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll(".play-area span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");



window.onload = () =>{

    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick" , "clickedBox(this)");
        
    }

    selectX_Btn.onclick = () => {
        selcetBox.classList.add("hide");
        playBoard.classList.add("show");
        
    }
    selectO_Btn.onclick = () => {
        selcetBox.classList.add("hide");
        playBoard.classList.add("show");
        //players.setAttribute("class" , "players active");
        players.setAttribute("class","players active player");
    }
}

let playerXicon="bi bi-x-lg";
let playerOicon="bi bi-circle";
let playerSign = "X";
let runBot = true;

//kullanici tiklama olayi
function  clickedBox(element) {
    //console.log(element)
    if (players.classList.contains("player")) {
        element.innerHTML=`<i class="${playerOicon}"></i>`;
        players.classList.add("active");
        playerSign = "O";
        element.setAttribute("id", playerSign);
    }else{
        element.innerHTML=`<i class="${playerXicon}"></i>`;
        players.classList.add("active");
        playerSign = "X";
        element.setAttribute("id", playerSign);
    }
   selectWinner();
   players.style.pointerEvents = "none";
    element.style.pointerEvents = "none";//ayni elemente ayni islem bir daha yapilmasin icin yani eventi bir kere uygula demek
    let randomDelayTime = ((Math.random() * 1000)+400).toFixed();
    console.log(randomDelayTime);
    setTimeout( () => {
        bot(runBot);
    },randomDelayTime)
};

//Bilgisayar tiklama
function  bot() {
   
    let array = [];
    if(runBot){ //if runBot is true
        playerSign = "O"; //change the playerSign to O so if player has chosen X then bot will O
    for (let i = 0; i < allBox.length; i++) {
        if (allBox[i].childElementCount == 0) {//eger spanin cocugu yoksa yani i elementi yani tiklanmamissa bossa
            array.push(i);
           // console.log(i + ".nci index numarali "+" spanin icinde element yok")
        }
        
    }
    let rndBox = array[Math.floor(Math.random()*array.length)];
    console.log(rndBox);
    if (array.length > 0) {
        if (players.classList.contains("player")) {
            allBox[rndBox].innerHTML=`<i class="${playerXicon}"></i>`;
            players.classList.remove("active");
            playerSign = "X";
            allBox[rndBox].setAttribute("id" , playerSign);
        }else{
            allBox[rndBox].innerHTML=`<i class="${playerOicon}"></i>`;
            players.classList.remove("active");
            playerSign = "O";
            allBox[rndBox].setAttribute("id" , playerSign);
        }   
        selectWinner();
    }
    allBox[rndBox].style.pointerEvents = "none";
    players.style.pointerEvents = "auto"
   console.log(array);
   playerSign= "X";
}
}

//kazanani belirle

function getClass(classname) {
    return document.querySelector(".box" + classname).id;
}

function cehckClass(val1, val2, val3, sign) {
    if (getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign) {
        return true;
    }
}

function  selectWinner() {
    if (cehckClass(1,2,3,playerSign) || cehckClass(4,5,6,playerSign) || cehckClass(6,7,8,playerSign) || cehckClass(1,4,7,playerSign) || cehckClass(2,5,8,playerSign) || cehckClass(3,6,9,playerSign) ||cehckClass(1,5,9,playerSign) || cehckClass(3,5,7,playerSign) ) 
    {
        console.log(playerSign +" "+ " kazandi");
        runBot = false; //passing the false boolen value to runBot so bot won't run again
        bot(runBot); //calling bot function
        setTimeout(()=>{ //after match won by someone then hide the playboard and show the result box after 700ms
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700); //1s = 1000ms
        wonText.innerHTML = `Player <p>${playerSign}</p> hat das Spiel gewonnen!`;
    }else{ //if all boxes/element have id value and still no one win then draw the match
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != ""){
            runBot = false; //passing the false boolen value to runBot so bot won't run again
            bot(runBot); //calling bot function
            setTimeout(()=>{ //after match drawn then hide the playboard and show the result box after 700ms
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700); //1s = 1000ms
            wonText.textContent = "Ausgeleic!"; //displaying draw match text
        }
    }
}

replayBtn.onclick = ()=>{
    window.location.reload(); //reload the current page on replay button click
}