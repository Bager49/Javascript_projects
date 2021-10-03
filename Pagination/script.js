const ulTag = document.querySelector('ul');


let totalPage=12,
page =5;
function element(totalPage, page) {
    let liTag='';
    let activeLi;
    let beforePages = page-1;
    let afterPages = page+1;
    if (page > 1) {
        liTag +=`<li class="btn prev" onclick="element(totalPage, ${page - 1})"><span><i class="bi bi-caret-left-fill"></i>Prev</span></li>`;
    }
    if (page > 2) {
        liTag +=`<li class="numb" onclick="element(totalPage, 1)"><span>1</span></li>`;
        if (page >3) {
            liTag +=`<li class="dots"><span>...</span></li>`;
        }
    }

    if (page == totalPage) {
        beforePages = beforePages-2
    }else if (page == totalPage-1) {
        beforePages = beforePages -1;
    }

    if (page == 1) {
        afterPages = afterPages + 2
    }else if (page == 2) {
        afterPages = afterPages + 1;
    }

    for (let i = beforePages; i <= afterPages; i++) {
        if (i > totalPage || i < 1) {
            continue;
        }
        if (page == i) {
            activeLi ="active";
        }else{
            activeLi ="";
            
        }
        liTag +=`<li class="numb ${activeLi}" onclick="element(totalPage, ${i})"><span>${i}</span></li>`; 
    }


    if (page < totalPage-1) {
        if (page < totalPage-3) {
            liTag +=`<li class="dots"><span>...</span></li>`;
        }
        liTag +=`<li class="numb" onclick="element(totalPage, ${totalPage})"><span>${totalPage}</span></li>`;
    }


    if (page < totalPage) {
        liTag +=` <li class="btn next" onclick="element(totalPage, ${page + 1})"><span>Next<i class="bi bi-caret-right-fill"></i></span></li>`;
    }
    ulTag.innerHTML=liTag;
}element(totalPage,page);