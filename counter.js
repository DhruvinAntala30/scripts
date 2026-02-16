/*
Add this Attributes to your Html Structure

[data-counter=""] - Add this to number you want to count up
[data-target="99"] - Add this with [data-counter=""] and your target
[data-duration="500"] - Add this with [data-counter=""] and your duration in millisecound

*/


// Number Counter
document.addEventListener("DOMContentLoaded", function () {

  const counters = document.querySelectorAll("[data-counter]");

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {

      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-target"));
        const duration = parseInt(el.getAttribute("data-duration"));

        let startTime = null;

        function updateCounter(timestamp) {
          if (!startTime) startTime = timestamp;

          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const value = Math.floor(progress * target);

          el.textContent = value;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target;
          }
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(el);
      }

    });
  }, { threshold: 0.5 });

  counters.forEach(function (counter) {
    observer.observe(counter);
  });

});