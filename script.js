console.log("connected");

const question = [

    // 1st question
    {
        question: "Which keyword declares a variable that can be reassigned?",
        answer: [
            { text: "let", correct: true },
            { text: "const", correct: false },
            { text: "define", correct: false },
            { text: "static", correct: false },
        ]
    },

    // 2nd question

    {
        question: "What is the output of console.log(typeof 42)?",
        answer: [
            { text: "number", correct: true },
            { text: "boolean", correct: false },
            { text: "integer", correct: false },
            { text: "string", correct: false },
        ]
    },

    // 3rd question

    {
        question: "Which operator compares both value and type without type coercion?",
        answer: [
            { text: "!=", correct: false },
            { text: "==", correct: false },
            { text: "===", correct: true },
            { text: "=", correct: false },
        ]
    },

    // 4th question

    {
        question: "What is the output of console.log(5 + '3')?",
        answer: [
            { text: "53 as a number", correct: false },
            { text: "8", correct: false },
            { text: "53", correct: true },
            { text: "NaN", correct: false },
        ]
    },

    // 5th question

    {
        question: "What does an if statement do in JavaScript?",
        answer: [
            { text: "Repeats code a fixed number of times ", correct: false },
            { text: "Imports a CSS file", correct: false },
            { text: "Declare a constant", correct: false },
            { text: "Run code when a condition is satisfied", correct: true },
        ]
    },
];

const timeEl = document.querySelector(".timer")
const timeBar = document.getElementById("time-bar")
const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const PlayAgainBtn = document.getElementById("PlayAgainBtn")

let questionNumber = document.getElementById("question-number")

let currentQuestionIndex = 0;
let score = 0;
// timerInterval = null;
// isAnswered = false
let timerInterval = null;
let isAnswered = false;


function showAnswer() {
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true
    })
}

function startTimer() {
    let timeLeft = 10;
    const totalTime = 10;

    timeEl.innerText = timeLeft;
    timeBar.style.transition = 'none'
    timeBar.style.width = '100%'


    void timeBar.offsetWidth;
    // timeBar.style.transition = `width ${totalTime}s Linear`
    timeBar.style.transition = `width ${totalTime}s linear`
    timeBar.style.width = "0%"

    timerInterval = setInterval(() => {
        timeLeft--;
        timeEl.innerText = timeLeft;


        // if (timeLeft <= 0) {
        //     clearInterval(timerInterval)
        //     timeEl.innerText = 0
        //     showNextQuestion()

        //     if (!isAnswered) {
        //         showAnswer();
        //         setTimeout(showNextQuestion, 800)

        //     }
        // }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);

            if (!isAnswered) {
                showAnswer();
                isAnswered = true;
                setTimeout(showNextQuestion, 800);
            }
        }
    }, 1000)
}


// function selectAnswer(a) {
//     const selectBtn = a.target;
//     const isCorrect = selectBtn.dataset.correct == "true"
//     if (isCorrect) {
//         selectBtn.classList.add("correct");
//         score++;
//     }
//     else {
//         selectBtn.classList.add("incorrect");
//     }

//     showAnswer()
//     isAnswered = true;
//     setTimeout(showNextQuestion, 1000);
// }

function selectAnswer(a) {
    if (isAnswered) return;

    const selectBtn = a.target;
    const isCorrect = selectBtn.dataset.correct === "true";

    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    }
    else {
        selectBtn.classList.add("incorrect");
    }

    isAnswered = true;
    showAnswer();
    clearInterval(timerInterval);

    setTimeout(showNextQuestion, 1000);
}


function showOptions(currentQuestion) {
    // currentQuestion.answers.forEach(answer => {
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButtons.appendChild(button)

        // if (answer.correct) {
        //     button.dataset.correct = answer.correct;
        // }

        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer)
    });
}


function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function showQuestion() {
    isAnswered = false;
    resetState();
    startTimer();

    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionNumber.innerHTML = `Q. ${questionNo} of ${question.length}`;
    questionElement.innerHTML = currentQuestion.question;

    showOptions(currentQuestion);
}


// function showQuestion() {
//     resetState()
//     startTimer()
//     let currentQuestion = question[currentQuestionIndex];
//     let questionNo = currentQuestionIndex + 1;
//     questionNumber.innerHTML = `Q. ${questionNo} of ${question.length}`
//     questionElement.innerHTML = currentQuestion.question
//     showOptions(currentQuestion)
// }


function showScore() {
    timeEl.style.visibility = "hidden"
    timeBar.style.visibility = "hidden"
    questionNumber.style.visibility = "hidden"
    clearInterval(timerInterval)
    resetState()
    questionElement.innerHTML = `score: ${score}`
    PlayAgainBtn.style.display = 'block'
}

// function showNextQuestion() {
//     clearInterval(timerInterval)
//     if (currentQuestionIndex < question.length) {
//         showQuestion()
//     }
//     else {
//         showScore()
//     }
//     currentQuestionIndex++;

// }


function showNextQuestion() {
    clearInterval(timerInterval);

    if (currentQuestionIndex < question.length) {
        showQuestion();
        currentQuestionIndex++;
    } else {
        showScore();
    }
}

function startquiz() {
    PlayAgainBtn.style.display = 'none'
    timeEl.style.visibility = "visible"
    timeBar.style.visibility = "visible"
    questionNumber.style.visibility = "visible"
    currentQuestionIndex = 0;
    score = 0;
    showNextQuestion()
}

PlayAgainBtn.addEventListener("click", startquiz)

const startScreen = document.querySelector(".start-screen")
const startBtn = document.getElementById("start-btn")
const quiz = document.querySelector(".app")

startBtn.addEventListener("click", () => {
    startScreen.style.display = "none"
    quiz.style.display = "block"
    startquiz()
})
