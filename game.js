     //Memory Card Game//


   const board = document.getElementById("gameBoard");
  const movesText = document.getElementById("moves");
   const timerText = document.getElementById("timer");
 const message = document.getElementById("message");
 const restartBtn = document.getElementById("restartBtn");


const symbols = [
    "🍎","🍌","🍇","🍉",
    "🍒","🥝","🍍","🍓"
];

    let cards = [...symbols, ...symbols];

      let firstCard = null;
  let secondCard = null;

   let lockBoard = false;

   let moves = 0;
    let matched = 0;

 let seconds = 0;
   let timer;


function shuffle(array){

    for(let i=array.length-1;i>0;i--){

        let j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]]=[array[j],array[i]];

    }

}

shuffle(cards);


function startTimer(){

    clearInterval(timer);

    seconds=0;

    timer=setInterval(()=>{

        seconds++;

        let min=Math.floor(seconds/60);

        let sec=seconds%60;

        timerText.textContent=
        String(min).padStart(2,"0")+":"+
        String(sec).padStart(2,"0");

    },1000);

}


function createBoard(){

    board.innerHTML="";

    cards.forEach(symbol=>{

          const card=document.createElement("div");

         card.classList.add("card");

          card.dataset.symbol=symbol;

         card.textContent=symbol;
 
           card.addEventListener("click",flipCard);

         board.appendChild(card);

    });

}

createBoard();

startTimer();


function flipCard(){

       if(lockBoard) return;

           if(this===firstCard) return;

        if(this.classList.contains("match")) return;

         this.classList.add("flip");

      if(!firstCard){

        firstCard=this;

        return;

    }

    secondCard=this;

      lockBoard=true;

      moves++;

       movesText.textContent=moves;

     checkMatch();

}


function checkMatch(){

    if(firstCard.dataset.symbol===secondCard.dataset.symbol){

        firstCard.classList.add("match");
        secondCard.classList.add("match");

        matched++;

        resetTurn();

        if(matched===8){

            clearInterval(timer);

            message.textContent=
            `🎉 Congratulations! You won in ${moves} moves!`;

        }

    }

    else{

        setTimeout(()=>{

            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");

            resetTurn();

        },800);

    }

}


function resetTurn(){

        firstCard=null;
             secondCard=null;
            lockBoard=false;}


restartBtn.addEventListener("click",restartGame);

function restartGame(){

    clearInterval(timer);

            moves=0;
          matched=0;
       seconds=0;
 
        movesText.textContent="0";
       timerText.textContent="00:00";
     message.textContent="";

        firstCard=null;
       secondCard=null;
     lockBoard=false;

        cards=[...symbols,...symbols];

          shuffle(cards);

         createBoard();

      startTimer();

}