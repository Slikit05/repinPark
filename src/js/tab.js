document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".js_tabButton");
  const tabBlocks = document.querySelectorAll(".js_tabBlock");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const idTab = button.getAttribute("data-id-tab");
      const currentTabBlock = document.getElementById(idTab);

      if (!button.classList.contains("is-active")) {
        tabButtons.forEach((btn) => btn.classList.remove("is-active"));
        tabBlocks.forEach((block) => block.classList.remove("is-active"));
        button.classList.add("is-active");
        currentTabBlock.classList.add("is-active");
      }
    })
  });
});
