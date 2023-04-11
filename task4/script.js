"use strict";

// Задание 4.
// Сверстайте кнопку, по клику на которую будет отправляться запрос к Timezone API.
// В запросе нужно отправить координаты местоположения пользователя, полученные
// с помощью Geolocation API. В ответ на запрос придёт объект, из которого нужно
// вывести на экран следующую информацию:
// временная зона, в которой находится пользователь: параметр timezone;
// местные дата и время: параметр date_time_txt.
// Строка запроса к API выглядит следующим образом:
// https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=latitude&long=longitude.
// Вместо latitude и longitude нужно подставить широту и долготу.

const button = document.querySelector(".button");
const output = document.querySelector(".output");

// слушатель на кнопку
button.addEventListener("click", () => {
    getGeoLocation();
});

// если у полученного объекта есть свойста широты и долготы то выполняет
// запрос к Timezone API и выводит в браузер необходимую информацию
function fetchRequest(object) {
    if (object.latitude && object.longitude) {
        fetch(
            `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${object.latitude}&long=${object.longitude}`
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                output.textContent = `Ваша временная зона: ${data.timezone}, местные дата и время: ${data.date_time_txt}`;
            })
            .catch((error) => {
                output.textContent = `ошибка: ${error}`;
            });
    } else output.textContent = "Информация о местоположении недоступна";
}
// ...

// при положительном результате запроса к Geolocation API,
// получаем объект с данными о местоположении, передаём объект
// в функцию fetchRequest
function success(position) {
    let location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    };
    fetchRequest(location);
}
// ...

// отрабатывает при ошибке запроса к Geolocation API
function error() {
    output.textContent = "Информация о местоположении недоступна";
}

// если браузер поддерживает Geolocation API и пользователь одобрил запрос,
// то запрашивает у данного API объект с данными о местоположении пользователя
function getGeoLocation() {
    if (!navigator.geolocation) {
        output.textContent = "Информация о местоположении недоступна";
    } else {
        output.textContent = "Идёт определение местоположения, подождите...";
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
// ...
