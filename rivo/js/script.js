function initPortfolio(){
    const desplegables = document.getElementsByClassName('desplegable');

    for (let i = 0; i < desplegables.length; i++) {
        const desplegable = desplegables[i];
        console.log(desplegable);

        const titles = desplegable.getElementsByClassName('deplegable_titulo');
        const title = titles[0];
        console.log(title);

        const options = desplegable.getElementsByClassName('desplegable_option');
        toggleDisplay(options,'none');

        desplegable.addEventListener('mouseenter', () => {
            toggleDisplay(options,'block');
        });
        desplegable.addEventListener('mouseleave', () => {
            toggleDisplay(options,'none');
        });
    }
}
function toggleDisplay(elements_array, new_display){
    let counter = 1;
    for (let j = 0; j < elements_array.length; j++) {
        const option = elements_array[j];
        switch (new_display) {
            case 'display':
                option.style.top = counter*100
                break;
            case 'none':
                
                break;
            default:
                break;
        }
        counter+=1;
        option.style.display = new_display; 

    }
}