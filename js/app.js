//Global Variables
var moves = 0, stars = 3, sec = 0; time = 0, counter = 0, cardsCorrect = 0;
//Global Variables

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Turn card function
function turnCard(card){
    card.addClass("open show");           
}

//restart game function (is not complete yet! I need to make this function restart the count too!)
function restartGame(){
    $(".fa-repeat").click(function(){
        $('li.card').removeClass("open show match");
        $('span.moves').text("");
        moves = 0;
        $('li.card').css("pointer-events","all");
        randomCards();
        sec = 0;
        time = 0;

        if(cardsCorrect == 8){ // check if the game is over or not
        scoreCounter();
        }
        resetStar();
    });
}

//reset stars
function resetStar(){
    if(stars == 1){
        $("#stars").append("<li><i class=\"fa fa-star\"></i></li>");
        $("#stars").append("<li><i class=\"fa fa-star\"></i></li>");
    }else if(stars == 2){
        $("#stars").append("<li><i class=\"fa fa-star\"></i></li>");
    }
    stars = 3;
}

//push all the cards on an array for shuffle
function arrayCard(){
    
    var cardList = $(".card").children();
    var arrayCards = [];

    for(var i in cardList){
        arrayCards.push(cardList[i]);
    }
    shuffle(arrayCards);

    console.log(arrayCards);
    
    for(let i=0; i < arrayCards.length;i++){
       let array = arrayCards[i].className;
       console.log(array);    
       
    }
    return arrayCards;
}

//Random all the cards
function randomCards(){
   var deck = $('.deck');
   var cards = deck.children();
   while(cards.length){
       deck.append(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);
   }

}

// push the card on array
function compareClickedCard(){
    var arrayClickedCards = [];
    var arrayParentCard = [];
    

    $('li.card').click(function(){

        turnCard($(this));
        $(this).css("pointer-events","none");

        card = $(this).children().attr('class');
        arrayParentCard.push($(this));
        arrayClickedCards.push(card);

        if (arrayParentCard.length == 2) {
            if (arrayClickedCards[0] == arrayClickedCards[1]) {
                
                for (let i = 0; i < arrayClickedCards.length; i++) {
                    arrayParentCard[i].addClass("match");
                    arrayParentCard[i].css("pointer-events","none");
                 }
                console.log("Você encontrou os cards: "+arrayClickedCards)
                arrayClickedCards = [];
                arrayParentCard = [];
                cardsCorrect += 1;
                console.log(cardsCorrect);
                checkFinalGame(cardsCorrect);
            }else{
                
               arrayParentCard[0].addClass("wrong");
                arrayParentCard[1].addClass("wrong");

                setTimeout(function(){
                for (let i = 0; i < arrayClickedCards.length; i++) {
                    arrayParentCard[i].removeClass("open show wrong");
                    arrayParentCard[i].css("pointer-events","all"); 
                 }
                arrayClickedCards = [];
                arrayParentCard = [];
                },700);
            }
            
        }
        starRanking();
    });   
}

//Check if all cards was discovered
function checkFinalGame(cards){
    if (cards == 8){
        stopTime();
        messageWinner();
    }
}

//how many moves do you need?
function scoreCounter(){
   counter = setInterval( function(){
        time++;
        timeCounter();
        }, 1000);
    $('.card').click(function(){
        moves = moves + 1;
        $('span.moves').text(moves);
    });
}

//timer counter
function timeCounter(){
    document.getElementById("seconds").innerHTML=calcTime(++sec%60);
    document.getElementById("minutes").innerHTML=calcTime(parseInt(sec/60,10));
}    

//calculate the time for render the numbers
function calcTime(val){
    return val > 9 ? val : "0" + val; 
}

//calculate the final time in minutes
function finalMin(){
    let minFinal = Math.floor(time / 60);
    return minFinal;
}

//calculate the final time in seconds
function finalSec(){
    let secFinal = Math.floor(time % 60);
    return secFinal;
}

//How many star you will get?
function starRanking(){
    
    if(moves == 30){
        removeStar();
    }else if(moves == 40){
        removeStar();
    }
}

//stop the time
function stopTime(){
    clearInterval(counter);
}

// remove some stars
function removeStar(){
    $(".fa-star").first().remove();
    stars -= 1;
}

//show the win message
function messageWinner(){
    alert("You won! Congratulations!!!"+
            "\n This is your final score: "+moves+" moves"+
            "\n Number of stars: "+stars+
            "\n Time: "+finalMin()+" minutes and "+finalSec()+" seconds");
}

randomCards();
scoreCounter();
compareClickedCard();
restartGame();
