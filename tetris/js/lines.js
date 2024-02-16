//variables DOM
const lines_container = document.getElementById('lines');

//variables js
let total_lines = 0;
async function checkLines(){
    const total_squares_number = grid_squares.length;
    let lines_completed = 0;
    let square_counter = 0;
    let squares_to_delete = [];
    //un bucle que va de 10 en 10
    for (let i = 0; i < total_squares_number; i += 10) {
      const groupOfTen = grid_squares.slice(i, i + 10);
      //all taken es true cuando todos los squares cumple condicion
      const allTaken = groupOfTen.every(square => square.classList.contains('taken'));
      if(allTaken == true){
        lines_completed+=1;
        for (let index = 0; index < groupOfTen.length; index++) {
          //guardar en el mapa, el sq html y su indice en el codigo
          const square = groupOfTen[index];
          squares_to_delete[square_counter] = square;
          square_counter+=1;
        }
      }
    }
    if(lines_completed === 0){
      return lines_completed;
    }

    //efecto visual de css con js
    await line_completed_effect(squares_to_delete);
    //destruir los cuadrados de las lineas
    destroyLines(squares_to_delete);
    //reabastecer los cuadrados destruidos
    replenishLines(squares_to_delete.length);
    //refrescar lso cuadrados en el array, con nuevas posiciones
    refresh_grid_squares();

    console.log(lines_completed+', TOTAL LINES JUST COMPLETED');
    total_lines += lines_completed;
    updateLines();
    return lines_completed;
  }

  function updateLines(){
    let lines_string = total_lines+'';
    while(lines_string.length<3){
      lines_string = '0'+lines_string;
    }
    lines_container.textContent = lines_string;
  }
  function resetLines(){
    total_lines = 0;
    updateLines();
  }
  function destroyLines(squares_array){
    for (let index = 0; index < squares_array.length; index++) {
      const square = squares_array[index];
      grid.removeChild(square)
    }
  }
  function replenishLines(squares_number){
    for (let index = 0; index < squares_number; index++) {
      const square = newSquare();
      grid.insertBefore(square,grid.firstChild);
      grid_squares.unshift(square);
      square.className = 'square';
    }
  }