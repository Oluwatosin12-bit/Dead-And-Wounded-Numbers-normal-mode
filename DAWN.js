 let set = new Set(); //A collection of unique values. Each value can only occur once in a Set.
    let randomNum;
    while (set.size < 4) { //end loop when set size is getting to 4
      randomNum = Math.round(Math.random() * 9);
      set.add(randomNum);
    } /*randomNumbers are added into the set (4 numbers, the loop condition has limited the amount of figures that can go into the set)-
and if any 2 randomNumbers are the same, the set takes out one and waits for other unique numbers to complete the 4 figure requirement*/
  
    // console.log(Array.from(set).join('')); //means all the array from set should be joined together without space between them
let randomNumber1 =  Array.from(set)[0]; //calls the first figure in the set array
let randomNumber2 =  Array.from(set)[1];
let randomNumber3 =  Array.from(set)[2];
let randomNumber4 =  Array.from(set)[3];
/*console.log(randomNumber1);
console.log(randomNumber2);
console.log(randomNumber3);
console.log(randomNumber4);*/

let turnsLeft = 10;


const guesses = document.querySelector('.guesses'); //Guess history
const lastResult = document.querySelector('.lastResult'); //To print the amount of dead and wounded
const turnsLeftScore = document.getElementById('turnsLeft');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField1 = document.querySelector('.number001');
const guessField2 = document.querySelector('.number002');
const guessField3 = document.querySelector('.number003');
const guessField4 = document.querySelector('.number004');


let guessCount = 1; //if you set to 0, it will give 11 trials
let resetButton;
guessField1.focus(); //this is to take the cursor to input button once the game starts

/*=============== Autmatically move to next input ===========*/
window.onload = function() {
    number001.value = "";
    number002.value = "";
    number003.value = "";
    number004.value = "";
  } 
    function jump001(field, autoMove) {
    if(field.value.length >= field.maxLength) {
      document.getElementById(autoMove).focus(); 
    }
  }


function checkGuess() {
    let userGuess1 = Number(guessField1.value); //ensures it's only a number that is passed; converts user's input to value that js can evaluate
    let userGuess2 = Number(guessField2.value);
    let userGuess3 = Number(guessField3.value);
    let userGuess4 = Number(guessField4.value);
     

           if(userGuess1.length == 0 || userGuess2.length == 0 || userGuess3.length == 0 || userGuess4.length == 0 ){
                    lastResult.textContent = "Input cannot be empty";

           } else if(isNaN(userGuess1) || isNaN(userGuess2) || isNaN(userGuess3) || isNaN(userGuess4)){
                    lastResult.textContent = "Input must be a number";

             } else if(userGuess1 === userGuess2 || userGuess1 === userGuess3 || 
                userGuess1 === userGuess4 || userGuess2 === userGuess3 || userGuess2 === userGuess4 ||
                userGuess3 === userGuess4){
                    lastResult.textContent = `You cannot duplicate digits in a set`;

               }else {
                  turnsLeft --; //to reduce turns left
                  turnsLeftScore.innerHTML = `You have ${turnsLeft} turn(s) left.`;  //print turns left

                    if(userGuess1 === randomNumber1 && userGuess2 === randomNumber2 && userGuess3 === randomNumber3 && userGuess4 === randomNumber4){
                        lastResult.textContent = '4 DEAD!!! Congratulations!';
                        lastResult.style.backgroundColor = 'green';
                        turnsLeftScore.innerHTML = `You have 0 turns left`;
                        
                        setGameOver(); //game over once user gets 4 dead; condition for getting 4 dead has been defined above
                    } else if (guessCount === 10) {
                        lastResult.textContent = `!!!GAME OVER!!! The number was ${randomNumber1}${randomNumber2}${randomNumber3}${randomNumber4}`;
                        setGameOver(); //terminate game if user exhausts trial
                    } else {
                        
                        //POSITION 1
                        let dead = 0;
                        let wounded = 0; //the following conditions are for getting dead and wounded; 
                        //these two variables are here so when the checkGuess() function is running, it counts from 0 each time then adds what's below
                        
                        if ( +userGuess1 === randomNumber1) {
                            dead += 1;
                        }  else if (+userGuess1 === randomNumber2) {
                            wounded += 1;
                        } else if ( +userGuess1 === randomNumber3) {
                            wounded += 1;
                        } else if ( +userGuess1 === randomNumber4) {
                            wounded += 1;
                        } 

                        //POSITION 2
                        if ( +userGuess2 === randomNumber2) {
                            dead += 1;
                        } else if ( +userGuess2 === randomNumber1) {
                            wounded += 1;
                        } else if ( +userGuess2 === randomNumber3) {
                            wounded += 1;
                        } else if ( +userGuess2 === randomNumber4) {
                            wounded += 1;
                        } 

                        //POSITION 3
                        if ( +userGuess3 === randomNumber3) {
                            dead += 1;
                        }  else if ( +userGuess3 === randomNumber1) {
                            wounded += 1;
                        } else if ( +userGuess3 === randomNumber2) {
                            wounded += 1;
                        } else if ( +userGuess3 === randomNumber4) {
                            wounded += 1;
                        } 

                        //POSITION 4
                        if ( +userGuess4 === randomNumber4) {
                            dead += 1;
                        } else if ( +userGuess4 === randomNumber1) {
                            wounded += 1;
                        } else if ( +userGuess4 === randomNumber2) {
                            wounded += 1;
                        } else if ( +userGuess4 === randomNumber3) {
                            wounded += 1;
                        } 
                    
                        lastResult.textContent = `${dead} dead, ${wounded} wounded`; //result to print for user
                        lastResult.style.backgroundColor = "red";

                    }

                    if (guessCount === 1) { //I changed both guessCount to 0 so take it back to 1 if it misbehaves
                        guesses.innerHTML = 'Previous guesses: '; //just use empty strings if this doesn't work
                    }
                            
                            guesses.innerHTML += userGuess1 
                            guesses.innerHTML += userGuess2 
                            guesses.innerHTML += userGuess3 
                            guesses.innerHTML += userGuess4
                            guesses.innerHTML += '-(' + lastResult.textContent + ');' + ' '
                            guesses.innerHTML += '<br>'; //use a line break here
                    //For saving users inputs on the panel

                    guessCount++ //these last six lines ready the input for another guess
                    guessField1.value = ""; //empties the input
                    guessField2.value = "";
                    guessField3.value = "";
                    guessField4.value = "";
                    guessField1.focus();  //put the input field to focus again
                }   

}

