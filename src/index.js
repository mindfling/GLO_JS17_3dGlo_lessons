'use strict';
// Lesson 30 WebPack

import countTimer from './modules/countTimer.js';
import toggleMenu from './modules/toggleMenu.js';
import togglePopUp from './modules/togglePopUp.js';
import tabs from './modules/tabs.js';
import slider from './modules/slider.js';
import ourCommand from './modules/ourCommand.js';
import inputValidation from './modules/inputValidation.js';
import calc from './modules/calc.js';
import sendForm from './modules/sendForm.js';

import Carousel from './modules/sliderCarousel.js';

countTimer('9 13 2021'); // дата праздника дня программиста
toggleMenu();
togglePopUp();
tabs();
slider();
ourCommand();
inputValidation();
calc(100); //  расчёт суммы дизайна исходя из цены 100 за 1ед.

sendForm('form1'); // user-form main-form
sendForm('form2'); // user-form footer-form
sendForm('form3'); // user-form popup

const mySlideOptions = {
  main: '.companies-wrapper',
  wrap: '.companies-hor',
  next: '#test-right',
  prev: '#test-left',
  slidesToShow: 4
};

const carousel = new Carousel(mySlideOptions);

carousel.init();
// carousel.addGloClass();
// carousel.addStyle();

