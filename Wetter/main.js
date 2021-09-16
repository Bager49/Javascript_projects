const wrapper=document.querySelector(".wrapper");
let inputPart=document.querySelector(".input-part");
let infoTxt=document.querySelector(".info-txt");
let inputField=document.querySelector("input");
let localBtn=document.querySelector(".input-part button");
wIcon=document.querySelector(".weather-part img");
let zuruck= document.querySelector("header i");
let api;

inputField.addEventListener("keyup", (e) =>{
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
       
    }
});
function requestApi(city){
    api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=de&appid=5ddd6c0a6cc14d41a138883b2e8abeeb`;
    fetchData();
    
}
localBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);//eger basarili ise konum onsuccess(onSuccess e tüm konum verileini json verisi olarak gönderir) i degilse on Error u calistir
    }else{
        alert("dein Browser not supported geolocation api");
    }
});

function onError(error){
    infoTxt.innerHTML=error.message;
    infoTxt.classList.add("error");
}
function onSuccess(position){
    console.log(position)
    const {latitude, longitude}=position.coords//enlem ve boylam larini aldik kullanicinin
     api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=de&appid=5ddd6c0a6cc14d41a138883b2e8abeeb`;
    fetchData();
   
}

function fetchData(){
    infoTxt.innerHTML="hava durumu verileri aliniyor...";
    infoTxt.classList.add("pending");
    //console.log(api);
    fetch(api)
    .then(cvp =>(cvp.json()))
    .then(result => weatherDetails(result))
}



function weatherDetails(info){
    infoTxt.classList.replace("pending","error");
    if (info.cod == "404") {
        infoTxt.innerHTML=`${inputField.value} ist nicht eine Stadt..`;
        inputField.value="";
    }else{ 
        let stadt=info.name;//burdaki info JSOn adönusmus api verisi aslinda
        let land=info.sys.country;
        let situation=info.weather[0].description;
        let feuchtigkeit=info.main.humidity;
        let fuhlt=info.main.feels_like;
        let temp=info.main.temp;
        let id=info.weather[0].id;//id ye göre havanin durumunu cektik cunku api de id ye göre isimlendirmisler
        if (id == 800) {
            wIcon.src="Weather Icons/clear.svg";
        }else if(id >= 200 && id <=232){
            wIcon.src="Weather Icons/storm.svg";  
        }else if (id >= 300 && id <=321) {
            wIcon.src="Weather Icons/snow.svg";
        }
        else if (id >= 600 && id <= 622) {
            wIcon.src="Weather Icons/rain.svg";
        }
        else if (id >= 701 && id <= 781) {
            wIcon.src="Weather Icons/haze.svg";
        }
        else if (id >= 801 && id <= 804) {
            wIcon.src="Weather Icons/cloud.svg";
        }
        //html elementlerine verileri atama vakti
        wrapper.querySelector(".temp .numb").innerHTML=Math.round(temp);
        wrapper.querySelector(".location span").innerHTML =`${stadt}, ${land}`;
        wrapper.querySelector(".weather").innerHTML=situation;
        wrapper.querySelector(".humidity span").innerHTML=feuchtigkeit+"%";
        wrapper.querySelector(".temp .numb-2").innerHTML=Math.round(fuhlt);

        infoTxt.classList.remove("pending","error");
        wrapper.classList.add("active");
        console.log(info)
         inputField.value="";
    }

};

//zuruck
zuruck.addEventListener("click", () =>{
    wrapper.classList.remove("active");
})



