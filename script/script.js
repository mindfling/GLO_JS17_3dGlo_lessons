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

      return {
        timeRemaining,
        hours,
        minutes,
        seconds,
      };
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

  // Main Menu //! ДЗ 19
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
    menuItems.forEach((menuItem) =>
      menuItem.addEventListener('click', handlerMenu)
    ); //клик по ВСЕМ элементам подменю
  };
  toggleMenu();

  //Popup //! ДЗ 19

  const togglePopUp = () => {
    const popup = document.querySelector('.popup'); //popup окно
    const popupContent = document.querySelector('.popup-content');
    const popupBtn = document.querySelectorAll('.popup-btn'); //кнопки на странице .popup-btn для открытия окна
    const popupClose = document.querySelector('.popup-close'); //кнопка закрытия окна

    //! закрыть
    const closePopupMenu = (event) => {
      let opacityLevel = popup.style.opacity; //1; //*НАЧАЛЬНОЕ ЗНАЧЕНИЕ ПРОЗРАЧНОСТИ при закрытии ПРОСТО УМЕНЬШАЕМ


      if (innerWidth > 768) {
        console.log('Широкий экран, анимация на исчезновение включена');

        let count = 0;
        let closeInterval = setInterval(() => {
          // console.log(`таймер на закрытие ${count++}`);
          // popupContent.style.top = `${-382 + 3*count}px`;
          // console.log('opacityLevel: ', opacityLevel);

          if (opacityLevel > 0 || count > 100) { //* ОГРАНИЧИВАЕМ КОЛИЧЕСТВО ИТЕРАЦИЙ
              
              popup.style.opacity = opacityLevel;
              // opacityLevel -= 0.1;
              opacityLevel = parseInt((opacityLevel - 0.1) * 10) / 10; //убираем погрешность 0.1000000000000001
              console.log('opacityLevel: ', opacityLevel);
          } else {
              //* полностью скрываем
              popup.style.display = 'none';
              popup.style.opacity = 1;
              console.log('Окно закрыто, закрываем таймер закрытия окна');
              clearInterval(closeInterval);
          }
        }, 30);

      } else {
        console.log('Нет анимации исчезновения');
        popup.style.display = 'none'; //окно исчезло
        popup.style.opacity = 1.0; //вернем прозрачнось по умолчанию
      }

      
      document.removeEventListener('keydown', escapeHandler); //todo должны убрать слушатель после закрытия окна
    };

    //! ПОКАЗАТЬ
    const showPopupMenu = (event) => {
      // * анимация спускаем окно сверху
      console.log('покажи попап');
      popupContent.style.top = '-382px'; //* окно полностью спрятано вверху
      popup.style.display = 'block';
      popupContent.style.display = 'block';
      let needCssHeight = Math.ceil(window.screen.availHeight * 0.1); // нужно чтобы окно спустилось на 10% высоты браузера
      
      //! Если пользователь заходит на сайт с мобильного устройства, 
      //! у которого ширина экрана меньше 768px анимация отключается
      if (innerWidth > 768) {
        console.log( 'Экран широкий ', innerWidth,'анимация появления СВЕРХУ');
        
        let count = 0; //счетчик анимаций
        let showInterval = setInterval(() => {
          count++;
          let popupContentTop = -382 + 8 * count; //* вычисляем сдвиг сверху, высота окна css = 382px
          popupContent.style.top = `${popupContentTop}px`; //* окно полностью спрятано выезжает сверху

          if (
            popupContentTop > needCssHeight || count > 500 // || popup.style.display === 'none'
          ) {
            console.log('закрываем таймер');
            clearInterval(showInterval);
            popup.style.opacity = 1.0;
          }
        }, 10);
        
      } else {
        console.log('экран узкий нет анимации на появление');
        // popup.style.display = 'block';
        popup.style.opacity = 1.0; // окно видимо полностью открылось
        popupContent.style.top = `${needCssHeight}px`;
      }
 
      document.addEventListener('keydown', escapeHandler); //todo добавим событие слушателя клавиатуры после popup
      // document.addEventListener('keydown', (event) => {
      //   escapeHandler(event);
      // });
    };

    const escapeHandler = (event) => {
      //todo ОБЪЯВИМ отдельно событие закрытие окна по Escape
      console.log('escapeHandler', event);

      //? закрыть Escape
      if (event.key === 'Escape' || event.code === 'Escape') {
        console.log('it was Escape');
        closePopupMenu();
      }
      //? убрать действие по умолчанию у Пробела
      if (event.code === 'Space') {
        event.preventDefault();
      }
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    };

    //? открыть
    popupBtn.forEach((elem) => {
      //навесить на все кнопки событие открыть popup окно
      elem.addEventListener('click', showPopupMenu);
    });

    //? закрыть
    popupClose.addEventListener('click', closePopupMenu); //навесить событие закрыть окно
    popup.addEventListener('click', closePopupMenu); //todo закрывать окно УБРАТЬ
  };

  togglePopUp();
}); // * DOMContentLoaded *

// // todo ДЕБАГ УБРАТЬ
// const popup = document.querySelector('.popup'); //popup окно
// const popupContent = document.querySelector('.popup-content');

// console.log('popup: ', popup);
// console.log('popupContent: ', popupContent);
