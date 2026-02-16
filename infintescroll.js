/*
Add this Attributes to your Html Structure

[data-load="wrapper"] - Add this to Wrapper containg CMS 
[data-default="6"] - This number of items will appear by default {Add this to Same wrapper}
[data-scroll="4"] - This number of items will appear while Scrolling the page {Add this to Same wrapper}


[data-load="infinte-scroll"] - Add this to Cms item
*/



// Infinte Scroll
$(document).ready(function () {

  $('[data-load="load-wrapper"]').each(function () {

    const wrapper = $(this);
    const defaultCount = parseInt(wrapper.attr('data-default')) || 6;
    const scrollCount = parseInt(wrapper.attr('data-scroll')) || defaultCount;

    let cardsToShow = defaultCount;
    const allCards = wrapper.find('[data-load="infinte-scroll"]');

    // Initial state
    allCards.hide();
    allCards.slice(0, cardsToShow).show();

    $(window).on('scroll', function () {
      if (
        $(window).scrollTop() + $(window).height() >
        $(document).height() - 50
      ) {
        let newCardsToShow = cardsToShow + scrollCount;

        allCards
          .slice(cardsToShow, newCardsToShow)
          .fadeIn();

        cardsToShow = newCardsToShow;
      }
    });

  });

});