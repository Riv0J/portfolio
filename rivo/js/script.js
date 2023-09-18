let header_status = 'initial';
let header_element = document.getElementById('nav');
let personal_element = document.getElementById('personal');
let menu = document.getElementById('menu');

function initPortfolio(){
    header_element = document.getElementById('nav'); 
    personal_element = document.getElementById('personal');
    menu = document.getElementById('menu');

    const desplegables = document.getElementsByClassName('desplegable');

    for (let i = 0; i < desplegables.length; i++) {
        const desplegable = desplegables[i];
        console.log(desplegable);

        const desplegable_icon = desplegable.querySelector("i");
        console.log(desplegable_icon);

        const titles = desplegable.getElementsByClassName('deplegable_titulo');
        const title = titles[0];
        console.log(title);

        const options_containers = desplegable.getElementsByClassName('desplegable_options');
        const options_container = options_containers[0];
        const options = desplegable.getElementsByClassName('desplegable_option');
        toggleDisplay(options,'none');

        desplegable.addEventListener('mouseenter', () => {
            if(options_container){
                options_container.style.display = 'flex';
                toggleDisplay(options,'block');
                if(desplegable_icon){
                    rotateElement(desplegable_icon,'180')
                }
                
            }
        });
        desplegable.addEventListener('mouseleave', () => {
            if(options_container){
                options_container.style.display = 'none';
                toggleDisplay(options,'none');
                if(desplegable_icon){
                    rotateElement(desplegable_icon,'0')
                }
            }   
        });
    }

    window.addEventListener('scroll', () => {
        const posicionScroll = window.scrollY; 
        let new_state;
        if (posicionScroll > 200) {
            new_state ='scrolled'
        } else {
            new_state ='initial'
        }
        if(new_state==header_status){
            return;
        };
        header_status = new_state;
        adjustHeader(new_state);
    });
    populateIconClasses();
}
function rotateElement(element, degrees){
    element.style.rotate = degrees+'deg';
}
function toggleDisplay(elements_array, new_display){
    let counter = 1;
    let new_opacity = 1;
    for (let j = 0; j < elements_array.length; j++) {
        const option = elements_array[j];
        switch (new_display) {
            case 'display':
                option.style.top = counter*100
                new_opacity = 1;
                break;
            case 'none':    
                new_opacity = 0;
                break;
            default:
                break;
        }
        counter+=1;
        option.style.display = new_display;
        setTimeout(() => {
            option.style.opacity = new_opacity;
        }, 50+counter*10);
    }
}
function adjustHeader(new_state) {
    switch (new_state) {
        case 'initial':
            personal_element.style.display = 'none';
            menu.style.opacity = 0;
            window.setTimeout(function() {
                personal_element.style.opacity = 0;
                menu.style.opacity = 1;
            }, 50)
            header_element.style.justifyContent = 'center';
            break;
        case 'scrolled':
            personal_element.style.display = 'flex';
            menu.style.opacity = 0;
            window.setTimeout(function() {
                personal_element.style.opacity = 1;
                menu.style.opacity = 1;
            }, 50)
            
            header_element.style.justifyContent = 'space-between';
            break;
        default:
            console.log('default');
            break;
    }
}




