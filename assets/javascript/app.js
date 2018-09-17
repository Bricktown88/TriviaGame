$(document).ready(function () {


    var questionsArray = [
        {
            question: "What is the heaviest 'bony' fish in existance today?",
            choices: ["Goliath Grouper", "Mola (Ocean Sunfish)", "Whale Shark", "Black Marlin"],
            answer: 1,
            image: "assets/images/mola-mola.jpg"
        },
        {
            question: "When did the Kansas City Royals win their most recent World Series?",
            choices: ["2013", "2014", "2015", "2016"],
            answer: 2,
            image: "assets/images/royals.jpg"
        },
        {
            question: "What is the state bird of Louisiana?",
            choices: ["Great Blue Heron", "Black-Capped Chickadee", "Pelican", "Meadowlark"],
            answer: 2,
            image: "assets/images/pelican.jpg"
        },
        {
            question: "What is the most populous city in the world?",
            choices: ["Tokyo", "Delhi", "Beijing", "Shanghai"],
            answer: 0,
            image: "assets/images/tokyo.jpg"
        },
        {
            question: "What year did Kansas become a state?",
            choices: ["1861", "1865", "1866", "1854"],
            answer: 0,
            image: "assets/images/kansas.jpg"
        }];

    var correctCount = 0;
    var incorrectCount = 0;
    var unansweredCount = 0;
    var q;
    var secondArray = [];
    var placeholderArray = [];
    var qIndex;
    var numberOfQuestions = questionsArray.length;
    var userGuess = "";



    var intervalId;
    var clockRunning = false;
    var perQuestionTimer = 20;
    
    // hide the restart button at the start since they havent played yet
    $("#restart-button").hide();
    
    $("#start-button").on("click", function () {
        $("#start-button").hide();
        showQuestion();
        gameTimer();
        for (var i = 0; i < questionsArray.length; i++) {
            placeholderArray.push(questionsArray[i]);
        }
    })


    function gameTimer() {
        if (!clockRunning) {
            intervalId = setInterval(countdown, 1000);
            clockRunning = true;
        }
    }

    function countdown() {
        $("#time-remaining").html("<p>Time remaining: " + perQuestionTimer + "</p>");
        perQuestionTimer--;

        if (perQuestionTimer === 0) {
            unansweredCount++;
            stopTimer();
            $("#result-window").html("<p>Hello!???! The correct answer was: " + q.choices[q.answer] + "</p>");
            hideImage();
        }
    }

    function stopTimer() {
        clockRunning = false;
        clearInterval(intervalId);
    }

    function showQuestion() {
        qIndex = Math.floor(Math.random() * questionsArray.length);
        q = questionsArray[qIndex];

        $("#question-window").html("<p>" + q.question + "</p>");
        for (var i = 0; i < q.choices.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(q.choices[i]);
            userChoice.attr("valueOfGuess", i);
            $("#result-window").append(userChoice);
        }
        $(".answerchoice").on("click", function () {
            userGuess = parseInt($(this).attr("valueOfGuess"))
            console.log(userGuess);

            if (userGuess === q.answer) {
                stopTimer();
                correctCount++;
                userGuess = "";
                $("#result-window").html("<p>Nice!</p>");
                hideImage();
            } else {
                stopTimer();
                incorrectCount++;
                userGuess = "";
                $("#result-window").html("<p>Oops. The correct answer we were looking for was: " + q.choices[q.answer] + "</p>");
                hideImage();
            }
        })
    }

    function hideImage() {
        $("#result-window").append("<img src=" + q.image + ">");
        secondArray.push(q);
        questionsArray.splice(qIndex, 1);

        setTimeout(function () {
            $("#result-window").empty();
            perQuestionTimer = 20;

            if ((correctCount + incorrectCount + unansweredCount) === numberOfQuestions) {
                $("#question-window").empty();
                $("#question-window").html("<h3>Finished.  Here are the results: </h3>");
                $("#result-window").append("<h4> Correct: " + correctCount + "</h4>");
                $("#result-window").append("<h4> Incorrect: " + incorrectCount + "</h4>");
                $("#result-window").append("<h4> Unanswered: " + unansweredCount + "</h4>");
                $("#restart-button").show();
                correctCount = 0;
                incorrectCount = 0;
                unansweredCount = 0;

            } else {
                gameTimer();
                showQuestion();

            }
        }, 4000);

    }

    $("#restart-button").on("click", function () {
        $("#restart-button").hide();
        $("#result-window").empty();
        $("#question-window").empty();

        for (var i = 0; i < placeholderArray.length; i++) {
            questionsArray.push(placeholderArray[i]);
        }

        gameTimer();
        showQuestion();
    })

})