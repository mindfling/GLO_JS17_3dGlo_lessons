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

          return {
              timeRemaining,
              hours,
              minutes,
              seconds
          };
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
  