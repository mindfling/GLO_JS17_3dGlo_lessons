window.addEventListener ('DOMContentLoaded', function () {
  'use strict';
  console.log ('hello');

  //Timer
  function countTimer (deadline) {
    //получаем элементы один раз
    let timerHours = document.querySelector ('#timer-hours'),
      timerMinuts = document.querySelector ('#timer-minutes'),
      timerSeconds = document.querySelector ('#timer-seconds');

    // сюда всё что вычисляется
    function getTimeRemaining () {
      let dateStop = new Date (deadline).getTime (); //будущ дата
      let dateNow = new Date ().getTime (); //текущ дата
      let timeRemaining = (dateStop - dateNow) / 1000; //ms/1000 = sec

      let seconds = Math.floor (timeRemaining % 60); // sec
      let minutes = Math.floor (timeRemaining / 60 % 60); //min
      let hours = Math.floor (timeRemaining / 60 / 60 % 24); // hours

      return {timeRemaining, hours, minutes, seconds};
    }

    // console.log('seconds: ', seconds);
    // console.log('minutes: ', minutes);
    // console.log('hours: ', hours);
    // console.log('days: ', days);
    // console.log('timeRemaining: ', timeRemaining);

    function updateClock () {
      let timer = getTimeRemaining ();
      console.log ('timer: ', timer);

      timerHours.textContent = timer.hours;
      timerMinuts.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;

      if (timer.timeRemaining > 0) {
        // * рекурсивно вызываем через 1с
        setTimeout (updateClock, 1000);
      }
    }
    // * запускаем ОДИН рза
    // todo переделать через setInterval()
    updateClock ();
  }

  //тест таймера
  countTimer ('04/01/2021');
});
