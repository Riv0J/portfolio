//variables DOM
const dificulty_container = document.getElementById('difficulty');
const difficulty_icon = document.getElementById('difficulty_icon');

//variables js
const MAX_DIFFICULTY_LEVEL = 15;
let current_difficulty_level = 0;
let tick_reduction = 0;

function increaseDifficulty(increase=1){
    if(current_difficulty_level + increase > MAX_DIFFICULTY_LEVEL){
        current_difficulty_level = MAX_DIFFICULTY_LEVEL;
        return;
    } else {
        current_difficulty_level += increase;
    }
    tick_reduction = current_difficulty_level*15;
    updateDifficulty();
    updateDifficultyIcon();
    if(current_difficulty_level >= 5){
        updateDifficultyIcon();
    }
}
function updateDifficulty() {
    CURRENT_TICK = TICK_MS - tick_reduction;
    dificulty_container.childNodes[1].textContent = current_difficulty_level;
    console.log(CURRENT_TICK);
    updateFreezeTime();
}
function fibonacci(n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
function updateFreezeTime(){
    FREEZE_TIME_MS = CURRENT_TICK/2;
}
function resetDifficulty(){
    current_difficulty_level = 0;
    tick_reduction = 0;
    difficulty_icon.style.display = 'none';
    difficulty_icon.style.opacity = 0;
    updateDifficulty();
}
function updateDifficultyIcon(){
    difficulty_icon.style.display = 'block';
    difficulty_icon.style.opacity = 1;
}