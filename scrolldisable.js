/*
Add this Attributes to your Html Structure

[scroll-disable="smart-nav"] - Add this to Menu button of Navbar

*/

// Navbar Scroll Lock
$(document).ready(function () {

  $('[scroll-disable="smart-nav"], .w-nav-overlay').on('click', function () {
    setTimeout(function () {

      if ($('[scroll-disable="smart-nav"]').hasClass('w--open')) {
        $('body').css({ overflow: 'hidden' });
      } else {
        $('body').css({ overflow: 'auto' });
      }

    }, 10);
  });

});


/*
Add this Attributes to your Html Structure

[scroll-disable="disable"] - Add this to button on which you want Scroll Enable
[scroll-disable="enable"] - Add this to button on which you want Scroll Disable

*/

// Scroll Disable
$(document).ready(function () {

  $('[scroll-disable]').on('click', function () {
    const action = $(this).attr('scroll-disable');

    if (action === 'enable') {
      $('body').css('overflow', 'hidden');
    }

    if (action === 'disable') {
      $('body').css('overflow', 'auto');
    }
  });

});

/*
Add this Attributes to your Html Structure

[scroll-disable] - Add this to button on which you want Scroll Disable on first click and enable again on second click


*/

$(document).ready(function () {

  let scrollLocked = false;

  $('[scroll-disable]').on('click', function () {

    scrollLocked = !scrollLocked;

    if (scrollLocked) {
      $('body').css('overflow', 'hidden');
    } else {
      $('body').css('overflow', 'auto');
    }

  });

});