'use strict';

window.pin = (function () {
  var renderMapPin = function (i) {
    var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var mapPin = mapPinTemplate.cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');

    var openPupup = function () {
      var mapPinActive = document.querySelector('.map__pin--active');
      if (mapPinActive) {
        mapPinActive.classList.remove('map__pin--active');
      }
      mapPin.classList.add('map__pin--active');
      window.card.createAd(i);
      window.card.mapCard.classList.remove('hidden');
    };

    var closePopup = function () {
      mapPin.classList.remove('map__pin--active');
      window.card.mapCard.classList.add('hidden');
    };

    mapPin.addEventListener('click', function () {
      openPupup();

      var buttonPopupClose = document.querySelector('.popup__close');
      buttonPopupClose.addEventListener('click', function () {
        closePopup();
      });
    });

    mapPin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.KEY_CODE.ENTER) {
        openPupup();
      }
    });

    mapPin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.KEY_CODE.ESC) {
        closePopup();
      }
    });

    mapPin.style.left = (i.location.x - window.INCOMING_PARAMETERS.PIN.WIDTH / 2) + 'px';
    mapPin.style.top = (i.location.y - window.INCOMING_PARAMETERS.PIN.HEIGHT / 2) + 'px';
    mapPinImg.src = i.author.avatar;
    mapPin.tabIndex = '0';
    return mapPin;
  };

  return {

    createMapPins: function (arr) {
      window.incommingArray = arr.slice();
      var MAX_LIMIT_PINS = 5;
      arr = window.filter(arr);
      var mapPins = document.querySelector('.map__pins');
      var activPin = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      activPin.forEach(function (currentPin) {
        mapPins.removeChild(currentPin);
      });
      var fragment = document.createDocumentFragment();
      if (arr.length > MAX_LIMIT_PINS) {
        arr = arr.slice(MAX_LIMIT_PINS);
      }
      for (var i = 0; i < arr.length; i++) {
        fragment.appendChild(renderMapPin(arr[i]));
      }
      mapPins.appendChild(fragment);
    }
  };
}());
