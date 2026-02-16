
$(document).ready(function () {
    const click_offset = 100; //On click scroll stops from top
    const scroll_offset   = 120;//Toc active when content reaches from top

  const headings = $(".rich-text h2, .rich-text h3");// Add headings with your richtext class
  const $tocList = $(".toc_list");//Add class of <ul>
  $tocList.empty();

	//Toc List Logic
  headings.each(function (i) {
    const tag = $(this).prop("tagName").toLowerCase();
    const id = `block-${i}`;
    $(this).attr("id", id);

    $tocList.append(`
      <li class="toc_list-item toc-${tag}">
        <a href="#${id}" class="toc_link">${$(this).text()}</a>
      </li>
    `);
  });

  const $tocLinks = $(".toc_list a");//Add class of <ul>
  $tocLinks.first().addClass("active");

//On click Toc Link Logic
  $tocLinks.on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const targetID = $(this).attr("href");
    const $target = $(targetID);
    
    if ($target.length) {
      const scrollOffset = $target.offset().top - click_offset; 

      $("html, body").stop().animate(
        { scrollTop: scrollOffset },
        600,
        function () {
          scrNav();
        }
      );
    }
  });

// On scroll Toc Active Logic
  function scrNav() {
    const scrollTop = $(window).scrollTop();

    headings.each(function (i) {
      const currentID = $(this).attr("id");
      const currentOffset = $(this).offset().top - scroll_offset;

      const $next = headings.eq(i + 1);
      const nextOffset = $next.length
        ? $next.offset().top - scroll_offset
        : $(document).height();

      if (scrollTop >= currentOffset && scrollTop < nextOffset) {
        $tocLinks.removeClass("active");
        $tocLinks
          .filter(`[href="#${currentID}"]`)
          .addClass("active");
        return false;
      }
    });
  }

  $(window).on("scroll mousewheel", scrNav);
  scrNav();

});

