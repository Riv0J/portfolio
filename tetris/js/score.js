//variables DOM
const score_container = document.getElementById('score');

//variables js
let score = 0;
let difficulty_contanst = 0;

function addScore(quantity){
    score += quantity;
    if(score % 50 === 0){
      increaseDifficulty();
    }
    updateScore();
  }
  function resetScore(){
    score = 0;
    updateScore();
  }
  function updateScore(){
    score_container.textContent = score;
  }
function calculateScore(lines_completed){
  let score_gained = SCORE_PER_LINE*lines_completed + (Math.pow(2, lines_completed) + (Math.pow(lines_completed, 2))); //esto siempre da al menos 1, aunque lines_completed es 0
  return score_gained;
}