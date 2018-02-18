'use strict';

(function () {
  var mapPinMain = window.map.querySelector('.map__pin--main');
  var offsetMapPinMain = 50;
  var numberClickMapPinMain = 0;
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
    for (var i = 0; i < window.formFieldSet.length; i++) {
      if (!window.formFieldSet[i].disabled) {
        window.formFieldSet[i].disabled = true;
      }
    }
  };

  openPage();

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (numberClickMapPinMain < 1) {
      window.map.classList.remove('map--faded');
      window.noticeForm.classList.remove('notice__form--disabled');

      for (var i = 0; i < window.formFieldSet.length; i++) {
        if (window.formFieldSet[i].disabled) {
          window.formFieldSet[i].disabled = false;
        }
      }
      window.createMapPins();
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
        y: restrictLocation((mapPinMain.offsetTop - shift.y), window.INCOMING_PARAMETERS.LOCATION.Y.MIN, window.INCOMING_PARAMETERS.LOCATION.Y.MAX)
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
    /*
    var restrictLocation = function (number, locationMin, locationMax) {
      if (number >= locationMin && number <= locationMax) {
        return number;
      } else if (number < locationMin) {
        return locationMin;
      } else {
        return locationMax;
      }
    };
    var coordinateX = restrictLocation(evt.pageX, window.INCOMING_PARAMETERS.LOCATION.X.MIN, window.INCOMING_PARAMETERS.LOCATION.X.MAX);
    var coordinateY = restrictLocation(evt.pageY - window.INCOMING_PARAMETERS.PIN.HEIGHT / 2, window.INCOMING_PARAMETERS.LOCATION.Y.MIN, window.INCOMING_PARAMETERS.LOCATION.Y.MAX);
    var addressInput = document.querySelector('#address');
    addressInput.value = 'X: ' + coordinateX + ',Y: ' + coordinateY;
    if (numberClickMapPinMain < 1) {
      window.map.classList.remove('map--faded');
      window.noticeForm.classList.remove('notice__form--disabled');

      for (var i = 0; i < window.formFieldSet.length; i++) {
        if (window.formFieldSet[i].disabled) {
          window.formFieldSet[i].disabled = false;
        }
      }

      window.createMapPins();
    }
    numberClickMapPinMain++;*/
  });
}());
