// Compitable with pagination just place this after pagination script

$(document).ready(function () {

  $('[data-load="wrapper"]').each(function () {

    const wrapper = $(this);
    const items = wrapper.find('[data-load="item"]');
    const btns = wrapper.find('[data-event="upcoming-event"], [data-event="past-event"]');
    const today = new Date();
    today.setHours(0,0,0,0);

    function run(type) {
      items.each(function () {
        const d = new Date(
          $(this).find('[data-event="event-date"]').text().trim()
        );

        ((type === 'upcoming' && d >= today) || (type === 'past' && d < today))
          ? $(this).show()
          : $(this).hide();
      });

      wrapper.trigger(
        'pagination:update',
        [items.filter(':visible')]
      );
    }

    btns.on('click', function (e) {
      e.preventDefault();
      btns.removeClass('active');
      $(this).addClass('active');
      run($(this).data('event') === 'past-event' ? 'past' : 'upcoming');
    });

    btns.filter('[data-event="upcoming-event"]').addClass('active');
    run('upcoming');

  });

});

