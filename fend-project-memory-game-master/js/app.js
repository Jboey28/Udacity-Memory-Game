// Declaring the DOM elements
let deck = document.querySelector(".deck");

let reset = document.getElementById('reset');
let cards = document.getElementsByClassName('card');
let modal = document.getElementById('modal');
let scoresheet = document.getElementById('scoresheet');
let star1 = document.getElementById('star1');
let star2 = document.getElementById('star2');
let star3 = document.getElementById('star3');
let moves = document.getElementById('moves');

let a = ('<li class="card" > <i class="fa fa-diamond"   ></i> </li> <li class="card"> <i class="fa fa-paper-plane-o" ></i </li> <li  class="card"> <i  class="fa fa-anchor"></i> </li> <li   class="card"> <i class="fa fa-bolt" ></i> </li> <li  class="card"> <i  class="fa fa-cube"></i> </li> <li class="card"> <i class="fa fa-anchor" ></i> </li> <li class="card"> <i class="fa fa-leaf"></i> </li> <li class="card"> <i class="fa fa-bicycle"  ></i> </li> <li class="card"> <i class="fa fa-diamond" ></i> </li> <li class="card"> <i class="fa fa-bomb" ></i> </li> <li class="card"> <i  class="fa fa-leaf"></i> </li> <li class="card"> <i  class="fa fa-bomb"></i> </li> <li class="card"> <i class="fa fa-bolt"></i> </li> <li class="card"> <i  class="fa fa-bicycle"></i> </li> <li class="card"> <i class="fa fa-paper-plane-o"></i> </li> <li class="card"> <i class="fa fa-cube"></i> </li>');


deck.insertAdjacentHTML("afterbegin", a);
  



// Declaring variables to be used within the program
let allCards = [...cards];
let flippedCard = false;
let firstCard = null, secondCard = null;
let icons = [];
let completed = false;


// Adding EventListener to handle the reset button click event
reset.addEventListener('click', resetAll);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

for (let i = 0; i < allCards.length; i++){
    allCards[i].addEventListener('click', showcards)
    allCards[i].classList.add(i)
}

// Function to show cards
function showcards(){
    this.classList.add('card-open');
    this.classList.add('card-show');

    
    add_to_open_list(this, this.innerHTML);
    countMoves();
}

function countMoves(){
    moves.innerHTML = moveCount ;
    if(moveCount == 0){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }

    if((moveCount > 0) && (moveCount <= 15)){
        star1.style.color = 'Gold'; 
        star2.style.color = 'Gold'; 
        star3.style.color = 'Gold'; 
    }else if((moveCount >= 15) && (moveCount <= 20)){
        star1.style.color = 'Gold'; 
        star2.style.color = 'Gold';
        star3.style.color = 'black';
    }else if(moveCount >= 21){
        star1.style.color = 'Gold'; 
        star2.style.color = 'black'; 
        star3.style.color = 'black';
    }

   

}



// open list function
let open_list_item = [];
let open_list_parent = [];
function add_to_open_list(items_parent, item){
    open_list_item.push(item);
    open_list_parent.push(items_parent);
    if((open_list_item.length >= 2) && (open_list_parent.length >= 2)){
        check_match(open_list_parent[0], open_list_parent[1], open_list_item[0], open_list_item[1]);
        open_list_item = [];
        open_list_parent = [];
    }
}

let count = 0;
let moveCount = 0;
//TODO: To check if they match
function check_match(cardparent1, cardparent2, card1, card2){
    console.log("cardparent1: "+ cardparent1.className + " cardparent2: " + cardparent2.className)
    console.log("card1: "+ card1 + " card2: " + card2)
    if(card1 == card2  && cardparent1.className != cardparent2.className ){
        cardparent1.classList.toggle('card-match');
        cardparent2.classList.toggle('card-match');
        cardparent1.classList.remove('card-show');
        cardparent2.classList.remove('card-show');
        cardparent1.classList.remove('card-open');
        cardparent2.classList.remove('card-open');
        console.log('they are the same');
        count++;
        moveCount++;
        console.log(count);
        check_if_all_open(count, moveCount);
    }else{
        console.log('they are not the same');
        moveCount++;
        setTimeout(() => {
            cardparent1.classList.remove('card-open');
            cardparent1.classList.remove('card-show');
            cardparent2.classList.remove('card-open');
            cardparent2.classList.remove('card-show');
            
        }, 300);
    }
}

// Game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+" mins "+second+" secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    }, 1000);
}

//TODO: to know when the game has been completed 
function check_if_all_open(value, result){
    if(value == 8){
        //get the final time
        clearInterval(interval)
        final_time = timer.innerHTML
        timer.innerHTML = final_time
        console.log("final time: " + final_time)
        popup(result,final_time); 
    }
}




//function for Modal popup
function popup(result,final_time){
    modal.className = 'showpop';

    scoresheet.innerHTML = '';

    let h1 = document.createElement('h1');
    h1.innerHTML = 'Score Board';
    let p = document.createElement('p');
    p.innerHTML = 'You Finished in ' + result + ' Moves';
    let a = document.createElement('p');
    a.innerHTML = 'and in ' + final_time;
    let button = document.createElement('button');
    button.setAttribute('id', 'finish');
    button.innerHTML = 'Play Again';
    button.addEventListener('click', hidepop);
    let ul = document.createElement('ul');
    ul.classList.add('stars');
    let star11 = document.createElement('li');
    star11.innerHTML = '<i class="fa fa-star"></i>';
    let star12 = document.createElement('li');
    star12.innerHTML = '<i class="fa fa-star"></i>';
    let star13 = document.createElement('li');
    star13.innerHTML = '<i class="fa fa-star"></i>';

    ul.style.listStyle = 'none';
    ul.style.display = 'flex';
    ul.style.boxSizing = 'border box';
    ul.style.paddingRight = '40px';
    ul.style.flexDirection = 'row';

    ul.appendChild(star11);
    ul.appendChild(star12);
    ul.appendChild(star13);


    scoresheet.appendChild(h1);
    scoresheet.appendChild(p);
    scoresheet.appendChild(a);
    scoresheet.appendChild(ul);
    scoresheet.appendChild(button);

    if((result > 0) && (result <= 15)){
        star1.style.color = 'Gold'; star11.style.color = 'Gold';
        star2.style.color = 'Gold'; star12.style.color = 'Gold';
        star3.style.color = 'Gold'; star13.style.color = 'Gold';
    }else if((result >= 15) && (result <= 20)){
        star1.style.color = 'Gold'; star11.style.color = 'Gold';
        star2.style.color = 'Gold'; star12.style.color = 'Gold';
    }else if(result >= 21){
        star1.style.color = 'Gold'; star11.style.color = 'Gold';
    }

    moves.innerHTML = '';
    moves.innerHTML = result;
}

function hidepop(){
    modal.className = 'hidepop';
    resetAll();
}


// TO RESTART OR RESET ALL
function resetAll(){
    for(let i = 0; i < cards.length; i++){
        cards[i].classList.remove('card-open');
        cards[i].classList.remove('card-show');
        cards[i].classList.remove('card-match');
    }
    var shuffledCards = shuffle(allCards);
    for (var i= 0; i < shuffledCards.length; i++){
       [].forEach.call(shuffledCards, function(cards){
          deck.appendChild(cards);
       });
    }
    
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);

    count = 0;
    moveCount = 0;
    open_list_item = [];
    open_list_parent = [];
    star1.style.color = 'Gold';
    star2.style.color = 'Gold'; 
    star3.style.color = 'Gold'; 
    moves.innerHTML = '0';

    
}






window.onload = resetAll();









/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */