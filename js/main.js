// top
document.addEventListener('DOMContentLoaded', function(){
    mySwiper = new Swiper ('.top-slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
            nextEl: '.top-slider-button-next',
            prevEl: '.top-slider-button-prev',
        },
        pagination: {
            el: '.top-slider-pagination',
            clickable: true,
        },
        on: {
        slideChange: function () {
          const targetBlock = document.querySelector('.header');
          const activeSlide = this.slides[this.activeIndex]; // Активный слайд

          // Удаляем все классы для чистоты
          targetBlock.classList.remove('header--dark');

          // Добавляем новый класс в зависимости от класса активного слайда
          if (activeSlide.classList.contains('swiper-slide--dark')) {
            targetBlock.classList.add('header--dark');
          }
        },
        afterInit: function () {
            // Первоначальная установка класса при инициализации Swiper
            const targetBlock = document.querySelector('.header');
            const activeSlide = this.slides[this.activeIndex];
            if (activeSlide.classList.contains('swiper-slide--dark')) {
                targetBlock.classList.add('header--dark');
            }
            // Другие условия, если есть
        }
      }
    });

    // ваши настройки Swiper

})

// categosies
document.addEventListener("DOMContentLoaded", function(event) {
    const breakpoint = window.matchMedia( '(min-width: 993px)' );

    let mySwiper;

    const breakpointChecker = function() {
        if ( breakpoint.matches === true ) {
            if ( mySwiper !== undefined ) mySwiper.destroy( true, true );
            return;
        } else if ( breakpoint.matches === false ) {
            return enableSwiper();
        }
    };

    const enableSwiper = function() {
        mySwiper = new Swiper ('.categories-slider', {
            spaceBetween: 20,
            slidesPerView: 'auto',
        });
    };

    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
});

// news-items
document.addEventListener("DOMContentLoaded", function(event) {

    sliders = document.querySelectorAll('.catalog-slider')
    prevArrow = document.querySelectorAll('.catalog-slider-prev')
    nextArrow = document.querySelectorAll('.catalog-slider-next')
    pagination = document.querySelectorAll('.catalog-slider-pagination')

    sliders.forEach((slider, idx) => {
        let swiper = new Swiper(slider, {
            slidesPerView: 'auto',
            spaceBetween: 20,
            navigation: {
                nextEl: nextArrow[idx],
                prevEl: prevArrow[idx],
            },
            pagination: {
                el: pagination[idx],
                type: "fraction",
            },
        })
    })

});

// счетчик товаров в корзине
document.addEventListener("DOMContentLoaded", function(event) {
    let minBtn = document.querySelectorAll('.quantity-wrapper button.btn-minus')
        plusBtn = document.querySelectorAll('.quantity-wrapper button.btn-plus')
        input = document.querySelectorAll('.quantity-wrapper input')

    minBtn.forEach(element => {
        element.addEventListener('click', () => {
            if (parseInt(element.nextElementSibling.value) > 1) {
                element.nextElementSibling.value = parseInt(element.nextElementSibling.value) - 1;
            }
        })
    });

    plusBtn.forEach(element => {
        element.addEventListener('click', () => {
            element.previousElementSibling.value = parseInt(element.previousElementSibling.value) + 1;
        })
    });
})

// header
document.addEventListener("DOMContentLoaded", function(event) {
    let header = document.querySelector('.header')
        burger = document.querySelector('.burger')
        body = document.querySelector('body')
        menu = document.querySelector('.mobile-menu')

    burger.addEventListener('click', () => {
        window.scrollTo(0, 0);
        header.classList.toggle('menu-open')
        body.classList.toggle('freeze')
    })
})

// order-map
document.addEventListener("DOMContentLoaded", function(event) {
    ymaps.ready(init);

    function init(){
        var myMap = new ymaps.Map("map", {
            center: [59.122654, 37.909821],
            zoom: 14,
            controls: ['zoomControl']
        }),
            placemark = new ymaps.Placemark([59.122654, 37.909821], {
            hintContent: '',
            balloonContent: ''
        });

        myMap.geoObjects
            .add(placemark)

        myMap.behaviors
            .disable('scrollZoom');
    }

});

document.addEventListener("DOMContentLoaded", function(event) {
    let filterItemOpenBtn = document.querySelectorAll('.catalog .filter-wrapper .col .akk-top')
        filtertemBottom = document.querySelectorAll('.catalog .filter-wrapper .col .akk-bottom')

    filterItemOpenBtn.forEach(filterItemOpenBtns => {
        filterItemOpenBtns.addEventListener('click', () => {

            if (!filterItemOpenBtns.classList.contains('active')) {
                filterItemOpenBtn.forEach(el => {
                    el.classList.remove('active')
                    el.nextElementSibling.classList.remove('active')
                })

                filterItemOpenBtns.classList.add('active')
                filterItemOpenBtns.nextElementSibling.classList.add('active')
            } else {
                filterItemOpenBtn.forEach(el => {
                    el.classList.remove('active')
                    el.nextElementSibling.classList.remove('active')
                })

                filterItemOpenBtns.classList.remove('active')
                filterItemOpenBtns.nextElementSibling.classList.remove('active')
            }

        })
    });

})

document.addEventListener("DOMContentLoaded", function(event) {
    let filterBtn = document.querySelector('.catalog .filter-btn')
        filterWrapper = document.querySelector('.catalog .filter-wrapper')
        closeBtn = document.querySelector('.catalog .filter-wrapper .close-btn')
        body = document.querySelector('body')

    filterBtn.addEventListener('click', () => {
        filterWrapper.classList.add('active')
        body.classList.add('freeze')
    })

    closeBtn.addEventListener('click', () => {
        filterWrapper.classList.remove('active')
        body.classList.remove('freeze')
    })
})

// item
document.addEventListener("DOMContentLoaded", function(event) {
    let filterItemOpenBtn = document.querySelectorAll('.item .item-top .info-wrapper .row .akk-top')
        filtertemBottom = document.querySelectorAll('.item .item-top .info-wrapper .row .akk-bottom')

    filterItemOpenBtn.forEach(filterItemOpenBtns => {
        filterItemOpenBtns.addEventListener('click', () => {

            if (!filterItemOpenBtns.classList.contains('active')) {
                filterItemOpenBtn.forEach(el => {
                    el.classList.remove('active')
                    el.nextElementSibling.classList.remove('active')
                })

                filterItemOpenBtns.classList.add('active')
                filterItemOpenBtns.nextElementSibling.classList.add('active')
            } else {
                filterItemOpenBtn.forEach(el => {
                    el.classList.remove('active')
                    el.nextElementSibling.classList.remove('active')
                })

                filterItemOpenBtns.classList.remove('active')
                filterItemOpenBtns.nextElementSibling.classList.remove('active')
            }

        })
    });

})

document.addEventListener("DOMContentLoaded", function(event) {
    var swiper = new Swiper(".slider1", {
        spaceBetween: 10,
        slidesPerView: 'auto',
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
            1200: {
                direction: "vertical",
            },
        }
    });
    var swiper2 = new Swiper(".slider2", {
        slidesPerView: 1,
        effect: "fade",
        thumbs: {
            swiper: swiper,
        },
    });
})