const filterItem = document.querySelector(".items");
const filterImg = document.querySelectorAll(".image");

window.onload = () => {
    filterItem.onclick = (selectedItem) => {
       if (selectedItem.target.classList.contains("item")) {
           filterItem.querySelector(".active").classList.remove("active");
           selectedItem.target.classList.add("active");
           let getFilterName = selectedItem.target.getAttribute("data-name");
          // console.log(getFilterName)
          filterImg.forEach((image) => {
            let getFilterImage = image.getAttribute("data-name");
           // console.log(getFilterImage)
           if ((getFilterImage == getFilterName) || getFilterName == "all") {
               image.classList.add("show");
               image.classList.remove("hide");
            }else{

                image.classList.remove("show");
                image.classList.add("hide");
                
           }
          })
       }
    }
    for (let index = 0; index < filterImg.length; index++) {
        filterImg[index].setAttribute("onclick" , "preview(this)");
        
    }
};

const previewBox = document.querySelector('.preview-box'),
 previewImg = previewBox.querySelector('img'),
 categoryName = previewBox.querySelector('.title p'),
 CloseIcon = previewBox.querySelector('.icon');
 let shadow = document.querySelector('.shadow');

 function preview(element){
     document.querySelector("body").style.overflow ="hidden";
    previewBox.classList.add("show");
    let getImgUrl = element.querySelector("img").src;
    //console.log(getImgUrl)
    previewImg.src=getImgUrl;
    let getDataName=element.getAttribute("data-name");
    categoryName.textContent=getDataName;
    shadow.classList.add("show");
 }

 CloseIcon.addEventListener("click", () => {
    previewBox.classList.remove("show");
    shadow.classList.remove("show");
    document.querySelector("body").style.overflow ="scroll";
 })
