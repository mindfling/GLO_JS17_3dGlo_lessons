// запуск после загрузки страници тоже что и defer
window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  // ! Lesson 19
  console.log('hello\nthis is 3dGLO');


  //Timer
  // TODO переделать в ES6
  const countTimer = (deadline) => {
    //получаем элементы один раз
    const timerHours = document.querySelector('#timer-hours');
    const timerMinuts = document.querySelector('#timer-minutes');
    const timerSeconds = document.querySelector('#timer-seconds');

    const addZero = (numb) => {
      return numb >= 0 && numb < 10 ? '0' + numb : numb;
    };
    
    // сюда всё что вычисляется по времени
    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(); //будущ дата
      const dateNow = new Date().getTime(); //текущ дата
      const timeRemaining = (dateStop - dateNow) / 1000; //ms/1000 = sec

      const seconds = Math.floor(timeRemaining % 60); // sec
      const minutes = Math.floor((timeRemaining / 60) % 60); //min
      // let hours = Math.floor((timeRemaining / 60 / 60) % 24); // hours
      const hours = Math.floor(timeRemaining / 60 / 60); // hours

      return { timeRemaining, hours, minutes, seconds };
    };


    //обновление таймера
    const updateClock = () => {
      const timer = getTimeRemaining();

      if (timer.timeRemaining > 0) {
        timerHours.textContent = timer.hours;
        timerMinuts.textContent = addZero(timer.minutes);
        timerSeconds.textContent = addZero(timer.seconds);
      } else {
        timerHours.textContent = '00';
        timerMinuts.textContent = '00';
        timerSeconds.textContent = '00';
      }
    };

    // * запускаем ОДИН раз, один раз планируем вызов
    updateClock();
    // * переделываем через setInterval() запускается через каждые 1000 мс
    setInterval(updateClock, 1000);
  };
  //тест таймера
  countTimer('9 13 2021'); 
  
  
  
  
  // Main Menu
  const toggleMenu = (event) => {
    
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    const closeBtn = document.querySelector('.close-btn');
    const menuItems = menu.querySelectorAll('ul>li'); //коллекция всех элементов подменю
    
    // todo make it by js 
    //? const handlerMenu = (event) => {
      //пока меню спрятано влево на -100%
    //?   if (!menu.style.transform || menu.style.transform === 'translate(-100%)') {
      //показать меню слева
    //?     menu.style.transform = 'translate(0)';
    //?   } else {
      //закрыть меню спрятать влево
    //?     menu.style.transform = 'translate(-100%)';
    //?   }
    //? };
    
    // todo make it by css
    const handlerMenu = () => {
      console.log('menu');
      menu.classList.toggle('active-menu');
    };
      
    btnMenu.addEventListener('click', handlerMenu); //клик по кнопке .menu
    closeBtn.addEventListener('click', handlerMenu); //клик по кнопке закрыть
    menuItems.forEach( (menuItem) => menuItem.addEventListener('click', handlerMenu) ); //клик по ВСЕМ элементам подменю
  };
  toggleMenu();



//Popup
  const togglePopUp = () => {

    const popup = document.querySelector('.popup'); //popup окно
    const popupBtn = document.querySelectorAll('.popup-btn'); //кнопки на странице .popup-btn для открытия окна
    const popupClose = document.querySelector('.popup-close'); //кнопка закрытия окна
     
    const showPopupMenu = (event) => {
      popup.style.display = 'block';
    };

    const closePopupMenu = (event) => {
      popup.style.display = 'none';
    };
    
    popupBtn.forEach( (elem) => { //навесить на все кнопки событие открыть popup окно
      elem.addEventListener( 'click', showPopupMenu);
    });
 
    popupClose.addEventListener('click', () =>  closePopupMenu()); //навесить событие закрыть окно
  };
  togglePopUp();




}); // * DOMContentLoaded *
