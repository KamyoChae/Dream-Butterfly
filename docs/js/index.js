"use strict";

var $ = window.zepto;

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

var renderStone = new renderli(2, ".ob-list"); // 渲染石头

renderStone.run();