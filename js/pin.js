'use strict';

(function () {
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
      window.createAd(window.ResultArray[i]);
      window.mapCard.classList.remove('hidden');
    };

    var closePopup = function () {
      mapPin.classList.remove('map__pin--active');
      window.mapCard.classList.add('hidden');
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

    mapPin.style.left = (window.ResultArray[i].location.x - window.INCOMING_PARAMETERS.PIN.WIDTH / 2) + 'px';
    mapPin.style.top = (window.ResultArray[i].location.y - window.INCOMING_PARAMETERS.PIN.HEIGHT / 2) + 'px';
    mapPinImg.src = window.ResultArray[i].author.avatar;
    mapPin.tabIndex = '0';
    return mapPin;
  };

  window.createMapPins = function () {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.ResultArray.length; i++) {
      fragment.appendChild(renderMapPin(i));
    }
    mapPins.appendChild(fragment);
  };

}());
