document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".auto-custom-select")) {
    document.querySelectorAll(".auto-custom-select").forEach((nativeSelect) => {
      // Пропускаем уже обработанные селекты
      if (nativeSelect.dataset.customized === "true") return;

      // Создаем обертку
      const wrapper = document.createElement("div");
      wrapper.className = "custom-select-wrapper";
      nativeSelect.parentNode.insertBefore(wrapper, nativeSelect);
      wrapper.appendChild(nativeSelect);

      // Создаем кастомный интерфейс
      const customSelect = document.createElement("div");
      customSelect.className = "custom-select";
      customSelect.innerHTML = `
      <div class="selected-option" tabindex="0">${
        nativeSelect.options[0].text
      }<svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.8081 1.48956L9.65918 9.52503L1.51028 1.48956" stroke="#9F9F9F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <ul class="options">
        ${Array.from(nativeSelect.options)
          .map(
            (option) => `<li data-value="${option.value}">${option.text}</li>`
          )
          .join("")}
      </ul>`;
      wrapper.appendChild(customSelect);

      // Настраиваем связи
      const selectedOption = customSelect.querySelector(".selected-option");
      const optionsList = customSelect.querySelector(".options");

      // Синхронизация с нативным select
      const sync = () => {
        const selected = nativeSelect.options[nativeSelect.selectedIndex];
        selectedOption.textContent = selected.text;
      };

      // Обновление при изменении нативного select
      nativeSelect.addEventListener("change", sync);

      // Обработка выбора опции
      optionsList.addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
          const value = e.target.dataset.value;
          nativeSelect.value = value;
          sync();
          customSelect.classList.remove("open");
          nativeSelect.dispatchEvent(new Event("change", { bubbles: true }));
        }
      });

      // Открытие/закрытие списка
      selectedOption.addEventListener("click", () => {
        customSelect.classList.toggle("open");
      });

      // Закрытие при клике вне
      document.addEventListener("click", (e) => {
        if (!wrapper.contains(e.target)) {
          customSelect.classList.remove("open");
        }
      });

      // Поддержка клавиатуры
      selectedOption.addEventListener("keydown", (e) => {
        if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
          e.preventDefault();
          customSelect.classList.add("open");

          // Фокус на первый элемент при открытии
          if (["Enter", " "].includes(e.key)) {
            optionsList.querySelector("li").focus();
          }
        }
      });

      // Помечаем как обработанный
      nativeSelect.dataset.customized = "true";
    });
  }
});
