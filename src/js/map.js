document.addEventListener("DOMContentLoaded", () => {
  const mapElement = document.querySelector(".js-yandex-map");

  if (!mapElement || typeof ymaps === "undefined") {
    return;
  }

  const fallbackPoints = [
    {
      category: "Инфраструктура",
      title: "Объект",
      address: "Адрес объекта",
      coords: [45.0648, 38.9558],
      markerIcon: "img/svg/map-marker-kindergarten.svg",
      balloon: "Описание объекта",
    },
  ];

  const getPoints = () => {
    try {
      const points = JSON.parse(mapElement.dataset.points || "[]");

      return Array.isArray(points) && points.length ? points : fallbackPoints;
    } catch (error) {
      return fallbackPoints;
    }
  };

  const getCenter = (points) => {
    const totals = points.reduce(
      (acc, point) => {
        acc.lat += Number(point.coords?.[0] || 0);
        acc.lng += Number(point.coords?.[1] || 0);
        return acc;
      },
      { lat: 0, lng: 0 }
    );

    return [totals.lat / points.length, totals.lng / points.length];
  };

  const getBalloonContent = (point) => `
    <div class="map-balloon">
      <strong class="map-balloon__title">${point.title || point.category}</strong>
      <span class="map-balloon__address">${point.address || ""}</span>
      <p class="map-balloon__text">${point.balloon || ""}</p>
    </div>
  `;

  ymaps.ready(() => {
    const points = getPoints();
    const map = new ymaps.Map(mapElement, {
      center: getCenter(points),
      zoom: 15,
      controls: ["zoomControl", "fullscreenControl"],
    });

    points.forEach((point) => {
      const placemark = new ymaps.Placemark(
        point.coords,
        {
          balloonContent: getBalloonContent(point),
          hintContent: point.title || point.category,
        },
        {
          iconLayout: "default#image",
          iconImageHref: point.markerIcon || "img/svg/map-marker-kindergarten.svg",
          iconImageSize: [40, 46],
          iconImageOffset: [-20, -46],
        }
      );

      map.geoObjects.add(placemark);
    });

    if (points.length > 1) {
      map.setBounds(map.geoObjects.getBounds(), {
        checkZoomRange: true,
        zoomMargin: 48,
      });
    }

    map.behaviors.disable("scrollZoom");
  });
});
