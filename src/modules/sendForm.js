// Переписать скрипт для отправки данных с формы, используя Fetch
const sendForm = (formId) => {
  // * receive formId // string form id

  // вот такие сообщения
  const errorMessage = 'Что-то пошло не так . . .';
  const loadMessage = 'Загрузка из сервера . . .';
  const successMessage = 'Спасибо! Данные получены! Мы скоро с Вами свяжемся!';

  // находим форму по строке id
  const form = document.getElementById(formId);
  console.log('Подключено form: ', form);

  // создаем элемент ответа пользователя
  const statusMessage = document.createElement('div');
  statusMessage.textContent = loadMessage;
  statusMessage.style.cssText = 'font-size:1.8rem;color:white;padding:5px 0';

  const clearForm = () => {
    form.querySelectorAll('input').forEach((item) => {
      item.value = '';
    });

    // очищаем сообщение о внизу через некоторое время // ???
    setTimeout(() => {
      statusMessage.remove();
    }, 7500);
  };

  // * эта функция выполняет действие: отправляет и получает запросы сервера
  // const postData = (body, outputData, errorData) => {
  const postData = (body) => {
    // * отправляем fetch запрос
    return fetch('server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }); //fetch запрос
  }; // postData

  //вешаем слушатель на всю форму
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.appendChild(statusMessage); // добавить ответ Загрузка... на страницу
    statusMessage.textContent = loadMessage; // меняем текст статуса

    const formData = new FormData(form);

    let body = {};
    // перебираем значения полей формы
    formData.forEach((val, key) => {
      body[key] = val;
    });

    // * работаем с запросом к серверу здесь
    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          // отбрасываем ошибку не 200
          throw new Error('Response status code is not a 200');
        }
        statusMessage.textContent = successMessage;
        console.log('Server Succses');
      })
      .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.error('Server Error:', error);
      });

    clearForm(); // очищаем данные полей текущей формы
  }); // * submit form
}; // * sendForm


export default sendForm;
