'use strict';
// Lesson 30 WebPack

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import ourCommand from './modules/ourCommand';
import inputValidation from './modules/inputValidation';
import calc from './modules/calc';
import sendForm from './modules/sendForm';


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
