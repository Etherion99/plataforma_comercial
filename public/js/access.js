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
var hoursToSend = {
  horaInicio: '',
  horaFinal: '',
  id: ''
};
var daySchedules = [[], [], [], [], [], [], []];
var validations = [];
var uniqueId = 0;

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

function removeSchedules(result) {
  var resultSplit = result.split('-');
  var day = parseInt(resultSplit[1]);
  daySchedules[day].forEach(function (element) {
    if (element.id === result) {
      var i = daySchedules[day].indexOf(element);

      if (i !== -1) {
        daySchedules[day].splice(i, 1);
      }
    }
  });
}

function fillSchedule(result, day) {
  var idToFill = 'horario-' + day + '-' + uniqueId;
  var horarios = $('<div>', {
    'class': 'horarios',
    'id': idToFill
  }).append($('<div>', {
    'class': 'badge-custom',
    'id': 'horaInicio'
  }).text(result.horaInicio)).append($('<div>', {
    'class': 'badge-custom',
    'id': 'horaFinal'
  }).text(result.horaFinal)).append($('<button>', {
    'type': 'button',
    'class': 'close ml-15 delete-hour'
  }).html($('<i>', {
    'class': 'fas fa-trash-alt'
  })));
  $('#day-' + day).append(horarios);
  daySchedules[day].push({
    horaInicio: result.horaInicio,
    horaFinal: result.horaFinal,
    id: idToFill
  });
  $('#' + idToFill).click(function () {
    removeSchedules(idToFill);
    $(this).remove();
  });
  uniqueId++;
}

function validateHours(day, hoursToSend) {
  var can = true;
  var message;
  var f2 = new Date('01/01/2020 ' + hoursToSend.horaFinal).getTime();
  var i2 = new Date('01/01/2020 ' + hoursToSend.horaInicio).getTime();

  if (hoursToSend.horaFinal !== '' && hoursToSend.horaInicio !== '') {
    if (f2 > i2) {
      if (daySchedules[day].length > 0) {
        daySchedules[day].forEach(function (element) {
          var f1 = new Date('01/01/2020 ' + element.horaFinal).getTime();
          var i1 = new Date('01/01/2020 ' + element.horaInicio).getTime();

          if (i2 < f1 && f2 > i1) {
            can = false;
            message = "Hay algún horario que se está cruzando";
          }
        });
      }
    } else {
      can = false;
      message = "La hora final debe ser mayor que la inicial";
    }
  } else {
    can = false;
    message = 'Debe ingresar una hora final y una hora inicial';
  }

  if (can) {
    $('#send-hour').attr('data-dismiss', 'modal');
    fillSchedule(hoursToSend, day);
  } else {
    $('#send-hour').attr('data-dismiss', '');
    $('#alertScheduleModal #messageSchedule').text(message);
    $('#alertScheduleModal').slideDown();
  }
}

function afterClickSendHour() {
  var modal = $('#exampleModal');
  modal.find('.modal-title').text('New message to ' + 'Hello World');
  var day = modal.find('.modal-body #select-days').val();
  hoursToSend.horaInicio = modal.find('.modal-body #select-first-hour').val();
  hoursToSend.horaFinal = modal.find('.modal-body #select-last-hour').val();
  validateHours(day, hoursToSend);
}

$(document).ready(function () {
  uniqueId = 0;
  initValidations();
  navigate(0);
  navNext.click(function () {
    navigate(1);
  });
  navPrev.click(function () {
    navigate(-1);
  });
  navFinish.click();
  $('#closeAlertScheduleModal').click(function () {
    $('#alertScheduleModal').slideUp();
  });
  $('#exampleModal #send-hour').click(afterClickSendHour);
});
/******/ })()
;