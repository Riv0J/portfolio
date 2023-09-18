let icons_dictionary;

function populateIconClasses() {
    const icon_elements = document.querySelectorAll("i");

    icon_elements.forEach(icon => {
        const icon_name = icon.getAttribute("data_icon_name");
        if(!icon_name) {
            icon.classList.add('question');
            return; //does not break loop, skips!
        }
        assignIcon(icon,icon_name);
    });
}
function assignIcon(icon_element, icon_name){
    const icon_class = getIconClass(icon_name);
    icon_element.className = icon_class;
    console.log(icon_name);
}
function getIconClass(icon_name){
    if(!icons_dictionary){
        initDictionary();
    }
    let icon_class= icons_dictionary[icon_name];
    if(!icon_class){
        icon_class =icons_dictionary['question'];
    }
    return icon_class;
}
function initDictionary(){
    icons_dictionary = {
        "clock": "ri-time-line",
        "user": "ri-user-line",
        "user-fill": "ri-user-fill",
        "question": "ri-question-mark",
        "logout": "ri-logout-box-r-line",
        "copy": "ri-file-copy-2-line",
        "info-circle": "ri-information-line",
        "info-circle-fill": "ri-information-fill",
        "success": "ri-check-line",
        "success-circle": "ri-checkbox-circle-line",
        "success-circle-fill": "ri-checkbox-circle-fill",
        "error": "ri-close-line",
        "error-circle": "ri-close-circle-line",
        "error-circle-fill": "ri-close-circle-fill",
        "online": "ri-earth-line",
        "compass": "ri-compass-line",
        "planet": "ri-planet-line",
        "site-bold": "ri-pages-line",
        "site": "ri-article-line",
        "site-thin": "ri-newspaper-line",
        "edit": "ri-edit-box-line",
        "view": "ri-eye-line",
        "close": "ri-close-fill",
        "save": "ri-save-line",
        "delete": "ri-delete-bin-6-line",
        "add": "ri-add-line",
        "arrow_down": "ri-arrow-down-s-line",
        "arrow_up": "ri-arrow-up-s-line",
        "settings": "ri-settings-5-line",
        "settings2": "ri-settings-4-line",
        "statistics": "ri-bar-chart-2-line",
        "html5":"ri-html5-line",
        "css3":"ri-css3-line",
        "js":"ri-javascript-line",
        "java":"ri-javascript-fill"
    };
}