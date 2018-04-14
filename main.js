var Word = require('./word.js');
var prompt = require('prompt');

console.log("Let's play a game...");
console.log("Guess the last names of actors/actresses that starred in the SAW movie series!");
console.log("Live or Die, make your choice!");
console.log("-----------------------------");
prompt.start();



game = {
  wordBank: ["bell", "glover", "smith", "potter", "leung", "meyer", "martinez", "elwes", "emerson", "whannell", "vega", "butters", "koules"],
  wordsWon: 0,
  guessesRemaining: 10,
  currentWrd: null,
  
  //accessing random word from the word bank to begin game
  startGame: function (wrd) {
    this.resetGuesses();
    this.currentWrd = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
    this.currentWrd.getLet();
    this.promptUser();
  },

//setting the number of guesses
  resetGuesses: function(){
    this.guessesRemaining = 10;
  },

//storing and comparing user guess to chosen word
  promptUser: function(){
    //make self = this to maintain "this" pointer
    var self = this;
    prompt.get(['guessLet'], function(err, result){
      console.log("You guessed: " + result.guessLet);
      var manyGuessed = self.currentWrd.checkLetter(result.guessLet);

      if(manyGuessed ==0) {
        console.log("WRONG");
        self.guessesRemaining--;
        
      } else {
        console.log("CORRECT");
          if(self.currentWrd.findWord()){
            console.log("Well Done! You won!");
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            return;
          }
      }


      console.log("Guesses remaining: " + self.guessesRemaining);
      console.log("-------------------");
      if((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
        self.promptUser();
      }
      else if(self.guessesRemaining ==0){
        console.log("Game over. We were looking for: ", self.currentWrd.target);
      } else {
        console.log(self.currentWrd.wordRender());
      }
    });

  }


};

game.startGame();