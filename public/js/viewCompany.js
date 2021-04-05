/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************************!*\
  !*** ./resources/js/viewCompany.js ***!
  \*************************************/
var paymentIcons = {
  1: "fas fa-money-bill-wave",
  2: "fas fa-credit-card",
  3: "fas fa-receipt",
  4: "fas fa-qrcode"
};

function pickPhoto() {
  var sourceImage = $(this).css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
  console.log(sourceImage);
  $('#imgInModal').attr('src', sourceImage);
  $('#viewPhotosModal').modal('show');
}

function showStateToday() {
  var actualDate = new Date();
  $('#collapseSchedule th').removeClass('main-color');
  $('#day-' + actualDate.getDay()).siblings('th').addClass('main-color');
  var open = false;
  var closeSchedule = '';
  schedules[actualDate.getDay()].forEach(function (element) {
    var year = actualDate.getFullYear(),
        month = actualDate.getMonth() + 1,
        day = actualDate.getDate(),
        horas = actualDate.getHours(),
        minutos = actualDate.getMinutes(),
        todayTimeStamp = new Date(day + '/' + month + '/' + year + ' ' + horas + ':' + minutos).getTime();
    var i = new Date(day + '/' + month + '/' + year + ' ' + element.start).getTime();
    var f = new Date(day + '/' + month + '/' + year + ' ' + element.end).getTime();

    if (todayTimeStamp >= i && todayTimeStamp <= f) {
      open = true;
      closeSchedule = element.end;
    }
  });
  var but = '';
  but = $('<div>', {
    'class': 'd-inline-block'
  }).html($('<span>').text('HOY, cierra a las ' + closeSchedule + ' ')).append($('<div>', {
    'class': 'd-inline-block viewUniqueSchedule text-success'
  }).text('Abierto'));

  if (!open) {
    but = $('<div>', {
      'class': 'd-inline-block'
    }).html($('<span>').text('HOY ')).append($('<div>', {
      'class': 'd-inline-block viewUniqueSchedule text-danger'
    }).text('Cerrado'));
  }

  $('#todaySchedule').html(but);
  setTimeout(showStateToday, 40000);
}

function updateScheduleNow() {
  schedules.forEach(function (element, index) {
    if (schedules[index].length !== 0) {
      $('#day-' + index).html("");
      schedules[index].forEach(function (element) {
        $('#day-' + index).append($('<div>', {
          'class': 'd-inline-block viewUniqueSchedule mr-1'
        }).text(element.start + "-" + element.end));
      });
    }
  });
  showStateToday();
}

function fillPhoneIcons() {
  var _loop = function _loop() {
    var i = _Object$keys[_i];
    $('#icons-' + i).html('');
    icons[i].forEach(function (element) {
      $('#icons-' + i).append($('<i>', {
        'class': element + " mr-1"
      }));
    });
  };

  for (var _i = 0, _Object$keys = Object.keys(icons); _i < _Object$keys.length; _i++) {
    _loop();
  }
}

function fillPaymentIcons() {
  for (var _i2 = 0, _Object$keys2 = Object.keys(paymentIcons); _i2 < _Object$keys2.length; _i2++) {
    var i = _Object$keys2[_i2];
    $('#method-' + i).html($('<i>', {
      'class': paymentIcons[i]
    }));
  }
}

$(document).ready(function () {
  $('.photo').click(pickPhoto);
  updateScheduleNow();
  fillPhoneIcons();
  fillPaymentIcons();
});
/******/ })()
;