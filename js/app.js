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
var moves = 0, stars = 3;
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
    });
}

//push all the cards on an array for shuffle
function arrayCard(){
    //var cardList = document.getElementsByClassName("card");
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
    var cardsCorrect = 0;

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
        messageWinner();
    }
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
    
    if(moves == 30){
        removeStar();
    }else if(moves == 40){
        removeStar();
    }
}

// remove some stars
function removeStar(){
    $(".fa-star").first().remove();
    stars -= 1;
}

function messageWinner(){
    alert("You won! Congratulations!!!"+
            "\n This is your final score: "+moves+" moves"+
            "\n Number of stars: "+stars);
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  OK - display the card's symbol (put this functionality in another function that you call from this one)
 *  OK - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  OK if the list already has another card, check to see if the two cards match
 *   OK if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *   OK if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *   OK increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    OK if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
randomCards();
scoreCounter();
compareClickedCard();
restartGame();
