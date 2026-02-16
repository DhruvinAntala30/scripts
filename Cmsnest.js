/*

<div data-component="id" data-component-scope="category" data-component-page="/other-scripts"></div>
- Add this where you want to Show multi reference 
    [data-component="id"] - use slug to match the id
    [data-component-scope="category"] - Wrapper name which you use on div outside the component
    [data-component-page="/other-scripts"] = Page name from which you are fetching component

- Add this to the Cms which is getting called there
Add slug to id in Collection List Wrapper
[data-component-scope="category"] - wrapper of component which you are calling

*/


// CMS Nest
$(document).ready(function () {

  const pageCache = {};

  function loadPage(pageUrl, callback) {
    if (pageCache[pageUrl]) {
      callback(pageCache[pageUrl]);
      return;
    }

    $.get(pageUrl, function (data) {
      const $html = $(data);
      pageCache[pageUrl] = $html;
      callback($html);
    });
  }

  $("[data-component]").each(function () {
    const $target = $(this);

    const componentId = $target.data("component");
    const scope = $target.data("component-scope");
    const page = $target.data("component-page");

    // ❌ if page not defined → do nothing
    if (!page) {
      console.warn("Component page missing for:", componentId);
      return;
    }

    loadPage(page, function ($html) {

      let $scopeWrapper = $html;

      if (scope) {
        $scopeWrapper = $html.find('[data-component-scope="' + scope + '"]');
      }

      const component = $scopeWrapper.find("#" + componentId).html();

      if (component) {
        $target.html(component);
      } else {
        console.warn(
          "Component not found:",
          componentId,
          "Scope:",
          scope,
          "Page:",
          page
        );
      }
    });
  });

});





