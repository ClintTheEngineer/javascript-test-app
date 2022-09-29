const startBtn = document.querySelector(".startBtn button");
const infoBox = document.querySelector(".infoBox");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quizBox");
const resultBox = document.querySelector(".resultBox");
const optionList = document.querySelector(".optionList");
const timeLine = document.querySelector("header .timeLine");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");




startBtn.onclick = ()=>{
    infoBox.classList.add("activeInfo"); 
}
exitBtn.onclick = ()=>{
    infoBox.classList.remove("activeInfo"); 
}


continueBtn.onclick = ()=>{
    infoBox.classList.remove("activeInfo"); 
    quizBox.classList.add("activeQuiz"); 
    showQuestions(0); 
    questionCounter(1); 
    startTimer(10);
    startTimerLine(0); 
    
}

let timeValue =  10; 
let questionCount = 0;
let questionNumber = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = resultBox.querySelector(".buttons .restart");
const quit_quiz = resultBox.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
    quizBox.classList.add("activeQuiz"); 
    resultBox.classList.remove("activeResult"); 
    timeValue = 10; 
    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(questionCount); 
    questionCounter(questionNumber); 
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue); 
    startTimerLine(widthValue);
    timeText.textContent = "Time Left"; 
    next_btn.classList.remove("show"); 
}
quit_quiz.onclick = ()=>{
    window.location.reload(); 
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = ()=>{
    if(questionCount < questions.length - 1){ 
        questionCount++; 
        questionNumber++; 
        showQuestions(questionCount); 
        questionCounter(questionNumber); 
        clearInterval(counter); 
        clearInterval(counterLine);
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); 
    }
}

function showQuestions(index){
    let x = index + 1;
    const questionText = document.querySelector(".questionText");
    let questionTag = '<span>'+ x + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    questionText.innerHTML = questionTag; 
    optionList.innerHTML = option_tag; 
    const option = optionList.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine);
    let userAns = answer.textContent; 
    let correcAns = questions[questionCount].answer; 
    const allOptions = optionList.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 

        for(i=0; i < allOptions; i++){
            if(optionList.children[i].textContent == correcAns){  
                optionList.children[i].setAttribute("class", "option correct"); 
                optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag);
            }
        }
    }
    for(i=0; i < allOptions; i++){
        optionList.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}

function showResult(){
    infoBox.classList.remove("activeInfo"); 
    quizBox.classList.remove("activeQuiz"); 
    resultBox.classList.add("activeResult"); 
    const scoreText = resultBox.querySelector(".score_text");
    if (userScore > 17){
        let scoreTag = '<span>You got <p>'+ userScore +'</p> out of <p>'+ questions.length + ' 🎉</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 14){
        let scoreTag = '<span>You got <p>'+ userScore +'</p> out of <p>'+ questions.length +' 😎</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ 
        let scoreTag = '<span>You got<p>'+ userScore +'</p> out of <p>'+ questions.length +' 😐</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--; 
        if(time < 9){
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){
            clearInterval(counter); 
            timeText.textContent = "Try Again"; 
            const allOptions = optionList.children.length; 
            let correcAns = questions[questionCount].answer;
            for(i=0; i < allOptions; i++){
                if(optionList.children[i].textContent == correcAns){ 
                    optionList.children[i].setAttribute("class", "option correct"); 
                    optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                }
            }
            for(i=0; i < allOptions; i++){
                optionList.children[i].classList.add("disabled"); 
            }            
            quizBox.innerHTML = `Time Is Up!<br> Please select below to try again.<br>
            <button id="btn_reset" onclick=location.reload()>Try Again</button>
            `        
            quizBox.setAttribute('id', 'reset')       
        
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; 
        timeLine.style.width = time + "px"; 
        if(time > 549){ 
            clearInterval(counterLine); 
        }
    }
}

function questionCounter(index){
    let totalQuestionCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQuestionCounTag; 
}