

var randomNumber1 = Math.floor(Math.random()*6)+1;

var randomDiceImage = "dice"+ randomNumber1+".png";

var randomDiceSource = "./images/"+randomDiceImage ;

var image1 = document.querySelectorAll("img")[0];

image1.setAttribute("src",randomDiceSource);


var randomNumber2 = Math.floor(Math.random()*6)+1;

var randomDiceImage = "dice"+ randomNumber2+".png";

var randomDiceSource2 = "./images/"+randomDiceImage ;

var image2 = document.querySelectorAll("img")[1];

image2.setAttribute("src",randomDiceSource2);

if(randomNumber1 > randomNumber2)
{   
    document.querySelector("h1").textContent="🚩Player 1 wins";

}
else if(randomNumber2 > randomNumber1)
{
    document.querySelector("h1").textContent="Player 2 wins 🚩";
}
else{
    document.querySelector("h1").textContent="Matches tie";
}