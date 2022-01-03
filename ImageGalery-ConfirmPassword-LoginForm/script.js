let btns = document.querySelectorAll(".btns a");

btns.forEach((buton) => {
  buton.onclick = function (e) {
    let x = (e.clientX = e.target.offsetLeft);
    let y = (e.clientY = e.target.offsetTop);
    console.log(x, y);

    let baloncuk = document.createElement("span");
    baloncuk.style.left = `${x}px`;
    baloncuk.style.top = `${y}px`;
    this.appendChild(baloncuk);
    setTimeout(() => {
      baloncuk.remove();
    }, 8000);
  };
});

//Paswort Stronger
let indicator = document.querySelector(".indicator");
let input = document.querySelector("input");
let weak = document.querySelector(".weak");
let medium = document.querySelector(".medium");
let strong = document.querySelector(".strong");
let textt = document.querySelector(".textt");
let show = document.querySelector(".showBtn");
let regExpWeak = /[a-z]/;
let regExpMedium = /\d+/;
let regExpStrong = /.[!,@,#,$,%,&,*,?,_,-,~,(,)]/;
function trigger() {
  if (input.value != "") {
    indicator.style.display = "block";
    indicator.style.display = "flex";
    if (
      input.value.length <= 3 &&
      (input.value.match(regExpWeak) ||
        input.value.match(regExpMedium) ||
        input.value.match(regExpStrong))
    )
      no = 1;
    if (
      input.value.length >= 6 &&
      ((input.value.match(regExpWeak) && input.value.match(regExpMedium)) ||
        (input.value.match(regExpMedium) && input.value.match(regExpStrong)) ||
        (input.value.match(regExpWeak) && input.value.match(regExpStrong)))
    )
      no = 2;
    if (
      input.value.length >= 6 &&
      input.value.match(regExpWeak) &&
      input.value.match(regExpMedium) &&
      input.value.match(regExpStrong)
    )
      no = 3;
    if (no == 1) {
      weak.classList.add("active");
      textt.classList.add("weak");
      textt.style.display = "block";
      textt.textContent = "Ihr Password ist zu schwach";
    } else if (no == 2) {
      medium.classList.add("active");
      weak.classList.remove("active");
      textt.classList.add("medium");
      textt.style.display = "block";
      textt.textContent = "Ihr Password ist jetzt mormal";
    } else {
      strong.classList.add("active");
      weak.classList.remove("active");
      medium.classList.remove("active");
      textt.classList.add("medium");
      textt.style.display = "block";
      textt.textContent = "Ihr Password ist perfect";
    }
    show.style.display = "block";
    show.onclick = function () {
      if (input.type == "password") {
        input.type = "text";
        show.textContent = "Show".toUpperCase();
      } else {
        input.type = "password";
        show.textContent = "Hide".toUpperCase();
      }
    };
  } else {
    indicator.style.display = "none";
    textt.style.display = "none";
    strong.classList.remove("active");
    weak.classList.remove("active");
    medium.classList.remove("active");
    show.style.display = "none";
  }
}

//Carousel
$(".slider").owlCarousel({
  loop: true,
  autoplay: true,
  autoPlayTimeout: 1000,
  autoplayHoverPause: true,
});

//Password Confirm App
const pswrd_1 = document.querySelector("#pswrd_1");
const pswrd_2 = document.querySelector("#pswrd_2");
const errorTxt = document.querySelector("form .error-text");
const chechkBtn = document.querySelector(".container-2 button");
const show_btn = document.querySelector(".container-2 .show");

function active() {
  if (pswrd_1.value.length >= 6) {
    chechkBtn.removeAttribute("disabled", "");
    pswrd_2.removeAttribute("disabled", "");
    chechkBtn.classList.add("active");
  } else {
    chechkBtn.setAttribute("disabled", "");
    pswrd_2.setAttribute("disabled", "");
    chechkBtn.classList.remove("active");
  }
}
function active2() {
  if (pswrd_1.value.length != "") {
    show_btn.style.display = "block";
    show_btn.onclick = () => {
      if (pswrd_1.type == "password" && pswrd_2.type == "password") {
        pswrd_1.setAttribute("type", "text"); //pswrd_1.type = "text"
        pswrd_2.setAttribute("type", "text"); //pswrd_2.type = "text"
        show_btn.textContent = "HIDE";
      } else {
        pswrd_1.setAttribute("type", "password");
        pswrd_2.setAttribute("type", "password");
        show_btn.textContent = "SHOW";
      }
    };
  } else {
    show_btn.style.display = "none";
  }
}

chechkBtn.onclick = () => {
  if (pswrd_1.value != pswrd_2.value) {
    errorTxt.style.display = "block";
    errorTxt.textContent = "Confirm Password is not matched";
    errorTxt.classList.remove("passed");
    return false;
  } else {
    errorTxt.style.display = "block";
    errorTxt.textContent = "Confirm Password Matched";
    errorTxt.classList.add("passed");
    return false;
  }
};

//-----------  Upload Img  App -------------
const defaultBtn = document.querySelector("#default-btn");
const uploadBtn = document.querySelector("#upload-btn");
const imgName = document.querySelector(".img-name");
const closeBtn = document.querySelector(".close-icon");
const image = document.querySelector(".img-div img");

uploadBtn.onclick = () => {
  defaultBtn.click();
};

defaultBtn.addEventListener("change", () => {
  const file = defaultBtn.files[0];
  // console.log(file)
  if (file) {
    imgName.textContent = file.name;
    imgName.classList.add("active");
    closeBtn.classList.add("active");

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      // console.log(result)
      image.src = result;
    };
    closeBtn.addEventListener("click", () => {
      image.src = "";
      imgName.classList.remove("active");
      closeBtn.classList.remove("active");
    });
    reader.readAsDataURL(file);
  } else {
    imgName.classList.remove("active");
    closeBtn.classList.remove("active");
  }
});

