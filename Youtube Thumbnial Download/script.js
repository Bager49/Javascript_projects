const urlField = document.querySelector('.field input'),
previewArea = document.querySelector('.preview-area'),
imgTag = previewArea.querySelector('.preview-area .thumbnail');
        
 urlField.onkeyup  = () =>{
    let imgUrl = urlField.value;
   // console.log(imgUrl);
    previewArea.classList.add("active")

    if (imgUrl.indexOf("https://www.youtube.com/watch?v=") != -1) {
        let videoID= imgUrl.split("v=")[1].substring(0,11);//her videonun uniq id si var ordan bunu cektik videonun fotosunu indirmede kullancagiz
        //https://www.youtube.com/watch?v=1d92ipW7Mx8&t=2405s --mesela bu videounun id si 1d92ipW7Mx dir
        console.log(videoID);
        let youtubeThumbURl = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;//buna aldigimiz videonun idsini ekleyip resim adresini elde etmis olduk
        console.log(youtubeThumbURl);
        imgTag.src=youtubeThumbURl;
    }
    else if (imgUrl.indexOf("https://youtu.be/") != -1) {
        let videoID= imgUrl.split("be/")[1].substring(0,11);//her videonun uniq id si var ordan bunu cektik videonun fotosunu indirmede kullancagiz
        let youtubeThumbURl = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;//buna aldigimiz videonun idsini ekleyip resim adresini elde etmis olduk
        imgTag.src=youtubeThumbURl;
        
    }
    else if (imgUrl.match(/\.(jpe?g|png|gif|bmp|webp)$/i)){
       imgTag.src = imgUrl;
       console.log(imgUrl);
    }
    else{
        imgTag.src = "";
        previewArea.classList.remove("active");
        urlField.style.outline="1px solid red";
        setTimeout( () => {
            urlField.value = "";
            urlField.style.outline="none";
        },3000)
    }
  };

 
