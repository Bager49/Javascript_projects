
    //--------------TODO LIST --------------------------------------------------------------
    const todoList=document.getElementById('todo-list');
    const todoInput=document.getElementById('todo-input');
    const todoButon=document.getElementById('todo-button');
    const todoFilter=document.getElementById('todo-filter');

    //storagelerdan faydalanarak json ogesi gibi dinamik dizi olusturmak ve bu sayada sayfa yenilense bile eklenen isler görüntülenecektir
    const getTodosFromStorage = () =>{
        const storage = JSON.parse(localStorage.getItem('todos'));
        return (storage) ? storage :[];//storage de bisey varsa icine ata kalsin orda
    }
    let todos=getTodosFromStorage();//yapilacak listesini localstorage den cekyioruz
    
    const getDonesFromStorage = () =>{//storagedan gelen done yapilan yani tammalanan degerlere ulas lokalstoge böyle bir dizi olusturmustuk
        const storage = JSON.parse(localStorage.getItem('dones'));
        return (storage) ? storage :[];//storage de bisey varsa icine ata kalsi orda
    }
    let dones=getDonesFromStorage();//yapildi listesi localstorage den cekyioruz
    
    const getTodoPage = () => {//dizinin icindeki tüm ögelere ulas ve o ögeleri createTodoItem fonksiyonu yardimi ile html elemente cevirip yapilacaklar listesinin icine ekle
        todos.forEach((todo) =>{
                createTodoItem(todo);
        });
    }
    const getDonestoPage = () => {//dizinin icindeki tüm ögelere ulas ve o ögeleri createTodoItem fonksiyonu yardimi ile html elemente cevirip yapilacaklar listesinin icine ekle
        dones.forEach((done) =>{
                createDoneItem(done);
        });
    }

    const saveTodoStorage = (todo) =>{
        todos.push(todo);
        localStorage.setItem("todos",JSON.stringify(todos));
         createTodoItem(todo);
         //console.log(todos);
    }

    window.addEventListener("load", () =>{//site yüklendiginde dizideki yapilacak isleri yükle
        getTodoPage();
        getDonestoPage();
    });

    todoButon.addEventListener("click", () =>{
        const input=todoInput.value;
        if (input)   saveTodoStorage(input);//inputu al bu fonksiyona gönder
        todoInput.value="";
    });
    todoInput.addEventListener("keyup", (e)=>{
        cursor();
       if(e.keyCode === 13) todoButon.click();//entera basildiginda butona tiklanmis gibi yapar
    })

/*----------------------Silme islemi--------------*/
const removeTodo = (target)=>{
    //console.log(target.parentNode);
    const todo=target.parentNode.childNodes[0].innerHTML;//li nin icindeki degeri alcaz cunku yapilacak is orda duruyor text olarak
    removeTodofromStorage(todo);//yani silmek icin tiklanilan elemani localstorage alanindan kaldir ki sayfa yüklendiginde tekrar gözükmesin
    target.parentNode.classList.add('animate__animated','animate__slideOutRight','animate__faster');//animate.css sitesinden cdn ile alinan hazir animasyonlar uygulandi
    target.parentNode.addEventListener("animationend",() => {
       target.parentNode.remove();
    })
}
const removeTodofromStorage = (todo) =>{
    const indexAL=todos.indexOf(todo);//target ile yukarda secilip silinen elemanin idex numarasini al
    if (indexAL>-1) {
        todos.splice(indexAL,1);//burdada indexi alinan eleman silinir
        localStorage.setItem('todos',JSON.stringify(todos));//todos dizisini guncelle yeni hali yani localstoragedan da sil yani
    }
}
//ayni silme olayi done lar icin yapacaz burda
const removeDone = (target)=>{
    //console.log(target.parentNode);
    const done=target.parentNode.childNodes[0].innerHTML;
    removeDonefromStorage(done);//yani silmek icin tiklanilan elemani localstorage alanindan kaldir ki sayfa yüklendiginde tekrar gözükmesin
    target.parentNode.classList.add('animate__animated','animate__slideOutLeft',"animate__faster");
    target.parentNode.addEventListener("animationend", () =>{
        target.parentNode.remove();  
    })
    //target.parentNode.remove();
}
const removeDonefromStorage = (done) =>{//yapilanlari dones dizisinde cikar
    const indexAL=dones.indexOf(done);//target ile yukarda secilip silinen elemanin idex numarasini al
    if (indexAL>-1) {
        dones.splice(indexAL,1);//burdada indexi alinan eleman silinir
        localStorage.setItem('dones',JSON.stringify(dones));//todos dizisini guncelle yeni hali yani localstoragedan da sil yani
    }
}
/*----------------------Silme islemi Son--------------*/


//--------------Check Islemi-----------------------------
const checkTodo = (target) =>{
    const todo =target.parentNode.childNodes[0].innerHTML;//divin ilk elemani li yi aliyorouz yazi orda
    moveTodotoDone(todo,target);//todo dizisinden cikar done dizisine kele
}

