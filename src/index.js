'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import ourCommand from './modules/ourCommand';
import inputValidation from './modules/inputValidation';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//! Lesson 30 WebPack
console.log('This is 3dGLO');

//Timer
//тест таймера на дату день программиста 256 день в году
// countTimer('9 13 2021');
countTimer('9 13 2021');
// Main Menu
toggleMenu();
//Popup
togglePopUp();
//Tabs
tabs();
//функция генерирует точки dots на слайде
// Слайдер с точечками
slider();
// наша КОММАНДА при наведении в Блоке на картинку Наша Команда меняется фото
ourCommand();
// Валидация форм
inputValidation();
// Калькулятор стоимости по ВидеоУроку
calc(100); //  расчёт суммы дизайна исходя из цены 100 за 1ед.
// Переписать скрипт для отправки данных с формы, используя Fetch
//  вешаем на каждую форму отдельно по её id
sendForm('form1'); // user-form main-form
sendForm('form2'); // user-form footer-form
sendForm('form3'); // user-form popup
