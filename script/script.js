// запуск после загрузки страници тоже что и defer
window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  //! Lesson 23
  console.log('This is 3dGLO');

  //Timer
  const countTimer = (deadline) => {
    const timerHours = document.querySelector('#timer-hours');
    const timerMinuts = document.querySelector('#timer-minutes');
    const timerSeconds = document.querySelector('#timer-seconds');

    //функция добавляет ноль к коротким числам
    const addZero = numb => numb >= 0 && numb < 10 ? '0' + numb : numb;

    // сюда всё что вычисляется по времени
    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(); //будущ дата
      const dateNow = new Date().getTime(); //текущ дата
      const timeRemaining = (dateStop - dateNow) / 1000; //ms/1000 = sec

      const seconds = Math.floor(timeRemaining % 60); // sec
      const minutes = Math.floor((timeRemaining / 60) % 60); //min
      const hours = Math.floor(timeRemaining / 60 / 60); // hours
      // let hours = Math.floor((timeRemaining / 60 / 60) % 24); //? hours свериться с ТЗ

      return {timeRemaining, hours, minutes, seconds};
    };

    //обновление таймера
    const updateClock = () => {
      const timer = getTimeRemaining();

      if (timer.timeRemaining > 0) {
        timerHours.textContent = addZero(timer.hours);
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
  //тест таймера на дату день программиста 256 день в году
  // countTimer('9 13 2021');
  countTimer('9 13 2021');



  // Main Menu
  const toggleMenu = (event) => {
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    // const closeBtn = document.querySelector('.close-btn');
    // const menuItems = menu.querySelectorAll('ul>li'); //коллекция всех элементов подменю

    //!? todo простая анимация make it by css
    const handlerMenuCSS = () => {
      // console.log('menu');
      menu.classList.toggle('active-menu');
    };

    //!? плавная анимация главного меню by js
    const handlerMenu = (event) => {
      // варианты расчета процента сдвига анимации
      const animatePercent = (count) => {
        return -99 + 0.07 * (count) ** 2; //? //! еще вариант плавно назад и вперед
      };
      const animatePercent1 = (count) => {
        return -15 + 0.03 * (count - 22) ** 2; //? // еще вариант плавно назад и вперед
      };
      const animatePercent2 = (count) => {
        return 140 - (650 / (count + 100)) ** 3; //? // другой вариант быстро вперед
      };

      const showMenuAnimate = () => {
        // * анимируем меню двигаем слева translateX(%)
        let count = 0; //счетчик анимаций
        let menuPercent = 0;
        let showInterval = setInterval(() => {
          count++;
          menuPercent = animatePercent(count);
          menu.style.transform = `translateX(${menuPercent}%)`;

          if (menuPercent > 100 || count > 200) {
            //* условия остановки таймера
            menu.style.transform = `translate(100%)`; //* выставляем в окончательное положение
            clearInterval(showInterval); //* закрываем таймер по условию
          }
        }, 10); // задержка анимации 10 мс
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

    //* навешиваем события делегирования на МЕНЮ .menu
    menu.addEventListener('click', (event) => {
      const target = event.target;

      if (target.matches('.close-btn')) {
        // клик по кнопке BUTTON CLOSE
        //todoo закрыть и уехать
        handlerMenu();
      } else if (target.matches('a')) {
        // клик по ссылке
        //todoo просто закрыть меню
        handlerMenu();
      } else {
        // клик по остальному меню ничего не делать
        return;
      }
    });

    //? осталось без делегирования навешиваем КНОПКА МЕНЮ
    btnMenu.addEventListener('click', handlerMenu); //клик по кнопке .menu
  };
  toggleMenu();

  //Popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'); //popup окно
    const popupContent = document.querySelector('.popup-content');
    const popupBtn = document.querySelectorAll('.popup-btn'); //кнопки на странице .popup-btn для открытия окна
    const popupClose = document.querySelector('.popup-close'); //кнопка закрытия окна

    const escapeHandler = (event) => {
      // * закрыть при нажатии Escape ОБЪЯВИМ отдельно событие закрытие окна по Escape
      if (event.key === 'Escape' || event.code === 'Escape') {
        closePopupMenu();
      }
      //? проблема с Enter и Space
    };

    //! закрыть popup
    const closePopupMenu = (event) => {
      let opacityLevel = popup.style.opacity; //1; //*НАЧАЛЬНОЕ ЗНАЧЕНИЕ ПРОЗРАЧНОСТИ при закрытии ПРОСТО УМЕНЬШАЕМ

      if (window.innerWidth > 768) {
        //* анимация на исчезновение на широком экране включена
        let count = 0;
        let closeInterval = setInterval(() => {
          if (opacityLevel > 0 || count > 100) {
            //* ограничиваем количество итераций
            popup.style.opacity = opacityLevel;
            opacityLevel = parseInt((opacityLevel - 0.1) * 10) / 10; //? убираем погрешность 0.1000000000000001
          } else {
            //* окно полностью скрыто
            popup.style.display = 'none';
            popup.style.opacity = 1;
            clearInterval(closeInterval);
          }
        }, 30);
      } else {
        // * Нет анимации исчезновения на узком экране
        popup.style.display = 'none'; //окно исчезло
        popup.style.opacity = 1.0; //вернем прозрачнось по умолчанию
      }

      document.removeEventListener('keydown', escapeHandler); //* должны убрать слушатель после закрытия окна
    };

    //! показать popup
    const showPopupMenu = (event) => {
      popupContent.style.top = '-382px'; //* окно полностью спрятано вверху
      popup.style.display = 'block';
      popupContent.style.display = 'block';
      let needCssHeight = Math.ceil(window.innerHeight * 0.1); // нужно спустить на 10% высоты браузера
      let opacityLevel = 0;
      popup.style.opacity = opacityLevel;

      //! Анимация работает на ширине экране БОЛЬШЕ > 768px
      if (window.innerWidth > 768) {
        // * Экран широкий, анимация появления СВЕРХУ

        let count = 0; //счетчик анимаций
        let showInterval = setInterval(() => {
          count++;
          //* плавно убираем непрозрачность
          popup.style.opacity = opacityLevel;
          // убираем погрешность 0.1000000000000001
          opacityLevel = opacityLevel < 1 ? parseInt((opacityLevel + 0.03) * 100) / 100 : 1;

          let popupContentTop = -382 + 9 * count; // вычисляем сдвиг сверху, высота окна css = 382px
          popupContent.style.top = `${popupContentTop}px`; // окно полностью спрятано выезжает сверху

          if (popupContentTop > needCssHeight || count > 400) {
            popup.style.opacity = 1.0;
            clearInterval(showInterval);
          }
        }, 6);
      } else {
        // * экран узкий нет анимации на появление
        popup.style.display = 'block';
        popup.style.opacity = 1.0; // окно полностью открылось
        popupContent.style.top = `${needCssHeight}px`;
      }

      document.addEventListener('keydown', escapeHandler); //todo добавим событие слушателя клавиатуры после popup
    };

    
    //? открыть //! вещаем основные слушатели
    popupBtn.forEach((elem) => {
      elem.addEventListener('click', showPopupMenu);
    });

    //? закрыть с делегированием
    popup.addEventListener('click', (event) => {
      const target = event.target;

      if (target === popupClose) {
        // кнопка закрыть окно
        closePopupMenu(event);
      } else if (target === popup) {
        // область popup закрыть окно
        closePopupMenu(event);
      } else if (target === popupContent) {
        // остальные области окна контента
        return;
      } else {
        // ОТСТАЛЬНЫЕ ОБЛАСТИ ОКНА НЕ ЗАКРЫВАТЬ 
        return;
      }
      return;
    }); // закрывать окно


    //* contentWidth = 310; //! подбираем имперически СРАЗУ ВЫСТАВЛЯЕМ POPUP по Центру
    // left = (100 - content * 100 / window) / 2
    popupContent.style.left = 50 - (310 * 50) / window.innerWidth + '%';
  };
  togglePopUp();


  //Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header');
    const tab = tabHeader.querySelectorAll('.service-header-tab');
    const tabContent = document.querySelectorAll('.service-tab');

    // * функция выставляет видимым заданый таб
    const selectTab = (select) => {
      // * toggle tab content
      tab.forEach((item, i) => {
        if (i === select) {
          item.classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          item.classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      });
    };

    //? выставляем начальные классы у табов
    selectTab(0); //  Самый первый таб это = 0

    //* вешаем обработчик событий
    tabHeader.addEventListener('click', (event) => {
      let target = event.target.closest('.service-header-tab');
      // пробегаем по всем табам
      tab.forEach((item, i) => {
        //находим там совпадающий с кликнутым используем его номер
        if (item === target) {
          //устанавливаем видимым только этот таб
          selectTab(i);
        }
      });
    });
  };
  tabs();


  //функция генерирует точки dots на слайде
  const addSliderDots = () => {
    const portfolioDotsParent = document.querySelector('.portfolio-dots');
    const slide = document.querySelectorAll('.portfolio-item');

    slide.forEach((item, index) => {
      const li = document.createElement('li');
      li.classList.add('dot');
      if (index === 0) {
        li.classList.add('dot-active'); //* активный 1й dot
      }
      portfolioDotsParent.append(li);
    });
    // let portfolioDot = portfolioDotsParent.querySelectorAll('.dot');
    // portfolioDot[0].classList.add('dot-active');
  };
  addSliderDots();

  // Слайдер с точечками
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      dot = document.querySelectorAll('.dot'),
      slider = document.querySelector('.portfolio-content');

    let currentSlide = 0;
    let interval;

    // скрывает текущий слайд
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass); // меняем слайды через css
    };
    // показывает следующий слайд
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass); // меняем слайды через css
    };

    //! основная функция смены слайдов autoPlay
    const autoPlaySlide = () => {

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    // старт слайдов autoPlay с задержкой time
    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    // остановить слайды (например при наведении на точки)
    const stopSlide = () => {
      clearInterval(interval);
    };

    //! делегируем autoPlay по клику
    slider.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target;
      if (!target.matches('.portfolio-btn, .dot')) {
        //* отбрасываем все остальные клики кроме как по точкам и кнопкам
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      //! обрабатываем клик по элементам управления
      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => { //? not mouseenter
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => { //? not mouseleave
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide(2000);
      }
    });

    startSlide(2000);
  };
  slider();


  // ! ДЗ 23 наша КОММАНДА .command
  // 1) В нашем проекте есть Блок с картинками Наша Команда
  const ourCommand = () => {

    const command = document.querySelector('.command');
    const commandPhotos = command.querySelectorAll('.command__photo');
    // let src; // запомним начальный адрес картинки
    
    commandPhotos.forEach( photo => {
      let src; // запомним начальный адрес картинки // ! В ЗАМЫКАНИИ

      photo.addEventListener('mouseenter', (event) => {
        const target = event.target;
        if (target.matches('.command__photo')) { //? если совпал адресс фото
          src = photo.src;
          photo.src = photo.dataset.img; //! меняем адрес фото при наведении
        }
      });

      photo.addEventListener('mouseleave', (event) => {
        const target = event.target;
        if (target.matches('.command__photo')) { //? если совпал адресс фото
          if (src) {
            photo.src = src; //! возвращаем назад фоту
          };
        }
      });
    }); //forEach

  };
  ourCommand();


  // ! ДЗ 23 Валидация форм 
  const inputValidation = () => {


    const calcItems = document.querySelectorAll('.calc-item');
    const inputFields = document.querySelectorAll('input');

    // * форма калькулятора Рассчитать стоимость
    calcItems.forEach( item => {
      // 2)  В калькуляторе разрешить ввод только цифр:
      if (!item.classList.contains('calc-type')) {
        
        item.addEventListener('input', event => {
          let target = event.target;
          event.target.value = target.value.replace(/[^\d]/g, '');
        });
      }
    
    });
    

    const validateElemOnBlur = (elem) => {

      let value = elem.value;
      console.log('value: ', value);
      console.log('elem: ', elem);

        //todo blur

        // 6) При потере фокуса(событие blur) реализовать проверку на корректность введённого значения в полях ввода 
        // и замена его на корректное при необходимости по правилам:

        // Должны удаляться все символы, кроме допустимых
        // Несколько идущих подряд пробелов или дефисов должны заменяться на один //* [x]
        // Пробелы и дефисы в начале и конце значения должны удаляться //* [ ]
        // Для поля "Ваше имя" Первая буква каждого слова должна приводиться к верхнему регистру, а все остальные — к нижнему
        if (elem.name === 'user_message') {
          // удалить "      " на " "  "------" на "-"
          // let str = value.match(/\-+/g);
          //?                     (^[\s\-]+)   (?<=\s)\s+   (?<=\-)\-+  ([\s\-]+$)           
          value = value.replace(/((^[\s\-]+))|((?<=\s)\s+)|((?<=\-)\-+)|([\s\-]+$)/g, '');
          //?
          elem.value = value;
          
        } else if (elem.name === 'user_name') {

          let words = value.match(/[а-я]+/ig);
          words = words.map(item => (item.substring(0, 1).toUpperCase() + item.substring(1).toLowerCase()) );
          value = words.join(' ');
          // value = value.toString().substring(0,1).toUpperCase() + value.toString().substring(1).toLowerCase();


          elem.value = value;
          
        } else if (elem.name === 'user_email') {
          // удалить @@@@@ 
          value = value.replace(/(?<=@)@+/g, '');
          
          
          elem.value = value;
          
        } else if (elem.name === 'user_phone') {
          // ? удалить ----   ((((   )))) заменить на один

          // ? или просто удалить лишние
          //?                     (?<=\()\(       (?<=\))\)       (?<=\-)\-         
          value = value.replace(/((?<=\()\({1,})|((?<=\))\){1,})|((?<=\-)\-{1,})|((?<=\+)\+{1,})/g, '');
          //? + плюсик в номере телефона
          // value = value.replace(/(^(?<=0)0+)|([\-\+]+)/g, '');
          // value = value.replace(/^[+]+/g, '+');
          elem.value = value;

        } else {
          console.log('other input');
        }
    };


    // * поля ввода в Формах #form1header #form2footer #form3.modal
    inputFields.forEach(elem => {

      elem.addEventListener('input', (event) => {
        const target = event.target;
        let value = target.value;

        if (elem.name === 'user_name' || elem.name === 'user_message') {
          // 3) В полях ввода "Ваше имя" и "Ваше сообщение" разрешить только ввод кириллицы в любом регистре, дефиса и пробела.
          // запрещаем ввод других символов кроме кириллицы  а-я ёЁ А-Я ' '  '-'
          target.value = target.value.replace(/[^а-яё\s\-]/ig, '');
          
        } else if (elem.name === 'user_email') {
          // 4) В поле "email"
          // разрешить только ввод латиницы в любом регистре и спецсимволы
          // Собака @  Дефис - Подчеркивание _ Точка. 
          // Восклицательный знак! Тильда~ Звездочка * 
          // Одинарная кавычка '
          // ? target.value = target.value.replace(/[^a-zA-Z@\-\_\.\!\~\*\']/ig, '');

          // ? <                                        (?<=^)@+   (?<=@.*)@+            
          const regexpEmail = /([^a-z@\_\-\.\!\~\*\'])|((?<=^)@+)|((?<=@.*)@+)/ig;
          target.value = value.replace(regexpEmail, '');

          // target.value = value.replace(/([^a-zA-Z@\-\_\.\!\~\*\'])|((?<=@.*)@+)/ig, '');
          
        } else if (elem.name === 'user_phone') {
          // 5) В поле "Номер телефона" разрешить только ввод цифр,  ( ) - круглых скобок и дефис
          // target.value = target.value.replace(/([^\d\(\)\-\+])/ig, '');

          // ?                                     ((?<=.{35,}).)  (?<!^)\++  ((?<=^)\-)  (?<=[\+\-])\-+   (?<=\([\d\-\)\(]*)\(+  ((?<=\()\)+)  (?<=\)[\d\-\)\(]*)\)+   (?<=\-)\-+      
          const regexpTelNumber = /([^\d\(\)\-\+])|((?<=.{35,}).)|((?<!^)\++)|((?<=^)\-)|((?<=[\+\-])\-+)|((?<=\([\d\-\)\(]*)\(+)|((?<=\()\)+)|((?<=\)[\d\-\)\(]*)\)+)|((?<=\-)\-+)/ig;
          target.value = value.replace(regexpTelNumber, '');

          // ? target.value = target.value.replace(/([^\d\(\)\-\+])|((?<!^)\++)|((?<=[\+\-])\-+)|((?<=\)[\d\-\)\(]*)\)+)|((?<=\([\d\-\)\(]*)\(+)|((?<=\-)\-+)/ig, '');
        }
      }); // ? forEach input Listener


      // * событие потеря фокуса
      elem.addEventListener('blur', (event) => {
        const target = event.target;

        console.log('blur at:', target);
        //todo blur
        validateElemOnBlur(target);
        
      }); // ? forEach input Listener
      
      
    });
  };
  inputValidation();





}); // * DOMContentLoaded *


