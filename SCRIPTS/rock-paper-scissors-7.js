let score=JSON.parse(localStorage.getItem('score')) || {
  wins : 0,
  losses : 0,
  ties : 0,
};
updateScoreElement();
document.querySelector('.js-auto-play-button').
  addEventListener("click", () => {
    autoPlay();
  });
document.body.
  addEventListener("keydown", (event) => {
    if(event.key==='a') autoPlay();
  });
document.body.
  addEventListener("keydown", (event) => {
    if(event.key==='Backspace') resetScore();
  });
let isAutoPlaying=false;
let id;
function autoPlay(){
  if(!isAutoPlaying){
    id= setInterval(() => {
    const playerMove=pickComputerMove();
    playGame(playerMove);
    },1000);
    isAutoPlaying=true;
    document.querySelector('.js-auto-play-button').innerHTML='Stop Auto Play';
  }else{
    clearInterval(id);
    document.querySelector('.js-auto-play-button').innerHTML='Auto Play';
    isAutoPlaying=false;
  }
}
document.querySelector('.js-rock-button').
  addEventListener("click",() => {
    playGame('Rock');
  });
document.querySelector('.js-paper-button').
  addEventListener("click",() => {
    playGame('Paper');
  });
document.querySelector('.js-scissors-button').
  addEventListener("click",() => {
    playGame('Scissors');
  });
document.body.addEventListener("keydown", (event) => {
  if(event.key==='r'){
    playGame('Rock');
  }else if(event.key==='p'){
    playGame('Paper');
  }else if(event.key==='s'){
    playGame('Scissors');
  }
});
function playGame(playerMove){
  
  let result;
  const compPicked=pickComputerMove();
  if(playerMove==='Scissors'){
    if(compPicked==='Rock'){
      result='You lose.';
    }else if(compPicked==='Paper'){
      result='You win.';
    }else if(compPicked==='Scissors'){
      result='Tie.';
}}
  else if(playerMove==='Paper'){
    if(compPicked==='Rock'){
      result='You win.';
    }else if(compPicked==='Paper'){
      result='Tie.';
    }else if(compPicked==='Scissors'){
      result='You lose.';
    }
  }
  else if(playerMove==='Rock'){
    if(compPicked==='Rock'){
      result='Tie.';
    }else if(compPicked==='Paper'){
      result='You lose.';
    }else if(compPicked==='Scissors'){
      result='You win.';
    }
  }
  if(result==='You win.'){
    score.wins+=1;
  }else if(result=='You lose.'){
    score.losses+=1;
  }else if(result==='Tie.'){
    score.ties+=1;
  } 
  localStorage.setItem('score',JSON.stringify(score));
  document.querySelector('.js-result').innerHTML=result;
  document.querySelector('.js-moves').innerHTML=`You
<img src="IMAGES/${playerMove}-emoji.png" alt="">
<img src="IMAGES/${compPicked}-emoji.png" alt="">
Computer`
  updateScoreElement();
}
function updateScoreElement(){
  document.querySelector('.js-score').innerHTML=`Wins : ${score.wins}, Losses : ${score.losses}, Ties : ${score.ties}`;
}
function pickComputerMove(){
  let compPicked;
  const randomNumber= Math.random();
  if(randomNumber>=0 && randomNumber<1/3){
    compPicked='Rock';
  }else if(randomNumber>=1/3 && randomNumber<2/3){
    compPicked='Paper';
  }else{
    compPicked='Scissors';
  }
  return compPicked
}
document.querySelector('.js-reset-button').
  addEventListener("click", () => {
    resetScore();
  })
function resetScore(){
  document.querySelector('.js-confirmation-line').
    innerHTML="<p>Are you sure you want to reset the score?</p><button class='yes-button js-yes-button'>Yes</button><button class='no-button js-no-button'>No</button>"
  document.querySelector('.js-yes-button')
    .addEventListener("click", () =>{
      score.wins=0;
      score.losses=0;
      score.ties=0;
      localStorage.removeItem('score');
      updateScoreElement();
      document.querySelector('.js-result').innerHTML='';
      document.querySelector('.js-moves').innerHTML='';
      document.querySelector('.js-confirmation-line').
    innerHTML='';
    });
  document.querySelector('.js-no-button')
    .addEventListener("click", () =>{
      document.querySelector('.js-confirmation-line').
    innerHTML='';
    });
  
}