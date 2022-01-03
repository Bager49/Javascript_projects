const getRAndomLowwer = () => {

    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

const getRAndomUpper = () => {

    return String.fromCharCode(Math.floor(Math.random() * 26) + 67)
}
const getRAndomNumber = () => {

    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

const getRandomSembol = () => {
    const symbol = "@!#&$?/%.,-_";
    return symbol[Math.floor(Math.random() * symbol.length)]
}

const randomFunction = {
    getRandomSembol,
    getRAndomUpper,
    getRAndomNumber,
    getRAndomLowwer
};

const genaratePasswort = () => {
    const length = 12; 
    let generatedPassword = "";
    for (let x = 0; x < length; x++) {
        var rndm = Math.floor(Math.random() * 4)
        generatedPassword += Object.values(randomFunction)[rndm]();
    }
    return generatedPassword;
}

const Result = document.getElementById('result');
const generateButton = document.getElementById('generate');
const clipboardButton = document.getElementById('clipboard');

generateButton.addEventListener("click", () => {
    Result.value = genaratePasswort();
})

clipboardButton.addEventListener("click", () => {

    if (Result != "") {
        const password = Result.value;
        const textarea = document.createElement('textarea');
        textarea.value = password;
        document.body.appendChild(textarea);

        textarea.select();
        document.execCommand('copy')
        textarea.remove();
        alert("Password wurde kopiert..")
    }

})

// Random Color

const randomColor = document.querySelector('#renkUret');
const generatedColor = document.querySelector('#renk');
let hh = document.querySelectorAll('.hh');

const color_codes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const createColor = () => {
    let Color = "#";
    for (var i = 0; i < 6; i++) {
        Color += color_codes[Math.floor(Math.random() * color_codes.length)];
    }
    return Color;
}
const HeadColor = () => {
    let baslikRenk = "#";
    for (var i = 0; i < 6; i++) {
        baslikRenk += color_codes[Math.floor(Math.random() * color_codes.length)];
    }
    return baslikRenk;
}

randomColor.addEventListener("click", () => {
    document.body.style.backgroundColor = createColor()

    let renkAl = HeadColor(); 
    for (var i = 0; i < hh.length; i++) {
        hh[i].style.color = renkAl;
    }
    generatedColor.value = createColor() + ", " + renkAl; 
})