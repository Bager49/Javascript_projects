const searchWrapper = document.querySelector('.search-input');
const inputBox = document.querySelector('.search-input input');
const suggBox = document.querySelector('.autocom-box');
const such = document.querySelector('.icon .fas');

window.onload = () => {
    inputBox.focus();
}

var k=0;
let emptyArray = [];
inputBox.onkeyup = (e) => {
    let userData = e.target.value;
 
  if (e.keyCode ==13) {
     such.onclick();
     inputBox.value = "";
  }

  let allList;
  if (userData && e.keyCode !== 40 ) {
      emptyArray = suggestions.filter((data) =>{
          return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        //console.log(emptyArray)
        emptyArray = emptyArray.map( (data) => {
            return data = `<li>${data}</li>`;
        });
       // console.log(emptyArray)
       searchWrapper.classList.add("active");
       showSuggestion(emptyArray);

        allList = document.querySelectorAll(".autocom-box li");
       //console.log(allList)
       for (let i = 0; i < allList.length; i++) {
           allList[i].setAttribute("onclick" , "select(this)");    
       }
    }else{
        searchWrapper.classList.remove("active");
        }

     if (e.keyCode == 40) {
        // console.log(emptyArray);
         if (k < emptyArray.length) {
             inputBox.value = suggBox.children[k].textContent;
             suggBox.children[k].style.background="#efefef";
             searchWrapper.classList.add("active");
             k++;
             suggBox.children[k-2].style.background="#fff";
         }else{
             k=0;
         }
     }
     
};

function select(element){
    inputBox.value =element.textContent;
    searchWrapper.classList.remove("active");
}

function showSuggestion(list) {
    let listData;
    if (!list.length) {
        let userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
        listData = list.join('');
    }
    //console.log(listData)
    suggBox.innerHTML =listData;
}


such.onclick = () => {
  let suche = `https://www.google.com/search?q=${inputBox.value}&sxsrf=AOaemvJMfOksGrRuETaela5dgMu4RrwFqg%3A1633777279742&source=hp&ei=f3ZhYZbDKfWMxc8P95m_yAY&iflsig=ALs-wAMAAAAAYWGEj9YOAWo4ESxRJVG3X9R7SutLYT6E&ved=0ahUKEwjW_pbTlr3zAhV1RvEDHffMD2kQ4dUDCAc&uact=5&oq=a&gs_lcp=Cgdnd3Mtd2l6EAMyDgguEIAEEMcBENEDEJMCMgUIABCABDILCC4QgAQQxwEQowIyBQgAEIAEMgsILhCABBDHARDRAzIFCAAQgAQyCwguEIAEEMcBEKMCMgUIABCABDIFCAAQgAQyCwguEIAEEMcBENEDOgcIIxDqAhAnUJISWJISYOsTaAFwAHgAgAFHiAFHkgEBMZgBAKABAbABCg&sclient=gws-wiz`;
   var pencere;
      pencere=open(suche)

}