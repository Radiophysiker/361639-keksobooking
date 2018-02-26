'use strict';

(function () {

  var XHR_TIME_OUT = 10000;
  var SERVER_CODE = 200;

  var getSetup = function (onSuccess, onError, method, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SERVER_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_TIME_OUT;

    xhr.open(method, url);

    return xhr;
  };

  window.backend = {
    load: function (onLoad, error) {
      var urlServer = 'https://js.dump.academy/keksobooking/data';
      var methodTransmission = 'GET';
      var xhr = getSetup(onLoad, error, methodTransmission, urlServer);

      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var urlServer = 'https://js.dump.academy/keksobooking';
      var methodTransmission = 'POST';
      var xhr = getSetup(onLoad, onError, methodTransmission, urlServer);

      xhr.send(data);
    }
  };
})();
