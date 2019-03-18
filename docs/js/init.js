"use strict";

(function () {
  var $ = window.zepto;

  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
      FastClick.attach(document.body);
    }, false);
  }
})();

new InfoStart().run();