$(document).ready(function () {
    var opt = [
        {
            question: "Luka Dončić plays for which team?",
            choices: ["Chicago Bulls","Brooklyn Nets","Dallas Mavericks","Orlando Magic"],
            answer: 2,
            photo:   "assets/images/luka.jpg"
        },
        {
            question: "Who plays as a shooting guard?",
            choices: ["Lebron James","Kevin Durant","Joel Embiid","James Harden"],
            answer: 3,
            photo:   "assets/images/harden.jpg"
        },
        {
            question: "Who was the #1 player for the 2018-19 NBA season?",
            choices: ["Stephen Curry","Lebron James","Giannis Antetokounmpo","Kevin Durant"],
            answer: 1,
            photo:   "assets/images/lebron.png"
        },
        {
            question: "Which of these players is from Philadelphia 76ers?",
            choices: ["Rudy Gobert","Victor Oladipo","Ben Simmons","Klay Thompson"],
            answer: 2,
            photo:   "assets/images/ben.jpg"
        },
        {
            question: "Which team is last season's champion?",
            choices: ["Golden State Warriors","Houston Rockets","Toronto Raptors","Utah Jazz"],
            answer: 2,
            photo:   "assets/images/toronto.jpg"
        }];

var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timer = 20;
var intervalID;
var running = false;
var userGuess = "";
var questionsCount = opt.length;
var pick;
var index;
var newA = [];
var hold = [];

$("#restart").hide();

$("#start").on("click", function () {
    $("#start").hide();
    displayQ();
    runTimer();
    for (var i = 0; i < opt.length; i++) {
        hold.push(opt[i]);
    }
})

function runTimer() {
    if (!running) {
        intervalID = setInterval(decrement, 1000);
        running = true;
    }
}

function decrement() {
    $("#timeLeft").html("<h3>Time remaining: " + timer + "</h3>");
    timer--;
   
    if (timer === 0) {
        unanswered++;
        stop();
        $("#answerSection").html("<p>Time's up! Correct answer: " + pick.choices[pick.answer] + "</p>");
        hidepic();
    }

}

function stop() {
    running = false;
    clearInterval(intervalID);
}

function displayQ() {
    index = Math.floor(Math.random() * opt.length);
    pick = opt[index];
 
        $("#questionSection").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choices.length; i++) {
            var userChoice = $("<button>");
            userChoice.addClass("answerbutton");
            userChoice.html(pick.choices[i]);
            userChoice.attr("guessv", i);
            $("#answerSection").append(userChoice);
        }
    }

$(document).on("click",".answerbutton", function () {
    userGuess = parseInt($(this).attr("guessv"));
    console.log(userGuess,pick.answer);
    if (userGuess === pick.answer) {
        stop ();
        correct++;
        userGuess = "";
        $("#answerSection").html("<h4>Correct!</h4>");
        hidepic();
    }
    else {
        stop();
        incorrect++;
        userGuess = "";
        $("#answerSection").html("<p>Incorrect! The correct answer is: " + pick.choices[pick.answer] + "</p>");
        hidepic();
    }
})

function hidepic() {
    $("#answerSection").append("<img src=" + pick.photo + ">");
    newA.push(pick);
    opt.splice(index,1);

    var hp = setTimeout(function() {
        $("#answerSection").empty();
        timer = 20;

    if ((incorrect + correct + unanswered) === questionsCount) {
        $("#questionSection").empty();
        $("#questionSection").html("<h3>Game Over!</h3>");
        $("#answerSection").append("<h4>Correct: " + correct + "</h4>");
        $("#answerSection").append("<h4>Incorrect: " + incorrect + "</h4>");
        $("#answerSection").append("<h4>Unanswered: " + unanswered + "</h4>");
        $("#restart").show();
        $("#timeLeft").hide();
        correct = 0;
        incorrect = 0;
        unanswered = 0;
    }
    else {
        runTimer();
        displayQ();
    }
    },3000);
}

$("#restart").on("click", function() {
    $("#restart").hide();
    $("#answerSection").empty();
    $("#questionSection").empty();
    for (var i=0; i < hold.length; i++) {
        opt.push(hold[i]);
    }
    runTimer();
    displayQ();
})

})