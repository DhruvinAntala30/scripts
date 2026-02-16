// Close navbar on scroll

$(document).ready(function () {

  const $navButton = $('.w-nav-button');
  const $navMenu   = $('.w-nav-menu');

  if (!$navButton.length || !$navMenu.length) return;

  let locked = false;

  function isMenuOpen() {
    return $navButton.hasClass('w--open');
  }

  function closeOnScroll() {

    if (!isMenuOpen() || locked) return;

    locked = true;

    $navButton.trigger('click');

    const checkClosed = setInterval(() => {

      if (!isMenuOpen()) {
        locked = false;
        clearInterval(checkClosed);
      }

    }, 50);
  }

  $(window).on('scroll', closeOnScroll);

});
