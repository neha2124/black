// get the input from dealer and your box 
let blackJackGame = {
  'you': { 'scoreSpan': '#your-result', 'div': '#yourbox', 'score': 0 },
  'dealer': { 'scoreSpan': '#dealer-result', 'div': '#dealerbox', 'score': 0 },
  'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'j', 'k', 'Q'],
  'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'j': 10, 'k': 10, 'Q': 10, 'A': [1, 10] },
  'win': 0,
  'loss': 0,
  'draw': 0,
  'isStand': false,
  'turnOver': false,

}
// store your and dealer data in array to get an easy access
const YOU = blackJackGame['you']
const DEALER = blackJackGame['dealer']
//add sound to your game
const Hitsound = new Audio('cd/sounds/swish.m4a')
const Winsound = new Audio('cd/sounds/cash.mp3');
const Lostsound = new Audio('cd/sounds/aww.mp3')

//add eventlistner to hit button to intiate functions
document.querySelector('#black-jack-hit').addEventListener('click', blackjackHit);
document.querySelector('#black-jack-deal').addEventListener('click', deal);
document.querySelector('#black-jack-stand').addEventListener('click', dealerLogic);

function blackjackHit() {
  if (blackJackGame['isStand'] === false) {
    let card = randomcard();
    showCard(card, YOU)

    updateScore(card, YOU)
    showScore(YOU)
  }
}
function randomcard() {
  let random = Math.floor(Math.random() * 13)
  return blackJackGame['cards'][random]

}
// this function is responsible to show cards of active player div
function showCard(cards, activePlayer) {
  if (activePlayer['score'] <= 21) {
    // create img Element to store cards image
    let cardImage = document.createElement('img');
    // add image to caedImage
    cardImage.src = `cd/images/${cards}.png`;
    // get yourbox div append cardImge
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    Hitsound.play();
  }
}

// this function is responible to deal the card and remove cards from divand reset everysteps 
function deal() {
  if (blackJackGame['turnOver'] === true) {
    blackJackGame['isStand'] = false;
    let yourImage = document.querySelector('#yourbox').querySelectorAll('img');
    let dealerImage = document.querySelector('#dealerbox').querySelectorAll('img')
    for (const image of yourImage) {
      image.remove();
    }
    for (const dealerImg of dealerImage) {
      dealerImg.remove()
    }
    YOU['score'] = 0
    DEALER['score'] = 0;
    document.querySelector('#your-result').innerText = 0;
    document.querySelector('#dealer-result').innerText = 0;

    document.querySelector('#blackjack-result').textContent = "Lets play"
  }
}
function updateScore(card, activePlayer) {
  //fixed the score of Ace card if score is less or equal to 21 add 11 else add 1
  if (card === 'A') {
    if (activePlayer['score'] + blackJackGame['cardsMap'][card][1] <= 21) {
      activePlayer['score'] += blackJackGame['cardsMap'][card][1];
    } else {
      activePlayer['score'] += blackJackGame['cardsMap'][card][0];
    }
  } else {
    activePlayer['score'] += blackJackGame['cardsMap'][card];
  }

}
function showScore(activePlayer) {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).innerText = 'BUST';
  } else {
    document.querySelector(activePlayer['scoreSpan']).innerText = activePlayer['score'];
  }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
  blackJackGame['isStand'] = true;
  while (DEALER['score'] < 16 && blackJackGame['isStand'] === true) {
    let card = randomcard();
    showCard(card, DEALER);
    updateScore(card, DEALER)
    showScore(DEALER)
    await sleep(1000);
  }
    
  
  blackJackGame['turnOver'] = true;
    let winner = computeWinner();
    showResult(winner)

}
// function to decide winner
function computeWinner() {
  let winner;
  // conditoin: 
  if (YOU['score'] <= 21) {
    if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
      blackJackGame['win']++
      winner = YOU;

    } else if (YOU['score'] < DEALER['score']) {
      blackJackGame['loss']++
      winner = DEALER;

    } else if (YOU['score'] === DEALER['score']) {
      blackJackGame['draw']++
    }
  } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
    blackJackGame['loss']++
    winner = DEALER;

  } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
    blackJackGame['draw']++
  }
  console.log('winner is', winner)
  return winner
}
function showResult(winner) {
  let message;
  let messageColor;
  if (winner === YOU) {
    document.querySelector('#win').textContent = blackJackGame['win'];
    message = 'you WON!';
    messageColor = 'green';
    Winsound.play()
  } else if (winner === DEALER) {
    document.querySelector('#loss').textContent = blackJackGame['loss'];
    message = 'you LOST!'
    messageColor = 'red';
    Lostsound.play();
  } else {
    document.querySelector('#draw').textContent = blackJackGame['draw']
    message = 'you drew! ';
    messageColor = 'black';
  }
  document.querySelector('#blackjack-result').textContent = message;
  document.querySelector('#blackjack-result').style.color = messageColor;
}