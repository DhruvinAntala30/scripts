// <div data-component ="ID"></div>   Add this in btw richtext


// to add component in rich text 
$(document).ready(function () {
  $("[data-component]").each(function () {
    const name = $(this).data("component");
    const component = $("#" + name).html();
    if (component) $(this).html(component);
  });
});
