window.addEventListener('DOMContentLoaded', function () {
  'use strict';
  console.log('hello');

  //Timer
  function countTimer(deadline) {
    //получаем элементы один раз
    let timerHours = document.querySelector('#timer-hours'),
      timerMinuts = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    // сюда всё что вычисляется
    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(); //будущ дата
      let dateNow = new Date().getTime(); //текущ дата
      let timeRemaining = (dateStop - dateNow) / 1000; //ms/1000 = sec

      let seconds = Math.floor(timeRemaining % 60); // sec
      let minutes = Math.floor((timeRemaining / 60) % 60); //min
      let hours = Math.floor((timeRemaining / 60 / 60) % 24); // hours

      return {timeRemaining, hours, minutes, seconds};
    }

    //обновление таймера
    function updateClock() {
      let timer = getTimeRemaining();
      console.log('timer: ', timer);

      if (timer.timeRemaining > 0) {
        timerHours.textContent = timer.hours;
        timerMinuts.textContent = (timer.minutes < 10 ? '0' : '') + timer.minutes;
        timerSeconds.textContent = (timer.seconds < 10 ? '0' : '') + timer.seconds;
      } else {
        timerHours.textContent = 0;
        timerMinuts.textContent = 0;
        timerSeconds.textContent = 0;
      }
    }

    // * запускаем ОДИН раз, один раз планируем вызов
    // todo переделать через setInterval()
    setInterval(updateClock, 1000);
  }

  //тест таймера
  countTimer('04/01/2020');
});
