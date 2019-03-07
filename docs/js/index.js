"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StartGame =
/*#__PURE__*/
function () {
  function StartGame() {
    _classCallCheck(this, StartGame);
  }

  _createClass(StartGame, [{
    key: "clickStart",
    value: function clickStart() {
      var start = document.querySelector(".startbtn");
      var win_index = document.querySelector('.index');
      var win_start = document.querySelector('.start');
      start.addEventListener('click', function () {
        win_index.style.zIndex = "-999";
        win_start.style.zIndex = "999";
      });
    }
  }, {
    key: "run",
    value: function run() {
      this.clickStart();
    }
  }]);

  return StartGame;
}();

new StartGame().run();