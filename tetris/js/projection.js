//variables DOM

//variables js
let current_projection_squares = null;
function drawProjection(){

    const projection_position = calculateProjectionPosition();
    if(projection_position  < currentPosition+1){
        return;
    }
    current_projection_squares = [];

    current_tetromino.forEach(index => {
        const square = grid_squares[projection_position + index];
        current_projection_squares.push(square);
        square.classList.add('projection');
        square.style.borderColor = current_color;
    })
}

function unDrawProjection(){
    if (current_projection_squares == null){
        return;
    }
    current_projection_squares.forEach(square =>{
        square.classList.remove('projection');
        square.style.borderColor = '';
    })
    current_projection_squares = null;

}

function calculateProjectionPosition(){
    let projection_position = currentPosition;
    let blocked = isPositionBlocked(projection_position);
    while(blocked === false){
        projection_position += width;
        blocked = isPositionBlocked(projection_position);
    }
    return projection_position;
}
function isPositionBlocked(position){
    for (let index of current_tetromino) {
        if (!grid_squares[position + index + width]) {
            return true;
        }
    }
    if(current_tetromino.some(index => grid_squares[position + index + width].classList.contains('taken'))){
        return true;
    }
    return false;
}