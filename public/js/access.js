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
  $('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal

    var recipient = button.data('whatever'); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.

    var modal = $(this);
    modal.find('.modal-title').text('New message to ' + recipient);
    modal.find('.modal-body input').val(recipient);
  });
});
/******/ })()
;