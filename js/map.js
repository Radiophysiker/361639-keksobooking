'use strict';

var map = document.querySelector('.map');
var mapCard = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);
var ResultArray = [];

var INCOMING_PARAMETERS = {
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
    WIDTH: 70,
    HEIGHT: 50
  },
  LOCATION: {
    X: {
      MIN: 300,
      MAX: 900
    },
    Y: {
      MIN: 150,
      MAX: 500
    }
  },
  PIN: {
    WIDTH: 50,
    HEIGHT: 70
  }
};

var KEY_CODE = {
  ESC: 27,
  ENTER: 13
};

var noticeForm = document.querySelector('.notice__form');
var formFieldSet = noticeForm.querySelectorAll('fieldset');
var mapPinMain = map.querySelector('.map__pin--main');
var numberClickMapPinMain = 0;

var setFadedClass = function (object, nameClass) {
  if (!object.classList.contains(nameClass)) {
    object.classList.add(nameClass);
  }
};

var openPage = function () {
  setFadedClass(map, 'map--faded');
  setFadedClass(noticeForm, 'notice__form--disabled');

  for (var i = 0; i < formFieldSet.length; i++) {
    if (!formFieldSet[i].disabled) {
      formFieldSet[i].disabled = true;
    }
  }
};

openPage();

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
  for (var i = 0; i < INCOMING_PARAMETERS.NUMBER; i++) {
    var x = getRandomValue(INCOMING_PARAMETERS.LOCATION.X.MIN, INCOMING_PARAMETERS.LOCATION.X.MAX);
    var y = getRandomValue(INCOMING_PARAMETERS.LOCATION.Y.MIN, INCOMING_PARAMETERS.LOCATION.Y.MAX);
    ResultObject = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: INCOMING_PARAMETERS.TITLE[i],
        address: x + ',' + y,
        price: getRandomValue(INCOMING_PARAMETERS.PRICE.MIN, INCOMING_PARAMETERS.PRICE.MAX),
        type: INCOMING_PARAMETERS.TYPE[getRandomIndexArray(INCOMING_PARAMETERS.TYPE)],
        rooms: getRandomValue(INCOMING_PARAMETERS.ROOMS.MIN, INCOMING_PARAMETERS.ROOMS.MAX),
        guests: getRandomValue(INCOMING_PARAMETERS.GUESTS.MIN, INCOMING_PARAMETERS.GUESTS.MAX),
        checkin: INCOMING_PARAMETERS.CHECKIN[getRandomIndexArray(INCOMING_PARAMETERS.CHECKIN)],
        checkout: INCOMING_PARAMETERS.CHECKOUT[getRandomIndexArray(INCOMING_PARAMETERS.CHECKOUT)],
        features: getRandomListElementArray(INCOMING_PARAMETERS.FEATURES),
        description: '',
        photos: getRandomMixedArray(INCOMING_PARAMETERS.PHOTOS.SRC)
      },
      location: {
        x: x,
        y: y
      }
    };
    ResultArray.push(ResultObject);
  }
};

var translateTypeOffer = function (type) {
  var valueType = '';
  if (type === 'flat') {
    valueType = 'Квартира';
  }
  if (type === 'bungalo') {
    valueType = 'Бунгало';
  }
  if (type === 'house') {
    valueType = 'Дом';
  }
  return valueType;
};

var getFeature = function (features) {
  var featureListFragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var featureListNewElement = document.createElement('li');
    featureListNewElement.className = 'feature feature--' + features[i];
    featureListFragment.appendChild(featureListNewElement);
  }
  return featureListFragment;
};

var renderFeatures = function (arrayFeatures) {
  var featureList = mapCard.querySelector('ul');
  featureList.innerHTML = '';
  featureList.appendChild(getFeature(arrayFeatures));
};

