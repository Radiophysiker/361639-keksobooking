'use strict';

(function () {
  window.map = document.querySelector('.map');
  window.noticeForm = document.querySelector('.notice__form');
  var formFieldSet = window.noticeForm.querySelectorAll('fieldset');
  var mapPinMain = window.map.querySelector('.map__pin--main');
  var offsetMapPinMain = 50;
  var numberClickMapPinMain = 0;
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;
  var LOCATION = {
    X: {
      MIN: 300,
      MAX: 900
    },
    Y: {
      MIN: 100,
      MAX: 450
    }
  };
  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };
  var setFadedClass = function (object, nameClass) {
    if (!object.classList.contains(nameClass)) {
      object.classList.add(nameClass);
    }
  };

  var openPage = function () {
    setFadedClass(window.map, 'map--faded');
    setFadedClass(window.noticeForm, 'notice__form--disabled');
    window.map.dropzone = 'move';
    mapPinMain.draggable = 'true';
    for (var i = 0; i < formFieldSet.length; i++) {
      if (!formFieldSet[i].disabled) {
        formFieldSet[i].disabled = true;
      }
    }
  };

  openPage();

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (numberClickMapPinMain < 1) {
      window.map.classList.remove('map--faded');
      window.noticeForm.classList.remove('notice__form--disabled');

      for (var i = 0; i < formFieldSet.length; i++) {
        if (formFieldSet[i].disabled) {
          formFieldSet[i].disabled = false;
        }
      }
      window.backend.load(window.pin.createMapPins, window.errorHandler);
      var filters = window.map.querySelector('.map__filters');
      filters.addEventListener('change', function () {
        debounce(window.pin.createMapPins);
      });
    }
    var startCoords = {
      x: evt.clientX,
      y: evt.pageY
    };
    var addressInput = document.querySelector('#address');

    var onMouseMoveMapPinMain = function (moveEvt) {
      moveEvt.preventDefault();

      var restrictLocation = function (number, locationMin, locationMax) {
        if (number >= locationMin && number <= locationMax) {
          return number;
        } else if (number < locationMin) {
          return locationMin;
        } else {
          return locationMax;
        }
      };

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.pageY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.pageY
      };

      var currentCoords = {
        x: restrictLocation((mapPinMain.offsetLeft - shift.x), 0, window.map.clientWidth),
        y: restrictLocation((mapPinMain.offsetTop - shift.y), LOCATION.Y.MIN, LOCATION.Y.MAX)
      };

      mapPinMain.style.top = currentCoords.y + 'px';
      mapPinMain.style.left = currentCoords.x + 'px';

      var poinerCoords = {
        x: currentCoords.x,
        y: currentCoords.y + offsetMapPinMain
      };

      addressInput.value = 'x: ' + poinerCoords.x + ', y:' + poinerCoords.y;
    };

    var onMouseUpMapPinMain = function (endEvt) {
      endEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMoveMapPinMain);
      document.removeEventListener('mouseup', onMouseUpMapPinMain);
    };

    document.addEventListener('mousemove', onMouseMoveMapPinMain);
    document.addEventListener('mouseup', onMouseUpMapPinMain);
  });
}());
