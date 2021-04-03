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

$(document).ready(function () {
  $('.photo').click(pickPhoto);
});
/******/ })()
;