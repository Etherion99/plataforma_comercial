/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************!*\
  !*** ./resources/js/access.js ***!
  \********************************/
var navPrev = $('#nav-prev'),
    navNext = $('#nav-next'),
    navFinish = $('#nav-finish');
var page = 0;
var lastPage = 3;
var schedules = $(".delete-hour");
var hoursToSend = {
  horaInicio: '',
  horaFinal: ''
};

function finish() {}

function initNav() {}

function navigate(change) {
  $('.form-container[data-id=' + page + ']').slideUp(function () {
    page += change;
    $('.form-container[data-id=' + page + ']').slideDown();
    validateNav();
  });
}

function validateNav() {
  console.log(page);

  if (page === 0) {
    navPrev.hide();
  } else {
    navPrev.show();
  }

  if (page === lastPage) {
    navNext.hide();
    navFinish.show();
  } else {
    navNext.show();
    navFinish.hide();
  }

  $('.form-step').removeClass('filled');

  for (var i = 0; i <= page; i++) {
    $('.form-step[data-id=' + i + ']').addClass('filled');
  }
}

function validatePage() {}

function fillSchedule(result, day) {
  var horarios = $('<div>', {
    'class': 'horarios'
  }).append($('<div>', {
    'class': 'badge-custom'
  }).text(result.horaInicio)).append($('<div>', {
    'class': 'badge-custom'
  }).text(result.horaFinal)).append($('<button>', {
    'type': 'button',
    'class': 'close ml-15 delete-hour'
  }).html($('<i>', {
    'class': 'fas fa-trash-alt'
  })));
  $('#day-' + day).append(horarios);
  schedules = $(".delete-hour");
  schedules.click(function () {
    $(this).parent().remove();
  });
}

$(document).ready(function () {
  navigate(1);
  navNext.click(function () {
    navigate(1);
  });
  navPrev.click(function () {
    navigate(-1);
  });
  navFinish.click();
  $('#exampleModal #send-hour').click(function () {
    var modal = $('#exampleModal');
    modal.find('.modal-title').text('New message to ' + 'Hello World');
    var day = modal.find('.modal-body #select-days').val();
    hoursToSend.horaInicio = modal.find('.modal-body #select-first-hour').val();
    hoursToSend.horaFinal = modal.find('.modal-body #select-last-hour').val();
    fillSchedule(hoursToSend, day);
  });
  schedules.click(function () {
    $(this).parent().remove();
  });
});
/******/ })()
;