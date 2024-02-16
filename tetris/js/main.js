//variables DOM
const main_button = document.getElementById('main_button');
const extra_restart_button = document.getElementById('restart');
const watermark_container = document.getElementById('watermark');
const restart_button = document.getElementById('restart');

const CLASS_START_BUTTON= 'start_button';
const CLASS_PAUSE_BUTTON= 'pause_button';
const CLASS_RESUME_BUTTON= 'resume_button';
const CLASS_RESTART_BUTTON= 'restart_button';

//variables js
const TICK_MS = 700;
const TICK_MS_MOVE_SIDES = 215;

let CURRENT_TICK = TICK_MS;
let FREEZE_TIME_MS = CURRENT_TICK/2;
let GAME_RESET_TIME_MS = 1000;

const GAME_STATE_NONE = 0;
const GAME_STATE_RUNNING = 1;
const GAME_STATE_PAUSED = 2;
const GAME_STATE_OVER = 3;

const SCORE_PER_LINE = 10;
const SCORE_PER_FREEZE = 1;

let current_game_state = GAME_STATE_NONE;
async function menu_button(button){
  switch (current_game_state) {
      case GAME_STATE_NONE:
          await start_game();
          break;
      case GAME_STATE_RUNNING:
          pause_game();
          break;
      case GAME_STATE_PAUSED:
          await resume_game();
          break;
      case GAME_STATE_OVER:
          await restart();
          break;
      default:
          break;
  }
}
async function restart(){
  await reset_game();
  await start_game();
}
function change_game_state(new_state){
  switch (new_state) {
      case GAME_STATE_RUNNING:
          restart_button.style.display = 'block';
          break;
      case GAME_STATE_PAUSED:
          restart_button.style.display = 'block';
          break;
      case GAME_STATE_NONE:
          restart_button.style.display = 'none';
          break;
      case GAME_STATE_OVER:
          restart_button.style.display = 'block';
          break;
      default:
          break;
  }
  current_game_state = new_state;
}

let currentPosition = 4
let currentRotation = 0

//randomly select a Tetromino and its first rotation
let random_number = null;
let current_tetromino = null;
let current_color = null;

let next_random_number = 0;
let steps_this_tetromino = 0;

//variables de presionar botones
let hold_move_down = false;
let moving_sides_loop = false;
let moving_left = false;
let moving_right = false;
let checking_lines = false;

let can_move_sides = true;

