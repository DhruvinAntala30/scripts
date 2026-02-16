/* 
Slick CSS  - Add this in head tag
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>

Slick JS  - Add this before body tag
<script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
*/

// Normal Slider
$(document).ready(function () {

  $('[data-slick="slider"]').each(function () {

    const $slider = $(this);
    const $list = $slider.find('[data-slick="list"]');

    $list.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
     
      swipe: true,
  		swipeToSlide: true, // 👈 drag moves freely
  		draggable: true,
  		touchThreshold: 10,
      responsive: [
        {
          breakpoint: 991, // tablet
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 767, // mobile
          settings: {
            slidesToShow: 1
          }
        }
      ],
      

      arrows: true,
      dots: false, // True if you want pagination dots
      pauseOnHover: false,
      pauseOnFocus: false,

      appendDots: $slider.find('[data-slick="dots"]'),
      prevArrow: $slider.find('[data-slick="prev"]'),
      nextArrow: $slider.find('[data-slick="next"]'),
    });

  });

});


// progress slider
$(document).ready(function () {

  $('[data-slick="slider2"]').each(function () {

    const $wrap = $(this);
    const $slider = $wrap.find('[data-slick="list"]');
    const $pagination = $wrap.find('[data-slick="pagination"]');

    const duration = 4000; // must match CSS animation duration
    let autoplayTimer;

    /* -------------------------------
       BUILD PAGINATION FROM CMS
    -------------------------------- */
    const slideCount = $slider.find('[data-slick="slide"]').length;

    for (let i = 0; i < slideCount; i++) {
      $pagination.append(`
        <div data-slick="page" data-slide="${i}">
          <div data-slick="progress-bar"></div>
        </div>
      `);
    }

    const $pages = $pagination.find('[data-slick="page"]');

    /* -------------------------------
       PROGRESS CONTROL (CSS-DRIVEN)
    -------------------------------- */
    function resetProgress() {
      $pages.removeClass('is-active');
    }

    function activateProgress(index) {
      resetProgress();
      $pages.eq(index).addClass('is-active');
    }

    /* -------------------------------
       MANUAL AUTOPLAY
    -------------------------------- */
    function startAutoplay() {
      clearTimeout(autoplayTimer);
      autoplayTimer = setTimeout(function () {
        $slider.slick('slickNext');
      }, duration);
    }

    /* -------------------------------
       INIT SLICK (NO AUTOPLAY)
    -------------------------------- */
    $slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      infinite: true,
      autoplay: false,
      fade: true,
      speed: 800,
      prevArrow: $wrap.find('[data-slick="prev"]'),
      nextArrow: $wrap.find('[data-slick="next"]')
    });

    /* -------------------------------
       INITIAL STATE
    -------------------------------- */
    activateProgress(0);
    startAutoplay();

    /* -------------------------------
       ON SLIDE CHANGE
    -------------------------------- */
    $slider.on('beforeChange', function (e, slick, current, next) {
      activateProgress(next);
      startAutoplay();
    });

    /* -------------------------------
       PAGINATION CLICK
    -------------------------------- */
    $pages.on('click', function () {
      const index = $(this).data('slide');
      $slider.slick('slickGoTo', index);
      startAutoplay();
    });

  });

});

