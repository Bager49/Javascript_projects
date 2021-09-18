const form= document.querySelector('form');
let fileInput= document.querySelector('.file-input');
let progressArea= document.querySelector('.progress-area');
let uploadArea= document.querySelector('.upload-area');

form.addEventListener("click", () => {
    fileInput.click();
});

fileInput.onchange = (e) => {
   // console.log(e);//onchange yapildiginda ki tüm özellikleri getir
   console.log(e.target.files);//bize burda files kismi lazim oldugu icin onu kullandik

    let file=e.target.files[0];
  //  console.log(file)
    if (file) {
        let fileName = file.name;
        if (fileName >= 12) {
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0,12)+"...."+fileName[1];
        }
        uploadFile(fileName);
        //console.log(fileName)
    }
};

function uploadFile(filename){
    let xhr = new XMLHttpRequest();//yeni bir ajax objesi olusturduk
    xhr.open("POST" , "php/upload.php");//php ye yolladik
    xhr.upload.addEventListener("progress", ({loaded, total}) => {
       let fileloaded = Math.floor(loaded / total)*100;
       let fileTotal = Math.floor(total / 1000);
       let fileSize;
       (fileSize < 1024) ? fileSize + " KB" : fileSize = (loaded / (1024 *1024)).toFixed(2) + " MB";
       //console.log(fileloaded, fileTotal);
       let progressHTML = `
       <li class="row">
       <i class="bi bi-file-earmark-medical-fill"></i><!--bi-file-earmark-text-fill-->
       <div class="content">
           <div class="deatils">
               <span class="name">${filename} Uploading</span>
               <span class="percent">${fileloaded}%</span>
           </div>
           <div class="progress-bar">
               <div class="progress" style="width: ${fileloaded}%></div>
           </div>
       </div>
   </li> `;
   uploadArea.classList.add("onprogress")
   progressArea.innerHTML = progressHTML;
   //uploadArea.innerHTML=""
   if (loaded == total) {
    progressArea.innerHTML = "";
       let uploadedHTML = `
       <li class="row">
       <div class="content">
       <i class="bi bi-file-earmark-medical-fill"></i>
       <div class="deatils">
       <span class="name">${filename} Uploaded</span>
       <span class="size">${fileSize}</span>
       </div>
       </div>
       <i class="bi bi-check"></i>
       </li>`;
       uploadArea.classList.remove("onprogress")
       uploadArea.insertAdjacentHTML("afterbegin",uploadedHTML);
      // uploadArea.innerHTML = uploadedHTML;
   }
    });
    let formData = new FormData(form);
    xhr.send(formData);
}