guessSubmit.addEventListener('click', checkGuess); //the parentheses to prove that checkGuess is a function is not necessary inside event listener
//the function checkGuess() happens when the submit button is clicked

function setGameOver() {
    guessField1.disabled = true; //when game is over disable input field to stop users from inputting 
    guessField2.disabled = true;
    guessField3.disabled = true;
    guessField4.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button'); //when game is over(conditions for this is defined in checkGuess()), a button is created
    resetButton.textContent = 'Start new game'; //name of the button created; name it whatever you want
    //to add style to resetButton do: resetButton.style.whatyouwanttostyle
    resetButton.style.backgroundColor = 'hsl(320, 15%, 70%)';
    resetButton.style.borderRadius = '2rem';
    resetButton.style.height = '2rem';
    resetButton.style.marginTop = '.5rem';
    resetButton.style.marginLeft = '4rem';
    resetButton.style.marginBottom = '.5rem'
    document.body.appendChild(resetButton); //add the new button as a child of the page's body (below-not sure if it's necessarilly below)
    resetButton.addEventListener('click', resetGame); //when we click this new button, another function is called to run
}


function resetGame() {
        guessCount = 1;
        turnsLeft = 10;
          const resetParas = document.querySelectorAll('.resultParas p'); //meaning of ".resultParas p" is all paragraphs(p) under class resultParas
        for (let i = 0 ; i < resetParas.length ; i++) {
        resetParas[i].textContent = '';
        } //reset all the paragraphs being called. how does this for loop break?
        
          resetButton.parentNode.removeChild(resetButton); //remove the child (new button in setGameOver()) from the parent. The parentheses specifies which child
        
          guessField1.disabled = false; //don't disable the input fields again
          guessField2.disabled = false;
          guessField3.disabled = false;
          guessField4.disabled = false;
          guessSubmit.disabled = false;
          guessField1.value = ''; //empty the input fields
          guessField2.value = '';
          guessField3.value = '';
          guessField4.value = '';
          guessField1.focus();
        
          lastResult.style.backgroundColor = 'white'; //green for win and red for lose; this white is default for no judgement yet

          set.clear(randomNum); //clear previous set so accomodate new ones
          while (set.size < 4) { //end loop when set size is getting to 4
            randomNum = Math.round(Math.random() * 9);
            set.add(randomNum);
          };
        //   console.log(Array.from(set).join('')); //means all the array from set should be joined together without space between them
            randomNumber1 =  Array.from(set)[0]; //calls the first figure in the set array
            randomNumber2 =  Array.from(set)[1];
            randomNumber3 =  Array.from(set)[2];
            randomNumber4 =  Array.from(set)[3];
           /* console.log(randomNumber1);
            console.log(randomNumber2);
            console.log(randomNumber3);
            console.log(randomNumber4);*/
}    


 /*What this resetGame function does:
 Puts the guessCount back down to 1.
Empties all the text out of the information paragraphs.
Removes the reset button from our code.
Enables the form elements, and empties and focuses the text field, ready for a new guess to be entered.
Removes the background color from the lastResult paragraph.
Generates a new random number so that you are not just guessing the same number again!
 */      

/*
To change the text inside a paragraph, you need the textContent property or .innerHTML, 
while .value brings out what a user input into an input element
Variables that don't contain references to form elements won't have focus() available to them.
*/