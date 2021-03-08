'use strict';
/**
 * Lesson18 part2
 * time
 */

// * функция добавляет 0 к числу меньше 10
const addZero = (numb) => {
  return numb >= 0 && numb < 10 ? '0' + numb : numb;
};

// * принимает время new Date
// * возвращает время в формате hh:mm:ss 24h
const get24Time = (time) => {
  const hour = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  return `${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)}`;
};

// * принимает время new Date
// * возвращает время в формате h:mm:ss 12h am/pm
const get12Time = (time) => {
  //фунция возвращает время в 12 часовом am/pm формате
  let hour = time.getHours();
  let meredian = hour < 12 ? 'AM' : 'PM';
  hour %= 12;
  hour = hour === 0 ? 12 : hour;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  return `${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)} ${meredian}`;
};

// * функция принимает дату Date() ожидаемого события
// * возвращает количество дней оставшихся до этой даты
const daysLeft = (date) => {
  let dateStop = new Date(date).getTime(); //будущая дата
  let dateNow = new Date().getTime(); //текущая дата
  let timeRemaining = (dateStop - dateNow) / 1000; //ms/1000 = sec // сразу переводим в секунды
  
  if (timeRemaining > 0) {
    let days = Math.floor(timeRemaining / 60 / 60 / 24); // days сколько дней осталось
    return days;
  } else {
    return 0;
  }
};


const result = document.querySelector('.result'); // в этот блок выводим результаты работы таймера

const countTimer = (deadline) => {
  const time = new Date();
  const weekDay = time.getDay(); // 0 - Sunday; 1 - Monday; ...
  const hour = time.getHours();
  const week = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Середа',
    'Четвер',
    'Пятница',
    'Суббота',
  ];
  const weekDayToDay = week[weekDay]; // выбор дня недели

  // * функция возвращает приветствие в зависимости от времени суток
  const hello = (hour) => {
    if (hour >= 0 && hour < 6) {
      return 'Доброй ночи';
    } else if (hour < 12) {
      return 'Доброе утро';
    } else if (hour < 18) {
      return 'Добрый день';
    } else if (hour < 24) {
      return 'Добрый вечер';
    } else {
      return 'Здравствуйте!!!';
    }
  };

  const getTimeRemaining = (deadline) => {
    const deadlineDate = new Date(deadline).getTime();
    const currentDate = new Date().getTime();
    const timeRemaining = (deadlineDate - currentDate) / 1000; //sec
    const days = Math.floor(timeRemaining / 60 / 60 / 24); //days
    return {timeRemaining, days};
  };

  const updateClock = () => {
    result.innerHTML = `<pre>
          ${hello(hour)}, в зависимости от времени суток
          Сегодня: ${weekDayToDay} <br>
          Текущее время: ${get12Time(new Date())} <br>
          До дня Программиста <b>13 сентября 2021</b> осталось ${daysLeft(deadline)} дней
          </pre>`;

    //* Добрый день (утро, вечер, ночь в зависимости от времени суток)
    //* Сегодня: Понедельник
    //* Текущее время:12:05:15 PM
    //* До нового года осталось 175 дней
  };

  updateClock();
  setInterval(updateClock, 1000);
};

// * День программиста 13 сентября 2021
countTimer('9 13 2021');
