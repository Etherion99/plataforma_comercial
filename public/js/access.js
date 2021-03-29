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

$(document).ready(function () {
  navigate(0);
  navNext.click(function () {
    navigate(1);
  });
  navPrev.click(function () {
    navigate(-1);
  });
  navFinish.click();
});
/******/ })()
;