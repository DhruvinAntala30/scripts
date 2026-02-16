
// Calculate Reading Time 
$(document).ready(function () {
  const blogText = $('[data-time="reading"]').text().trim();
  const words = blogText.split(/\s+/).filter((word) => word.length > 0);
  const wordsPerMinute = 150;
  const wordCount = words.length;
  const time = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  $('[data-time="reading-time"]').text(`${time}min`);
});


// Calculate Video Time
$(document).ready(function () {
  const video = $('[data-time="video"] video').get(0);
  const output = $('[data-time="video-time"]');

  video.addEventListener('loadedmetadata', () => {
    const m = Math.floor(video.duration / 60);
    const s = Math.floor(video.duration % 60);
    output.text(`${m}:${s < 10 ? '0' + s : s}`);
  });
});

