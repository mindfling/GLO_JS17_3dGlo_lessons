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

          document.addEventListener('keydown', escapeHandler); // добавим событие слушателя клавиатуры после popup
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