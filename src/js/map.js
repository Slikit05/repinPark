document.addEventListener("DOMContentLoaded", () => {
  const mapElement = document.querySelector(".js-yandex-map");

  if (!mapElement || typeof ymaps === "undefined") {
    return;
  }

  const address = mapElement.dataset.address || "Краснодар, улица Лизюкова, 16";
  const title = mapElement.dataset.title || "ЖК Репин-парк";
  const fallbackCoords = [45.0827, 38.9768];

  ymaps.ready(() => {
    ymaps.geocode(address, { results: 1 }).then((response) => {
      const firstGeoObject = response.geoObjects.get(0);
      const coords = firstGeoObject ? firstGeoObject.geometry.getCoordinates() : fallbackCoords;

      const map = new ymaps.Map(mapElement, {
        center: coords,
        zoom: 16,
        controls: ["zoomControl", "fullscreenControl"],
      });

      const placemark = new ymaps.Placemark(
        coords,
        {
          balloonContentHeader: title,
          balloonContentBody: address,
          hintContent: title,
        },
        {
          preset: "islands#greenHomeIcon",
        }
      );

      map.geoObjects.add(placemark);
      map.behaviors.disable("scrollZoom");
    });
  });
});
