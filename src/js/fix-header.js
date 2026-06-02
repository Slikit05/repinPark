document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".js-fixe-header")) {
    const header = document.querySelector(".js-fixe-header");

    window.addEventListener("scroll", handleScroll);

    function handleScroll() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 0) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }
  }
});
