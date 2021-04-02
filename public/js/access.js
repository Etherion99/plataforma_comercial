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
    navFinish = $('#nav-finish'),
    groupFilter = $('#group'),
    categoryFilter = $('#category'),
    filters = $('.filter');
var page = 0;
var lastPage = 3;
var daySchedules = [{}, {}, {}, {}, {}, {}, {}]; //JSON.parse("[{\"0\":{\"horaInicio\":\"08:00\",\"horaFinal\":\"10:00\"}},{},{\"1\":{\"horaInicio\":\"12:00\",\"horaFinal\":\"15:00\"},\"2\":{\"horaInicio\":\"16:00\",\"horaFinal\":\"18:30\"}},{},{},{},{}]");// [{}, {}, {}, {}, {}, {}, {}];

var validations = [];
var uniqueId = 0;
var phones = {};
var phonesId = 0;
var phoneTypes = {
  1: {
    name: 'Fijo',
    icons: ['fas fa-phone']
  },
  2: {
    name: 'Celular',
    icons: ['fas fa-mobile-alt']
  },
  3: {
    name: 'Whatsapp',
    icons: ['fab fa-whatsapp']
  },
  4: {
    name: 'Llamadas y Whatsapp',
    icons: ['fas fa-mobile-alt', 'fab fa-whatsapp']
  }
};

function fillFilter(filter) {
  if (filter.val() !== '0') filter.addClass('filter-selected');else filter.removeClass('filter-selected');
  filter.niceSelect('update');
}

function loadCategories() {
  var group = $(this).val();
  categoryFilter.html($('<option>', {
    value: '0',
    text: 'Categoría'
  }));
  if (group !== '0') $.get('/api/categories/group/' + group, {}, function (data) {
    data.map(function (option) {
      return categoryFilter.append($('<option>', {
        value: option.id,
        text: option.name
      }));
    });
    categoryFilter.prop('disabled', false);
    fillFilter(categoryFilter);
    categoryFilter.niceSelect('update');
  });else {
    categoryFilter.prop('disabled', true);
    fillFilter(categoryFilter);
  }
}

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
  if (page === 0) {
    navPrev.hide();
  } else {
    navPrev.show();
  }

  if (page === lastPage) {
    navNext.hide();
    navFinish.show();
  } else {
    navNext.show(); //navFinish.hide();
  }

  $('.form-step').removeClass('filled');

  for (var i = 0; i <= page; i++) {
    $('.form-step[data-id=' + i + ']').addClass('filled');
  }
}

function validatePage() {
  var validation = validations[page];
  var res = true;

  var _iterator = _createForOfIteratorHelper(validation),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var rule = _step.value;
      if (rule['required'] && !validateRequired(rule['id'], rule['type'])) res = false;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return res;
}

