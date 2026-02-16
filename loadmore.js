/*
Add this Attributes to your Html Structure

[data-load="wrapper"] - Add this to Wrapper containg CMS and Button
[data-desktop="6"] - This number of items will appear on Load more for DESKTOP {Add this to Same wrapper}
[data-tablet="4"] - This number of items will appear on Load more for TABLET {Add this to Same wrapper}
[data-mobile="2"] - This number of items will appear on Load more for MOBILE {Add this to Same wrapper}

[data-load="item"] - Add this to Cms item
[data-load="load-more"] - Add this to Button on which you want to Load more items
[data-load="show-all"] - Add this to Button on which you want to Show All items
*/





/* Load more items*/
$(document).ready(function () {

  $('[data-load="wrapper"]').each(function () {

    const wrapper = $(this);
    const cmsitem = wrapper.find('[data-load="item"]');
    const loadbtn = wrapper.find('[data-load="load-more"]');
    const showall = wrapper.find('[data-load="show-all"]');
    let items = 0;
    
    const desktop = wrapper.data('desktop') || 6;
		const tablet = wrapper.data('tablet') || desktop;
    const mobile = wrapper.data('mobile') || desktop;

    function getItemsPerPage() {
      const width = $(window).width();
      if (width <= 767) return mobile;      
      else if (width <= 991) return tablet; 
      else return desktop;                  
    }

    let itemsPerPage = getItemsPerPage();

    function showNextItems() {
      const nextItems = cmsitem.slice(items, items + itemsPerPage);
      nextItems.fadeIn(300);
      items += itemsPerPage;

      if (items >= cmsitem.length) {
        loadbtn.fadeOut(200);
      }
    }

    cmsitem.hide();
    showNextItems();

    loadbtn.on("click", function (e) {
      e.preventDefault();
      showNextItems();
    });
    
      
    $(window).on("resize", function () {
      const newItemsPerPage = getItemsPerPage();
      if (newItemsPerPage !== itemsPerPage) {
        itemsPerPage = newItemsPerPage;
        items = 0;
        cmsitem.hide();
        loadbtn.show();
        showNextItems();
      }
    });
  
     // Show All button Logic
		showall.on("click", function (e) {
  	e.preventDefault();

  	cmsitem.fadeIn(300);    
  	items = cmsitem.length;
  	loadbtn.fadeOut(200);   
  	showall.fadeOut(200); 
		});
    // Show All Till here
  });

});

