/**

#dark-mode-toggle -- Add this id to the Switch of Dark Mode
.dark-mode -- Add this class to body give your variable mode

*/ 
 
 
 // ---------- COOKIE HELPERS ----------
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  }

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  // ---------- THEME TOGGLE ----------
  $(document).ready(function () {

    const $themeToggle = $("#dark-mode-toggle");
    const $body = $("body");

    // Apply saved theme on page load
    if (getCookie("theme") === "dark") {
      $body.addClass("dark-mode");
    }

    // Toggle theme on click
    $themeToggle.on("click", function () {
      $body.toggleClass("dark-mode");

      const theme = $body.hasClass("dark-mode") ? "dark" : "light";
      setCookie("theme", theme, 365);
    });

  });