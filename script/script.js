window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    console.log('hello');

    //Timer
    function countTimer (deadline) {
        let timerHours = document.querySelector('#timer-hours');
        let timerMinuts = document.querySelector('#timer-minutes');
                 
        let timerSeconds = document.querySelector('#timer-seconds');
                 
        console.log('dead time', (new Date(deadline)));

        let dateStop = new Date(deadline).getTime(); //будущ дата
        let dateNow = new Date().getTime(); //текущ дата
        let timeRemaining = (dateStop - dateNow) / 1000; //ms/1000 = sec
        
        let seconds = Math.floor(timeRemaining % 60); // sec
        console.log('seconds: ', seconds);
        let minutes = Math.floor((timeRemaining / 60) % 60); //min
        console.log('minutes: ', minutes);
        let hours = Math.floor((timeRemaining / 60 / 60) % 24); // hours
        console.log('hours: ', hours);

        let days = Math.floor((timeRemaining / 3600 / 24));
        console.log('days: ', days);

        console.log('dateStop: ', dateStop);
        console.log('dateNow: ', dateNow);
        console.log('timeRemaining: ', timeRemaining);

        
        timerHours.textContent = hours;
        timerMinuts.textContent = minutes;
        timerSeconds.textContent = seconds;


    };

    const foo = function () {
        countTimer('1:35:00 03/08/2021');
    };


    setInterval(() => {
        foo();
    }, 1000); // 1 sec

});
