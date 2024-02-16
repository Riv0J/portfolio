async function action(action){
    //si el game_state es diferente de running, no se hace nada
    if(current_game_state != GAME_STATE_RUNNING){
        return;
    }
    switch (action) {
        case 'moveDown':
            moveDown();
            break;
        case 'rotate':
            await rotate();
            break;
        case 'moveSidesHold':
            moveSidesHold();
            break;
        default:
            console.log('UNrecognized action: '+action);
            break;
    }
}
//assign functions to keyCodes
async function control(e) {
    if(e.keyCode === 37) {
        //action('moveLeft')
    } else if (e.keyCode === 38) {
        await action('rotate')
    } else if (e.keyCode === 39) {
        //action('moveRight')
    } else if (e.keyCode === 40) {
        //action('moveDown')
    }
}
document.addEventListener('keyup', control)

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowDown':
            hold_move_down = true;
            break;
        case 'ArrowRight':
            moving_left = false;
            moving_right = true;
            action('moveSidesHold');
            break;
        case 'ArrowLeft':
            moving_right = false;
            moving_left = true;
            action('moveSidesHold');
            break;
        default:
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowDown':
            hold_move_down = false;
            break;
        case 'ArrowRight':
            moving_right = false;
            break;
        case 'ArrowLeft':
            moving_left = false;
            break;
        default:
            break;
    }
});
function toggle_moving_right(){
    moving_right = !moving_right;
}
function toggle_moving_left(){
    moving_left = !moving_left;
}