//core functions 
function draw() {
  current_tetromino.forEach(index => {
    const square = grid_squares[currentPosition + index];
    square.classList.add('tetromino')
    square.style.backgroundColor = current_color;
  })
  drawProjection();
}
function undraw() {
  current_tetromino.forEach(index => {
    const square = grid_squares[currentPosition + index];
    square.classList.remove('tetromino');
    square.style.backgroundColor = '';
  })
  unDrawProjection();
}
async function moveDown() {
    if(current_game_state != GAME_STATE_RUNNING || checking_lines === true){
      //console.log('moveDown stopped: current_game_state='+current_game_state+', checking lines='+checking_lines)
      return;
    }
    //can current tetromino move down next run???
    const can_move_down = canMoveDown();
    if(can_move_down === false){
      checking_lines = true;
      await freezeTetromino();
      //cant move down, check if lines have been completed
      const lines_completed = await checkLines();
      let score_gained = calculateScore(lines_completed);
      addScore(score_gained);
      if(lines_completed > 0){
        announceTextAsync([`+${lines_completed} lines`,`+${score_gained} score`], 2000);
      }
      if(steps_this_tetromino == 0){
        game_over();
        return;
      } else{
        await sleep(FREEZE_TIME_MS);
        steps_this_tetromino = 0;
        await newTetromino();
      }
      checking_lines = false;
    } else if(can_move_down == true){
      steps_this_tetromino +=1;
      undraw()
      currentPosition += width
      draw()
      await moveDownSleep();
    }
    await moveDown();
}
function canMoveDown(){
  //este bucle es un guardia de si el tetromino ha llegado al final
  for (let index of current_tetromino) {
    if (!grid_squares[currentPosition + index + width]) {
      return false;
    }
  }
  //si alguno de la posicion futura del tetromino tiene la clase 'taken' entonces ya hay otro tetromino blockeando el paso
  if(current_tetromino.some(index => grid_squares[currentPosition + index + width].classList.contains('taken'))){
    return false;
  }
  return true;
}
async function freezeTetromino(){
  current_tetromino.forEach(index => {
    const square = grid_squares[currentPosition + index];
    square.classList.add('taken');
    square.style.borderColor = 'black';
  });
}
async function newTetromino(){
  //set a new current tetromino
  if(next_random_number==null){
    random_number = getRandomTetrominoIndex();
  } else {
    random_number = next_random_number;
  }
  next_random_number = getRandomTetrominoIndex();
  //start a new tetromino falling
  current_tetromino = theTetrominoes[random_number][currentRotation]
  current_color = tetris_colors[random_number]
  currentPosition = 4
  can_move_sides = true;

  await drawNext(next_random_number);
  draw()
}
  //move the tetromino left, unless is at the edge or there is a blockage
  function moveLeft() {
    if(can_move_sides === false){
      return;
    }
    undraw()
    const isAtLeftEdge = current_tetromino.some(index => (currentPosition + index) % width === 0)
    if(!isAtLeftEdge) currentPosition -=1
    if(current_tetromino.some(index => grid_squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition +=1
    }
    draw()
  }
  //move the tetromino right, unless is at the edge or there is a blockage
  function moveRight() {
    if(can_move_sides === false){
      return;
    }
    undraw()
    const isAtRightEdge = current_tetromino.some(index => (currentPosition + index) % width === width -1)
    if(!isAtRightEdge) currentPosition +=1
    if(current_tetromino.some(index => grid_squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -=1
    }
    draw()
  }
  async function moveSidesHold(){
    if(moving_sides_loop === true || checking_lines === true){
      console.log('cannot create duplicate of holding sides')
      return;
    }
    moving_sides_loop = true;
    while(moving_right === true || moving_left === true){
      if(moving_right == true){
        moveRight();
      } else if(moving_left == true){
        moveLeft();
      }
      await moveSidesSleep();
    }
    moving_sides_loop = false;
  }
  ///FIX ROTATION OF TETROMINOS A THE EDGE 
  function isAtRight() {
    return current_tetromino.some(index=> (currentPosition + index + 1) % width === 0)  
  }
  function isAtLeft() {
    return current_tetromino.some(index=> (currentPosition + index) % width === 0)
  }
  function checkRotatedPosition(P){
    P = P || currentPosition       //get current position.  Then, check if the piece is near the left side.
    if ((P+1) % width < 4) {         //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).     
      if (isAtRight()){            //use actual position to check if it's flipped over to right side
        currentPosition += 1    //if so, add one to wrap it back around
        checkRotatedPosition(P) //check again.  Pass position from start, since long block might need to move more.
        }
    }
    else if (P % width > 5) {
      if (isAtLeft()){
        currentPosition -= 1
      checkRotatedPosition(P)
      }
    }
  }
async function rotate() {
  const can_rotate = await canRotate();
  if(can_rotate === false){
    return;
  }
  undraw()
  currentRotation ++
  //if the current rotation gets to 4, make it go back to 0
  if(currentRotation === current_tetromino.length) { 
    currentRotation = 0
  }
  current_tetromino = theTetrominoes[random_number][currentRotation]
  //si esto se desactiva, pasan cosas raras de portaless
  checkRotatedPosition()
  draw()
}
async function canRotate(){
  if(current_game_state != GAME_STATE_RUNNING || checking_lines === true){
    return false;
  }
  let can_rotate = false;
  const is_next_rotation_blocked= await nextRotationBlocked();
  if(is_next_rotation_blocked === true){
    can_rotate = false;
  } else {
    can_rotate = true;
  }
  return can_rotate;
}
async function nextRotationBlocked(){
  let next_rotation = currentRotation+1;
  if(next_rotation === current_tetromino.length) { 
    next_rotation = 0
  }
  //este bucle es un guardia de si el tetromino ha llegado al final
  const rotated_tetromino = theTetrominoes[random_number][next_rotation];
  for (let index of rotated_tetromino) {
    if (!grid_squares[currentPosition + index + width]) {
      return true;
    }
  }

  //este bucle es otro guardia si alguno de los cuadrados ya esta taken
  const rotated_squares = getTetrominoSquares(rotated_tetromino);
  for (let index = 0; index < rotated_squares.length; index++) {
    const square = rotated_squares[index];
    if(square.classList.contains('taken')){
      return true;
    }
    
  }
  return false;
}
function pause_game(){
  main_button.classList.remove(CLASS_PAUSE_BUTTON);
  main_button.classList.add(CLASS_RESUME_BUTTON);
  main_button.textContent = 'Resume';
  gray_grid(true);
  pauseTimer();
  change_game_state(GAME_STATE_PAUSED);
}
async function resume_game(){
  main_button.classList.remove(CLASS_RESUME_BUTTON);
  main_button.classList.add(CLASS_PAUSE_BUTTON);
  main_button.textContent = 'Pause';
  gray_grid(false);
  resumeTimer();
  change_game_state(GAME_STATE_RUNNING);
  await moveDown();
}
async function start_game(){
  main_button.style.display = 'block';
  main_button.classList.remove(CLASS_START_BUTTON);
  main_button.classList.add(CLASS_PAUSE_BUTTON);
  main_button.textContent = 'Pause';
  watermark_container.style.display = 'flex';
  change_game_state(GAME_STATE_RUNNING);
  announceTextAsync([`Start!`], 2000);
  startTimer();
  newTetromino();
  await moveDown();
}
async function reset_game(){
  change_game_state(GAME_STATE_NONE);
  gray_grid(false);
  resetTimer();
  resetLines();
  resetScore();
  resetNext();
  resetTicks();
  resetDifficulty();
  announceTextRemove();
  await resetSquares();
  grid_blink();
  checking_lines = false;
  await sleep(GAME_RESET_TIME_MS);
}
function game_over(){
  main_button.style.display = 'none';
  gray_grid(true);
  //run
  stopTimer();
  change_game_state(GAME_STATE_OVER);
  announceTextAsync([`Game Over`], 5000);
  console.log('GAME OVER!');
}
function refresh_grid_squares(){
  const node_list = grid.querySelectorAll('.square');
  grid_squares = [];
  node_list.forEach(element =>{
    grid_squares.push(element);
  });
  console.log(grid_squares.length+', TOTAL SQUARES IN GRID_SQUARES');
}
//smart sleeps
async function moveDownSleep(){
  const loops = 32;
  for(i = 0; i < loops; i++){
    await sleep(CURRENT_TICK/loops);
    if(hold_move_down === true){
      break;
    }
  }
}
async function moveSidesSleep(){
  const loops = 2;
  for(i = 0; i < loops; i++){
    await sleep(TICK_MS_MOVE_SIDES/loops);
    if(moving_left === false && moving_right === false){
      break;
    }
  }
}
async function getCurrentTetrominoSquares(){
  const squares = [];
  current_tetromino.forEach(index => {
    const square = grid_squares[currentPosition + index];
    squares.push(square);
  });
  return squares;
}
function getTetrominoSquares(tetromino){
  const squares = [];
  tetromino.forEach(index => {
    const square = grid_squares[currentPosition + index];
    squares.push(square);
  });
  return squares;
}
function resetTicks(){
  CURRENT_TICK = TICK_MS;
  FREEZE_TIME_MS = CURRENT_TICK/2;
}