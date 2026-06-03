document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".faq .accordion__dropdown.is-active").forEach((dropdown) => {
    dropdown.style.maxHeight = `${dropdown.scrollHeight}px`;
  });

  let apartmentsSwiper = null;

  const initApartmentFilters = () => {
    const section = document.querySelector(".apartments");

    if (!section) {
      return;
    }

    const filterButtons = section.querySelectorAll(".apartments__chip[data-filter]");
    const minInput = section.querySelector("[data-price-min]");
    const maxInput = section.querySelector("[data-price-max]");
    const slides = section.querySelectorAll(".swiper-slide");
    const emptyMessage = section.querySelector(".js-apartments-empty");

    const getNumberValue = (input) => {
      if (!input) {
        return null;
      }

      const value = input.value.replace(/\D/g, "");

      return value ? Number(value) : null;
    };

    const getActiveFilter = () => {
      const activeButton = section.querySelector(".apartments__chip.apartments__chip--active");

      return activeButton?.dataset.filter || "all";
    };

    const isCardMatchesFilter = (card, activeFilter, minPrice, maxPrice) => {
      const cardPrice = Number(card.dataset.price || 0);
      const cardRooms = card.dataset.rooms;
      const cardType = card.dataset.type;

      const isTypeMatch =
        activeFilter === "all" ||
        (activeFilter === "commercial" && cardType === "commercial") ||
        cardRooms === activeFilter;
      const isMinMatch = minPrice === null || cardPrice >= minPrice;
      const isMaxMatch = maxPrice === null || cardPrice <= maxPrice;

      return isTypeMatch && isMinMatch && isMaxMatch;
    };

    const applyApartmentFilters = () => {
      const activeFilter = getActiveFilter();
      const minPrice = getNumberValue(minInput);
      const maxPrice = getNumberValue(maxInput);
      let visibleCount = 0;

      slides.forEach((slide) => {
        const card = slide.querySelector(".apartment-card");
        const isVisible = card && isCardMatchesFilter(card, activeFilter, minPrice, maxPrice);

        slide.classList.toggle("is-hidden", !isVisible);

        if (isVisible) {
          visibleCount += 1;
        }
      });

      emptyMessage?.classList.toggle("is-active", visibleCount === 0);

      if (apartmentsSwiper) {
        apartmentsSwiper.update();
        apartmentsSwiper.slideTo(0, 0);
      }
    };

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((currentButton) => {
          currentButton.classList.remove("apartments__chip--active");
        });
        button.classList.add("apartments__chip--active");
        applyApartmentFilters();
      });
    });

    [minInput, maxInput].forEach((input) => {
      input?.addEventListener("input", applyApartmentFilters);
    });

    applyApartmentFilters();
  };

  if (typeof Swiper !== "undefined") {
    const createSlider = (selector, options) => {
      const element = document.querySelector(selector);

      if (!element) {
        return null;
      }

      return new Swiper(element, options);
    };

    apartmentsSwiper = createSlider(".js-apartments-slider", {
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        nextEl: ".apartments__nav .slider-nav__button--next",
        prevEl: ".apartments__nav .slider-nav__button--prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      },
    });

    createSlider(".js-reviews-slider", {
      slidesPerView: 1,
      spaceBetween: 32,
      navigation: {
        nextEl: ".reviews__nav-button--next",
        prevEl: ".reviews__nav-button--prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
      },
    });
  }

  initApartmentFilters();
});
