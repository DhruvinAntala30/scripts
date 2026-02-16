// Close drop down And replace text
$(document).ready(function () {

  $(document).on('click', '[data-replace="dropdown-close"]', function () {

    const filterBtn = $(this);
    
    const dropdown = filterBtn.closest('[data-replace="dropdown"]');
    if (!dropdown.length) return;

    // Update dropdown label
    const label = dropdown.find('[data-replace="filter-name"]');
    if (label.length) {
      label.text(filterBtn.text().trim());
    }

    //FORCE CLOSE: trigger outside click
    setTimeout(function () {
      $('body').trigger('click');
    }, 0);

  });

});