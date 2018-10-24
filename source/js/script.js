var navMain = document.querySelector('.main-navigation');
var navToggle = document.querySelector('.main-navigation__toggle');

if (navMain && navToggle) {
  navMain.classList.remove('main-navigation--nojs');

  navToggle.addEventListener('click', function () {
    if (navMain.classList.contains('main-navigation--closed')) {
      navMain.classList.remove('main-navigation--closed');
      navMain.classList.add('main-navigation--opened');
    } else {
      navMain.classList.add('main-navigation--closed');
      navMain.classList.remove('main-navigation--opened');
    }
  });
};

ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
    center: [59.939022, 30.323119],
    zoom: 17
  }, {
      searchControlProvider: 'yandex#search'
    }),

    myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
      hintContent: 'Собственный значок метки',
      balloonContent: 'ул. Большая Конюшенная, д. 19/8'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/map-pin.png',
        iconImageSize: [113, 106],
        iconImageOffset: [-50, -130]
    });

  myMap.geoObjects
    .add(myPlacemark);
});
