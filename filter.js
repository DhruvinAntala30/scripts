
// Filter Category  Compitable with pagination / Search
$(document).ready(function () {

  const wrapper = $('[data-load="wrapper"]');
  const filterBtns = wrapper.find('[data-filter="category"]');
  const items = wrapper.find('[data-load="item"]');
  const emptyState = wrapper.find('[data-pagination="empty"]');
  const paginationUI = wrapper.find('[data-pagination="page"]');

  emptyState.hide();

  // Default active filter (data-active="active")
  filterBtns.removeClass('active');

  const defaultActive = filterBtns.filter('[data-active="active"]').first();

  if (defaultActive.length) {
    defaultActive.addClass('active');
  } else {
    // fallback (optional safety)
    filterBtns.filter('[data-value="all"]').addClass('active');
  }


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

    const value = $(this).data('value');

    // Active toggle
    filterBtns.removeClass('active');
    $(this).addClass('active');

    // Show all
    if (value === 'all') {

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

    // Filter items
    items.each(function () {
      const item = $(this);
      let matched = false;

      item.find('[data-category="category-item"]').each(function () {
        if ($(this).text().trim() === value) {
          matched = true;
        }
      });

      matched ? showItem(item) : hideItem(item);
    });

    // Search Logic 
    const searchInput = wrapper.find('[data-filter="search"]');
    if (searchInput.length && searchInput.val().trim() !== '') {
      searchInput.trigger('input');
      return;
    }
    // Till here

    const hasItems = checkEmptyState();

    // Pagination Logic 
    if (hasItems) {
      const visibleItems = items.filter(':visible');
      wrapper.trigger('pagination:update', [visibleItems]);
    } else {
      wrapper.trigger('pagination:update', [$()]);
    }
    // Till here

  });

});
