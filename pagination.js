//Pagination Compitable with filters / Search
$(document).ready(function () {

  $('[data-load="wrapper"]').each(function () {

    const wrapper = $(this);
    let cards = wrapper.find('[data-load="item"]');
    const prevBtn = wrapper.find('[data-pagination="prev"]');
    const nextBtn = wrapper.find('[data-pagination="next"]');
    const btnBlock = wrapper.find('[data-pagination="numbers"]');
    const paginationbtn = 'pagination-button';// Add you pagination button class

    const desktopCount = parseInt(wrapper.attr('data-desktop')) || 6;
    const mobileCount = parseInt(wrapper.attr('data-mobile')) || desktopCount;

    let itemsPerPage = getItemsPerPage();
    let currentPage = 1;

    function getItemsPerPage() {
      return $(window).width() <= 768 ? mobileCount : desktopCount;
    }

    function scrollToTop() {
      $("html, body").animate(
        {
          scrollTop: wrapper.offset().top - 80
        },
        400
      );
    }

    function showPage(page) {
      currentPage = page;

      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const totalPages = Math.ceil(cards.length / itemsPerPage);

      cards.stop(true, true).hide();
      cards.slice(start, end).fadeIn(300);


      btnBlock.empty();

      const visibleRange = 2; // pages shown AFTER current

      function createBtn(i) {
        const btn = $(`
          <a href="#" data-page="${i}" class="${paginationbtn}">
            <div>${i}</div>
          </a>
        `);

        if (i === currentPage) btn.addClass("active");

        btn.on("click", function (e) {
          e.preventDefault();
          showPage(i);
          scrollToTop();
        });

        return btn;
      }

      // Always show first page
      btnBlock.append(createBtn(1));

      // Leading ellipsis
      if (currentPage > 4) {
        btnBlock.append(`<span class="${paginationbtn} ellipsis">…</span>`);
      }

      // Middle pages (2 before & after current)
      for (
        let i = Math.max(2, currentPage - 2);
        i <= Math.min(totalPages - 1, currentPage + 2);
        i++
      ) {
        btnBlock.append(createBtn(i));
      }

      // Trailing ellipsis
      if (currentPage < totalPages - 3) {
        btnBlock.append(`<span class="${paginationbtn} ellipsis">…</span>`);
      }

      // Always show last page
      if (totalPages > 1) {
        btnBlock.append(createBtn(totalPages));
      }


      prevBtn.toggle(page > 1);
      nextBtn.toggle(page < totalPages);
    }

    // Previous
    prevBtn.on("click", function (e) {
      e.preventDefault();
      if (currentPage > 1) {
        showPage(currentPage - 1);
        scrollToTop();
      }
    });

    // Next
    nextBtn.on("click", function (e) {
      e.preventDefault();
      const totalPages = Math.ceil(cards.length / itemsPerPage);
      if (currentPage < totalPages) {
        showPage(currentPage + 1);
        scrollToTop();
      }
    });

    // Responsive recalculation
    $(window).on("resize", function () {
      const newCount = getItemsPerPage();
      if (newCount !== itemsPerPage) {
        itemsPerPage = newCount;
        showPage(1);
      }
    });

    wrapper.on('pagination:update', function (e, newCards) {
      cards = newCards;
      showPage(1);
    });

    wrapper.on('pagination:reset', function () {
      cards = wrapper.find('[data-pagination="item"]');
      showPage(1);
    });

    // Init
    cards.hide();
    showPage(1);

  });

});

