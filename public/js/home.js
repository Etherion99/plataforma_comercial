/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./resources/js/home.js ***!
  \******************************/
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var categoryFilter = $('#category-filter'),
    groupFilter = $('#group-filter'),
    filters = $('.filter'),
    searchBar = $('#search-bar'),
    searchResults = $('#search-results');
var inSearchResults = $('#in-search-results');
var searchCompany,
    showingResults = false;

function fillFilter(filter) {
  if (filter.val() !== '0') filter.addClass('filter-selected');else filter.removeClass('filter-selected');
  filter.niceSelect('update');
}

function loadCategories() {
  var group = $(this).val();
  categoryFilter.html($('<option>', {
    value: '0',
    text: 'Categor??a'
  }));

  if (group !== '0') {
    categoryFilter.append($('#categories-optgroup-' + group).clone());
    categoryFilter.prop('disabled', false);
    fillFilter(categoryFilter);
    categoryFilter.niceSelect('update');
  } else {
    categoryFilter.prop('disabled', true);
    fillFilter(categoryFilter);
  }
}

function search() {
  var text = searchBar.val();
  var group = groupFilter.val();
  var category = categoryFilter.val();

  if (text !== '') {
    category = category === '0' ? group : category;
    $.get('/api/companies/' + category + '/search/' + text, function (data) {
      if (data.length === 0) {
        inSearchResults.html('No hay coincidencias con la b??squeda');
        searchResults.slideDown();
      } else if (!showingResults && data.length !== 0) {
        inSearchResults.html('');

        var _iterator = _createForOfIteratorHelper(data),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var result = _step.value;
            fillResult(result);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        searchResults.slideToggle();
      } else {
        inSearchResults.html('');

        var _iterator2 = _createForOfIteratorHelper(data),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _result = _step2.value;
            fillResult(_result);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      showingResults = true;
      console.log("showing ", showingResults);
    });
  } else {
    searchResults.slideUp(function () {
      inSearchResults.html('');
    });
    showingResults = false;
  }
}

function fillResult(result) {
  var col = $('<div>', {
    'class': 'col p-1'
  }).html($('<div>', {
    'class': 'row g-0 position-relative'
  }).append($('<div>', {
    'class': 'col-3 col-md-4 col-lg-3 mb-md-0'
  }).html($('<a>', {
    'href': viewCompanyURL.substr(0, viewCompanyURL.length - 1) + result.id
  }).append($('<img>', {
    'class': 'w-100 rounded-circle',
    'src': 'https://picsum.photos/200?q=' + parseInt(Math.random() * 10)
  })))).append($('<div>', {
    'class': 'col-9 col-md-8 col-lg-9 ps-md-0'
  }).append($('<h5>', {
    'class': 'mt-0 font-weight-bold'
  }).append($('<a>', {
    'href': viewCompanyURL.substr(0, viewCompanyURL.length - 1) + result.id
  }).text(result.name))).append($('<p>').append($('<a>', {
    'href': viewCategoryURL.substr(0, viewCategoryURL.length - 1) + result.category.id
  }).text(result.category.name)))));
  inSearchResults.append(col);
}

function activateSearch() {
  clearTimeout(searchCompany);
  searchCompany = setTimeout(search, 800);
}

$(document).ready(function () {
  groupFilter.change(loadCategories);
  searchResults.hide();
  filters.change(function () {
    fillFilter($(this));
  });
  searchBar.keyup(activateSearch);
  groupFilter.change(activateSearch);
  categoryFilter.change(activateSearch); //glider settings

  $('.category-section').each(function (index) {
    new Glider(document.querySelector('#' + $(this).prop('id') + ' .glider'), {
      slidesToShow: 5,
      slidesToScroll: 5,
      arrows: {
        prev: '#' + $(this).prop('id') + ' .glider-prev',
        next: '#' + $(this).prop('id') + ' .glider-next'
      }
    });

    if (index > 0) {
      $(this).removeClass('show');
    }
  });
});
/******/ })()
;