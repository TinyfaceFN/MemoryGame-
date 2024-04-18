const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
let shuffledColors = shuffle(COLORS);
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    newDiv.setAttribute('data-shown', false)

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let gameStart = null
let selectedCard = ''
let cardSelected = null
let checkIfSame = null
let revealedCard = null
let gameEnded = false
let score = 0
let lowScore = 999999

if(localStorage.getItem('lowScore') !== null){
lowScore = localStorage.getItem('lowScore')
document.querySelector('h3').textContent =`Lowest Score: ${lowScore}`
}

function handleCardClick(event) {
    
if(!gameStart){
    return
}
if(event.target.getAttribute('data-shown') === 'true'){
        return;
    }
  // you can use event.target to see which element was clicked
  if(checkIfSame){
    return;
  }
  //set color
  let cardColor = event.target.classList[0]
  event.target.style.backgroundColor = cardColor
  score++
  document.querySelector('h2').textContent =`Current Score: ${score}`
  event.target.setAttribute('data-shown', true)


  //save first selection
  if(cardSelected === event.target){
    return;
  }

  if(!cardSelected){
    cardSelected=event
    selectedCard=event.target
    return;
  }

  if(selectedCard.classList[0] === event.target.classList[0]){
    console.log('they match!')
    checkIfSame = true
    selectedCard = null
    setTimeout(()=>{
    // selectedCard = null
    cardSelected = false
     checkIfSame = false
     revealedCard += 2
        if(revealedCard === 10){
            alert('You have matched all the cards, you win! ')
            if(score < lowScore){
              lowScore = score
              document.querySelector('h3').textContent =`Lowest Score: ${lowScore}`
              localStorage.setItem('lowScore', lowScore)
            }
            gameEnded=true

          }
           },1000)
        return
  }
//   if(!cardSelected){
//     return
//   }
  checkIfSame = true
  setTimeout(()=>{
    event.target.setAttribute('data-shown', false)
    selectedCard.setAttribute('data-shown', false)
    event.target.style.backgroundColor = null
    selectedCard.style.backgroundColor = null
     selectedCard = null
    cardSelected = null
     checkIfSame = null
   
     return;
  },1000)
}
let startCLick = document.querySelector('#start')
startCLick.addEventListener('click', function(){
if(gameEnded){
    return
}
gameStart = true
})

let restartClick = document.querySelector('.restart')
restartClick.addEventListener('click', function(){
    if(!gameEnded){
        return
    }
gameStart = true
gameEnded = false
let newGameDivs = gameContainer.children
for(let x of newGameDivs){
    x.style.backgroundColor = null
    x.setAttribute('data-shown', false)
}
selectedCard = null
cardSelected = null
checkIfSame = null
revealedCard = null
score=0
})

// when the DOM loads
createDivsForColors(shuffledColors);

