
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePatterns = [];

function nextSequence()
{
    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColor = buttonColors[randomNumber];

    gamePatterns.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("./sounds/"+ randomChosenColor +".mp3");
    audio.play();
}

