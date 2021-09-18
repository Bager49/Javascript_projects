 const wrapper = document.querySelector('.wrapper'),
 toast = wrapper.querySelector('.toast'),
 wifiIcon = wrapper.querySelector('.icon'),
 title = wrapper.querySelector('span'),
 subTitle = wrapper.querySelector('p'),
 closeIcon = wrapper.querySelector('.close-icon');


 window.onload = () => {
     function ajax() {
         let xhr = new XMLHttpRequest();
         xhr.open("GET", "http://jsonplaceholder.typicode.com/posts" , true);//uzak sunucudaki bu json dosyasina  erismeye calisacaz eger ulasirsa intenet erisimi var demektir
         xhr.onload = () =>{
           // console.log(e)
           // console.log(xhr.response)
           if (xhr.status == 200 && xhr.status < 300) {
               console.log("alles in ordnung verbindung ist ganz sauber.." );
               toast.classList.remove("offline");
               title.innerText="Du bist gerade Online";
               subTitle.innerText="Yuppiiii!!!";
               wifiIcon.innerHTML=`<i class="bi bi-wifi"></i>`;

               closeIcon.onclick = () =>{
                wrapper.classList.add("hide");
            }
            setInterval( () => {
                wrapper.classList.add("hide");
            },5000);
           }else{
                offline();
           }
        }
        xhr.onerror = () =>{//error olunca onerror icindeki length:1 oluyor ve onload daki status 0 oluyor
           // console.log(e)
           //console.log("Verbindung ist weg")
           offline()
        }
        xhr.send();
        
        function offline() {
            wrapper.classList.remove("hide")
             toast.classList.add("offline");
             title.innerText="Du bist gerade offline";
             subTitle.innerText="Schade!!!";
             wifiIcon.innerHTML=`<i class="bi bi-wifi-off"></i>`;
             
         }
     }
     setInterval( () =>{
         ajax()
     },500)
 }