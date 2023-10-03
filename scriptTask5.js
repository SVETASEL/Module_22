const chat = document.getElementById('chat');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');
const sendLocationButton = document.getElementById('sendLocation');

const socket = new WebSocket('wss://echo-ws-service.herokuapp.com/');

socket.addEventListener('open', (event) => {
    console.log('Соединение установлено:', event);
});

socket.addEventListener('error', (error) => {
    console.error('Ошибка соединения:', error);
});

socket.addEventListener('close', (event) => {
    console.log('Соединение закрыто:', event);
});

socket.addEventListener('message', (event) => {
    const message = event.data;
    displayMessage(message);
});

function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
}

sendMessageButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        socket.send(message);
        messageInput.value = '';
        displayMessage(`Вы: ${message}`);
    }
});

// Обработчик клика на кнопку "Гео-локация"
sendLocationButton.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const mapLink = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}`;
            socket.send(mapLink);
            displayMessage(`Гео-локация: ${mapLink}`);
        }, (error) => {
            console.error('Ошибка при получении гео-локации:', error);
            displayMessage('Гео-локация не поддерживается в вашем браузере')
        });
    } else {
        displayMessage('Гео-локация не поддерживается в вашем браузере');

    }
});
