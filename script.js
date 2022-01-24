var containerQuestionEl = document.getElementById("question-container");
var containerStartEl = document.getElementById("starter-container");
var containerEndEl = document.getElementById("end-container")
var containerScoreEl = document.getElementById("score-banner")
var formInitials = document.getElementById("initials-form")
var containerHighScoresEl = document.getElementById("high-score-container")
var ViewHighScoreEl = document.getElementById("view-high-scores")
var listHighScoreEl = document.getElementById("high-score-list")
var correctEl = document.getElementById("correct")
var wrongEl = document.getElementById("wrong")

//butttons
var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#go-back")
var btnClearScoresEl = document.querySelector("#clear-high-scores")

//questions & answers
var questionEl = document.getElementById("question")
var answerbuttonsEl = document.getElementById("answer-buttons")
var timerEl = document.querySelector("#timer");

var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;

//High Score

var HighScores = [];

//Quiz Questions

var arrayShuffleQuestions
var QuestionIndex = 0

//Arrays which include the following: quiz questions, quiz answer choices, correct answers

var questions = [
{   q: "Commonly used data types DO Not Include:",
    a: "3. alerts", 
    choices: [{choice: '1. strings'}, {choice: '2. booleans'}, {choice: '3. alerts'}, {choice: '4. numbers'}], 
          
},
{
    q: "The condition in an if/else statement is enclosed with __________ .",
    a: "3. parentheses",
    choices: [{choice: '1. quotes'}, {choice: '2. curly brackets'}, {choice: '3. parentheses'}, {choice: '4. square brackets'}],
    
},
{
    q: "Arrays in JavaScript can be used to store ____________ .",
    a: "4. all of the above",
    choices: [{choice: '1. numbers and strings'}, {choice: '2. other arrays'}, {choice: '3. booleans'}, {choice: '4. all of the above'}],    
    
},
{   
    q: "String values must be enclosed within ___________ when being assigned to variables.",
    a: "3. quotes",
    choices: [{choice: '1. commas'}, {choice: '2. curly brackets'}, {choice: '3. quotes'}, {choice: '4. parentheses'}],    
    
},
{   
    q: "A very usefool used during development and debugging for printing content to the debugger is:",
    a:"4. console log",
    choices: [{choice: '1. Javascript'}, {choice: '2. terminal/bash'}, {choice: '3. for loops'}, {choice: '4. console log'}],    
    
},

];

//'Go back' button selected on high score page

var renderStartPage = function () {
    containerHighScoresEl.classList.add("hide")
    containerHighScoresEl.classList.remove("show")
    containerStartEl.classList.remove("hide")
    containerStartEl.classList.add("show")

    containerScoreEl.removeChild(containerScoreEl.lastChild)
    QuestionIndex = 0
    gameover = ""
    timerEl.textContent = 0
    score = 0

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide")
    }
    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }
} 

//run check every 1 second to see if either quiz over is true or if there is time remaining. timer started at 75 seconds

var setTime = function () {
    timeleft = 75;

var timercheck = setInterval(function() {
    timerEl.innerText = timeleft;
    timeleft--

    if (gameover) {
        clearInterval(timercheck)
    }

    if (timeleft < 0) {
        showScore()
        timerEl.innerText = 0
        clearInterval(timercheck)
    }

    }, 1000)
}

var startGame = function() {

    //'start quiz' show and hide

    containerStartEl.classList.add('hide');
    containerStartEl.classList.remove('show');
    containerQuestionEl.classList.remove('hide');
    containerQuestionEl.classList.add('show');

    //question shuffle for random

    arrayShuffleQuestions = questions.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
}

// set next question
var setQuestion = function() {
    resetAnswers()
    displayQuestion(arrayShuffleQuestions[QuestionIndex])
}

//remove answer buttons
var resetAnswers = function() {
    while (answerbuttonsEl.firstChild) {
    answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
    };
};

//Question informaion display

var displayQuestion = function(index) {
    questionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {

    var answerbutton = document.createElement('button')
    answerbutton.innerText = index.choices[i].choice
    answerbutton.classList.add('btn')
    answerbutton.classList.add('answerbtn')
    answerbutton.addEventListener("click", answerCheck)
    answerbuttonsEl.appendChild(answerbutton)
    }
};

