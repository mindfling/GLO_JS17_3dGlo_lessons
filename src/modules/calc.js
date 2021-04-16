// Калькулятор стоимости по ВидеоУроку
const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block');

  const calcType = calcBlock.querySelector('.calc-type');
  const calcSquare = calcBlock.querySelector('.calc-square');
  const calcCount = calcBlock.querySelector('.calc-count');
  const calcDay = calcBlock.querySelector('.calc-day');

  const totalValue = document.getElementById('total'); //span with result

  const countSum = () => {
    // * функция расчёта суммы по полям
    // ? let typeValue = calcType.value;  // НО ТАК БЫЛО БЫ ПРОЩЕ ??
    let typeValue = calcType.options[calcType.selectedIndex].value;

    let squareValue = +calcSquare.value;
    let countValue = 1;
    let dayValue = 1;
    let total = 0;

    if (calcCount.value && calcCount.value > 1) {
      countValue += (+calcCount.value - 1) / 10;
    } else {
      countValue = 1;
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value < 10) {
      dayValue *= 1.5;
    }

    if (typeValue && squareValue) {
      // ? parseInt чтобы избежать таких ситуаций 234.0000000006
      total = parseInt(price * typeValue * squareValue * countValue * dayValue * 100) / 100;
    }

    totalValue.textContent = total; // * результат
  };

  // * событие изменения значения поля
  calcBlock.addEventListener('change', (event) => {
    let target = event.target;

    if (target === calcType || target === calcSquare || target === calcCount || target === calcDay) {
      countSum();
    }
  });
};
