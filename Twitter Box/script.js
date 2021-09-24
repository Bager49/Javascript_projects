const editableInput = document.querySelector(".editable"),
readOnlyInput =document.querySelector(".readonly"),
placeholder =document.querySelector(".placeholder"),
counter =document.querySelector(".counter"),
button =document.querySelector(".content button");

console.log(placeholder.textContent)
editableInput.addEventListener("keyup" , (e) => {
    let element = e.target;
    checkInput(element);
});
editableInput.addEventListener("keypress", (e) => {
    let element = e.target;
    checkInput(element);
    placeholder.style.display ="none";

});

function checkInput(element) {
       
    let maxLength = 100;
    let currentLength=element.innerText.length;
    let textTag = element.innerHTML;
    //console.log(textTag)
    if (currentLength <= 0) {
        placeholder.style.display = "block";     
        counter.style.display = "none";     
        button.classList.remove("active");
    }else{
        placeholder.style.display = "none";     
        counter.style.display = "block";
        button.classList.add("active");
    }
    counter.textContent =maxLength - currentLength;
    if (currentLength >maxLength) {
        let overText = element.innerText.substr(maxLength);//fazla texti al substr(2) 2. elemandan sonrasini al 
        overText = `<span class="highlight">${overText}</span>`;
        textTag = element.innerText.substr(0, maxLength) + overText;
        readOnlyInput.style.zIndex = "1";
        counter.style.color = "#e0245e";
        button.classList.remove("active");
        //console.log(textTag);
    }else{
        readOnlyInput.style.zIndex = "-1";
        counter.style.color = "#333";
    }
    readOnlyInput.innerHTML = textTag;
}
