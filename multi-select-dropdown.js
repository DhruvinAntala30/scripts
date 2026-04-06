/*
[data-multi-select-selected-label] > div{} --- Label Styling

data-multi-select-wrapper --- wrapper
data-multi-select-selected-label --- label wrapper
data-multi-select --- dropdown
data-multi-select-label --- dropdown text
data-multi-select-option --- checkbox
data-multi-select-text --- checkbox text
*/


// Multi-selected Select Dropdown
document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll("[data-multi-select]");

  dropdowns.forEach((dropdown) => {
    // scope to closest wrapper
    const wrapper = dropdown.closest("[data-multi-select-wrapper]") || dropdown;

    const countLabel = dropdown.querySelector("[data-multi-select-label]");
    const selectedContainer = wrapper.querySelector("[data-multi-select-selected-label]");
    const options = dropdown.querySelectorAll("[data-multi-select-option]");

    if (!countLabel || !selectedContainer) return;

    const defaultText = countLabel.textContent;

    function updateUI(option) {
      const textEl = option.closest("label").querySelector("[data-multi-select-text]");
      if (!textEl) return;

      const value = textEl.textContent.trim();
      const id = value.toLowerCase().replace(/\s+/g, "-");

      if (option.checked) {
        if (!selectedContainer.querySelector(`[data-tag="${id}"]`)) {
          const tag = document.createElement("div");
          tag.setAttribute("data-tag", id);
          tag.textContent = value;
          selectedContainer.appendChild(tag);
        }
      } else {
        const existing = selectedContainer.querySelector(`[data-tag="${id}"]`);
        if (existing) existing.remove();
      }

      // keep count label logic
      const checkedCount = dropdown.querySelectorAll(
        "[data-multi-select-option]:checked"
      ).length;

      if (checkedCount === 0) {
        countLabel.textContent = defaultText;
      } else if (checkedCount === 1) {
        countLabel.textContent = "1 selected";
      } else {
        countLabel.textContent = checkedCount + " selected";
      }
    }

    options.forEach((option) => {
      option.addEventListener("change", function () {
        updateUI(option);
      });
    });
  });
});
