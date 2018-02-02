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

var showElement = function () {
  map.classList.remove('map--faded');
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
  var randonCountElement = Math.floor(Math.random() * (array.length) + 1);
  if (randonCountElement === 1) {
    return [array[getRandomIndexArray(array)]];
  } else {
    var remainingElement = getRandomMixedArray(array);
    remainingElement = remainingElement.splice(0, randonCountElement);
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

var renderMapPin = function (i) {
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapPin = mapPinTemplate.cloneNode(true);
  var mapPinImg = mapPin.querySelector('img');
  mapPin.style.left = (ResultArray[i].location.x - INCOMING_PARAMETERS.PIN.WIDTH / 2) + 'px';
  mapPin.style.top = (ResultArray[i].location.y - INCOMING_PARAMETERS.PIN.HEIGHT / 2) + 'px';
  mapPinImg.src = ResultArray[i].author.avatar;
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

  mapCard.querySelector('.popup__features').setAttribute('src', object.author.avatar);
  map.insertBefore(mapCard, mapFiltersContainer);
};

showElement();
createResultArray();
createMapPins();
createAd(ResultArray[0]);
