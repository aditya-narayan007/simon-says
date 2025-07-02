//pre-set
let gameSeq=[];
let userSeq=[];
let highestScores =[];

let colors = ["green" , "red" , "yellow" , "blue"];


let started = false;
let level = 0;
let score = 0;

//declaration
let clrbtns = document.querySelectorAll(".btn");
let btn = document.querySelector("#start-btn");
let h3 = document.querySelector("h3");
let resign = document.querySelector("#resign-btn");

//main-prog
btn.addEventListener("click",function(){
    if(started == false){
        console.log("game started");
        started=true;

        levelup();
    }
});

for(let btn of clrbtns){
    btn.addEventListener("click" , btnPress);
};

resign.addEventListener("click" , function() {
    h3.innerHTML = "You resigned! <br> Press Start to play again";
    console.log("resigned");
    setTimeout( reset() , 250);
});

//functions-used
function levelup(){
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let rndmIndx = Math.floor(Math.random()*4);
    let rndmColour = colors[rndmIndx];
    let rndmbtn = document.querySelector(`#${rndmColour}`); 
    gameSeq.push(rndmColour);
    console.log(`game : ${gameSeq}`);
    btnFlash(rndmbtn);
};

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    },250);
};

function btnPress() {
    // console.log(this);
    let btn = this;
    let userColor = btn.id;
    userSeq.push(userColor);
    console.log(`user : ${userSeq}`);

    chechAns((userSeq.length)-1);
};

function chechAns(idx) {
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout( levelup , 500);
        }
    }
    else{
        h3.innerHTML = `Game Over ! Your score was <b>${level-1}</b> <br>Press start to play again <br>`;
        score = level;
        highestScores.push(score-1);
        reset();
        highestScr(highestScores);
    }
};

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    score = 0;
};

function highestScr(arr){
    let largest = arr[0];
    for(let i=0; i< arr.length ;i++){
        if(arr[i] > largest){
            largest = arr[i];
        }
        else{
            continue;
        }
    }
    let highscr = document.createElement("h3");
    highscr.innerHTML = `<b>Highest score is : </b>${largest}`;
    let el = document.getElementById("game-instruction");
    el.append(highscr);
};