/* ----------- Multi step Form with Progressbar ----- */
const slidePage = document.querySelector(".slidePage"),
  firstNextBtn = document.querySelector(".nextBtn"),
  prevBtnSec = document.querySelector(".prev-1"),
  nextBtnSec = document.querySelector(".next-1"),
  prevBtnThird = document.querySelector(".prev-2"),
  nextBtnThird = document.querySelector(".next-2"),
  prevBtnFouth = document.querySelector(".prev-3"),
  submitBtn = document.querySelector(".Submit"),
  progressText = document.querySelectorAll(".step p"),
  progressIcon = document.querySelectorAll(".step .check"),
  bullet = document.querySelectorAll(".step .bullet"),
  bulletSpan = document.querySelectorAll(".bullet span");
// console.log(bullet.length);
let max = 4;
let current = 1;

firstNextBtn.addEventListener("click", () => {
  slidePage.style.marginLeft = "-25%";
  activeClass();
  current++;
});
nextBtnSec.addEventListener("click", () => {
  slidePage.style.marginLeft = "-50%";
  activeClass();
  current++;
});
nextBtnThird.addEventListener("click", () => {
  slidePage.style.marginLeft = "-75%";
  activeClass();
  current++;
});
submitBtn.addEventListener("click", () => {
  activeClass();
  current++;
  setTimeout(() => {
    alert("Den Formular wurde gesendet!");
    location.reload();
  }, 800);
});

function activeClass() {
  bullet[current - 1].classList.add("active");
  progressIcon[current - 1].classList.add("active");
  bulletSpan[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
}

prevBtnSec.addEventListener("click", () => {
  //   console.log(current);
  slidePage.style.marginLeft = "0%";
  removeClass();
  current--;
});
prevBtnThird.addEventListener("click", () => {
  slidePage.style.marginLeft = "-25%";
  removeClass();
  current--;
});
prevBtnFouth.addEventListener("click", () => {
  slidePage.style.marginLeft = "-50%";
  removeClass();
  current--;
});
function removeClass() {
  bullet[current - 2].classList.remove("active");
  progressIcon[current - 2].classList.remove("active");
  bulletSpan[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
}
