
// Universal PDF Download
document.querySelectorAll('[data-pdf="download"]').forEach((link) => {

  link.addEventListener("click", function (e) {
    e.preventDefault();

    const pdfUrl = this.getAttribute("href");
    if (!pdfUrl) return;

    fetch(pdfUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Network error");
        return response.blob();
      })
      .then((blob) => {

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        const fileName = this.dataset.filename || pdfUrl.split("/").pop();
        a.download = fileName;

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((err) => {
        console.error("Download failed:", err);
      });
  });

});

