/*
Add this Attributes to your Html Structure

[data-select="wrapper"] - Add this to Wrapper containing dropdown and input field
[data-select="dropdown"] - Add this to dropdown
[data-select="toggle"] - Add this to dropdown toggle
[data-select="label"] - Add this to label you want replace when option is selected
[data-select="input"] - Add this to hidden input field
[data-select="error"] - To show error text when that field is required
*/

$(document).ready(function () {

  // OPTION CLICK
  $('[data-select="option"]').on('click', function (e) {
    e.preventDefault();

    const $wrap = $(this).closest('[data-select="wrapper"]');
    const value = $(this).text().trim();

    $wrap.find('[data-select="label"]').text(value);
    $wrap.find('[data-select="input"]').val(value);

    // clear error
    $wrap.removeClass('has-error');
    $wrap.find('[data-select="error"]').hide();

    // close dropdown
    $wrap.find('[data-select="toggle"]').trigger('w-close');
  });

  // WEBFLOW FORM BLOCK (Only add this if you want that Field Required)
  $('form').on('submit', function (e) {

    let hasError = false;
    const $form = $(this);

    $form.find('[data-select="wrapper"]').each(function () {

      const $wrap = $(this);
      const $input = $wrap.find('[data-select="input"]');

      // validate ONLY required custom selects
      if ($wrap.find('[data-select="error"]').length && !$input.val()) {
        hasError = true;
        $wrap.addClass('has-error');
        $wrap.find('[data-select="error"]').show();
      }
    });

    if (hasError) {
      e.preventDefault();
      e.stopImmediatePropagation(); 
      return false; 
    }

  });

});


// Custom Select Dropdown no validation
$(document).ready(function () {

  $('[data-select="option"]').on('click', function (e) {
    e.preventDefault();

    const $wrap = $(this).closest('[data-select="wrapper"]');
    const value = $(this).text().trim();

    $wrap.find('[data-select="label"]').text(value);
    $wrap.find('[data-select="input"]').val(value);

    // close dropdown
    $wrap.find('[data-select="toggle"]').trigger('w-close');
  });

});