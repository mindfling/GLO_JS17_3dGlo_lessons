// запуск после загрузки страници тоже что и defer
window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  // ! Lesson 19
  console.log('This is 3dGLO');

  //Timer
  const countTimer = (deadline) => {
    //получаем элементы один раз
    const timerHours = document.querySelector('#timer-hours');
    const timerMinuts = document.querySelector('#timer-minutes');
    const timerSeconds = document.querySelector('#timer-seconds');

    //добавляет ноль к коротким числам
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

      return {timeRemaining, hours, minutes, seconds};
    };

    //обновление таймера
    const updateClock = () => {
      const timer = getTimeRemaining();

      if (timer.timeRemaining > 0) {
        timerHours.textContent = timer.hours;
        timerMinuts.textContent = addZero(timer.minutes);
        timerSeconds.textContent = addZero(timer.seconds);
      } else {
        //когда время прошло
        timerHours.textContent = '00';
        timerMinuts.textContent = '00';
        timerSeconds.textContent = '00';
      }
    };

    updateClock(); // * запускаем ОДИН раз без таймера
    setInterval(updateClock, 1000); // * переделываем через setInterval() запускается через каждые 1000 мс
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
    // const handlerMenu = (event) => {
    //   if (!menu.style.transform || menu.style.transform === 'translateX(-100%)') {
    //     menu.style.transform = 'translateX(100%)'; //! если меню скрыто - открываем
    //   } else {
    //     menu.style.transform = 'translateX(-100%)'; //! если меню открыто - то скрываем
    //   }
    // };

    // todo make it by css
    // const handlerMenu = () => {
    //   console.log('menu');
    //   menu.classList.toggle('active-menu');
    // };

    //! плавная анимация главного меню by js
    const handlerMenu = (event) => {
      // let time2, time0 = (new Date()).getTime(); //todo time test

      const showMenuAnimate = () => {
        // * анимируем меню двигаем слева translateX(%)
        let count = 0; //счетчик анимаций
        let menuPercent = 0;
        let showInterval = setInterval(() => {
          count++;
          menuPercent = 150 - (650 / (count + 110)) ** 3; //* подбираем параметры сдвига меню чисто Имперически
          menu.style.transform = `translateX(${menuPercent}%)`;

          // menuPercent = 140 - (650 / (count+100) )**3; ////!
          // menuPercent = 120 - (650 / (count+62) )**2; //!
          // menuPercent = 120 - 1 / ( ((count+65)/700) ** 2 );
          // menuPercent = -100 + (count**3 / 375);
          // menuPercent = 100 - (1 / (100-count*10));

          if (menuPercent > 100 || count > 200) {
            //* условия остановки таймера
            menu.style.transform = `translate(100%)`; //!
            clearInterval(showInterval); //* закрываем таймер по условию
          }
        }, 10);
      };

      //? проверяем состояние меню handlerMenu основная логика
      if (!menu.style.transform || menu.style.transform === 'translateX(-100%)') {
        //* если меню закрыто - открываем
        if (window.innerWidth > 768) {
          //! Анимация работает на ширина экране БОЛЬШЕ 768px
          showMenuAnimate();
        } else {
          // * экран узкий нет анимации
          menu.style.transform = 'translateX(100%)'; //* то просто показываем меню
        }
      } else {
        //* если меню открыто
        menu.style.transform = 'translateX(-100%)'; //* то просто скрываем меню
      }
    };

    //* навешиваем события на кнопки меню
    btnMenu.addEventListener('click', handlerMenu); //клик по кнопке .menu
    closeBtn.addEventListener('click', handlerMenu); //клик по кнопке закрыть
    menuItems.forEach((menuItem) => menuItem.addEventListener('click', handlerMenu)); //клик по ВСЕМ элементам подменю
  };
  toggleMenu();

  //! ДЗ 19
  //Popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'); //popup окно
    const popupContent = document.querySelector('.popup-content');
    const popupBtn = document.querySelectorAll('.popup-btn'); //кнопки на странице .popup-btn для открытия окна
    const popupClose = document.querySelector('.popup-close'); //кнопка закрытия окна

    const escapeHandler = (event) => {
      //todo ОБЪЯВИМ отдельно событие закрытие окна по Escape
      console.log('escapeHandler', event);

      //? закрыть Escape
      if (event.key === 'Escape' || event.code === 'Escape') {
        console.log('it was Escape');
        closePopupMenu();
      }
      //? убрать действие по умолчанию у Пробела и у Ентера
      if (event.code === 'Space') {
        event.preventDefault();
      }
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    };

    //! закрыть popup
    const closePopupMenu = (event) => {
      let opacityLevel = popup.style.opacity; //1; //*НАЧАЛЬНОЕ ЗНАЧЕНИЕ ПРОЗРАЧНОСТИ при закрытии ПРОСТО УМЕНЬШАЕМ

      if (window.innerWidth > 768) {
        //* Широкий экран, анимация на исчезновение включена
        let count = 0;
        let closeInterval = setInterval(() => {
          if (opacityLevel > 0 || count > 100) {
            //* ограничиваем количество итераций
            popup.style.opacity = opacityLevel;
            opacityLevel = parseInt((opacityLevel - 0.1) * 10) / 10; //?убираем погрешность 0.1000000000000001

          } else {
            //* окно полностью скрыто
            popup.style.display = 'none';
            popup.style.opacity = 1;
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

    //! показать popup
    const showPopupMenu = (event) => {
      let time2,
        time0 = new Date().getTime(); //todo time test

      // * анимация спускаем окно сверху
      popupContent.style.top = '-382px'; //* окно полностью спрятано вверху
      popup.style.display = 'block';
      popupContent.style.display = 'block';
      let needCssHeight = Math.ceil(window.screen.availHeight * 0.1); // нужно чтобы окно спустилось на 10% высоты браузера
      let opacityLevel = 0;
      popup.style.opacity = opacityLevel;

      //! Анимация работает на ширина экране БОЛЬШЕ 768px
      if (window.innerWidth > 768) {
        // * Экран широкий, анимация появления СВЕРХУ

        let count = 0; //счетчик анимаций
        let showInterval = setInterval(() => {
          count++;
          //* плавно убираем непрозрачность
          popup.style.opacity = opacityLevel;
          opacityLevel = opacityLevel < 1 ? opacityLevel + 0.03 : 1;
          // opacityLevel = parseInt((opacityLevel - 0.1) * 10) / 10; //убираем погрешность 0.1000000000000001

          let popupContentTop = -382 + 9 * count; //* вычисляем сдвиг сверху, высота окна css = 382px
          popupContent.style.top = `${popupContentTop}px`; //* окно полностью спрятано выезжает сверху

          if (popupContentTop > needCssHeight || count > 400) {
            popup.style.opacity = 1.0;
            clearInterval(showInterval);
          }
          time2 = new Date().getTime(); //todo test
          console.log(count, 'animation time:', time2, time2 - time0, 'opacity', popup.style.opacity); //todo test
        }, 6);
      } else {
        // * экран узкий нет анимации на появление
        // popup.style.display = 'block';
        popup.style.opacity = 1.0; // окно полностью открылось
        popupContent.style.top = `${needCssHeight}px`;
      }

      document.addEventListener('keydown', escapeHandler); //todo добавим событие слушателя клавиатуры после popup
    };

    //? открыть
    popupBtn.forEach((elem) => {
      //навесить на все кнопки событие открыть popup окно
      elem.addEventListener('click', showPopupMenu);
    });

    //? закрыть
    popupClose.addEventListener('click', closePopupMenu); //навесить событие закрыть окно
    popup.addEventListener('click', closePopupMenu); // закрывать окно

    //? вычисляем отступ popupContent слева
    // popup.style.display = 'block';
    // popupContent.style.display = 'block';

    // const contentWidth = popupContent.clientWidth;
    // const contentWidth = popupContent.offsetWidth;
    //* const contentWidth = 310; //! подбираем СРАЗУ ВЫСТАВЛЯЕМ POPUP по Центру
    //* const width = window.innerWidth;
    //* const leftPercent = ((50 - 310 / width * 50));
    //* popupContent.style.left = leftPercent + '%';

    popupContent.style.left = 50 - (310 * 50) / window.innerWidth + '%';

    // const leftPercent = ((1 - contentWidth / width) * 50);
    // const leftPercent = ((width - contentWidth) / width * 50);
    // const leftPercent = Math.ceil((width - contentWidth) / width * 50);

    // const leftPercent = ((width - contentWidth) / 2);
    // popupContent.style.left = leftPercent + 'px';
  };

  togglePopUp();
}); // * DOMContentLoaded *
