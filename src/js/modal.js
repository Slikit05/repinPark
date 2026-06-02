document.addEventListener("DOMContentLoaded", () => {
  // new-modal

  window.addEventListener("click", function (event) {
    const eventTar = event.target;

    if (eventTar.dataset.clickModalCard) {
      event.preventDefault();

      const btnName = eventTar.dataset.clickModalCard;

      console.log(btnName)

      document.querySelector("#" + btnName).classList.add("is-open");
      document.querySelector("html").classList.add("hidden");
    }

    if (eventTar.classList.contains("overflow-modal__wrapper")) {
      eventTar.closest(".overflow-modal").classList.remove("is-open");
      document.querySelector("html").classList.remove("hidden");
    } else if (eventTar.classList.contains("js-closeModal")) {
      eventTar.closest(".overflow-modal").classList.remove("is-open");
      document.querySelector("html").classList.remove("hidden");
    }
  });

  window.addEventListener("click", function (event) {
    const eventTar = event.target;

    if (eventTar.dataset.clickModal) {
      event.preventDefault();

      this.document.querySelectorAll('.overflow-modal').forEach(elem => {
        if (elem.classList.contains('is-open')) {
          elem.classList.remove('is-open')
        }
      })

      const btnName = eventTar.dataset.clickModal;

      console.log(btnName)

      document.querySelector("#" + btnName).classList.add("new-modal--open");
      document.querySelector("html").classList.add("hidden");
    }

    if (eventTar.classList.contains("new-modal__overlay")) {
      eventTar.closest(".new-modal").classList.remove("new-modal--open");
      document.querySelector("html").classList.remove("hidden");
    } else if (eventTar.classList.contains("js-closeModal")) {
      eventTar.closest(".new-modal").classList.remove("new-modal--open");
      document.querySelector("html").classList.remove("hidden");
    }
  });
});
