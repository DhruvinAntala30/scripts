// Video Controls

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll('[data-video="video-wrapper"]').forEach(function (wrapper) {

    const video = wrapper.querySelector('[data-video="video"]');
    const playPauseBtn = wrapper.querySelector('[data-video="play-pause"]');
    const muteBtn = wrapper.querySelector('[data-video="mute-unmute"]');
    const fullScreenBtn = wrapper.querySelector('[data-video="full-screen"]');

    /* Default state */
    video.controls = false;
    video.style.pointerEvents = "none";

    /* Play / Pause */
    playPauseBtn.addEventListener("click", function (e) {
      e.preventDefault();
      video.paused ? video.play() : video.pause();
    });

    /* Mute / Unmute */
    muteBtn.addEventListener("click", function (e) {
      e.preventDefault();
      video.muted = !video.muted;
    });

    /* Enter fullscreen */
    fullScreenBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (video.webkitSupportsFullscreen) {
        video.webkitEnterFullscreen(); // iOS Safari
      } else if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    });

    /* Fullscreen change handler */
    const onFullscreenChange = () => {
      const isFullscreen =
        document.fullscreenElement === video ||
        document.webkitFullscreenElement === video;

      if (isFullscreen) {
        // Enable native controls only in fullscreen
        video.controls = true;
        video.style.pointerEvents = "auto";
      } else {
        // Disable native controls when exiting fullscreen
        video.controls = false;
        video.style.pointerEvents = "none";
      }
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);

  });

});

https://preview.webflow.com/preview/script-practice?utm_medium=preview_link&utm_source=dashboard&utm_content=script-practice&preview=58c9d87603136f90c6378a9dfb1e6eea&locale=en&pageId=694e3792280b43982dad230e&workflow=canvas
