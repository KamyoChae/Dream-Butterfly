"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ModelControl =
/*#__PURE__*/
function () {
  function ModelControl(num, dom) {
    _classCallCheck(this, ModelControl);

    this.dom = document.querySelector(dom);
    this.num = num;
  }

  _createClass(ModelControl, [{
    key: "run",
    value: function run() {
      this.createInterval(this.num, this.dom);
    }
  }, {
    key: "createInterval",
    value: function createInterval(num, dom) {
      console.log(dom);
      var count = num;
      clearInterval(timer);
      dom.innerHTML = "<span>".concat(count, "</span>");
      dom.classList.add("show");
      var that = this;
      var timer = setInterval(function () {
        count--;

        if (count) {
          dom.innerHTML = "<span>".concat(count, "</span>");
        } else {
          // dom.innerHTML = "游戏开始"
          dom.classList.remove("show");
          var pupl = document.querySelector(".pupl");
          pupl.classList.add('play');
          clearInterval(timer);
          that.computedTime();
        }
      }, 1000);
    }
  }, {
    key: "computedTime",
    value: function computedTime() {
      var u = 0,
          strU = "",
          seconds = 0,
          timeSec = "",
          score = 0,
          dom = document.querySelector(".score .num"),
          that = this;
      var scoreTimer = setInterval(function () {
        u++;

        if (u < 10) {
          strU = "0" + u;
        } else {
          strU = u;

          if (u > 100) {
            u = 1;
            seconds++;
          }
        }

        score = score + Math.ceil(1 * Math.random());
        timeSec = "" + seconds + "." + strU + " 秒";
        dom.innerHTML = "".concat(score, "\n            <div class=\"seconds\">").concat(timeSec, "</div>");
      }, 100);
    }
  }]);

  return ModelControl;
}();