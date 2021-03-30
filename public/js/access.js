/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************!*\
  !*** ./resources/js/access.js ***!
  \********************************/
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var navPrev = $('#nav-prev'),
    navNext = $('#nav-next'),
    navFinish = $('#nav-finish');
var page = 0;
var lastPage = 3;
var validations = [];
var schedules = $(".delete-hour");
var hoursToSend = {
  horaInicio: '',
  horaFinal: ''
};

function initValidations() {
  $.getJSON('../json/signup_validations.json', function (data) {
    validations = data;
  });
}

function navigate(change) {
  if (change > 0 && validatePage() || change <= 0) {
    $('.form-container[data-id=' + page + ']').slideUp(function () {
      page += change;
      $('.form-container[data-id=' + page + ']').slideDown();
      validateNav();
    });
  }
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

function validatePage() {
  var validation = validations[page];
  console.log(validation);
  var res = true;

  var _iterator = _createForOfIteratorHelper(validation),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var rule = _step.value;
      var element = $('#' + rule['id']);
      if (rule['required'] && !validateRequired(element, rule['type'])) res = false;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return res;
}

function validateRequired(element, type) {
  var res = true;

  switch (type) {
    case 'text':
    case 'dropdown':
      res = element.val() !== '';
      break;
  }

  var alert = element.closest('.form-group').find('.form-input-alert');
  alert.text('Campo obligatorio');
  alert.toggle(!res);
  return res;
}

function finish() {}

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

function afterClickSendHour() {
  var modal = $('#exampleModal');
  modal.find('.modal-title').text('New message to ' + 'Hello World');
  var day = modal.find('.modal-body #select-days').val();
  hoursToSend.horaInicio = modal.find('.modal-body #select-first-hour').val();
  hoursToSend.horaFinal = modal.find('.modal-body #select-last-hour').val();
  var f = new Date('01/01/2020 ' + hoursToSend.horaFinal).getTime();
  var i = new Date('01/01/2020 ' + hoursToSend.horaInicio).getTime();
  console.log(f > i);
  fillSchedule(hoursToSend, day);
}

$(document).ready(function () {
  initValidations();
  navigate(0);
  navNext.click(function () {
    navigate(1);
  });
  navPrev.click(function () {
    navigate(-1);
  });
  navFinish.click();
  $('#exampleModal #send-hour').click(afterClickSendHour());
  schedules.click(function () {
    $(this).parent().remove();
  });
});
/******/ })()
;