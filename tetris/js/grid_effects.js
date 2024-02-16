async function grid_blink(){
    await class_effect(grid_squares, 'blink', 1500);
}
function gray_grid(apply=false){
    if(apply == false){
        grid.classList.remove('grayed_out');
    } else{
        grid.classList.add('grayed_out');
    }
}