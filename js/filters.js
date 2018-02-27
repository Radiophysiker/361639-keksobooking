'use strict';

(function () {

  var priceLimits = {
    low: 10000,
    high: 50000
  };

  var allFilters = document.querySelectorAll('.map__filter');

  var priceParameters = {
    'low': function (price) {
      return price < priceLimits.low;
    },
    'middle': function (price) {
      return price >= priceLimits.low && price < priceLimits.high;
    },
    'high': function (price) {
      return price >= priceLimits.high;
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

  window.filters = function (originalArray) {
    var selectedFeatures = document.querySelectorAll('.map__filter-set input[type="checkbox"]:checked');
    var selectedFilters = Array.from(allFilters).filter(function (filter) {
      return filter.value !== 'any';
    });

    var newArrays = originalArray.slice();

    selectedFilters.forEach(function (item) {
      var type = item.name.split('-')[1];
      newArrays = (type === 'price') ? filterByPrice(newArrays, item.value) : filterByValue(newArrays, item.value, type);
    });

    selectedFeatures.forEach(function (item) {
      newArrays = filterByFeatures(newArrays, item.value);
    });

    return newArrays;

  };
})();