//display 'Correct! on screen
var answerCorrect = function() {
    if (correctEl.className = "hide") {
        correctEl.classList.remove("hide")
        correctEl.classList.add("banner")
        wrongEl.classList.remove("banner")
        wrongEl.classList.add("hide")
    }
}
//display 'Wrong!' on screen

var answerWrong = function() {
    if (wrongEl.className = "hide") {
        wrongEl.classList.remove("hide")
        wrongEl.classList.add("banner")
        correctEl.classList.remove("banner")
        correctEl.classList.add("hide")

    }
}

//Check for correct answers

var answerCheck = function(event) {
    var selectedanswer = event.target
        if (arrayShuffleQuestions[QuestionIndex].a === selectedanswer.innerText) {
            answerCorrect()
            score = score + 25
        }

        else {
            answerWrong()
            score = score - 0;
            timeleft = timeleft - 10;
        };

    //if there is another question proceed to that question

    QuestionIndex++ 
    if (arrayShuffleQuestions.length > QuestionIndex + 1) {
        setQuestion()
    }
    else {
        gameover = "true";
        showScore();
        }
    }

    //Total score display at end of quiz

var showScore = function() {
    containerQuestionEl.classList.add("hide");
    containerEndEl.classList.remove("hide");
    containerEndEl.classList.add("show");

var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your final score is " + score + "!");
    containerScoreEl.appendChild(scoreDisplay);
}

//Create high scores
var createHighScore = function(event) {
    event.preventDefault()
    var initials = document.querySelector("#initials").value;
        if (!initials) {
            alert("Enter your initials!");
            return;
        }

    formInitials.reset();

    var HighScore = {
        initials: initials,
        score: score
    }

//Sort scores
    HighScores.push(HighScore);
    HighScores.sort((a,b) => {return b.score-a.score});

//Clearing of visible high score list and resorting

    while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild)
}
//Order for high scores

for (var i = 0; i < HighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.className = "high-score";
    highscoreEl.innerHTML = HighScores[i].initials + "-" + HighScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);
}

saveHighScore();
displayHighScores();

}

//Save high score
var saveHighScore = function () {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))
}

//load values/ called on page load
var loadHighScore = function () {
    var LoadedHighScores = localStorage.getItem("HighScores")
    if (!LoadedHighScores) {
        return false;
    }

    LoadedHighScores = JSON.parse(LoadedHighScores);
    LoadedHighScores.sort((a,b) => {return b.score-a.score})

    for (var i=0; i < LoadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.className = "high-score";
        highscoreEl.innerText = LoadedHighScores[i].initials + "-" + LoadedHighScores[i].score;
            listHighScoreEl.appendChild(highscoreEl);
            HighScores.push(LoadedHighScores[i]);
    }
}
    //display of high scores from either link on first page or when user initials entered

    var displayHighScores = function() {
        containerHighScoresEl.classList.remove("hide");
        containerHighScoresEl.classList.add("show");
        gameover = "true"

        if (containerEndEl.className = "show") {
            containerEndEl.classList.remove("show");
            containerEndEl.classList.add("hide");
        }
        if (containerStartEl.className = "show") {
            containerStartEl.classList.remove("show");
            containerStartEl.classList.add("hide");
        }
        if (containerQuestionEl.className = "show") {
            containerQuestionEl.classList.remove("show");
            containerQuestionEl.classList.add("hide");
        }
        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide");
        }
        if (wrongEl.className = "show") {
            wrongEl.classList.remove("show");
            wrongEl.classList.add("hide");
        }
    }

    //clear high scores
    var clearScores = function () {
        HighScores = [];
        while (listHighScoreEl.firstChild) {
            listHighScoreEl.removeChild(listHighScoreEl.firstChild);
        }
        localStorage.clear(HighScores);
    }

    loadHighScore()

    //on start click to start quiz
    btnStartEl.addEventListener("click", startGame)
    //submit button
    formInitials.addEventListener("submit", createHighScore)
    //high-scores clicked
    ViewHighScoreEl.addEventListener("click", displayHighScores)
    //'Go back' button
    btnGoBackEl.addEventListener("click", renderStartPage)
    //Clear 'high scores' button
    btnClearScoresEl.addEventListener("click", clearScores)