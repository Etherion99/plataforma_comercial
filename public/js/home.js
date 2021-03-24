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

function search() {
  var text = searchBar.val();
  var group = groupFilter.val();
  var category = categoryFilter.val();

  if (text !== '') {
    category = category === '0' ? group : category;
    $.get('/api/companies/' + category + '/search/' + text, function (data) {
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

      if (showingResults && data.length === 0 || !showingResults && data.length !== 0) searchResults.slideToggle();
      showingResults = data.length !== 0;
    });
  } else {
    searchResults.slideUp();
    showingResults = false;
    inSearchResults.html('');
  }
}

function fillResult(result) {
  var col = $('<div>', {
    'class': 'col'
  }).html($('<div>', {
    'class': 'row g-0 bg-light position-relative'
  }).append($('<div>', {
    'class': 'col-md-3 mb-md-0 p-md-4'
  }).html($('<img>', {
    'class': 'w-100 rounded-circle',
    'src': 'https://picsum.photos/200?q=' + parseInt(Math.random() * 10)
  }))).append($('<div>', {
    'class': 'col-md-6 p-4 ps-md-0'
  }).append($('<h5>', {
    'class': 'mt-0'
  }).text(result.name)).append($('<p>').text(result.category.name))));
  inSearchResults.append(col);
}

function activateSearch() {
  clearTimeout(searchCompany);
  searchCompany = setTimeout(search, 1000);
}

$(document).ready(function () {
  groupFilter.change(loadCategories);
  searchResults.hide();
  searchBar.blur(function () {
    searchResults.slideUp();
    showingResults = false;
  });
  searchBar.focus(activateSearch);
  filters.change(function () {
    fillFilter($(this));
  });
  searchBar.keyup(activateSearch);
});
/******/ })()
;