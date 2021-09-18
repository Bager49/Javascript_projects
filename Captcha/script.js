let captcha = document.querySelector(".captacha");
let reloadButton = document.querySelector(".reload-btn");
let inputField = document.querySelector("input");
let checkButton = document.querySelector(".check-btn");
let txt = document.querySelector(".status-txt");


let upper=[];
let lowwer=[];
let nummero=[];
function character(){
    for (let i = 0; i < 26; i++) {
    upper[i]=String.fromCharCode(i+65);
    lowwer[i]=String.fromCharCode(i+97);
    nummero[i]=String.fromCharCode(i+48);
    }
} character();
let allCharacters=upper.concat(lowwer,nummero.slice(0,10));
console.log(allCharacters)

function getCaptcha(){
    //let randomChar="";
    captcha.innerHTML="";
    for (let i = 0; i < 6; i++) {
      let  randomChar=allCharacters[Math.floor(Math.random()*allCharacters.length)] 
        captcha.innerHTML +=`${randomChar}`;//aralarina bir bosluk birakmak icin matikli en basa bir bosluk
    }
}

reloadButton.addEventListener("click", ()=>{
    getCaptcha();
});

checkButton.addEventListener("click", (e) => {
    console.log(captcha.textContent)
    e.preventDefault();
    txt.style.display="block";
    if (inputField.value == captcha.textContent) {
        txt.style.color="#80ED99";
        txt.textContent="Sifre basarili Robot degilsin :))"
        setTimeout( () => {
            txt.style.display="none";         
            inputField.value="";
            getCaptcha();
        },4000)
    }else{
        txt.style.color="#FF0000";
        txt.textContent="sifre yanlis"
        setTimeout(()=>{
            txt.style.display="none";
            inputField.value="";
            getCaptcha();
        },4000);
    }
})
