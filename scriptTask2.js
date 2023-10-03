const iconButton = document.querySelector('.j_btn_icon');
const icon1 = document.querySelector('.btn_icon1');
const icon2 = document.querySelector('.btn_icon2');

let isIcon2 = false;

iconButton.addEventListener('click', () => {
    isIcon2 = !isIcon2;

    if (isIcon2) {
        icon1.style.display = 'none'; 
        icon2.style.display = 'inline-block'; 
    } else {
        icon1.style.display = 'inline-block'; 
        icon2.style.display = 'none'; 
    }
});
