// Main Menu
const toggleMenu = (event) => {
  const btnMenu = document.querySelector('.menu');
  const menu = document.querySelector('menu');

  // * простая анимация make it by css
  const handlerMenuCSS = () => {
    menu.classList.toggle('active-menu');
  };

  // * плавная анимация главного меню by js
  const handlerMenu = (event) => {
    // ?? варианты расчета процента сдвига анимации на выбор
    const animatePercent = (count) => {
      return -99 + 0.07 * count ** 2; //? //! еще вариант плавно назад и вперед
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
      // клик по кнопке BUTTON CLOSE закрыть и уехать
      handlerMenu();
    } else if (target.matches('a')) {
      // клик по ссылке просто закрыть меню
      handlerMenu();
    } else {
      // клик по остальному меню ничего не делать
      return;
    }
  });

  //? осталось без делегирования навешиваем КНОПКА МЕНЮ
  btnMenu.addEventListener('click', handlerMenu); //клик по кнопке .menu
};


export default toggleMenu;
