'use strict';

(function () {

  var showInputError = function (object) {
    object.setAttribute('style', 'border-color: red;');
  };

  var validationError = function (object) {
    object.setCustomValidity('Обязательное поле');
    showInputError(object);
  };

  var validationSuccess = function (object) {
    object.setCustomValidity('');
    object.removeAttribute('style');
  };

  window.errorHandler = function (errorMessage) {
    var errorWindow = document.createElement('div');
    errorWindow.setAttribute('style', 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;');
    errorWindow.style.position = 'absolute';
    errorWindow.style.left = 0;
    errorWindow.style.right = 0;
    errorWindow.style.fontSize = '30px';
    errorWindow.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorWindow);
  };

  var titleInput = document.querySelector('#title');
  titleInput.addEventListener('invalid', function () {
    showInputError(titleInput);
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Минимальная длина заголовка — 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Макcимальная длина заголовка — 100 символов');
    } else if (titleInput.validity.valueMissing) {
      validationError(titleInput);
    } else {
      validationSuccess(titleInput);
    }
  });

  var addressInput = document.querySelector('#address');
  addressInput.addEventListener('invalid', function () {
    if (addressInput.validity.valueMissing) {
      validationError(addressInput);
    } else {
      validationSuccess(addressInput);
    }
  });

  var getInputMinPrice = function (object) {
    var Price = 0;
    switch (object.value) {
      case 'flat':
        Price = 1000;
        break;
      case 'palace':
        Price = 10000;
        break;
      case 'house':
        Price = 5000;
        break;
    }
    return Price;
  };

  var priceInput = document.querySelector('#price');
  var typesHouse = document.querySelector('#type');
  var minPrice = getInputMinPrice(typesHouse);

  typesHouse.addEventListener('input', function () {
    minPrice = getInputMinPrice(typesHouse);
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice;
  });

  priceInput.addEventListener('invalid', function () {
    showInputError(priceInput);
    if (priceInput.type !== 'number') {
      priceInput.setCustomValidity('Введи число');
    } else if (priceInput.value < minPrice) {
      priceInput.setCustomValidity('Минимальное значение — ' + minPrice);
    } else if (priceInput.value > 1000000) {
      priceInput.setCustomValidity('Макcимальное значение — 1000000');
    } else if (priceInput.validity.valueMissing) {
      validationError(priceInput);
    } else {
      validationSuccess(priceInput);
    }
  });

  var timeOutSelect = document.querySelector('#timeout');
  var timeInSelect = document.querySelector('#timein');

  var setTimeIn = function (time) {
    if (timeInSelect.value !== time) {
      timeInSelect.value = time;
    }
  };
  var setTimeOut = function (time) {
    if (timeOutSelect.value !== time) {
      timeOutSelect.value = time;
    }
  };

  timeOutSelect.addEventListener('input', function () {
    setTimeIn(timeOutSelect.value);
  });
  timeInSelect.addEventListener('input', function () {
    setTimeOut(timeInSelect.value);
  });

  var numbersRoomSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var capacitySelectItem = capacitySelect.querySelectorAll('option');

  numbersRoomSelect.addEventListener('input', function () { /* Лиснер для первого клика, т.к по дефолту количество гостей = 3 */
    for (var i = 0; i < capacitySelectItem.length; i++) {
      capacitySelectItem[i].disabled = false;
    }
    switch (numbersRoomSelect.value) {
      case '1':
        capacitySelect.value = numbersRoomSelect.value;
        capacitySelectItem[0].disabled = true;
        capacitySelectItem[1].disabled = true;
        capacitySelectItem[3].disabled = true;
        break;
      case '2':
        capacitySelect.value = '2';
        capacitySelectItem[0].disabled = true;
        capacitySelectItem[3].disabled = true;
        break;
      case '3':
        capacitySelect.value = '3';
        capacitySelectItem[3].disabled = true;
        break;
      case '100':
        capacitySelect.value = '0';
        capacitySelectItem[0].disabled = true;
        capacitySelectItem[1].disabled = true;
        capacitySelectItem[2].disabled = true;
        break;
    }
  });

  window.noticeForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(window.noticeForm), function () {
      window.noticeForm.reset();
    }, window.errorHandler);
    evt.preventDefault();
  });
}());
