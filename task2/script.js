"use strict";

// Задание 2.
// Сверстайте кнопку, которая будет содержать в себе icon_01
// (как в примере в последнем видео). При клике на кнопку
// иконка должна меняться на icon_02. Повторный клик меняет иконку обратно.

const button = document.querySelector(".button");
const icon1 = document.querySelector("#icon-1");
const icon2 = document.querySelector("#icon-2");

// слушатель на кнопку, скрывает отображает иконки
button.addEventListener("click", () => {
    icon1.classList.toggle("invisible");
    icon2.classList.toggle("invisible");
});
