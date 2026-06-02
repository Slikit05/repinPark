// document.addEventListener("DOMContentLoaded", () => {
//   if (document.querySelector(".js-firstScreenSlider")) {
//     const swiper = new Swiper(".js-firstScreenSlider", {
//       slidesPerView: 1,
//       spaceBetween: 20,
//       navigation: {
//         nextEl: ".js-firstScreenSlider--next",
//         prevEl: ".js-firstScreenSlider--prev",
//       },
//     });
//   }

//   if (document.querySelector(".js-tabSlider")) {
//     const folderSlider = document.querySelectorAll(".js-tabSlider");

//     folderSlider.forEach((elem) => {
//       const swiper = new Swiper(elem, {
//         slidesPerView: 1,
//         spaceBetween: 20,
//         pagination: {
//           el: elem.querySelector(".js-tabSlider-pagination"),
//           type: "fraction",
//         },
//         navigation: {
//           nextEl: elem.querySelector(".js-tabSlider--next"),
//           prevEl: elem.querySelector(".js-tabSlider--prev"),
//         },
//       });
//     });
//   }

//   if (window.innerWidth < 767) {
//     if (document.querySelector(".js-catalogSlider")) {
//       const swiper = new Swiper(".js-catalogSlider", {
//         slidesPerView: 1,
//         spaceBetween: 20,
//         navigation: {
//           nextEl: ".js-catalogSlider--next",
//           prevEl: ".js-catalogSlider--prev",
//         },
//       });
//     }
//   }

//   if (document.querySelector(".js-modalSliderCard")) {
//     document.querySelectorAll(".js-modalSliderCard").forEach((sliderElem) => {
//       const wrapper = sliderElem.closest(".modal-card-slider");
//       // const fractionBox = document.querySelector(
//       //   ".modal-card .modal-card-slider__fraction",
//       // );


//       // const currentSpan = fractionBox.querySelector(
//       //   ".modal-card-slider__value",
//       // );
//       // const totalSpan = fractionBox.querySelector(
//       //   ".modal-card-slider__current",
//       // );

//       const totalSlides = sliderElem.querySelectorAll(".swiper-slide").length;

//       const swiper = new Swiper(sliderElem, {
//         slidesPerView: 1,
//         spaceBetween: 20,
//         navigation: {
//           nextEl: wrapper.querySelector(".js-modalSliderCard--next"),
//           prevEl: wrapper.querySelector(".js-modalSliderCard--prev"),
//         },
//         // on: {
//         //   init: (swiper) => {
//         //     currentSpan.textContent = swiper.realIndex + 1;
//         //     totalSpan.textContent = totalSlides;
//         //   },
//         //   slideChange: (swiper) => {
//         //     currentSpan.textContent = swiper.realIndex + 1;
//         //   },
//         // },
//       });
//     });
//   }
// });
