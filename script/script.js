// запуск после загрузки страници тоже что и defer
window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  // ! Lesson 19
  console.log('hello\nthis is 3dGLO');

  // Menu
  const toggleMenu = (event) => {
    
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = menu.querySelectorAll('ul>li');
    console.log('menu: ', menu);
    console.log('menuItems: ', menuItems);
    
    const handlerMenu = (event) => {

      if (!menu.style.transform || menu.style.transform === 'translate(-100%)') {
        console.log("тогда открыть меню");
        menu.style.transform = 'translate(0)';
      } else {
        menu.style.transform = 'translate(-100%)';
      }

      console.log();
    };

    btnMenu.addEventListener('click', (event) => {
      //? menu скрыто через transform

      // if (!menu.style.transform || menu.style.transform === 'translate(-100%)') {
      //   console.log("тогда открыть меню");
      //   menu.style.transform = 'translate(0)';
      // } else {
      //   menu.style.transform = 'translate(-100%)';
      // }

      handlerMenu();

    });

    closeBtn.addEventListener('click', (event) => {
      menu.style.transform = 'translate(-100%)';
    });
    
    // for (let i = 0; i < menuItems.length; i++) {
    //   menuItems[i].addEventListener('click', (event) => {
    //     handlerMenu();
    //   });
    // };

    menuItems.forEach( item => item.addEventListener('click', handlerMenu));

    console.log();
  };
  toggleMenu();



  //Timer
  // TODO переделать в ES6
  const countTimer = (deadline) => {
    //получаем элементы один раз
    let timerHours = document.querySelector('#timer-hours'),
      timerMinuts = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    // сюда всё что вычисляется
    const getTimeRemaining = () => {
      let dateStop = new Date(deadline).getTime(); //будущ дата
      let dateNow = new Date().getTime(); //текущ дата
      let timeRemaining = (dateStop - dateNow) / 1000; //ms/1000 = sec

      let seconds = Math.floor(timeRemaining % 60); // sec
      let minutes = Math.floor((timeRemaining / 60) % 60); //min
      let hours = Math.floor((timeRemaining / 60 / 60) % 24); // hours

      return {timeRemaining, hours, minutes, seconds};
    };

    //обновление таймера
    const updateClock = () => {
      let timer = getTimeRemaining();
      console.log('timer: ', timer);

      // TODO addZero (numb) when 0 <= 9

      if (timer.timeRemaining > 0) {
        timerHours.textContent = timer.hours;
        timerMinuts.textContent =
          (timer.minutes < 10 ? '0' : '') + timer.minutes;
        timerSeconds.textContent =
          (timer.seconds < 10 ? '0' : '') + timer.seconds;
      } else {
        // * напоминалка если дата уже прошла то обратный таймер уже по нулям
        timerHours.textContent = 0;
        timerMinuts.textContent = 0;
        timerSeconds.textContent = 0;
      }
    };

    // * запускаем ОДИН раз, один раз планируем вызов
    // * переделываем через setInterval() по сути тот же setTimeout() с рекурсией
    setInterval(updateClock, 1000);
  };

  //тест таймера
  countTimer('9 13 2021');
});
