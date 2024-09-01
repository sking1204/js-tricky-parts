/* Write a function called ***guessingGame*** which returns a function that allows you to guess
 a random whole number between 0 and 99. Every time you create a new game, it should select
 a *new*  random number, and keep it secret from the player.

Once the game has started, you can guess the number. The game should tell you whether your guess 
is too high, too low, or correct.

After a correct guess, the game ends. */ 

//this is example of closure because the guess function has access to secret Num declared in guessing
//game function


function guessingGame() {
    let secretNum = Math.floor(Math.random() * 100);
    let gameWon = false;
    let numGuesses = 0;
    console.log(secretNum);

    return function guess(num){
        if(gameWon) return "The game is over, you already won!"
        numGuesses++;
        if(num === secretNum){             
            gameWon = true;
            return `You win! You found ${num} in ${numGuesses} guesses.`;
            
        }
        else if(num > secretNum){
            return `${num} is too high!`
        }
        else{
            return`${num} is too low!`;
        }

    }

}

module.exports = { guessingGame };

// function guessingGame() {
//     const ANSWER = Math.floor(Math.random() * 100);
//     let isOver = false;
//     let numGuesses = 0;
  
//     return function guess(num) {
//       if (isOver) return "The game is over, you already won!";
//       numGuesses++;
//       if (num === ANSWER) {
//         isOver = true;
//         const guess = numGuesses === 1 ? "guess" : "guesses";
//         return `You win! You found ${num} in ${numGuesses} ${guess}.`;
//       }
//       if (num < ANSWER) return `${num} is too low!`;
//       if (num > ANSWER) return `${num} is too high!`;
//     };
//   }
  
//   module.exports = { guessingGame };
