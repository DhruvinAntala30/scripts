// Cookie
  function setCookie(name, value, hours) {
    let expires = "";
    if (hours) {
      let date = new Date();
      date.setTime(date.getTime() + (hours * 60 * 60 * 1000)); // 24hr
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
  }

  document.addEventListener("DOMContentLoaded", function () {

    const popup = document.querySelector('[data-cookie="popup"]');
    const acceptBtn = document.querySelector('[data-cookie="accept"]');
    const declineBtn = document.querySelector('[data-cookie="decline"]');

    // Show popup only if NOT accepted
    if (getCookie("cookieAccepted")) {
      popup.style.display = "none";
    } else {
      popup.style.display = "block";
    }

    // Accept → store cookie for 24 hours
    acceptBtn.addEventListener("click", function () {
      setCookie("cookieAccepted", "true", 24);
      popup.style.display = "none";
    });

    // Decline → do NOT store anything
    declineBtn.addEventListener("click", function () {
      popup.style.display = "none";
    });

  });