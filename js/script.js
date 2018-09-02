// Panel ze wszystkimi kartami
const panel = document.getElementById('cardMap')
// Utrzymywanie kart w pozycji
let card = document.getElementsByTagName('li')
let cards = [...card]


// Zmienna odpowiedzialna za ilośc ruchówarn
let moves = 0;
let counter = document.querySelector('.moves')

//Muzyczka
var x = document.getElementById('musicIsGood')

// karty otwarte
var openedCards = [];

// Zmienna dla poprawnie wybranej karty
let matchedCard = document.getElementsByClassName('correct')

// Zamknięcie wyskakującego okna
let closed = document.querySelector('.closeBox')

//Okno Modalne
let modal = document.getElementById('end')

//Ścieżki Arni
const audiolist = ['./mp3/NyanCat.mp3','./mp3/showtime.mp3','./mp3/bathroom.mp3','./mp3/chopper.mp3','./mp3/tobe.mp3','./mp3/intotheboat.mp3','./mp3/back.mp3','./mp3/hahaha.mp3','./mp3/spot.mp3']


// Losowanie kart

function shuffle(array) {
  var currentPosition = array.length, temp, randomPosition;

  while (currentPosition !== 0) {
  randomPosition = Math.floor(Math.random() * currentPosition);
  currentPosition -= 1;
  temp = array[currentPosition];
  array[currentPosition] = array[randomPosition]
  array[randomPosition] = temp;
}
return array;
};

//Start ekranu - Rozpoczęcie gry

document.body.onload = startGame();

// Rozpoczęcie gry funkcja

function startGame() {

// losowanie kart
cards = shuffle(cards);
// Tymczasowe zniszczenie klas

for (var i = 0; i < cards.length; i++) {
  panel.innerHTML ='';
  [].forEach.call(cards, function(item) {
    panel.appendChild(item);
  });
  cards[i].classList.remove('show','correct','open','turnOff');
}
// Reset ruchów użytkownika
moves = 0;
counter.innerHtml = moves;
// Reset czasu
hour = 0;
minute = 0;
second = 0;
var timer = document.querySelector('#time');
timer.innerHtml = 'O godzin 0 minut i 0 sekund';
clearInterval(interval)

}

var displayCard = function () {
this.classList.toggle("open");
this.classList.toggle("show");
this.classList.toggle("turnOff");
}

function openCard() {
  openedCards.push(this);
  var arrayLength = openedCards.length;
  if(arrayLength){
    moveCounter();
    if (openedCards.length === 2) {
      if(openedCards[0].type === openedCards[1].type){
        matched();
      } else {
        unmatched();
      }
    }

  }
};

function matched() {
  let random = Math.floor(Math.random()*(audiolist.length -1)) +1
  console.log(random);
  openedCards[0].classList.add('correct', 'turnOff')
  openedCards[1].classList.add('correct', 'turnOff')
  openedCards[0].classList.remove('show', 'open','no-event')
  openedCards[1].classList.remove('show', 'open','no-event')
  openedCards = [];
  x.setAttribute('src',audiolist[random])
  x.play()
}

function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","uncorrect");
        openedCards[1].classList.remove("show", "open", "no-event","uncorrect");
        enable();
        openedCards = [];
    },1100);
}

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('turnOff');
    });
}

function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('turnOff');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("turnOff");
        }
    });
}

function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //Uruchamiamy czas
    if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
};

var second = 0, minute = 0; hour = 0;
var timer = document.querySelector('#time');
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+' minut(y) '+second+' sekund(y)';
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

function congratulations(){
    if (matchedCard.length == 32){
        clearInterval(interval);
        finalTime = timer.innerHTML;
        modal.classList.add("show");
        x.setAttribute('src',audiolist[0])
        x.play()
        //Uruchamiamy modal
        document.getElementById("finalMoves").innerHTML = moves;
        document.getElementById("time").innerHTML = finalTime;

        //Zamknięcie modali
        closeModal();
    };
}


// Zamknięcie okna modalnego
function closeModal(){
    closed.addEventListener("click", function(e){
        modal.classList.remove("show");
        x.pause();
        startGame();
    });
}


// JEszcze raz
function playAgain(){
    modal.classList.remove("show");
    x.pause();
    startGame();
}


// Zdarzenia dla każdej z kart
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", openCard);
    card.addEventListener("click",congratulations);
};
