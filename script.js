let secretNumber = Math.trunc(Math.random() * 20) + 1;
// document.querySelector('.number').textContent = secretNumber;
let score = 20;
let highScore = 0;
const displayMessage = (message) =>{
    document.querySelector('.guessText').textContent = message;
}
document.querySelector(".check").addEventListener("click", function(){
    let guessNumber = Number(document.querySelector('.inputField').value);
    if(!guessNumber){
        displayMessage("❌ No Number");
    }
    else if (guessNumber === secretNumber){
        displayMessage("🎉 Congratulation...");
        document.querySelector('.number').textContent = secretNumber;
        document.querySelector('body').style.backgroundColor = '#60b437';
        if(guessNumber === secretNumber){
            highScore = score;
            document.querySelector('.highScoreText').textContent = highScore;
        }
    }
    else if (guessNumber !== secretNumber){
        if(score > 1){
            document.querySelector('.guessText').textContent = guessNumber > secretNumber ? "📈 Too High" : "📉 Too Low";
            score--;
            document.querySelector(".scoreNumber").textContent = score;
        }
        else{
            document.querySelector('.guessText').textContent = "💥 You Lost the Game";
            document.querySelector('.scoreNumber').textContent = 0;
        }
    }
});

document.querySelector(".again").addEventListener("click", function(){
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    score = 20;
    document.querySelector(".scoreNumber").textContent = score;    
    document.querySelector('.guessText').textContent = "Start Guessing..."
    document.querySelector(`body`).style.backgroundColor = '#222';
    document.querySelector(".number").textContent = '?';
    document.querySelector('.inputField').value = "";
});
// ka chari da input chi kam dai da agha value length da 2 na saiwa kaido jo biya ti sirf lawalani dwa characters rakhla
function limitInput(element){
    if(element.value.length > 2){ 
        element.value = element.value.slice(0, 2);
    }
};