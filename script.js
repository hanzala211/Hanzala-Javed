"use strict";

// Nav Login
const welcomeText = document.querySelector(".welcome");
const userValue = document.querySelector(".user-name");
const pinValue = document.querySelector(".pin-code");
const loginBtn = document.querySelector(".btn-submit");
const mainBox = document.querySelector(".main-container");
// Values and movements 
const totalValue = document.querySelector(".balance-value");
const balanceDiv = document.querySelector(".balance-div");
const movementContainer = document.querySelector('.movement');

// Transfer Box 
const transferUser = document.querySelector(".transfer-to");
const transferAmmount = document.querySelector('.amount-to');
const transferBtn = document.querySelector(".btn-transfer");

// Request Loan 
const loanAmount = document.querySelector(".loan-amount");
const loanBtn = document.querySelector(".btn-loan");

// Close Account 
const closeUser = document.querySelector(".close-user");
const closePin = document.querySelector(".close-pin");
const closeBtn = document.querySelector(".btn-close");

// In and Out 
const summary = document.querySelector(".summary");
const summaryIn = document.querySelector(".summary-value__in");
const summaryOut = document.querySelector(".summary-value__out");


// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300, 500],
    pin: 1111,
  };
const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    pin: 2222,
  };
const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    pin: 3333,
  };
const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    pin: 4444,
  };
  
const accounts = [account1, account2, account3, account4];

//    |     \\ 

let createUserName = function(acc){
    acc.forEach((user) => {
        user.username = user.owner.toLowerCase().split(' ').map((name) => name[0]).join('');
    })
    return acc;
}
createUserName(accounts);

let displayMovements = function(movement){
    movement.forEach(function(mov, i){ 
    const type = mov > 0 ? "deposit" : "withdrawal" ;
    const html = `<div class="movements-box">
                <div>
                    <p class="movements-size__${type}">${i + 1} ${type.toUpperCase()}</p>
                    <p class="date">1/9/2024</p>
                </div>
                <p class="movements">${mov}€</p>
            </div>`;
            movementContainer.insertAdjacentHTML("afterbegin", html);
    });
}

let displayCurrentValue = function (mov){
    mov.current = mov.movements.reduce ((accu, previous) => accu + previous);
    totalValue.textContent = `${mov.current}€ `;
}
let displayInAndOut = function(acc){
    const iN = acc.filter((mov) => mov > 0).reduce((accu , mov) => accu + mov);
    summaryIn.textContent = `${iN}€`;
    const oUT = acc.filter((mov) => mov < 0).reduce((accu , mov) => accu + mov);
    summaryOut.textContent = `${Math.abs(oUT)}€`;
}
let currentAccount;
loginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        currentAccount = accounts.find((acc) => acc.username === userValue.value);
        if(currentAccount.pin === Number(pinValue.value)){
        balanceDiv.style.opacity = 100;
        welcomeText.textContent = `Welcome ${currentAccount.owner.split(" ")[0]}!`
        mainBox.style.opacity = 100; 
        summary.style.opacity = 100;
        document.querySelector("body").style.overflowY = "scroll";
        movementContainer.textContent = "";
        displayMovements(currentAccount.movements);    
        displayCurrentValue(currentAccount);
        displayInAndOut(currentAccount.movements)
    }
    userValue.value = "";
    pinValue.value = "";
    pinValue.blur();
})

transferBtn.addEventListener("click", function(e){
    e.preventDefault();
    let transferAcc = accounts.find((acc) => acc.username === transferUser.value);
    let transferAmm = Number(transferAmmount.value);
    setTimeout(() => {
        if(transferAmm > 0 && currentAccount.current >= transferAmm && transferAcc && transferAcc.username !== currentAccount.username){
            currentAccount.movements.push(-transferAmm);
            transferAcc.movements.push(transferAmm);
            displayMovements(currentAccount.movements);
            displayCurrentValue(currentAccount);
            displayInAndOut(currentAccount.movements)
        }
    }, 5000);
    
    transferAmmount.value = "";
    transferUser.value = "";
    transferAmmount.blur();
});

loanBtn.addEventListener("click", function(e){
    e.preventDefault();
    let loanAmm = Number(loanAmount.value);
    setTimeout(() => {
        currentAccount.movements.push(loanAmm);
        displayMovements(currentAccount.movements);
        displayCurrentValue(currentAccount);
        displayInAndOut(currentAccount.movements);
    }, 5000);
    loanAmount.value = "";
    loanAmount.blur();
}) 
