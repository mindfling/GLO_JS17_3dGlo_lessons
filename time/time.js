'use strict';
/**
 * Lesson18 part2
 * time
 */

const result = document.querySelector('.result');


const time = new Date();

const year = time.getFullYear();
const month = time.getMonth() + 1; // 0 - January; ...
const date = time.getDate();
const weekDay = time.getDay(); // 0 - Sunday; 1 - Monday; ...

const hour = time.getHours();
const minutes = time.getMinutes();
const seconds = time.getSeconds();


// * функция добавляет 0 к числу меньше 10
const addZero = (numb) => {
  return numb >= 0 && numb < 10 ? '0' + numb : numb;
};


// * принимает время new Date
// * возвращает время в формате hh:mm:ss 24h
const get24Time = (time) => {
  let hour = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  return `${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)}`;
};


// * принимает время new Date
// * возвращает время в формате h:mm:ss 12h am/pm
const get12Time = (time) => {
  //фунция возвращает время в 12 часовом am/pm формате
  let hour = time.getHours();
  let meredian = hour < 12 ? 'AM' : 'PM';
  hour %= 12;
  hour = (hour === 0) ? 12 : hour;
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  return `${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)} ${meredian}`;
};
// console.log(get12Time(new Date('11/12/2021 12:24:00')));


const week = [ 'Воскресенье', 'Понедельник', 'Вторник', 'Середа', 'Четвер', 'Пятница', 'Суббота' ];

let weekDayToDay = week[weekDay];

console.log(`Дата:
${year}.${addZero(month)}.${addZero(date)}
Время:
${get24Time(time)}
${get12Time(time)}
`);


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

//* Добрый день (утро, вечер, ночь в зависимости от времени суток)
//* Сегодня: Понедельник
//* Текущее время:12:05:15 PM
//* До нового года осталось 175 дней

// let str = `${hello(hour)} (день, утро, вечер, ночь в зависимости от времени суток) <br>
// Сегодня: ${weekDayToDay} <br>
// Текущее время: ${get12Time(time)} <br>
// До дня компьютерщика осталось ${daysLeft('02/14/2021')} дней <br>
// До дня фрилансера осталось ${daysLeft('05/14/2021')} дней <br>
// До дня программиста осталось ${daysLeft('09/13/2021')} дней <br>
// `;

const str = `<pre>
${hello(hour)}, в зависимости от времени суток
Сегодня: ${weekDayToDay} <br>
Текущее время: ${get12Time(time)} <br>
До дня Компьютерщика осталось ${daysLeft('02/14/2021')} дней
До дня Фрилансера осталось ${daysLeft('05/14/2021')} дней
До дня Программиста осталось ${daysLeft('09/13/2021')} дней
</pre>
`;

console.log(str);
result.innerHTML = str;

