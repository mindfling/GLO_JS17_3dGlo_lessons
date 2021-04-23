export default class Carousel {
  constructor({
    main,
    wrap,
    next,
    prev,
    position = 0, // текущая позиция слайда
    slidesToShow = 3, // слайдов на один показ
    infinity = true,
  }) {
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.slides = document.querySelector(wrap).children;
    this.slidesToShow = slidesToShow; //количество слайдов за один показ
    this.options = {
      ////todo
      position, // текущая позиция слайдов
      infinity: infinity,
      widthSlide: Math.floor(100 / this.slidesToShow), // в %
    };
    // this.position = position;
    // console.log('this.main: ', this.main);
    // console.log('this.wrap: ', this.wrap);
    // console.log(next);
    // console.log(prev);
    // console.log('this.slides: ', this.slides);
  }

  init() {
    this.addGloClass();
    this.addStyle();

    if (this.prev && this.next) {
      this.controlSlider();
    } else {
      this.addArrow();
      this.controlSlider();
    }
  }

  addGloClass() {
    // добавляем дополнительные свои стили от GLO
    this.main.classList.add('glo-slider');
    this.wrap.classList.add('glo-slider__wrap');
    for (const item of this.slides) {
      item.classList.add('glo-slider__item');
    }
  }

  addStyle() {
    const style = document.createElement('style');
    style.id = 'sliderCarousel-style';
    style.textContent = `
.glo-slider {
    overflow: hidden !important;
}
.glo-slider__wrap {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    transition: transform 0.5s !important;
    will-change: transition !important;
}
.glo-slider__item {
    flex: 0 0 ${this.options.widthSlide}% !important;
    margin: auto 0 !important;
}
.glo-slider__prev,
.glo-slider__next {
    margin: 0 12px;
    border: 12px solid transparent;
    background: transparent;
}
.glo-slider__next {
    border-left-color: #19b5fe;
}
.glo-slider__prev {
    border-right-color: #19b5fe;
}

.glo-slider__next:hover,
.glo-slider__prev:hover,
.glo-slider__next:focus,
.glo-slider__prev:focus {
    background: transparent;
    outline: transparent;
}
`;
    document.head.appendChild(style);
  }

  controlSlider() {
    //возможна потеря контекста нужен bind
    this.prev.addEventListener('click', this.prevSlider.bind(this));
    this.next.addEventListener('click', this.nextSlider.bind(this));
  }


  prevSlider() {
    if (this.options.infinity || this.options.position > 0) {
      --this.options.position;
      if (this.options.position < 0) {
        this.options.position = this.slides.length - this.slidesToShow;
        console.warn('вернулись в конец');
      }
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }
  }


  nextSlider() {
    if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
      ++this.options.position;
      if (this.options.position > this.slides.length - this.slidesToShow) {
        this.options.position = 0;
        console.warn('вернулись');
      }
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }
  }

  addArrow() { //добавляем свои кнопки управления слайдером если из нет в верстке //todo

    this.prev = document.createElement('button');
    this.next = document.createElement('button');

    this.prev.className = 'glo-slider__prev';
    this.next.className = 'glo-slider__next';


  }
}
