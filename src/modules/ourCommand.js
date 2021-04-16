// наша КОММАНДА при наведении в Блоке на картинку Наша Команда меняется фото
const ourCommand = () => {
  const command = document.querySelector('.command');
  const commandPhotos = command.querySelectorAll('.command__photo');

  commandPhotos.forEach((photo) => {
    let src; // запомним начальный адрес картинки // * В ЗАМЫКАНИИ

    photo.addEventListener('mouseenter', (event) => {
      const target = event.target;
      if (target.matches('.command__photo')) {
        //? если совпал адресс фото
        src = photo.src;
        photo.src = photo.dataset.img; //* меняем адрес фото при наведении
      }
    });

    photo.addEventListener('mouseleave', (event) => {
      const target = event.target;
      if (target.matches('.command__photo')) {
        //? если совпал адресс фото
        if (src) {
          photo.src = src; //* возвращаем назад фоту
        }
      }
    });
  }); //forEach
};
