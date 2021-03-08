// запуск после загрузки страници тоже что и defer
window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  console.log('hello\nthis is 3dGLO');


  //! Timer ДЗ 18
  //* функция получает строку времени в формате mm/dd/yyyy
  //* анимирует таймер сколько времени осталось до этой даты
  const countTimer = (deadline) => {
    //получаем элементы один раз
    let timerHours = document.querySelector('#timer-hours');
    let timerMinuts = document.querySelector('#timer-minutes');
    let timerSeconds = document.querySelector('#timer-seconds');
    let interval = null;
    // сюда всё что вычисляется по времени
    const getTimeRemaining = () => {
      let dateStop = new Date(deadline).getTime(); //будущ дата
      let dateNow = new Date().getTime(); //текущ дата
      let timeRemaining = (dateStop - dateNow) / 1000; //ms/1000 = sec

      let seconds = Math.floor(timeRemaining % 60); // sec
      let minutes = Math.floor((timeRemaining / 60) % 60); //min
      // let hours = Math.floor((timeRemaining / 60 / 60) % 24); //????? hours
      let hours = Math.floor(timeRemaining / 60 / 60); // hours

      return {
        timeRemaining,
        hours,
        minutes,
        seconds
      };
    };

    //колличество обновлений таймера
    let checktimerclock = 0;

    const updateClock = () => {
      let timer = getTimeRemaining();
      // console.log('timer: ', timer);

      //* addZero (numb) when 0 <= 9
      if (timer.timeRemaining > 0) {

        timerHours.textContent = (timer.hours < 10 ? '0' : '') + timer.hours;
        timerMinuts.textContent = (timer.minutes < 10 ? '0' : '') + timer.minutes;
        timerSeconds.textContent = (timer.seconds < 10 ? '0' : '') + timer.seconds;

      } else {

        // * если дата уже прошла то обратный таймер отображает по нулям
        timerHours.textContent = '00';
        timerMinuts.textContent = '00';
        timerSeconds.textContent = '00';
        clearInterval(interval);
      }

      console.log('checktimerclock: ', checktimerclock++);
    };


    // * запускаем 1й раз, без задержки
    updateClock();
    // * запускаем через setInterval() будет срабатывать через каждую 1с по сути тот же setTimeout() с рекурсией 
    interval = setInterval(updateClock, 1000);
  };
  //тест таймера
  countTimer('9 13 2021');
  // countTimer('3 8 2021 17:52:00'); // TODO TEST

});