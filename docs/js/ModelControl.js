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
    this.clientWidth = document.body.clientWidth;
    this.clientHeight = document.body.clientHeight;
    this.aa = "帅";
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
      var obList = document.querySelector(".ob-list"); // 滚动画板  

      var dow = function dow() {
        if (obList) {
          var obOffsetTOp = obList.offsetTop; // 滚动画板左上角与定位的父级左上角的距离 -667

          var newSet = obOffsetTOp + 10;
          obList.style.top = newSet + "px"; // 开始下滑 

          if (obOffsetTOp >= that.liHeight) {
            // 表示滑动到了最下面 多一个 移除最下面的节点 重新添加一个节点
            var len = obList.childNodes.length;
            var lastChild = obList.childNodes[len - 1];
            obList.removeChild(lastChild);
            obList.style.top = 0 + "px"; // 开始下滑 
            // 插入新节点

            new Renderli(2, ".ob-list").run(); // 渲染石头  
          }
        }

        _this4.checked();

        _this4.animateDown = window.requestAnimationFrame(dow);
      }; // this.down = down


      dow();
    }
  }, {
    key: "collision",
    value: function collision(ele) {
      var butfLeft = document.querySelector(".footer");
      var rect1 = {};
      var rect2 = {};
      rect1.x = butfLeft.offsetLeft, rect1.y = butfLeft.offsetTop, rect1.height = butfLeft.offsetHeight, rect1.width = butfLeft.offsetHeight, rect2.x = ele.offsetLeft, rect2.y = ele.offsetTop, rect2.width = ele.offsetHeight;
      rect2.height = ele.offsetHeight; // console.log(butfLeft.offsetTop) 
      // rect1.x < rect2.x + rect2.width &&
      // rect1.x + rect1.width > rect2.x &&
      // rect1.y < rect2.y + rect2.height &&
      // rect1.height + rect1.y > rect2.y
      // 方便 查看 数据
      // console.log(rect1.x, rect2.x, rect2.width,
      //     rect1.width,
      //     rect1.y, rect2.y, rect2.height,
      //     rect1.height)

      if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y) {
        console.log("碰撞", this.animateDown);
        cancelAnimationFrame(this.animateDown);
      }
    }
  }, {
    key: "checked",
    value: function checked() {
      var that = this;
      var domList = Array.from(document.querySelectorAll(".stone")); // 含70个元素的dom数组

      var newDom = [];
      domList.forEach(function (ele) {
        if (ele.style.backgroundImage !== "") {
          newDom.push(ele);
        }
      }); // 遍历 石头 
      // 

      /**
       * 如果石头左上角距离顶部条件: 
       * 石头offsetTop >= (9/10 * 高度) + 石头高度/3 
       * 并且 
       * 如果 蝴蝶 offsetLeft >= 石头offsetLeft + 石头宽度/2 并且 蝴蝶offsetLeft < 石头offsetLeft + 石头宽度（蝴蝶在右边）
       *      表示碰撞
       * 如果 蝴蝶 offsetLeft <= 石头offset 并且 石头offset-石头宽度 < 蝴蝶offset （蝴蝶在左边）
       *      表示碰撞
       * 
       */

      newDom.forEach(function (ele) {
        that.collision(ele);
      });
    }
  }]);

  return ModelControl;
}();