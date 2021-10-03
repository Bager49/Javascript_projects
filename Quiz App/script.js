const start_btn = document.querySelector('.start_btn button');
const info_box = document.querySelector('.info_box');
const exit_btn = document.querySelector('.info_box .quit');
const continue_btn = document.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz_box');
const timeCount = document.querySelector(".timer .timer_sec");
const timeLine = document.querySelector(".time_line");
const timeOff = document.querySelector(".time_left_txt");



//Start butonuna tiklandiginda
start_btn.addEventListener("click", () => {
    info_box.classList.add("activeInfo");
    //start_btn.style.display="none";
});

//Exit butonuna tiklandiginda
exit_btn.addEventListener("click", () => {
    info_box.classList.remove("activeInfo");
    //start_btn.style.display="none";
});

//continue butonuna tiklandiginda
continue_btn.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    info_box.classList.remove("activeInfo");
    showQuestion(0);
    questionCounter(1);
    startTime(timeValue);
    startTimeLine(widthValue);
};

let question_count=0;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let richtig=0,falsch=0;

//sonraki butonu
const next_btn = document.querySelector('footer .next_btn');
const result_box = document.querySelector('.result_box'),
 restart = result_box.querySelector('.buttons .restart'),
 quit = result_box.querySelector('.buttons .quit'),
 scorText = result_box.querySelector('.result_box .score_text');

 
restart.addEventListener("click" , () => {
    result_box.classList.remove("activeResult");
     question_count=0;
     richtig=0;
     falsch=0;
   continue_btn.onclick();
   timeOff.textContent = "Time Left";
});

quit.addEventListener("click", () => {
    window.location.reload(); 
});


next_btn.onclick = () => {
    if (question_count < questions.length-1) {
        
        question_count++;
        showQuestion(question_count)
        questionCounter(question_count+1);
        clearInterval(counter);
        startTime(timeValue);
        clearInterval(counterLine);
        startTimeLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time Left";
        
    }else{
        console.log("quiz ist am Ende");
        clearInterval(counter);
        clearInterval(widthValue);
        result_box.classList.add("activeResult");
        quiz_box.classList.remove("activeQuiz");
        let icon= result_box.querySelector(".icon");
        
        if (richtig >falsch) {
            icon.innerHTML=`<i class="bi bi-emoji-heart-eyes-fill"></i>`;
            scorText.innerHTML=`<span>Bravoo!! <p>${questions.length} </p>sorudan <p>${richtig}</p> soruyu dogru bildiniz</span>`
        }else{
            icon.innerHTML=`<i class="bi bi-emoji-neutral"></i>`;
            scorText.innerHTML=`<span>dogru sayiniz: ${richtig} yanlis sayiniz: ${falsch} daha iyisini yapabilirsiniz..</span>`    
        }
    }
};

//arryden sorulari cekmek
const options = document.querySelector('.option_list');
function showQuestion(index) {
    const question_text = document.querySelector(".que_text");
    let que_tag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
   // let que_tag2 = '<span>' +questions[0].question+'</span>';
    question_text.innerHTML = que_tag;
    let option_list = `<div class="option"><span>${questions[index].options[0]}</span></div>
                        <div class="option"><span>${questions[index].options[1]}</span></div>                    
                        <div class="option"><span>${questions[index].options[2]}</span></div>                    
                        <div class="option"><span>${questions[index].options[3]}</span></div>`;
    options.innerHTML =option_list;
    next_btn.classList.add("show");

    const option = options.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick" , "optionSelected(this)")
        //console.log(option[i]);
    }
};

let ticIcon = `<div class="icon tick"><i class="fas fa-check"></i></div>`;
let crossIcon = `<div class="icon cross"><i class="fas fa-times"></i></div>`;

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[question_count].answer;
    if (userAns == correctAns) {
        answer.classList.add("correct");
        console.log("Answer is correct");
        //answer.innerHTML +=ticIcon;
        answer.insertAdjacentHTML("beforeend" , ticIcon);
        richtig++;
    }else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend" , crossIcon);       
        console.log("Answer is wrong");
        falsch++;
        for (let k = 0; k < options.children.length; k++) {
            if (options.children[k].textContent == correctAns) {
                options.children[k].setAttribute("class" , "option correct");
                options.children[k].insertAdjacentHTML("beforeend" , ticIcon);
            } 
        }

    }  
    for (let i = 0; i < options.children.length; i++) {
        options.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

//Timer
function startTime(time) {
    counter = setInterval(timer , 1000);
    function timer() {
        timeCount.textContent =time;
        time--;
        if (time < 9) {
            timeCount.textContent=`0${time}`;
        }
        if (time < 0) {
            clearInterval(counter);
            timeOff.textContent = "Time Off"
            timeCount.textContent ="00";
           // stopalles()
           let correctAns = questions[question_count].answer;
            for (let k = 0; k < options.children.length; k++) {
                if (options.children[k].textContent == correctAns) {
                    options.children[k].setAttribute("class" , "option correct");
                    options.children[k].insertAdjacentHTML("beforeend" , ticIcon);
                } 
            }

            for (let i = 0; i < options.children.length; i++) {
                options.children[i].classList.add("disabled"); 
            }
            next_btn.style.display = "block";
        }

    }
}

//TimeLine
function startTimeLine(time) {
    counterLine = setInterval(timer , 29);
    function timer() {
        time++;
        //console.log(time);
        timeLine.style.width =time+"px";
        if (time >400 && time <549) {
            timeLine.style.backgroundColor ="#E05D5D";
        }else{
            timeLine.style.backgroundColor ="#00A19D";
        }
        if (time > 549) {
            clearInterval(counterLine);      
        }
    }
}

function questionCounter(index) {
    
    const total_que_bottom =document.querySelector(".quiz_box .total_que");
    let totalquestinCountTag = `<span><p>${index}</p>of<p>${questions.length}</p></span>`;
    total_que_bottom.innerHTML = totalquestinCountTag;
}
debugger;