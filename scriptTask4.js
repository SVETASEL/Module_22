const timezoneButton = document.getElementById('timezoneButton');
const timezoneInfoDiv = document.getElementById('timezoneInfo');
const userLocationDiv = document.getElementById('userLocation');

timezoneButton.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const apiUrl = `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`;

            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    const timezone = data.timezone;
                    const localDateTime = data.date_time_txt;

                    // Выводим информацию на экран
                    timezoneInfoDiv.innerHTML = `Временная зона: ${timezone}<br>Местное время: ${localDateTime}`;
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных из API:', error);
                    timezoneInfoDiv.innerHTML = 'Не удалось получить информацию о времени';
                });
        }, (error) => {
            // Если пользователь отказался дать доступ или местоположение недоступно
            userLocationDiv.innerHTML = 'Информация о местоположении недоступна';
        });
    } else {
        // Если информация о местоположении не поддерживается браузером
        userLocationDiv.innerHTML = 'Информация о местоположении недоступна';
    }
});
