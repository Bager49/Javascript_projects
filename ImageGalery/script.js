const gallery = document.querySelectorAll(".galerry .image"),
previewBox = document.querySelector('.preview-box'),
previewImg = document.querySelector('.preview-box img'),
closeIcon = document.querySelector('.icon');
const currentImg = document.querySelector('.current-img');
const totalImg = document.querySelector('.total-img');
let shadow = document.querySelector('.shadow');


window.onload = () => {
    for (let i = 0; i < gallery.length; i++) {
        //console.log(gallery[i]);
        let newIndex = i;
        let clickImgIndex ;
        totalImg.textContent = gallery.length;
        gallery[i].onclick = () => {
           // console.log(i);
           clickImgIndex = newIndex;
           function preview(){
               let selectedImgUrl = gallery[newIndex].querySelector("img").src;
               previewImg.src = selectedImgUrl;
               currentImg.textContent =newIndex+1;
           }
           
           let prevBtn = document.querySelector('.prev');
           let nextBtn = document.querySelector('.next');
           if (newIndex == 0) {
            prevBtn.style.display = "none";
           }
           if (newIndex >= gallery.length-1) {
            nextBtn.style.display = "none";
           }
           prevBtn.style.display = "block";
           prevBtn.onclick = () => {
               newIndex--;
               if (newIndex == 0) {
                   preview();
                   prevBtn.style.display = "none";
               }else{
                   preview();
                   nextBtn.style.display = "block";
               }
           }
   
           nextBtn.onclick = () => {
               newIndex++;
               if (newIndex >= gallery.length-1) {
                   preview();
                   nextBtn.style.display = "none";
               }else{
                   preview();
                   prevBtn.style.display = "block";
               }
           }
           
           preview();
           previewBox.classList.add("show");
           shadow.style.display = "block";//sayfanin ustune gelip herseyi kapatmamasi icn css de previewbox a z-index 5 degerini verdik
           
           closeIcon.onclick = () => {
               newIndex = clickImgIndex ;
               prevBtn.style.display = "block";
               nextBtn.style.display = "block";
               previewBox.classList.remove("show");
               shadow.style.display = "none";
               
            }
        }
    }
}