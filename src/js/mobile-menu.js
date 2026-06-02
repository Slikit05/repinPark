document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector('.mob-menu')) {
    const burger = document.querySelector('.js-burger');
    const closeBtn = document.querySelector('.js-closeMobMenu');
    const mobMenu = document.querySelector('.mob-menu');
    const links = mobMenu.querySelectorAll('.mob-menu__link');

    links.forEach(link => {
      link.addEventListener('click', () => {
        mobMenu.classList.remove('is-open');
        document.querySelector('html').classList.remove('is-hidden');
      });
    });

    burger.addEventListener('click', () => {
      mobMenu.classList.add('is-open');
      document.querySelector('html').classList.add('is-hidden');
    });
    
    closeBtn.addEventListener('click', () => {
      mobMenu.classList.remove('is-open');
      document.querySelector('html').classList.remove('is-hidden');
    });
  }
});
