document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".accordion");

    accordions.forEach((accordion) => {
      const header = accordion.querySelector(".accordion__up");
      const content = accordion.querySelector(".accordion__dropdown");

      header.addEventListener("click", () => {
        if (header.classList.contains("is-active")) {
          header.classList.remove("is-active");
          content.classList.remove("is-active");
          content.style.maxHeight = null;
        } else {
          header.classList.add("is-active");
          content.classList.add("is-active");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      })
    })
});
