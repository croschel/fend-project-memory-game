/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Global Variables
var moves = 0;
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
    });
}

//push all the cards on an array for shuffle
function arrayCard(){
    var cardList = document.getElementsByClassName("card");
    var arrayCards = [];

    for(var i in cardList){
        arrayCards.push(cardList[i]);
    }
    shuffle(arrayCards);
    return arrayCards;
}

// push the card on array
function compareClickedCard(){
    var arrayClickedCards = [];
    var arrayParentCard = [];

    $('li.card').click(function(){

        turnCard($(this));
        starRanking();
        $(this).css("pointer-events","none");

        card = $(this).children().attr('class');
        arrayParentCard.push($(this));
        arrayClickedCards.push(card);
        
        //console.log(arrayParentCard.length);

        if (arrayParentCard.length == 2) {
            if (arrayClickedCards[0] == arrayClickedCards[1]) {
                
                for (let i = 0; i < arrayClickedCards.length; i++) {
                    arrayParentCard[i].addClass("match");
                    arrayParentCard[i].css("pointer-events","none");
                 }
                console.log("Você encontrou os cards: "+arrayClickedCards)
                arrayClickedCards = [];
                arrayParentCard = [];
            }else{
                for (let i = 0; i < arrayClickedCards.length; i++) {
                    arrayParentCard[i].removeClass("open show");
                    arrayParentCard[i].css("pointer-events","all"); 
                 }
                arrayClickedCards = [];
                arrayParentCard = [];
            }
        }
    });
    
    
}

//how many moves do you need?
function scoreCounter(){
    $('.card').click(function(){
        moves = moves + 1;
        $('span.moves').text(moves);
    });
}

//How many star you will get?
function starRanking(){
    console.log(moves);
    if(moves == 25){
        removeStar();
    }else if(moves == 35){
        removeStar();
    }
}


function removeStar(){
    let star = document.getElementById("star");
        star.removeChild(star.childNodes[0]);
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  OK - display the card's symbol (put this functionality in another function that you call from this one)
 *  OK - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  OK if the list already has another card, check to see if the two cards match
 *   OK if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *   OK if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *   OK increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

scoreCounter();

compareClickedCard();
restartGame();
