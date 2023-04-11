"use strict";

// Задание 5.
// 1. Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com/
// Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
//При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
//Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:
// 2. Добавить в чат механизм отправки гео-локации:
// При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат
// вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией.
// Сообщение, которое отправит обратно эхо-сервер, не выводить.

const input = document.querySelector(".input");
const sendMessage = document.querySelector(".message");
const geoLocation = document.querySelector(".location");
const output = document.querySelector(".output-wrapper");

const wsUri = "wss://echo-ws-service.herokuapp.com/";

// открытие соединения с сервером эхо
const websocet = new WebSocket(wsUri);

// слушатель на кнопку отправить сообщение, если в инпуте что то есть,
// то отображает это и отправляет на сервер
sendMessage.addEventListener("click", () => {
    if (input.value) {
        let message = input.value;
        renderMessage(message, "user");
        websocet.send(message);

        // отслеживаем сообщения от сервера, при получении отображаем
        websocet.onmessage = (response) => {
            renderMessage(response.data, "server");
        };

        input.value = "";
    }
});
// ...

// слушатель на кнопку запроса геолокации, обнуляем отслеживание
// сообщений с сервера и запускаем функцию getGeoLocation
geoLocation.addEventListener("click", () => {
    websocet.onmessage = null;
    getGeoLocation();
});

// отрисовывает сообщение с заданным классом для стилизации
function renderMessage(message, source) {
    output.insertAdjacentHTML(
        "beforeend",
        `<p class="output-message ${source}">${message}</p>`
    );
}
// ...

// при положительном результате запроса к Geolocation API,
// получаем объект с данными о местоположении, отправляем
// сообщение серверу, отображаем ссылку на карту
// с местоположением пользователя
function success(position) {
    websocet.send(position);
    let latitude = position.coords.latitude,
        longitude = position.coords.longitude,
        message = "Гео-локация";
    output.insertAdjacentHTML(
        "beforeend",
        `<a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" class="output-link user" target="_blank">${message}</a>`
    );
}
// ...

// отрабатывает при ошибке запроса к Geolocation API
function error() {
    renderMessage("Информация о местоположении недоступна", "user");
}

// если браузер поддерживает Geolocation API и пользователь одобрил запрос,
// то запрашивает у данного API объект с данными о местоположении пользователя
function getGeoLocation() {
    if (!navigator.geolocation) {
        renderMessage("Информация о местоположении недоступна", "user");
    } else {
        renderMessage("Идёт определение местоположения, подождите...", "user");
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
// ...
