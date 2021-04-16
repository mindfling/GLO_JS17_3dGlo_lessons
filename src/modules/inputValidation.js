// Валидация форм
const inputValidation = () => {
  const calcItems = document.querySelectorAll('.calc-item');
  const inputFields = document.querySelectorAll('input');

  // * форма калькулятора Рассчитать стоимость
  calcItems.forEach((item) => {
    // В калькуляторе разрешить ввод только цифр:
    if (!item.classList.contains('calc-type')) {
      item.addEventListener('input', (event) => {
        let target = event.target;
        event.target.value = target.value.replace(/[^\d]/g, '');
      });
    }
  });

  const validateElemOnBlur = (elem) => {
    let value = elem.value;
    //* blur срабатывает при потере перефокуса с поля ввода
    // При потере фокуса(событие blur) реализовать проверку на корректность введённого значения в полях ввода
    // и замена его на корректное при необходимости по правилам:

    // Должны удаляться все символы, кроме допустимых
    // Несколько идущих подряд пробелов или дефисов должны заменяться на один //* [x]
    // Пробелы и дефисы в начале и конце значения должны удаляться //* [ ]
    // Для поля "Ваше имя" Первая буква каждого слова должна приводиться к верхнему регистру, а все остальные — к нижнему

    if (elem.name === 'user_message') {
      // ?                         (^[\s\-]+)   (?<=\s)\s+   (?<=\-)\-+  ([\s\-]+$)
      elem.value = value.replace(/((^[\s\-]+))|((?<=\s)\s+)|((?<=\-)\-+)|([\s\-]+$)/g, '');
    } else if (elem.name === 'user_name') {
      if (value.trim()) {
        // ? символы кириллицы тоже что и  /[а-яА-ЯёЁ]+/g
        let words = value.match(/[а-яё]+/gi);
        words = words.map((item) => item.substring(0, 1).toUpperCase() + item.substring(1).toLowerCase());
        value = words.join(' ');
      } else {
        // ? а что если в поле ввели пустую строку
        value = '';
      }
      elem.value = value;
    } else if (elem.name === 'user_email') {
      // удалить @@@@@  <>
      elem.value = value.replace(/(?<=@)@+/g, '');
    } else if (elem.name === 'user_phone') {
      //? + плюсик в номере телефона
      //?                     (?<=\()\(       (?<=\))\)       (?<=\-)\-
      elem.value = value.replace(/((?<=\()\({1,})|((?<=\))\){1,})|((?<=\-)\-{1,})|((?<=\+)\+{1,})/g, '');
    } else {
      //console.log('other input был ввод в другое поле');
    }
  };

  // * событие ввода в Формах #form1header #form2footer #form3.modal
  inputFields.forEach((elem) => {
    elem.addEventListener('input', (event) => {
      const target = event.target;
      let value = target.value;

      if (elem.name === 'user_name') {
        // * ДЗ 26 В поле "Ваше имя" разрешить ввод только кириллицы а-я ёЁ А-Я и пробелов
        target.value = target.value.replace(/[^а-яё\s]/gi, '');
      } else if (elem.name === 'user_message') {
        // * ДЗ 26 В поле В поле "Ваше сообщение" разрешить только кириллицу а-я ёЁ А-Я и пробелов пробелы, цифры 0-9 и знаки препинания , . ! ? : ; -
        target.value = target.value.replace(/[^а-яё0-9\s\,\.\!\?\:\;\-]/gi, '');
      } else if (elem.name === 'user_email') {
        // * В поле "email"
        // разрешить только ввод латиницы в любом регистре и спецсимволы
        // Собака @  Дефис - Подчеркивание _ Точка. Восклицательный знак! Тильда~ Звездочка * Одинарная кавычка '

        // ? <                                           (?<=^)@+   (?<=@.*)@+   (?<=[@\.])[@\.]+
        const regexpEmail = /([^a-z@0-9\_\-\.\!\~\*\'])|((?<=^)@+)|((?<=@.*)@+)|((?<=[@\.])[@\.]+)/gi;
        target.value = value.replace(regexpEmail, '');
      } else if (elem.name === 'user_phone') {
        // const regexpTelNumber = /([^\d\(\)\-\+])|((?<=.{20,}).)|((?<!^)\++)|((?<=^)\-)|((?<=[\+\-])\-+)|((?<=\([\d\-\)\(]*)\(+)|((?<=\()\)+)|((?<=\)[\d\-\)\(]*)\)+)|((?<=\-)\-+)/ig;

        // * ДЗ 26 в поля с номером телефона можно ввести только цифры и знак “+”
        const regexpTelNumber = /([^\d\+])|((?<=.{12,}).)|((?<!^)\++)/gi;
        target.value = value.replace(regexpTelNumber, '');
      }
    }); // ? forEach input Listener

    elem.addEventListener('blur', (event) => {
      // * событие потеря фокуса blur
      const target = event.target;
      validateElemOnBlur(target);
    }); // ? forEach input Listener
  });
};


export default inputValidation;
