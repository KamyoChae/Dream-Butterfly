"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InfoStart =
/*#__PURE__*/
function () {
  function InfoStart() {
    _classCallCheck(this, InfoStart);
  }

  _createClass(InfoStart, [{
    key: "clickStart",
    // 用于控制首页启动页面
    value: function clickStart() {
      var start = document.querySelector(".startbtn");
      var that = this;
      start.addEventListener('click', function () {
        history.pushState({
          from: "index",
          to: "start"
        }, null, "?start");
        that.showWindow("start");
        var model = new ModelControl(3, ".model");
        model.startInit();
        model.run(); // 倒计时秒数 model框节点
      });
      window.addEventListener("popstate", function (e) {
        if (e.state) {
          var from = e.state.from;
          var to = e.state.to;
          console.log("from: " + from);
          console.log("to: " + to);
          history.pushState({
            from: to,
            to: from
          }, null, "?" + from);
          that.showWindow(from);
        }
      });
    }
  }, {
    key: "clickWorld",
    value: function clickWorld() {
      var start = document.querySelector(".worldbtn");
      var that = this;
      start.addEventListener('click', function () {
        history.pushState({
          from: "index",
          to: "world"
        }, null, "?world");
        that.showWindow("world");
      });
    }
  }, {
    key: "showWindow",
    value: function showWindow(name) {
      var obj = {
        index: document.querySelector('.index'),
        start: document.querySelector('.start'),
        error: document.querySelector('.error'),
        help: document.querySelector('.help'),
        world: document.querySelector('.world')
      };

      for (var prop in obj) {
        // if(obj[prop]){}
        if (name == prop) {
          obj[prop].style.zIndex = "999";
        } else {
          obj[prop].style.zIndex = "-999";
        }
      }
    }
  }, {
    key: "run",
    value: function run() {
      this.clickStart();
      this.clickWorld();
    }
  }]);

  return InfoStart;
}();