var getPhoto = function (photos, widthPhotos, heightPhotos) {
  var photosListFragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var photosListNewElement = document.createElement('li');
    var imgListNewElement = document.createElement('img');
    imgListNewElement.src = photos[i];
    imgListNewElement.width = widthPhotos;
    imgListNewElement.height = heightPhotos;
    photosListNewElement.appendChild(imgListNewElement);
    photosListFragment.appendChild(photosListNewElement);
  }
  return photosListFragment;
};

var renderPhotos = function (arrayPhotos, widthPhotos, heightPhotos) {
  var photosList = mapCard.querySelector('.popup__pictures');
  photosList.innerHTML = '';
  photosList.appendChild(getPhoto(arrayPhotos, widthPhotos, heightPhotos));
};

var createAd = function (object) {
  var mapFiltersContainer = document.querySelector('.filters-container');
  var mapCardText = mapCard.querySelectorAll('p');
  mapCard.querySelector('h3').textContent = object.offer.title;
  mapCard.querySelector('small').textContent = object.offer.address;
  mapCard.querySelector('.popup__price').textContent = object.offer.price + ' Р/ночь';
  mapCard.querySelector('h4').textContent = translateTypeOffer(object.offer.type);
  mapCardText[2].textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
  mapCardText[3].textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
  renderFeatures(object.offer.features);
  renderPhotos(object.offer.photos, INCOMING_PARAMETERS.PHOTOS.WIDTH, INCOMING_PARAMETERS.PHOTOS.HEIGHT);
  mapCardText[4].textContent = object.offer.description;

  mapCard.querySelector('.popup__avatar').setAttribute('src', object.author.avatar);
  map.insertBefore(mapCard, mapFiltersContainer);
};


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
    createAd(ResultArray[i]);
    mapCard.classList.remove('hidden');
  };

  var closePopup = function () {
    mapPin.classList.remove('map__pin--active');
    mapCard.classList.add('hidden');
  };

  mapPin.addEventListener('click', function () {
    openPupup();

    var buttonPopupClose = document.querySelector('.popup__close');
    buttonPopupClose.addEventListener('click', function () {
      closePopup();
    });
  });

  mapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE.ENTER) {
      openPupup();
    }
  });

  mapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE.ESC) {
      closePopup();
    }
  });

  mapPin.style.left = (ResultArray[i].location.x - INCOMING_PARAMETERS.PIN.WIDTH / 2) + 'px';
  mapPin.style.top = (ResultArray[i].location.y - INCOMING_PARAMETERS.PIN.HEIGHT / 2) + 'px';
  mapPinImg.src = ResultArray[i].author.avatar;
  mapPin.tabIndex = '0';
  return mapPin;
};

var createMapPins = function () {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ResultArray.length; i++) {
    fragment.appendChild(renderMapPin(i));
  }
  mapPins.appendChild(fragment);
};

var restrictLocation = function (number, locationMin, locationMax) {
  if (number >= locationMin && number <= locationMax) {
    return number;
  } else if (number < locationMin) {
    return locationMin;
  } else {
    return locationMax;
  }
};

mapPinMain.addEventListener('mouseup', function (evt) {
  var coordinateX = restrictLocation(evt.pageX, INCOMING_PARAMETERS.LOCATION.X.MIN, INCOMING_PARAMETERS.LOCATION.X.MAX);

  var coordinateY = restrictLocation(evt.pageY - INCOMING_PARAMETERS.PIN.HEIGHT / 2, INCOMING_PARAMETERS.LOCATION.Y.MIN, INCOMING_PARAMETERS.LOCATION.Y.MAX);
  var inputAdress = document.querySelector('#address');
  inputAdress.value = 'X: ' + coordinateX + ',Y: ' + coordinateY;
  if (numberClickMapPinMain < 1) {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');

    for (var i = 0; i < formFieldSet.length; i++) {
      if (formFieldSet[i].disabled) {
        formFieldSet[i].disabled = false;
      }
    }
    createResultArray();
    createMapPins();
  }
  numberClickMapPinMain++;
});
