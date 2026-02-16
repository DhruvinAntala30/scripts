
// Filter Category
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
      items.each(function () {
        showItem($(this));
      });

      emptyState.hide();
      paginationUI.show();

      // Update pagination (all items)
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

    const searchInput = wrapper.find('[data-filter="search"]');
    if (searchInput.length && searchInput.val().trim() !== '') {
      searchInput.trigger('input');
      return;
    }

    const hasItems = checkEmptyState();

    if (hasItems) {
      const visibleItems = items.filter(':visible');
      wrapper.trigger('pagination:update', [visibleItems]);
    } else {
      wrapper.trigger('pagination:update', [$()]);
    }
  });

  // 🔑 NEW ADDITION — CMS Category Template default filter
  const templateCategory = wrapper.data('template-category');

  if (templateCategory) {
    const templateBtn = filterBtns.filter(function () {
      return $(this).data('value') === templateCategory;
    }).first();

    if (templateBtn.length) {
      templateBtn.trigger('click');
    }
  }

});