const moveTodotoDone = (todo,target) =>{
    //ilkmolarak localstorage dan silip sonra done isimli diziye akatrilacak
    removeTodofromStorage(todo);//yapilacak yani todos dizisinden cikar
    dones.push(todo);//tamamlanan(dones) dizisine ekle
    localStorage.setItem("dones",JSON.stringify(dones));//tamamlandi dizisini tekrar localstorage ekle guncel halini
    makeItDone(target);
}
const makeItTodo = (target) =>{//klasslari ayarlama cehck edilince ve check kaldirilinca
    target.parentNode.classList.remove("done");
    target.parentNode.classList.add("todo");
    target.parentNode.childNodes[2].setAttribute("onclick","removeTodo(this)");
    target.className="";
    target.classList.add("fa","fa-square");
    target.setAttribute("onclick","checkTodo(this)");
}
//ayni sesyler done icin
const uncheckDone = (target) =>{
    const done=target.parentNode.childNodes[0].innerHTML;//tekrar tiklandiginda uncheck yapip todos dizisine ekle
    moveDoneToTodos(done,target);//teknik olarak moveTodotoDone ile ayni isi yapar
}
const moveDoneToTodos = (done,target) =>{
    //ilkmolarak localstorage dan silip sonra todos isimli diziye akatrilacak
    removeDonefromStorage(done);//tamamlanan yani dones dizisinden cikar
    todos.push(done);//yapilacak(todos) dizisine ekle
    localStorage.setItem("todos",JSON.stringify(todos));//yapilacak  dizisini tekrar localstorage ekle guncel halini
    makeItTodo(target);
}
const makeItDone = (target) =>{//klasslari ayarlama cehck edilince ve check kaldirilinca
    const done=target.parentNode.classList.add("done");
    target.parentNode.classList.remove("todo");
    target.parentNode.childNodes[2].setAttribute("onclick","removeDone(this)");
    target.className="";
    target.classList.add("fa", "fa-check-square");
    target.setAttribute("onclick","uncheckDone(this)");
}



//----------yapilack isi olustur todo icin koda dök yani--------------
    const createTodoItem = (text) => {
        const todoItem=document.createElement("div");
        todoItem.classList.add("todo-item","todo");
        const todoItemLi=document.createElement("li");
        todoItemLi.innerHTML=text;
        const todoItemCheck=document.createElement("i");
        todoItemCheck.classList.add("fa", "fa-square");
        todoItemCheck.setAttribute("onclick","checkTodo(this)");
        const todoItemREmove=document.createElement("i");
        todoItemREmove.classList.add("fa" ,"fa-trash-o");
        todoItemREmove.setAttribute("onclick","removeTodo(this)");//removeTodo fonksiyonu yukarda tanimli tiklandiginda aktif et
        todoItem.appendChild(todoItemLi);
        todoItem.appendChild(todoItemCheck);
        todoItem.appendChild(todoItemREmove);
        todoList.appendChild(todoItem);//ul in icine olusturulan divi ekle 

    }

    //----------yapilan isi olustur done icin koda dök yani--------------
    const createDoneItem = (text) => {
        const todoItem=document.createElement("div");
        todoItem.classList.add("todo-item","done");
        const todoItemLi=document.createElement("li");
        todoItemLi.innerHTML=text;
        const todoItemCheck=document.createElement("i");
        todoItemCheck.classList.add("fa", "fa-check-square");
        todoItemCheck.setAttribute("onclick","uncheckDone(this)");
        const todoItemREmove=document.createElement("i");
        todoItemREmove.classList.add("fa" ,"fa-trash-o");
        todoItemREmove.setAttribute("onclick","removeDone(this)");//removeTodo fonksiyonu yukarda tanimli tiklandiginda aktif et
        todoItem.appendChild(todoItemLi);
        todoItem.appendChild(todoItemCheck);
        todoItem.appendChild(todoItemREmove);
        todoList.appendChild(todoItem);//ul in icine ekle yani

    }

    todoFilter.addEventListener("click",() => {
        todoList.dataset.filter=(parseInt( todoList.dataset.filter)+1)%3;//3 e bolup kalani aldik ki 3 oldugunda sifir olsun ve hep 0,1,2 dönsün
       // console.log( todoList.dataset.filter);
        listFilter();
    })
    const listFilter = () =>{
        const items = todoList.getElementsByClassName('todo-item');
        //console.log( items);
        let array = [].map.call(items, item => item);
        const filter= todoList.dataset.filter;
        array.forEach((item) =>{
            switch (filter) {
                case "0":
                    todoFilter.className="";
                    todoFilter.classList.add("fa","fa-square-o");
                    item.style.display="flex";
                    break;
                case "1":
                    todoFilter.className="";
                    todoFilter.classList.add("fa","fa-square");
                    if (item.classList.contains('done')) item.style.display="none";
                    else item.style.display="flex"; 
                    break;
                case "2":
                    todoFilter.className="";
                    todoFilter.classList.add("fa","fa-check-square");
                    item.style.display="flex";
                    if (item.classList.contains('todo')) item.style.display="none";
                    else item.style.display="flex"; 
                    break;
                default:
                    break;
            }
        });
    };

    function cursor() {
        if (todoInput.value  != "") {
            todoButon.style.cursor = "pointer";
            todoButon.style.opacity ="1";
            todoButon.style.pointerEvents ="all";
        }else{
            todoButon.style.cursor = "default";
            todoButon.style.opacity ="0.4";
            todoButon.style.pointerEvents ="none";
        }
    }cursor();
    
