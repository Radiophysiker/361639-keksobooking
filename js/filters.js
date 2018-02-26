'use strict';

(function () {

  var PriceLimits = {
    LOW: 10000,
    HIGH: 50000
  };

  var allFilters = document.querySelectorAll('.map__filter');

  var priceParameters = {
    'low': function (price) {
      return price < PriceLimits.LOW;
    },
    'middle': function (price) {
      return price >= PriceLimits.LOW && price < PriceLimits.HIGH;
    },
    'high': function (price) {
      return price >= PriceLimits.HIGH;
    }
  };

  var filterByValue = function (array, value, type) {
    return array.filter(function (it) {
      return it.offer[type].toString() === value;
    });
  };

  var filterByFeatures = function (array, feature) {
    return array.filter(function (it) {
      return it.offer.features.indexOf(feature) !== -1;
    });
  };

  var filterByPrice = function (array, value) {
    return array.filter(function (it) {
      return priceParameters[value](it.offer.price);
    });
  };

  window.filter = function (originalArray) {
    var selectedFeatures = document.querySelectorAll('.map__filter-set input[type="checkbox"]:checked');
    var selectedFilters = Array.from(allFilters).filter(function (filter) {
      return filter.value !== 'any';
    });

    var newArray = originalArray.slice();

    selectedFilters.forEach(function (item) {
      var type = item.name.split('-')[1];
      newArray = (type === 'price') ? filterByPrice(newArray, item.value) : filterByValue(newArray, item.value, type);
    });

    selectedFeatures.forEach(function (item) {
      newArray = filterByFeatures(newArray, item.value);
    });

    return newArray;

  };
})();
