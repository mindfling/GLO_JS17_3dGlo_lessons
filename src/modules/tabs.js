//Tabs
const tabs = () => {
  const tabHeader = document.querySelector('.service-header');
  const tab = tabHeader.querySelectorAll('.service-header-tab');
  const tabContent = document.querySelectorAll('.service-tab');

  // * функция выставляет видимым заданый таб
  const selectTab = (select) => {
    // * toggle tab content
    tab.forEach((item, i) => {
      if (i === select) {
        item.classList.add('active');
        tabContent[i].classList.remove('d-none');
      } else {
        item.classList.remove('active');
        tabContent[i].classList.add('d-none');
      }
    });
  };

  //? выставляем начальные классы у табов на всякий случай
  selectTab(0); //  Самый первый таб это = 0

  //* вешаем обработчик событий
  tabHeader.addEventListener('click', (event) => {
    let target = event.target.closest('.service-header-tab');
    // пробегаем по всем табам
    tab.forEach((item, i) => {
      //находим там совпадающий с кликнутым используем его номер
      if (item === target) {
        //устанавливаем видимым только этот таб
        selectTab(i);
      }
    });
  });
};


export default tabs;
