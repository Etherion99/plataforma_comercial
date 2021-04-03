/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************************!*\
  !*** ./resources/js/viewCompany.js ***!
  \*************************************/
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
  but = $('<div>').html($('<span>').text('HOY, cierra a las ' + closeSchedule + ' ')).append($('<div>', {
    'class': 'd-inline-block viewUniqueSchedule text-success'
  }).text('Abierto'));

  if (!open) {
    but = $('<div>').html($('<span>').text('HOY ')).append($('<div>', {
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

$(document).ready(function () {
  $('.photo').click(pickPhoto);
  updateScheduleNow();
});
/******/ })()
;