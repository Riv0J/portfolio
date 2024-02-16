//variables DOM
const next_container = document.getElementById('next');

//variables js
let next_container_initialized = false;
let next_squares = null;
async function drawNext(next_random){
    if(next_container_initialized===false){
        initNext();
    }
    resetNext();
    const next_tetromino = next_Tetrominoes[next_random][0];
    const next_color = tetris_colors[next_random];

    next_tetromino.forEach(index =>{
        const square = next_squares[index];
        square.classList.add('tetromino');
        square.style.backgroundColor = next_color;
    })
}

function resetNext(){
    if(next_squares == null){
        return;
    }
    next_squares.forEach(square =>{
        square.classList.remove('tetromino');
        square.style.backgroundColor = '';
    })
}

function initNext(){
    next_container_initialized = true;
    next_squares = [];
    for (let index = 0; index < next_width*next_width; index++) {
        const square = document.createElement('div');
        square.style.width = (1/4*100)+'%';
        square.style.aspectRatio = 1;
        square.className = 'square';
        next_container.appendChild(square);

        next_squares.push(square);
    }
}