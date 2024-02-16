const grid = document.getElementById('grid');
const game_container = document.getElementById('game_container');
const aside = document.getElementById('aside');
const watermark = document.getElementById('watermark');
let grid_squares = [];

const VERTICAL_PADDING = 0.2;
const GRID_WIDTH = 10;
const GRID_HEIGHT = 16;

const ASIDE_CONTAINER_WIDTH = Math.floor(GRID_WIDTH / 2);

const TOTAL_SQUARES = GRID_WIDTH*GRID_HEIGHT;
const TOTAL_GAME_WIDTH = GRID_WIDTH + ASIDE_CONTAINER_WIDTH /*+ (VERTICAL_PADDING*2);*/

async function init(){
    resizeGrid();
    resetSquares();
    const h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode('Rivo José Molina Uriarte'));
    watermark.appendChild(h2);
}
document.addEventListener("DOMContentLoaded", function () {
    init();
});

function resizeGrid(){
    //set the dimensions of game_container, 
    const dimensions = getOptimalDimensions();
    //game container
    game_container.style.width = dimensions['width']+'px';
    game_container.style.height = dimensions['height']+'px';

    //grid
    grid.style.width = GRID_WIDTH / TOTAL_GAME_WIDTH * 100 + '%';
    grid.style.height = '100%';

    //aside
    aside.style.width = ASIDE_CONTAINER_WIDTH / TOTAL_GAME_WIDTH * 100 + '%' ;
    aside.style.height = '100%';

    //apply margins to game_container
    //game_container.style.marginBlock = (VERTICAL_PADDING/2) / TOTAL_GAME_WIDTH * 100+ '%';
    console.log(dimensions);
}
window.addEventListener('resize', resizeGrid);

function getOptimalDimensions() {
    // Get the width and height of the user's browser window
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Determine the dimensions
    let dimensions;
    if(windowWidth < windowHeight){
        console.log('width smaller');
        dimensions = {
            width: windowWidth,
            height: (windowWidth * GRID_HEIGHT) / TOTAL_GAME_WIDTH,
        };
    } else{
        console.log('height smaller');
        dimensions = {
            width: (windowHeight * TOTAL_GAME_WIDTH) / GRID_HEIGHT,
            height: windowHeight,
        };
    }
    // Reduce the dimensions to the nearest multiple of 10
    dimensions.width = Math.floor(dimensions.width / 10) * 10;
    dimensions.height = Math.floor(dimensions.height / 10) * 10;
    return dimensions;
}
async function resetSquares() {
    const get_squares = grid.querySelectorAll('.square');
    get_squares.forEach((square) => {
        grid.removeChild(square);
    });

    grid_squares = [];
    for (let index = 0; index < TOTAL_SQUARES; index++) {
        const square = newSquare();
        grid.appendChild(square);
        grid_squares.push(square);
    }
}
function newSquare(){
    const square = document.createElement('div');
    square.style.width = '10%';
    square.style.aspectRatio = 1;
    square.className = 'square';
    return square;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function line_completed_effect(line_squares){
    await class_effect(line_squares, 'shine', 1000);
}
async function class_effect(elements_array, class_name, wait_ms=0){
    elements_array.forEach((element) => {
        element.classList.add(class_name);
        switch (class_name) {
            case 'shine':
                element.style.border = '0.16rem solid black';
                break;
        
            default:
                break;
        }
    });
    await remove_class_effect(elements_array, class_name, wait_ms);
}
async function remove_class_effect(elements_array, class_name, wait_ms){
    await sleep(wait_ms);
    elements_array.forEach((element) => {
        element.classList.remove(class_name);
    });
}
async function last_grace_effect(squares, color, time_ms){
    console.log(squares);
    squares.forEach(square => {
        square.style.transition = 'all 0.25s ease-in-out';
        square.style.border = '0.16rem solid white';
    });
    await sleep(time_ms);
    squares.forEach(square => {
        square.style.transition = '';
        square.style.outline = '';
        square.style.border = '';
        square.style.boxShadow = '';
        square.style.webkitBoxShadow  ='';
    });
}
