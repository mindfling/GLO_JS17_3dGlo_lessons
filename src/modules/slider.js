// Слайдер с точечками
const slider = () => {
  //функция генерирует точки dots на слайде
  // todo !!! функция генерирует точки dots на слайде
  const addSliderDots = () => {
    const portfolioDotsParent = document.querySelector('.portfolio-dots');
    const slide = document.querySelectorAll('.portfolio-item');

    slide.forEach((item, index) => {
      const li = document.createElement('li');
      li.classList.add('dot');
      if (index === 0) {
        li.classList.add('dot-active'); //* активный 1й dot
      }
      portfolioDotsParent.append(li);
    });
  };
  addSliderDots();

  const slide = document.querySelectorAll('.portfolio-item'),
    dot = document.querySelectorAll('.dot'),
    slider = document.querySelector('.portfolio-content');

  let currentSlide = 0;
  let interval;

  // скрывает текущий слайд
  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass); // меняем слайды через css
  };
  // показывает следующий слайд
  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass); // меняем слайды через css
  };

  //! основная функция смены слайдов autoPlay
  const autoPlaySlide = () => {
    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');
    currentSlide++;
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');
  };

  // старт слайдов autoPlay с задержкой time
  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };
  // остановить слайды (например при наведении на точки)
  const stopSlide = () => {
    clearInterval(interval);
  };

  //! делегируем autoPlay по клику
  slider.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;
    if (!target.matches('.portfolio-btn, .dot')) {
      //* отбрасываем все остальные клики кроме как по точкам и кнопкам
      return;
    }

    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');
    //! обрабатываем клик по элементам управления
    if (target.matches('#arrow-right')) {
      currentSlide++;
    } else if (target.matches('#arrow-left')) {
      currentSlide--;
    } else if (target.matches('.dot')) {
      dot.forEach((elem, index) => {
        if (elem === target) {
          currentSlide = index;
        }
      });
    }
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    if (currentSlide < 0) {
      currentSlide = slide.length - 1;
    }
    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');
  });

  slider.addEventListener('mouseover', (event) => {
    //? not mouseenter
    if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
      stopSlide();
    }
  });

  slider.addEventListener('mouseout', (event) => {
    //? not mouseleave
    if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
      startSlide(2000);
    }
  });

  startSlide(2000);
};


export default slider;
