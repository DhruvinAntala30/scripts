/*
Add this Attributes to your Html Structure

[data-share="copy"] - Add this to button on which you want to Copy Link
[data-share="toast"] - Add this to the text which will appear when link is copied
[data-share="instagram"] - to share on instagram
[data-share="telegram"] - to share on telegram
[data-share="twitter"] - to share on twitter
[data-share="facebook"] - to share on facebook
[data-share="linkedin"] - to share on linkedin

*/
// social share
document.addEventListener("DOMContentLoaded", () => {
  const currentURL = window.location.href;
  const pageTitle = document.title;

  document.querySelector('[data-share="linkedin"]')?.addEventListener("click", (e) => {
    e.preventDefault();
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentURL)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });

  document.querySelector('[data-share="facebook"]')?.addEventListener("click", (e) => {
    e.preventDefault();
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });

  document.querySelector('[data-share="twitter"]')?.addEventListener("click", (e) => {
    e.preventDefault();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(currentURL)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });

  document.querySelector('[data-share="instagram"]')?.addEventListener("click", (e) => {
    e.preventDefault();
    alert("To share on Instagram, please take a screenshot and share via the Instagram app.");
  });

  document.querySelector('[data-share="telegram"]')?.addEventListener("click", (e) => {
    e.preventDefault();
    const url = `https://t.me/share/url?url=${encodeURIComponent(currentURL)}&text=${encodeURIComponent(pageTitle)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });

  document.querySelector('[data-share="copy"]')?.addEventListener("click", (e) => {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentURL).then(showToast);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = currentURL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showToast();
    }
  });

  function showToast() {
    const toast = document.querySelector('[data-share="toast"]');
    if (!toast) return;

    toast.style.opacity = "1";

    setTimeout(() => {
      toast.style.opacity = "0";
    }, 3000);
  }
});
