// Clear filters / search / pagination / Filters
$(document).ready(function () {

  $(document).on('click', '[data-filter="clear"]', function (e) {
    e.preventDefault();

    const wrapper = $('[data-load="wrapper"]');
    if (!wrapper.length) return;

    const items = wrapper.find('[data-load="item"]');
    const filterBtns = wrapper.find('[data-filter="category"]');
    const searchInput = wrapper.find('[data-filter="search"]');
    const emptyState = wrapper.find('[data-pagination="empty"]');
    const paginationUI = wrapper.find('[data-pagination="page"]');

    // Reset category filter
    if (filterBtns.length) {
      filterBtns.removeClass('active');
      filterBtns.filter('[data-value="all"]').addClass('active');
    }

    // Clear search
    if (searchInput.length) {
      searchInput.val('');
    }

    //  Show all items
    if (items.length) {
      items.each(function () {
        $(this).stop(true, true).fadeIn(250);
      });
    }

    // Reset empty state
    if (emptyState.length) {
      emptyState.hide();
    }

    //  Show pagination
    if (paginationUI.length) {
      paginationUI.show();
    }

    // Reset pagination
    if (items.length) {
      wrapper.trigger('pagination:update', [items]);
    }

  });

});