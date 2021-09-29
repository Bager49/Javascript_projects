let girisBtn = document.querySelector('.giris');
let container = document.querySelector('.container');
let closeBtn = document.querySelector('.close');
let copyBtn = document.querySelector('.btn-copy');
let input = document.querySelector('.input-area input');





girisBtn.onclick = () => {
    girisBtn.classList.add("hide");
    container.classList.add("show");
};

closeBtn.onclick = () => {
    container.classList.remove("show");
    girisBtn.classList.remove("hide");
    input.value="";
    


}


copyBtn.onclick = () => {
    const metniAl = input.value;
    if(metniAl !=""){
        const textarea= document.createElement("textarea");
        textarea.value = metniAl;
        document.body.appendChild(textarea);
       
        textarea.select();
        document.execCommand("copy");
        textarea.remove();

        input.select();
        let copyBtnTxt=copyBtn.innerText;
        copyBtn.innerText="Copiert"
        setTimeout( () => { 
            copyBtn.innerText=copyBtnTxt
            window.getSelection().removeAllRanges();
        },3000)
    }else{
        setTimeout( () => {
            input.setAttribute("placeholder", "bu alan bos birakilamaz");
            input.style.backgroundColor ="#D57E7E"
        },500);

        setTimeout( () => { 
            input.style.backgroundColor ="white"
        },2500)
    }
};