function validateRequired(id, type) {
  var element = $('#' + id);
  var res = true;

  switch (type) {
    case 'text':
    case 'dropdown':
      res = element.val() !== '';
      break;

    case 'file':
      res = element[0].files && element[0].files[0];
      break;

    case 'checkbox':
      res = false;
      element.find('input[type=checkbox').each(function () {
        if ($(this).prop('checked')) {
          res = true;
          return false;
        }
      });
      break;

    case 'special':
      switch (id) {
        case 'schedules':
          res = false;

          var _iterator2 = _createForOfIteratorHelper(daySchedules),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var schedule = _step2.value;

              if (Object.keys(schedule).length > 0) {
                res = true;
                break;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          break;
      }

      break;
  }

  console.log(type);
  console.log(res);
  var alert = element.closest('.form-group').find('.form-input-alert');
  alert.text('Campo obligatorio');
  alert.toggle(!res);
  return res;
}

function finish() {
  var data = new FormData();
  $('.photos-form .input-photo').each(function () {
    if ($(this)[0].files && $(this)[0].files[0]) {
      data.append('gallery[]', $(this)[0].files[0]);
    }
  });
  var logo = $('#logo');
  if (logo[0].files && logo[0].files[0]) data.append('logo', logo[0].files[0]);
  var paymentMethods = [];
  $('.payment-method').each(function () {
    if ($(this).prop('checked')) paymentMethods.push($(this).val());
  });
  var companyData = {
    name: $('#name').val(),
    category_id: $('#category').val(),
    description: $('#description').val(),
    delivery: $('#delivery').val()
    /*,
    schedules: daySchedules,
    department: $('#department').val(),
    municipality: $('#municipality').val(),
    address: $('#address').val(),
    phones: phones*/

  };
  data.append('company_data', JSON.stringify(companyData));
  var otherData = {
    payment_methods: paymentMethods
  };
  $.ajax({
    url: signupURL,
    method: 'POST',
    data: data,
    contentType: false,
    cache: false,
    processData: false
  });
}

function removeSchedules(result) {
  var resultSplit = result.split('-');
  var day = parseInt(resultSplit[1]);
  var id = parseInt(resultSplit[2]);
  delete daySchedules[day][id];
}

function fillSchedule(result, day) {
  var idToFill = 'horario-' + day + '-' + uniqueId;
  var horario = $('<div>', {
    'class': 'badge-custom d-flex align-items-center',
    'id': idToFill
  }).append($('<span>', {
    'id': 'horaInicio'
  }).text(result.horaInicio)).append($('<span>', {
    'id': 'horaFinal',
    'class': 'ml-2'
  }).text(result.horaFinal)).append($('<button>', {
    'type': 'button',
    'class': 'close ml-15 delete-hour'
  }).html($('<i>', {
    'class': 'fas fa-trash-alt'
  })));
  $('#day-' + day).append(horario);
  daySchedules[day][uniqueId] = {
    horaInicio: result.horaInicio,
    horaFinal: result.horaFinal
  };
  console.log(JSON.stringify(daySchedules));
  $('#' + idToFill).find('.delete-hour').click(function () {
    removeSchedules(idToFill);
    $('#' + idToFill).remove();
  });
  uniqueId++;
}

function validateHours() {
  var day = $('#select-days').val();
  var hoursToSend = {
    horaInicio: $('#select-first-hour').val(),
    horaFinal: $('#select-last-hour').val()
  };
  var can = true;
  var message;
  var f2 = new Date('01/01/2020 ' + hoursToSend.horaFinal).getTime();
  var i2 = new Date('01/01/2020 ' + hoursToSend.horaInicio).getTime();

  if (hoursToSend.horaFinal !== '' && hoursToSend.horaInicio !== '') {
    if (f2 > i2) {
      for (var _i = 0, _Object$keys = Object.keys(daySchedules[day]); _i < _Object$keys.length; _i++) {
        var index = _Object$keys[_i];
        var f1 = new Date('01/01/2020 ' + daySchedules[day][index].horaFinal).getTime();
        var i1 = new Date('01/01/2020 ' + daySchedules[day][index].horaInicio).getTime();

        if (i2 < f1 && f2 > i1) {
          can = false;
          message = "Hay algún horario que se está cruzando";
        }
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
    $('#alertScheduleModal').slideUp();
    $('#send-hour').attr('data-dismiss', 'modal');
    fillSchedule(hoursToSend, day);
  } else {
    $('#send-hour').attr('data-dismiss', '');
    $('#alertScheduleModal #messageSchedule').text(message);
    $('#alertScheduleModal').slideDown();
  }
}

function addPhone() {
  var phone = {
    number: $('#phone-number').val(),
    type: $('#phone-type').val()
  };

  if (addPhoneValidation(phone)) {
    var idHtml = 'phone-' + phonesId;
    var iconsHtml = $('<span>');

    var _iterator3 = _createForOfIteratorHelper(phoneTypes[phone.type].icons),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var icon = _step3.value;
        iconsHtml.append($('<i>', {
          "class": icon + ' ml-2'
        }));
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    var phoneHtml = $('<div>', {
      "class": 'badge-custom d-flex align-items-center',
      id: idHtml
    }).append(iconsHtml).append($('<span>', {
      "class": 'ml-3'
    }).text(phone.number)).append($('<button>', {
      'type': 'button',
      'class': 'close ml-4 delete-phone'
    }).html($('<i>', {
      'class': 'fas fa-trash-alt'
    })));
    $('#phones').append(phoneHtml);
    phones[phonesId] = phone;
    $('#' + idHtml).find('.delete-phone').click(function () {
      removePhone(idHtml);
    });
    phonesId++;
    console.log(phones);
    clearAddPhonemodal();
  } else {
    console.log('invalid');
  }
}

function addPhoneValidation(newPhone) {
  for (var _i2 = 0, _Object$keys2 = Object.keys(phones); _i2 < _Object$keys2.length; _i2++) {
    var index = _Object$keys2[_i2];
    if (phones[index].number === newPhone.number) return false;
  }

  return true;
}

function removePhone(id) {
  $('#' + id).remove();
  delete phones[id.split('-')[1]];
}

function clearAddPhonemodal() {
  $('#add-phone-modal').modal('hide');
  $('#phone-number').val('');
  $('#phone-type').val('');
  $('#phone-type').niceSelect('update');
}

function pickPhoto(id) {
  $('input[type=file][data-id=' + id + ']').click();
}

function updatePreview(input) {
  var id = input.getAttribute('data-id');

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (event) {
      $('.photo[data-id=' + id + ']').css('background-image', 'url(\"' + event.target.result + '\")');
      $('.photo[data-id=' + id + '] i').hide();
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    $('.photo[data-id=' + id + ']').css('background-image', 'none');
    $('.photo[data-id=' + id + '] i').show();
  }
}

$(document).ready(function () {
  uniqueId = 0;
  initValidations();
  navigate(0);
  $('.form-container[data-id=' + 0 + ']').slideUp(function () {
    $('.form-container[data-id=' + 1 + ']').slideDown();
  });
  page = 1;
  navNext.click(function () {
    navigate(1);
  });
  navPrev.click(function () {
    navigate(-1);
  });
  navFinish.click(finish);
  groupFilter.change(loadCategories);
  filters.change(function () {
    fillFilter($(this));
  });
  $('#closeAlertScheduleModal').click(function () {
    $('#alertScheduleModal').slideUp();
  });
  $('#exampleModal #send-hour').click(validateHours); //phones

  $('#add-phone').click(addPhone); //photos

  $('.photo').click(function () {
    pickPhoto($(this).attr('data-id'));
  });
  $('.input-photo').change(function () {
    updatePreview(this);
  });
});
/******/ })()
;