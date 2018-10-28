var navMain = document.querySelector(".main-navigation");
var navToggle = document.querySelector(".main-navigation__toggle");

if (navMain && navToggle) {
  navMain.classList.remove("main-navigation--nojs");

  navToggle.addEventListener("click", function () {
    if (navMain.classList.contains("main-navigation--closed")) {
      navMain.classList.remove("main-navigation--closed");
      navMain.classList.add("main-navigation--opened");
    } else {
      navMain.classList.add("main-navigation--closed");
      navMain.classList.remove("main-navigation--opened");
    }
  });
};

ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
    center: [59.939022, 30.323119],
    zoom: 17
  }, {
      searchControlProvider: "yandex#search"
    }),

    myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
      hintContent: "Собственный значок метки",
      balloonContent: "ул. Большая Конюшенная, д. 19/8"
    }, {
        iconLayout: "default#image",
        iconImageHref: "img/map-pin.png",
        iconImageSize: [113, 106],
        iconImageOffset: [-50, -130]
    });

  myMap.geoObjects
    .add(myPlacemark);
});

var buttonBefore = document.querySelector(".slider__button--before");
var buttonAfter = document.querySelector(".slider__button--after");

if (buttonBefore && buttonAfter) {
  var imageBefore = document.querySelector(".slider__image--before");
  var imageAfter = document.querySelector(".slider__image--after");
  var sliderScaleLittle = document.querySelector(".scale-1__bar");
  var sliderScaleBig = document.querySelector(".scale-2__toggle");
  var sliderBackground = document.querySelector(".live-story");
  var progressText = document.querySelectorAll(".progress__text-inner");

  buttonAfter.addEventListener("click", function (evt) {
    evt.preventDefault();
    imageAfter.classList.add("slider__image--visible");
    imageBefore.classList.remove("slider__image--visible");
    sliderScaleLittle.classList.add("scale-1__bar--full");
    sliderScaleBig.classList.add("scale-2__toggle--full");
    sliderBackground.classList.add("live-story--slider");
    for (var i = 0; i < progressText.length; i++) {
      progressText[i].classList.add("progress__text-inner--slider");
    };
  });

  buttonBefore.addEventListener("click", function (evt) {
    evt.preventDefault();
    imageBefore.classList.add("slider__image--visible");
    imageAfter.classList.remove("slider__image--visible");
    sliderScaleLittle.classList.remove("scale-1__bar--full");
    sliderScaleBig.classList.remove("scale-2__toggle--full");
    sliderBackground.classList.remove("live-story--slider");
    for (var i = 0; i < progressText.length; i++) {
      progressText[i].classList.remove("progress__text-inner--slider");
    };
  });
};
