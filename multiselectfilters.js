// Filter Category (MULTI SELECT) Compitable with pagination / Search
$(document).ready(function () {

  const wrapper = $('[data-load="wrapper"]');
  const filterBtns = wrapper.find('[data-filter="category"]');
  const items = wrapper.find('[data-load="item"]');
  const emptyState = wrapper.find('[data-pagination="empty"]');
  const paginationUI = wrapper.find('[data-pagination="page"]');

  emptyState.hide();

  // Default active
  filterBtns.removeClass('active');
  filterBtns.filter('[data-value="all"]').addClass('active');

  function checkEmptyState() {
    const visibleItems = items.filter(':visible');

    if (visibleItems.length === 0) {
      emptyState.fadeIn(200);
      paginationUI.hide();
      return false;
    }

    emptyState.hide();
    paginationUI.show();
    return true;
  }

  function showItem(item) {
    item.stop(true, true).fadeIn(250);
  }

  function hideItem(item) {
    item.hide();
  }

  // Filter click
  filterBtns.on('click', function (e) {
    e.preventDefault();

    const btn = $(this);
    const value = btn.data('value');


    // ALL BUTTON (RESET)
    if (value === 'all') {
      filterBtns.removeClass('active');
      btn.addClass('active');

      // 🔹 Clear search input ONLY when clicking "all"
      const searchInput = wrapper.find('[data-filter="search"]');
      if (searchInput.length) {
        searchInput.val('').trigger('input');
      }

      items.each(function () {
        showItem($(this));
      });

      emptyState.hide();
      paginationUI.show();
      wrapper.trigger('pagination:update', [items]);
      return;
    }


    // MULTI SELECT
    btn.toggleClass('active');
    filterBtns.filter('[data-value="all"]').removeClass('active');

    // Get active values EXCEPT "all"
    const activeValues = filterBtns
      .filter('.active')
      .not('[data-value="all"]')
      .map(function () {
        return $(this).data('value');
      })
      .get();

    // If nothing selected → fallback to ALL
    if (activeValues.length === 0) {
      filterBtns.filter('[data-value="all"]').addClass('active');

      const searchInput = wrapper.find('[data-filter="search"]');
      if (searchInput.length) {
        searchInput.val('').trigger('input');
      }

      items.each(function () {
        showItem($(this));
      });

      emptyState.hide();
      paginationUI.show();
      wrapper.trigger('pagination:update', [items]);
      return;
    }


    // FILTER ITEMS 
    items.each(function () {
      const item = $(this);
      let matched = false;

      item.find('[data-category="category-item"]').each(function () {
        if (activeValues.includes($(this).text().trim())) {
          matched = true;
        }
      });

      matched ? showItem(item) : hideItem(item);
    });

    // Sync search
    const searchInput = wrapper.find('[data-filter="search"]');
    if (searchInput.length && searchInput.val().trim() !== '') {
      searchInput.trigger('input');
      return;
    }

    const hasItems = checkEmptyState();

    if (hasItems) {
      wrapper.trigger('pagination:update', [items.filter(':visible')]);
    } else {
      wrapper.trigger('pagination:update', [$()]);
    }
  });

});
