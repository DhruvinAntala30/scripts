// Search Filter Compitable with pagination / filter
$(document).ready(function () {
  $('[data-load="wrapper"]').each(function () {

    const wrapper = $(this);
    const searchInput = wrapper.find('[data-filter="search"]');
    const allItems = wrapper.find('[data-load="item"]');
    const emptyState = wrapper.find('[data-pagination="empty"]');
    const paginationUI = wrapper.find('[data-pagination="page"]');
    const categoryBtns = wrapper.find('[data-filter="category"]');

    // Filter sync logic
    function getActiveCategory() {
      const activeBtn = categoryBtns.filter('.active');
      return activeBtn.length ? activeBtn.data('value') : 'all';
    }

    function itemMatchesCategory(item, value) {
      if (value === 'all') return true;

      let matched = false;
      item.find('[data-category="category-item"]').each(function () {
        if ($(this).text().trim() === value) matched = true;
      });
      return matched;
    }
    //Till here

    searchInput.on('input', function () {

      const query = $(this).val().toLowerCase().trim();
      let visibleItems = $();
      const activeCategory = getActiveCategory();

      allItems.each(function () {
        const item = $(this);

        // Filter sync logic
        const categoryMatch = itemMatchesCategory(item, activeCategory);
        if (!categoryMatch) {
          item.hide();
          return;
        }
        //Till here
        
        // apply search
        if (query === '') {
          item.show();
          visibleItems = visibleItems.add(item);
          return;
        }

        let searchMatch = false;
        item.find('[data-filter="search-item"]').each(function () {
          if ($(this).text().toLowerCase().includes(query)) {
            searchMatch = true;
            return false;
          }
        });

        searchMatch ? item.show() : item.hide();

        if (searchMatch) visibleItems = visibleItems.add(item);
      });

      // Empty state
      if (visibleItems.length === 0) {
        emptyState.show();
        paginationUI.hide();
        wrapper.trigger('pagination:update', [$()]);
        return;
      }

      emptyState.hide();
      if (paginationUI.length) paginationUI.show();

      wrapper.trigger('pagination:update', [visibleItems]);
    });

  });
});