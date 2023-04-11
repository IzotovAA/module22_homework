"use strict";

// Задание 3.
// Сверстайте кнопку, клик на которую будет выводить на экран следующие данные:
// Размеры экрана пользователя (ширина и высота).
// Координаты местонахождения пользователя. Если пользователь отказался дать
// доступ к местоположению или данная функция недоступна в бразуере,
// вывести вместо координат сообщение «Информация о местоположении недоступна».

const button = document.querySelector(".button");
const outputScreen = document.querySelector(".output1");
const outputLocation = document.querySelector(".output2");

// слушатель на кнопку
button.addEventListener("click", () => {
    getScreenSize();
    getGeoLocation();
});

// получает размер экрана
function getScreenSize() {
    outputScreen.textContent = `Размер вашего экрана: ${window.screen.width} на ${window.screen.height} px`;
}

// при положительном результате вызова метода getCurrentPosition
// плучаем объект с местоположением и отображаем необходимую информацию
function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    outputLocation.textContent = `Ваше местоположение: широта: ${latitude}°, долгота: ${longitude}°`;
}
// ...

// отрабатывает при отрицательном результате вызова метода getCurrentPosition
function error() {
    outputLocation.textContent = "Информация о местоположении недоступна";
}

// если браузер поддерживает Geolocation API и пользователь одобрил запрос,
// то запрашивает у данного API объект с данными о местоположении пользователя
function getGeoLocation() {
    if (!navigator.geolocation) {
        outputLocation.textContent = "Информация о местоположении недоступна";
    } else {
        outputLocation.textContent =
            "Идёт определение местоположения, подождите...";
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
// ...
