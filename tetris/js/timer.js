//variables DOM
const timer_container = document.getElementById('timer');

//variables js
let intervalo;
let timer_seconds = 0;

function startTimer() {
    intervalo = setInterval(function() {
        timer_seconds++;
        updateTimer();
    }, 1000);
}
function pauseTimer() {
    clearInterval(intervalo);
}
function resumeTimer() {
    startTimer();
}
function stopTimer() {
    clearInterval(intervalo);
}
function resetTimer() {
    stopTimer();
    timer_seconds = 0;
    updateTimer();
}

function updateTimer() {
    let minutos = Math.floor(timer_seconds / 60);
    let segundos = timer_seconds % 60;

    //cada 30 sec aumentar dificultad
    if (segundos % 15 === 0){
        increaseDifficulty();
    }
    if (segundos < 10 && minutos >= 1) {
        segundos = '0' + segundos;
    }
    if (minutos < 10) {
        minutos = '0' + minutos;
    }
    let string = segundos;
    if (minutos > 0) {
        string = minutos + ':' + segundos;
    }
    timer_container.textContent = string;
}
