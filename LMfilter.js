$(document).ready(function () {

  $('[data-load="wrapper"]').each(function () {

    const wrapper = $(this);
    const items = wrapper.find('[data-load="item"]');
    const filterBtns = wrapper.find('[data-filter="category"]');
    const emptyState = wrapper.find('[data-pagination="empty"]');

    emptyState.hide();

    /* ===== Default Active ===== */
    filterBtns.removeClass('active');
    const defaultActive = filterBtns.filter('[data-active="active"]');

    if (defaultActive.length) {
      defaultActive.addClass('active');
    } else {
      filterBtns.filter('[data-value="all"]').addClass('active');
    }

    function checkEmptyState(visibleItems) {
      if (visibleItems.length === 0) {
        emptyState.fadeIn(200);
      } else {
        emptyState.hide();
      }
    }

    /* ===== Filter Click ===== */
    filterBtns.on('click', function (e) {
      e.preventDefault();

      const value = $(this).data('value');

      filterBtns.removeClass('active');
      $(this).addClass('active');

      let matchedItems;

      if (value === 'all') {
        matchedItems = items;
      } else {
        matchedItems = items.filter(function () {
          let matched = false;

          $(this).find('[data-category="category-item"]').each(function () {
            if ($(this).text().trim() === value) {
              matched = true;
            }
          });

          return matched;
        });
      }

      checkEmptyState(matchedItems);

      // 🔑 Tell Load More to reset with filtered items
      wrapper.trigger('loadmore:reset', [matchedItems]);
    });

  });

});