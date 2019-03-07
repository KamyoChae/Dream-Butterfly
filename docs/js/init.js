"use strict";

(function () {
  var $ = window.zepto;

  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
      FastClick.attach(document.body);
    }, false);
  }

  for (var i = 0; i < 10; i++) {
    var renderStone = new renderli(2, ".ob-list"); // 渲染石头

    renderStone.run();
  }
})();