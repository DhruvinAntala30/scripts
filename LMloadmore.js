$(document).ready(function () {

  $('[data-load="wrapper"]').each(function () {

    const wrapper = $(this);
    const items = wrapper.find('[data-load="item"]');
    const loadBtn = wrapper.find('[data-load="load-more"]');
    const showAllBtn = wrapper.find('[data-load="show-all"]');

    let currentIndex = 0;
    let activeItems = items;

    const desktop = wrapper.data('desktop') || 6;
    const tablet = wrapper.data('tablet') || desktop;
    const mobile = wrapper.data('mobile') || desktop;

    function getItemsPerPage() {
      const width = $(window).width();
      if (width <= 767) return mobile;
      if (width <= 991) return tablet;
      return desktop;
    }

    let itemsPerPage = getItemsPerPage();

    function resetLoadMore() {
      currentIndex = 0;
      items.hide();
      loadBtn.show();
      showAllBtn.show();
      showNextItems();
    }

    function showNextItems() {
      const next = activeItems.slice(currentIndex, currentIndex + itemsPerPage);
      next.fadeIn(300);
      currentIndex += itemsPerPage;

      if (currentIndex >= activeItems.length) {
        loadBtn.fadeOut(200);
      }
    }

    /* ===== Initial Load ===== */
    resetLoadMore();

    /* ===== Load More Click ===== */
    loadBtn.on('click', function (e) {
      e.preventDefault();
      showNextItems();
    });

    /* ===== Show All ===== */
    showAllBtn.on('click', function (e) {
      e.preventDefault();
      activeItems.fadeIn(300);
      loadBtn.fadeOut(200);
      showAllBtn.fadeOut(200);
    });

    /* ===== Responsive Reset ===== */
    $(window).on('resize', function () {
      const newItemsPerPage = getItemsPerPage();
      if (newItemsPerPage !== itemsPerPage) {
        itemsPerPage = newItemsPerPage;
        resetLoadMore();
      }
    });

    /* ===== External Reset Hook (for filters) ===== */
    wrapper.on('loadmore:reset', function (e, newItems) {
      activeItems = newItems;
      resetLoadMore();
    });

  });

});