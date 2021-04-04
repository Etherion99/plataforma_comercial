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
    group = $('#group'),
    category = $('#category'),
    department = $('#department'),
    municipality = $('#municipality');
var page = 0;
var lastPage = 3;
var daySchedules = [{}, {}, {}, {}, {}, {}, {}];
var validations = [];
var uniqueId = 0;
var phonesModel = {};
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

function loadCategories() {
  var groupId = $(this).val();
  category.html($('<option>', {
    value: '',
    text: 'Seleccione'
  }));

  if (groupId !== '') {
    category.append($('#categories-optgroup-' + groupId).clone());
    category.prop('disabled', false);
    category.niceSelect('update');
  } else {
    category.prop('disabled', true);
    category.niceSelect('update');
  }
}

function loadMunicipalities() {
  var departmentId = $(this).val();
  municipality.html($('<option>', {
    value: '',
    text: 'Seleccione'
  }));

  if (departmentId !== '') {
    municipality.append($('#municipalities-optgroup-' + departmentId).clone());
    municipality.prop('disabled', false);
    municipality.niceSelect('update');
  } else {
    municipality.prop('disabled', true);
    municipality.niceSelect('update');
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
  var res = true;

  var _iterator = _createForOfIteratorHelper(validation),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var rule = _step.value;
      if (rule['required'] && !validateRequired(rule['id'], rule['type'], rule['message'])) res = false;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return res;
}

function validateRequired(id, type, message) {
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

        case 'phones':
          res = Object.keys(phonesModel).length > 0;
          break;
      }

      break;
  }

  var alert = element.closest('.form-group').find('.form-input-alert');
  console.log(message);
  alert.text(message);
  alert.toggle(!res);
  return res;
}

function finish() {
  var data = new FormData();
  data.append('logo', $('#logo')[0].files[0]);
  var companyData = {
    name: $('#name').val(),
    category_id: $('#category').val(),
    description: $('#description').val(),
    delivery: $('#delivery').val(),
    pack_id: $('#pack').val()
  };
  data.append('company_data', JSON.stringify(companyData));
  var paymentMethods = [];
  $('.payment-method').each(function () {
    if ($(this).prop('checked')) paymentMethods.push($(this).val());
  });
  var schedules = [];

  for (var dayKey in daySchedules) {
    var day = daySchedules[dayKey];
    var keys = Object.keys(day);

    for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
      var key = _keys[_i];
      var schedule = day[key];
      schedule['day'] = dayKey;
      schedules.push(schedule);
    }
  }

  var phones = [];

  for (var _i2 = 0, _Object$keys = Object.keys(phonesModel); _i2 < _Object$keys.length; _i2++) {
    var phoneKey = _Object$keys[_i2];
    var phone = phonesModel[phoneKey];
    phones.push({
      number: phone.number,
      phone_type_id: phone.type
    });
  }

  var addresses = [];
  addresses.push({
    municipality_id: $('#municipality').val(),
    text: $('#address').val()
  });
  var socialNetworks = [];
  $('.social-network input').each(function () {
    if ($(this).val() !== '') socialNetworks.push({
      url: $(this).val(),
      social_network_id: $(this).attr('data-id')
    });
  });
  var otherData = {
    payment_methods: paymentMethods,
    schedules: schedules,
    phones: phones,
    addresses: addresses,
    social_networks: socialNetworks
  };
  data.append('other_data', JSON.stringify(otherData));
  $('.photos-form .input-photo').each(function (index) {
    if ($(this)[0].files && $(this)[0].files[0]) {
      data.append('gallery[]', $(this)[0].files[0]);
      console.log(index);
    }
  });
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
    'id': 'start'
  }).text(result.start)).append($('<span>', {
    'id': 'end',
    'class': 'ml-2'
  }).text(result.end)).append($('<button>', {
    'type': 'button',
    'class': 'close ml-15 delete-hour'
  }).html($('<i>', {
    'class': 'fas fa-trash-alt'
  })));
  $('#day-' + day).append(horario);
  console.log($('#day-' + day));
  daySchedules[day][uniqueId] = {
    start: result.start,
    end: result.end
  };
  $('#' + idToFill).find('.delete-hour').click(function () {
    removeSchedules(idToFill);
    $('#' + idToFill).remove();
  });
  uniqueId++;
}

function validateHours() {
  var day = $('#select-days').val();
  var hours = {
    start: $('#select-first-hour').val(),
    end: $('#select-last-hour').val()
  };
  var can = true;
  var message;
  var f2 = new Date('01/01/2020 ' + hours.end).getTime();
  var i2 = new Date('01/01/2020 ' + hours.start).getTime();

  if (hours.end !== '' && hours.start !== '') {
    if (f2 > i2) {
      for (var _i3 = 0, _Object$keys2 = Object.keys(daySchedules[day]); _i3 < _Object$keys2.length; _i3++) {
        var index = _Object$keys2[_i3];
        var f1 = new Date('01/01/2020 ' + daySchedules[day][index].end).getTime();
        var i1 = new Date('01/01/2020 ' + daySchedules[day][index].start).getTime();

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
    $('#add-schedule-modal').modal('hide');
    fillSchedule(hours, day);
    clearAddScheduleModal();
  } else {
    $('#messageSchedule').text(message);
    $('#alertScheduleModal').slideDown();
  }
}

function clearAddScheduleModal() {
  $('#select-first-hour').val('');
  $('#select-last-hour').val('');
  $('#select-days').val('');
}

function addPhone() {
  var phone = {
    number: $('#phone-number').val(),
    type: $('#phone-type').val()
  };

  if ($('#phone-number').val() !== '' && $('#phone-type').val() !== '') {
    if (addPhoneValidation(phone)) {
      $('#alertPhoneModal').slideUp();
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
      phonesModel[phonesId] = phone;
      $('#' + idHtml).find('.delete-phone').click(function () {
        removePhone(idHtml);
      });
      phonesId++;
      clearAddPhonemodal();
    } else {
      $('#messagePhone').text('Este número ya ha sido registrado');
      $('#alertPhoneModal').slideDown();
    }
  } else {
    $('#messagePhone').text('Ingresa el número y selecciona el tipo');
    $('#alertPhoneModal').slideDown();
  }
}

function addPhoneValidation(newPhone) {
  for (var _i4 = 0, _Object$keys3 = Object.keys(phonesModel); _i4 < _Object$keys3.length; _i4++) {
    var index = _Object$keys3[_i4];
    if (phonesModel[index].number === newPhone.number) return false;
  }

  return true;
}

function removePhone(id) {
  $('#' + id).remove();
  delete phonesModel[id.split('-')[1]];
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
  navNext.click(function () {
    navigate(1);
  });
  navPrev.click(function () {
    navigate(-1);
  });
  navFinish.click(finish);
  group.change(loadCategories);
  department.change(loadMunicipalities);
  $('#closeAlertScheduleModal').click(function () {
    $('#alertScheduleModal').slideUp();
  });
  $('#add-schedule').click(validateHours); //phones

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