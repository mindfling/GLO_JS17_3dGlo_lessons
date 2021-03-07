// запуск после загрузки страници тоже что и defer
window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  console.log('hello\nthis is 3dGLO');


  //! Timer ДЗ 18
  //* функция получает строку времени в формате mm/dd/yyyy
  //* анимирует таймер сколько времени осталось до этой даты
  const countTimer = deadline => {
    //получаем элементы один раз поля таймера
    let timerHours = document.querySelector('#timer-hours'),
      timerMinuts = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    //! сюда всё что вычисляется
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

      if (timer.timeRemaining > 0) {
        timerHours.textContent = timer.hours;
        timerMinuts.textContent = (timer.minutes < 10 ? '0' : '') + timer.minutes;
        timerSeconds.textContent = (timer.seconds < 10 ? '0' : '') + timer.seconds;
      } else {
        // * напоминалка если дата уже прошла то обратный таймер уже по нулям
        timerHours.textContent = '00';
        timerMinuts.textContent = '00';
        timerSeconds.textContent = '00';
      }
    };

    // * запускаем ОДИН раз, один раз планируем вызов
    // * переделываем через setInterval() по сути тот же setTimeout() с рекурсией
    setInterval(updateClock, 1000); // 1 sec
  };

  //тест таймера сколько часов остается до дня программиста
  countTimer('9 13 2021');
});
