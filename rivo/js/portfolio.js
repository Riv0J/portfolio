const RESPONSIVE_WIDTH = 768;

let header_initial_justify = 'center';
let header_status = 'initial';
let header_element = document.getElementById('nav');
let personal_element = document.getElementById('personal');
let menu = document.getElementById('menu');

//responsive variables
let responsive_menu_button = document.getElementById("responsive_menu_button");
let desktop_menu_items_array = null;

let responsive_mode = false;

function initPortfolio(){
    responsive_mode = isWindowSizeResponsive();
    header_element = document.getElementById('nav'); 
    personal_element = document.getElementById('personal');
    menu = document.getElementById('menu');
    
    responsive_menu_button = document.getElementById("responsive_menu_button");
    desktop_menu_items_array = Array.from(menu.children).filter(item => item.id !== "responsive_menu_button");

    const desplegables = document.getElementsByClassName('desplegable');
    addDropdownListeners(desplegables);

    if(responsive_mode == false){
        header_initial_justify = 'center';
        layoutPC('apply');
        layoutResponsive('remove');
    } else if(responsive_mode == true){
        header_initial_justify = 'flex-end';
        layoutResponsive('apply');
        layoutPC('remove');
    }
    console.log(responsive_mode);
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
        const window_resize_responsive = isWindowSizeResponsive();
        if(window_resize_responsive == responsive_mode){
            return;
        }
        if(responsive_mode == false){
            header_initial_justify = 'center';
            layoutPC('apply');
            layoutResponsive('remove');
        } else {
            header_initial_justify = 'flex-end';
            layoutResponsive('apply');
            layoutPC('remove');
        }
        responsive_mode = window_resize_responsive;
        console.log("responsive change, new mode: "+responsive_mode);
    });
    populateIconClasses();
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
            header_element.style.justifyContent = header_initial_justify;
            personal_element.style.display = 'none';
            menu.style.opacity = 0;
            window.setTimeout(function() {
                personal_element.style.opacity = 0;
                menu.style.opacity = 1;
            }, 50);
            break;
        case 'scrolled':
            header_element.style.justifyContent = 'space-between';
            personal_element.style.display = 'flex';
            menu.style.opacity = 0;
            window.setTimeout(function() {
                personal_element.style.opacity = 1;
                menu.style.opacity = 1;
            }, 50);
            break;
        default:
            console.log('default');
            break;
    }
    
}
function layoutPC(action){
    switch (action) {
        case 'remove':
            toggleDesktopMenuItems('none')
            break;
        case 'apply':
            toggleDesktopMenuItems('flex')
            break;
        default:
            break;
    }
}
function layoutResponsive(action){
    switch (action) {
        case 'remove':
            toggleResponsiveMenu('none');
            break;
        case 'apply':
            toggleResponsiveMenu('flex');
            console.log('a');
            header_element.style.justifyContent = header_initial_justify;
            break;
        default:
            break;
    }
}
function toggleResponsiveMenu(new_display){
    responsive_menu_button.style.display = new_display;
}
function toggleDesktopMenuItems(new_display){
    desktop_menu_items_array.forEach(item => {
        item.style.display = new_display;
    });
}
function isWindowSizeResponsive() {
    return window.innerWidth <= RESPONSIVE_WIDTH;
}
function addDropdownListeners(desplegables){
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
}

function rotateElement(element, degrees){
    element.style.rotate = degrees+'deg';
}