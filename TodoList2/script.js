const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
const pending = document.querySelector('.pending');
const clearAll = document.querySelector('.footer button');

var x=0,y=0;
let listArr;

window.onload = () => {
    showTask();
}
inputBox.onkeyup = (e) => {
    let userData = inputBox.value;
    if (userData != "") {
        addBtn.classList.add("active");
        if (e.keyCode == 13) {
            addBtn.onclick();
        }else if(e.keyCode == 32){
            x++;
            
            if (x >0) {
                y++;
                inputBox.value="";
                if (y >3) {
                    if (x>2) {
                        inputBox.style.backgroundColor = "#FF5C58"; 
                        inputBox.value = "";
                        inputBox.setAttribute("disabled", "disabled");
                        inputBox.setAttribute("placeholder", "Bosluk tusuna basmayi kes!!!")
                        setTimeout(()=> {
        
                            inputBox.style.backgroundColor = "#fff"; 
                            inputBox.removeAttribute("disabled", "false");
                            inputBox.setAttribute("placeholder", "Fügen Sie Ihre Aufgaben zu");
                            inputBox.focus();
                        },3000)
                    }
                }
            }
        }   
    }else{
        addBtn.classList.remove("active");
    }
}

addBtn.onclick = () => {
    let userData =inputBox.value;
    let getlocalStorage = localStorage.getItem("newTodo");
    if (getlocalStorage == null) {
        listArr =[];       
    }else{
      listArr = JSON.parse(getlocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("newTodo", JSON.stringify(listArr));
    showTask();
    inputBox.value ="";
}

function showTask() {
    let getlocalStorage = localStorage.getItem("newTodo");
    if (getlocalStorage == null) {
        listArr =[];       
    }else{
      listArr = JSON.parse(getlocalStorage);
    }
    let liTag = "";
    listArr.forEach((element, index) => {
        liTag +=`<li>${element} <span onclick="deleteTask(${index})"><i class="fa fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = liTag;

    pending.innerHTML=listArr.length;
    if (listArr.length < 1) {
        clearAll.style.pointerEvents ="none";
        clearAll.style.opacity ="0";
    }else{
        clearAll.style.pointerEvents ="auto";
        clearAll.style.opacity ="1";

    }

}


function deleteTask(index) {
    let getlocalStorage =localStorage.getItem("newTodo");
    listArr =JSON.parse(getlocalStorage);
    listArr.splice(index,1);
    console.log(listArr)
    localStorage.setItem("newTodo" ,JSON.stringify(listArr));
    showTask();
};

clearAll.addEventListener("click", () => {
    listArr.splice(0,listArr.length);//veya listArry=[];
    localStorage.setItem("newTodo" ,JSON.stringify(listArr));
    showTask();
})



