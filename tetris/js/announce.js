//variables DOM
const announce = document.getElementById('announce');
const ANNOUNCE_ANIM_NAME = 'bounceInDown';
//variables js
async function announceTextAsync(text_array, time_ms){
    text_array.forEach(string => {
        announce.appendChild(document.createTextNode(string));
        announce.appendChild(document.createElement('br'));
    });
    announce.style.animationDuration = time_ms;
    announce.classList.add(ANNOUNCE_ANIM_NAME);
    await sleep(time_ms);
    announceTextRemove();
}
function announceTextRemove(){
    announce.style.animationDuration = '';
    announce.classList.remove(ANNOUNCE_ANIM_NAME);
    while(announce.firstChild){
        announce.removeChild(announce.firstChild);
    }
}