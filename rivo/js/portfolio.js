let RESPONSIVE_WIDTH = 768;

let header_status = 'initial';
let header_element = document.getElementById('nav');
let personal_element = document.getElementById('personal');
let menu = document.getElementById('menu');

//responsive variables
let responsive_menu_button = document.getElementById("responsive_menu_button");
let pc_menu_items_array = Array.from(menu.children).filter(item => item.id !== "responsive_menu_button");

let responsive_mode = false;

function isNewSizeResponsive() {
    return window.innerWidth <= RESPONSIVE_WIDTH;
}
function initPortfolio(){
    responsive_mode = isNewSizeResponsive();
    header_element = document.getElementById('nav'); 
    personal_element = document.getElementById('personal');
    menu = document.getElementById('menu');
    
    responsive_menu_button = document.getElementById("responsive_menu_button");
    pc_menu_items_array = Array.from(menu.children).filter(item => item.id !== "responsive_menu_button");

    const desplegables = document.getElementsByClassName('desplegable');
    if(responsive_mode == false){
        layoutPC(desplegables, 'apply');
    } else if(responsive_mode == true){
        layoutResponsive();
    }
    window.addEventListener('scroll', () => {
        const posicionScroll = window.scrollY; 
        let new_status;
        if (posicionScroll > 200) {
            new_status ='scrolled';
        } else {
            new_status ='initial';
        }
        if(new_status==header_status){
            return;
        };
        header_status = new_status;
        adjustHeader(new_status);
    }); 
    window.addEventListener('resize', () => {
        const window_resize_responsive = isNewSizeResponsive();
        if(window_resize_responsive == responsive_mode){
            return;
        }
        if(responsive_mode == false){
            layoutPC(desplegables,'apply');
        } else {
            layoutResponsive('apply');
        }
        responsive_mode = window_resize_responsive;
        console.log("responsive change, new mode: "+responsive_mode);
        layoutResponsive()
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
function layoutPC(desplegables, action){
    switch (key) {
        case 'remove':
            
            break;
        case 'apply':
            toggleResponsiveMenu('none');
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
            break;
        default:
            break;
    }
}
function layoutResponsive(){
    toggleResponsiveMenu('flex')
}
function toggleResponsiveMenu(new_display){
    responsive_menu_button.style.display == new_display;
}



