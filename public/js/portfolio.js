let header_element = document.getElementsByTagName('header')[0];

let personal_element = document.getElementById('personal');
let desktop_menu = document.getElementById('desktop_menu');

//responsive variables
const RESPONSIVE_WIDTH = 768;
let responsive_menu_button = document.getElementById("responsive_menu_button");
const responsiveNav = $("#responsive_nav");
let desktop_menu_items_array = null;

let responsive_mode = false;

async function toggleResponsiveNav() {
    if(responsiveNav.css("display") === "none"){
        responsiveNav.css("display","flex");
        
    } else {
        responsiveNav.css("display","none");
    }

    await showElements(responsiveNav);
    
}
async function showElements(element){
    const hijos = element.children();

    hijos.each(function () {
        const hijo = $(this);

        let new_value = "block";
        if(hijo.css("display") == "block"){
            new_value = "none";
        }
        hijo.css("display",new_value);
        sleep(500);
    });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function initPortfolio(){
    responsive_menu_button.addEventListener("click", function(){
        toggleResponsiveNav();
    })
    SetHeaderOffSet();

    populateIconClasses();
    applyTextRevealEffect();
}
function SetHeaderOffSet(){
    let header_element = document.getElementsByTagName('header')[0];
    const alturaHeader = header_element.offsetHeight;

    //obtener la primera section y aplicarle el offset
    if(document.querySelector('section')){
        document.querySelector('section').style.marginTop = `${alturaHeader}px`;
    }
    
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
            desktop_menu.style.opacity = 0;
            window.setTimeout(function() {
                personal_element.style.opacity = 0;
                desktop_menu.style.opacity = 1;
            }, 50);
            break;
        case 'scrolled':
            header_element.style.justifyContent = 'space-between';
            personal_element.style.display = 'flex';
            desktop_menu.style.opacity = 0;
            window.setTimeout(function() {
                personal_element.style.opacity = 1;
                desktop_menu.style.opacity = 1;
            }, 50);
            break;
        default:
            console.log('default');
            break;
    }
    
}
function isWindowSizeResponsive() {
    return window.innerWidth <= RESPONSIVE_WIDTH;
}

function rotateElement(element, degrees){
    element.style.rotate = degrees+'deg';
}

// efecto escritura codigo
function applyTextRevealEffect() {
    let elementos = document.querySelectorAll('.code_reveal_effect');

    elementos.forEach(elemento => {
        const text_reveal = elemento.textContent;
        elemento.textContent = '';
        escribirCodigo(text_reveal,elemento);
    });

    elementos = document.querySelectorAll('h2');

    elementos.forEach(elemento => {
        const text_reveal = elemento.textContent;
        elemento.textContent = '';
        escribirCodigo(text_reveal,elemento);
    });
}
function escribirCodigo(texto, elementoHTML) {
    let indice = 0;
    const velocidadMinima = 5; // Tiempo mínimo entre cada letra (en milisegundos)
    let velocidadMaxima = 95; // Tiempo máximo entre cada letra (en milisegundos)

    // Verificar si el texto es un título (menos de 15 caracteres)
    if (texto.length < 15) {
      velocidadMaxima = velocidadMaxima / 2; // Reducir la velocidad máxima a la mitad
    }
    
function escribirCaracter() {
    if (indice < texto.length) {
        const tiempoAleatorio = Math.random() * (velocidadMaxima - velocidadMinima) + velocidadMinima;
        setTimeout(() => {
            elementoHTML.innerHTML += texto.charAt(indice);
            indice++;
            escribirCaracter();
        }, tiempoAleatorio);
    }
}
    
    escribirCaracter();
}

// Scroll suave hacia el inicio de la página
function goToTop(){
    

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}