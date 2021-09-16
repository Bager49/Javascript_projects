let dropList=document.querySelectorAll(".drop-list select");
let von=document.querySelector(".from select");
let auf=document.querySelector(".to select");
const getButton=document.querySelector('form button');
const exchangeIcon=document.querySelector('.icon');

for (let index = 0; index < dropList.length; index++) {
    for(para_birimleri in country_list){
        let selected;
        if(index==0){
            selected=para_birimleri == "USD" ? "selected" : "";
        }else if(index == 1){
            selected=para_birimleri == "TRY" ? "selected" : "";
        }
       let parabirim=`<option value="${para_birimleri}" ${selected}>${para_birimleri}</option>`;
       dropList[index].insertAdjacentHTML("beforeend",parabirim);
    }
    dropList[index].addEventListener("change",e =>{
        loadFlage(e.target);
        //alert(e.target.value);
    });
}

function loadFlage(alinan_target) {
    for(code in country_list){
        if(code == alinan_target.value){
            let imgTag=alinan_target.parentElement.querySelector("img");
            imgTag.src=`https://www.countryflags.io/${country_list[code]}/flat/64.png`; 
        }
    }
}
getButton.addEventListener("click", e =>{
    e.preventDefault();//formu yollamasini durdurmak icin
    getExchangeRate();
});

exchangeIcon.addEventListener("click", () =>{
    let tempCode=von.value;//vondaki para birimini bu degiskene at
    von.value=auf.value;//von u aufa esitle yani von artik auf
    auf.value=tempCode;//auf da artik von vonu zatenen degiskene atamistik
    getExchangeRate();
    loadFlage(von);
    loadFlage(auf); 
})
function getExchangeRate(){
    const amount=document.querySelector(".amount input");
    let amountVal=amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value="1";
        amountVal=1;
    }
    let url=`https://v6.exchangerate-api.com/v6/ff5caf6755ef13006589bbc5/latest/${von.value}`;//von.value hangi para birimi dönusecek
    fetch(url).then(cevap => ( cevap.json()))
    .then(result =>{
        console.log(result)
        let exchangeRate=result.conversion_rates[auf.value];//hangi para birimine dönüsücekse onu burda degiskene atiyoruz zaten ne kadar degeri var json nesnesinin icinde belli
        let totalExchangeRate=(amountVal*exchangeRate).toFixed(2);//toFixed virgülden sonra kac rakam getirir onu
        let exchangeRateText=document.querySelector(".exchange-rate");
        exchangeRateText.textContent=` ${amountVal} ${von.value} =${totalExchangeRate} ${auf.value}`;
       // console.log(totalExchangeRate);
    }).catch( () =>{
        exchangeRateText.textContent="Etwas ist schief gegangen bitten versuchen Sie nochmal"
    });
};


window.addEventListener("load", () =>{
    getExchangeRate();
})