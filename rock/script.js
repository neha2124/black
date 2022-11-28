const wrapper = document.querySelector('.wrapper')
    
const moves = document.querySelector('.moves-left');
const Message = document.querySelector('.message')
   
   let playerScore = 0;
    let computerScore = 0;
    let move = 0;
    let Score =0;
  
    


// get computer options
const computerOption = () => {
    const computerOptions = ['rock','paper','scissor']
    const random = Math.floor(Math.random () * 3)
    console.log(computerOptions[random])
    return computerOptions[random]
}

const onclickRPS = (playerChoice) =>{
    const computerChoice = computerOption();
    getResult (playerChoice.value,computerChoice)
    
    }
    // get player options
    const playerOption = () =>{
        const palyerOptions = document.querySelectorAll ('.rps');
        palyerOptions.forEach (option => {
            option.onclick = () => {
                    onclickRPS(option)
            }
        } )
    
    }
const getResult = (player,computer) =>{
    
    // console.log(Message)
    const pScore = document.querySelector('.p-score')
    const cScore = document.querySelector ('.c-score')


    if (player == computer){
        Message.textContent = ' Tie !'
        Message.style.color = 'yellow'
    }else if (player == 'rock' && computer == 'scissor'){
        Message.textContent = 'You Won' 
        Message.style.color = 'green'  
        playerScore ++
           pScore.textContent = playerScore
                 
    }else if (player == 'paper' && computer == 'rock'){
        Message.textContent = 'You Won'
        Message.style.color = 'green'
        playerScore ++ 
        pScore.textContent = playerScore;
    }else if (player == 'scissor' && computer == 'paper'){
        Message.textContent = 'You Won'
        Message.style.color = 'green'
        playerScore ++
        pScore.textContent = playerScore;
    }else {
        Message.textContent = 'You lose'
        Message.style.color = 'red'
        computerScore ++
        cScore.textContent = computerScore
    }
    
    
}



const finalResult = () => {
   
    const rpsButtons = document.querySelectorAll('.rps');
    rpsButtons .forEach (rpsButton => {
        rpsButton.addEventListener('click' , function (){
           
            move++
            // console.log(move)
            moves.textContent = `Moves-left ${10-move}`
            console.log(moves)
            if (move == 10){
                gameOver(playerScore,computerScore)
                }
        })
       
    })  
}
const gameOver = (playerScore, computerScore) => {
    const Winner = document.querySelector('.last-message')
    moves.style.display = 'none'
    wrapper.style.display = 'none'
    Message.style.display = 'none'
    
    if (playerScore > computerScore && playerScore !==computerScore){
      
        Winner.innerHTML = 'You Won this game'
        Winner.style.color = 'green' 

}else if (computerScore > playerScore){
   
      Winner.innerHTML = 'computer won this game'
      Winner.style.color = 'red'
}else{
    Winner.innerHTML = 'Tie'
    Winner.style.color = 'yellow'
}
   const restart = document.querySelector('.reload');
   restart.style.display= 'block'
   restart.textContent = 'Restart'
   restart.addEventListener('click' , () => {
    window.location.reload();
   })
}
playerOption();
finalResult();
