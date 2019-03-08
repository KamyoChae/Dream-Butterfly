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
    this.secTimer = null;
    this.scoreTimer = null;
    this.pupl = document.querySelector(".pupl");
    this.numDom = document.querySelector(".score .num");
    this.u = 0;
    this.strU = "";
    this.seconds = 0;
    this.timeSec = "";
    this.score = 0;
    this.wantClickPupl = false;
    this.liHeight = document.querySelector(".ob-list li").offsetHeight; // 每个li 的高度 66  

    this.animateDown = "";
  }

  _createClass(ModelControl, [{
    key: "run",
    value: function run() {
      this.createInterval(this.num, this.dom);
      this.pauseClick();
    }
  }, {
    key: "createInterval",
    value: function createInterval(num, dom) {
      var _this = this;

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
          _this.pullDown(); // 开始滑动


          dom.classList.remove("show");
          var pupl = _this.pupl;
          pupl.classList.add('play');
          _this.wantClickPupl = true; // 表示可点击 用于检测是否在倒计时阶段点击暂停/开始按钮 

          clearInterval(timer);
          that.computedTime();
        }
      }, 1000);
    }
  }, {
    key: "computedTime",
    value: function computedTime() {
      var _this2 = this;

      var u = this.u,
          strU = this.strU,
          seconds = this.seconds,
          timeSec = this.timeSec,
          score = this.score,
          dom = this.numDom;
      var scoreTimer = setInterval(function () {
        score = score + Math.ceil(1 * Math.random());
        _this2.score = score;
      }, 100);
      var secTimer = setInterval(function () {
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

        timeSec = seconds + "." + strU + " 秒";
        dom.innerHTML = "".concat(score, "\n            <div class=\"seconds\">").concat(timeSec, "</div>");
        _this2.u = u, _this2.strU = strU, _this2.seconds = seconds, _this2.timeSec = timeSec;
      }, 10);
      this.secTimer = secTimer;
      this.scoreTimer = scoreTimer;
    }
  }, {
    key: "cancleTimer",
    value: function cancleTimer() {
      clearInterval(this.scoreTimer);
      clearInterval(this.secTimer);
      window.cancelAnimationFrame(this.animateDown);
    }
  }, {
    key: "pauseClick",
    value: function pauseClick() {
      var _this3 = this;

      var that = this;
      this.pupl.addEventListener("click", function (e) {
        console.log(e.target);
        var state = that.pupl.classList.contains("play");

        if (_this3.wantClickPupl) {
          if (state) {
            that.cancleTimer();
            that.pupl.classList.remove("play");
          } else {
            that.computedTime();
            that.pupl.classList.add("play");
            console.log("开始动画");

            _this3.pullDown();
          }
        } else {
          console.log("游戏尚未开始");
        }
      });
    }
  }, {
    key: "pullDown",
    value: function pullDown() {
      var _this4 = this;

      cancelAnimationFrame(this.animateDown);
      console.log(this.liHeight);
      var that = this;

      var dow = function dow() {
        var liHeight = document.querySelector(".ob-list li").offsetHeight; // 每个li 的高度 66 

        var obList = document.querySelector(".ob-list"); // 滚动画板  

        if (obList) {
          var obOffsetTOp = obList.offsetTop; // 滚动画板左上角与定位的父级左上角的距离 -667

          var newSet = obOffsetTOp + 2;
          obList.style.top = newSet + "px"; // 开始下滑 

          if (obOffsetTOp >= that.liHeight) {
            // 表示滑动到了最下面 多一个 移除最下面的节点 重新添加一个节点
            var len = obList.childNodes.length;
            var lastChild = obList.childNodes[len - 1];
            obList.removeChild(lastChild);
            obList.style.top = 0 + "px"; // 开始下滑 
            // 插入新节点

            new Renderli(2, ".ob-list").run(); // 渲染石头  
          } // 不断进行移动

        }

        _this4.animateDown = window.requestAnimationFrame(dow);
      }; // this.down = down


      dow();
    }
  }]);

  return ModelControl;
}();