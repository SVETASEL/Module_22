const infoButton = document.getElementById('infoButton');
const userScreenInfo = document.getElementById('userScreenInfo');
const userLocation = document.getElementById('userLocation');

infoButton.addEventListener('click', () => {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    userScreenInfo.innerHTML = `Размеры экрана: ${screenWidth} x ${screenHeight}`;
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            // Выводим информацию о местоположении
            userLocation.innerHTML = `Местоположение: Широта ${latitude}, Долгота ${longitude}`;
        }, (error) => {
            // Если пользователь отказался дать доступ или местоположение недоступно
            userLocation.innerHTML = 'Информация о местоположении недоступна';
        });
    } else {
        // Если информация о местоположении не поддерживается браузером
        userLocation.innerHTML = 'Информация о местоположении недоступна';
    }
});


