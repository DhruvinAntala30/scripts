  //script for FAQ
  $(function () {
    var Accordion = function (el, multiple) {
      this.el = el || {};
      this.multiple = multiple || false;
      
      var links = this.el.find('[faq-component="que-block"]');
   
      links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown);
    };

    Accordion.prototype.dropdown = function (e) {
      var $el = e.data.el;
      $this = $(this),
      $next = $this.next('[faq-component="answer-block"]');

      $next.slideToggle();
      $this.parent('[faq-component="faq-item"]').toggleClass('open');

      if (!e.data.multiple) {
        $el
          .find('[faq-component="answer-block"]')
          .not($next)
          .slideUp()
          .parent('[faq-component="faq-item"]')
          .removeClass('open');
      };
    };

    var accordion = new Accordion(
      $('[faq-component="faq-wrapper"]'),
      false
    );
  });

  $(document).ready(function () {
  var $firstItem = $('[faq-component="faq-wrapper"] [faq-component="faq-item"]:first');
  $firstItem.addClass('open');
  $firstItem
    .find('[faq-component="answer-block"]')
    .show();
});

