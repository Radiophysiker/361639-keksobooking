'use strict';

(function () {
  window.map = document.querySelector('.map');
  window.noticeForm = document.querySelector('.notice__form');
  window.formFieldSet = window.noticeForm.querySelectorAll('fieldset');
  window.ResultArray = [];

  window.INCOMING_PARAMETERS = {
    NUMBER: 8,
    TITLE: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],
    PRICE: {
      MIN: 1000,
      MAX: 1000000
    },
    TYPE: [
      'flat',
      'house',
      'bungalo'
    ],
    ROOMS: {
      MIN: 1,
      MAX: 5
    },
    GUESTS: {
      MIN: 1,
      MAX: 10
    },
    CHECKIN: [
      '12:00',
      '13:00',
      '14:00'
    ],
    CHECKOUT: [
      '12:00',
      '13:00',
      '14:00'
    ],
    FEATURES: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'
    ],
    PHOTOS: {
      SRC: [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
      ],
      WIDTH: 65,
      HEIGHT: 50
    },
    LOCATION: {
      X: {
        MIN: 300,
        MAX: 900
      },
      Y: {
        MIN: 100,
        MAX: 450
      }
    },
    PIN: {
      WIDTH: 50,
      HEIGHT: 70
    }
  };

  window.KEY_CODE = {
    ESC: 27,
    ENTER: 13
  };

  var getRandomValue = function (min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min));
  };

  var getRandomIndexArray = function (array) {
    return Math.floor(Math.random() * (array.length));
  };

  var getRandomMixedArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  var getRandomListElementArray = function (array) {
    var n = array.length - 1;
    var randonCountElement = Math.floor(Math.random() * (n + 1) + 1);
    if (randonCountElement <= 1) {
      return [array[getRandomIndexArray(array)]];
    } else {
      var remainingElement = [];
      var randomMixedArray = getRandomMixedArray(array);
      for (var i = 0; i < randonCountElement; i++) {
        remainingElement[i] = randomMixedArray[i];
      }
      return remainingElement;
    }
  };

  var createResultArray = function () {
    var ResultObject = {};
    for (var i = 0; i < window.INCOMING_PARAMETERS.NUMBER; i++) {
      var x = getRandomValue(window.INCOMING_PARAMETERS.LOCATION.X.MIN, window.INCOMING_PARAMETERS.LOCATION.X.MAX);
      var y = getRandomValue(window.INCOMING_PARAMETERS.LOCATION.Y.MIN, window.INCOMING_PARAMETERS.LOCATION.Y.MAX);
      ResultObject = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: window.INCOMING_PARAMETERS.TITLE[i],
          address: x + ',' + y,
          price: getRandomValue(window.INCOMING_PARAMETERS.PRICE.MIN, window.INCOMING_PARAMETERS.PRICE.MAX),
          type: window.INCOMING_PARAMETERS.TYPE[getRandomIndexArray(window.INCOMING_PARAMETERS.TYPE)],
          rooms: getRandomValue(window.INCOMING_PARAMETERS.ROOMS.MIN, window.INCOMING_PARAMETERS.ROOMS.MAX),
          guests: getRandomValue(window.INCOMING_PARAMETERS.GUESTS.MIN, window.INCOMING_PARAMETERS.GUESTS.MAX),
          checkin: window.INCOMING_PARAMETERS.CHECKIN[getRandomIndexArray(window.INCOMING_PARAMETERS.CHECKIN)],
          checkout: window.INCOMING_PARAMETERS.CHECKOUT[getRandomIndexArray(window.INCOMING_PARAMETERS.CHECKOUT)],
          features: getRandomListElementArray(window.INCOMING_PARAMETERS.FEATURES),
          description: '',
          photos: getRandomMixedArray(window.INCOMING_PARAMETERS.PHOTOS.SRC)
        },
        location: {
          x: x,
          y: y
        }
      };
      window.ResultArray.push(ResultObject);
    }
  };

  createResultArray();

}());
