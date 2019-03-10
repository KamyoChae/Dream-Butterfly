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
    this.wantClickPupl = false; // 通过这里进行动画的开关

    this.liHeight = "";
    this.animateDown = "";
    this.clientWidth = document.body.clientWidth;
    this.clientHeight = document.body.clientHeight;
    this.dowFlag = true;
    this.live = 3;
    this.speed = 0; // 蝴蝶移动速度

    this.returnDom = document.querySelector('.return'); // 返回状态框
  }

  _createClass(ModelControl, [{
    key: "run",
    value: function run() {
      // 启动
      this.createInterval(this.num, this.dom);
      this.pauseClick();
    }
  }, {
    key: "startInit",
    value: function startInit() {
      var _this = this;

      // 初始化游戏数据
      // 清除所有定时器
      // this.dowFlag = false // 为false表示清除定时器 由于使用了动画帧 其他方法一律无效 
      console.log(this.dowFlag); // 初始化生命

      this.live = 3;
      var liveArr = Array.from(document.querySelectorAll(".live"));
      liveArr.forEach(function (ele) {
        ele.setAttribute("class", "live");
      }); // 初始化得分

      this.numDom.innerHTML = "0 <div class=\"seconds\">0.00 \u79D2</div>";
      clearInterval(this.secTimer);
      clearInterval(this.scoreTimer); // 初始化障碍石头

      var obbox = document.querySelector('.obstacle');
      obbox.innerHTML = "";
      var newUL = document.createElement('ul');
      newUL.setAttribute("class", "ob-list");
      obbox.insertBefore(newUL, obbox.firstChild);

      for (var i = 0; i < 10; i++) {
        var renderStone = new Renderli(2, ".ob-list"); // 渲染石头

        renderStone.run();
      } // 初始化每个li的高度用于渲染石头宽度


      this.liHeight = document.querySelector(".ob-list li").offsetHeight; // 每个li 的高度 66  
      // 初始化蝴蝶移动速度

      this.speed = 0; // 给蝴蝶绑定函数

      this.butfferMove(); // 给返回模态框添加事件

      document.querySelector('.yes').addEventListener("click", function () {
        // 返回首页
        console.log("返回首页");
      });
      document.querySelector('.no').addEventListener("click", function () {
        // 继续游戏
        console.log("继续游戏");
        _this.returnDom.style.zIndex = "-999"; // 隐藏模态框

        var pupl = _this.pupl;
        pupl.classList.add('play');
        _this.wantClickPupl = true; // 表示可点击 用于检测是否在倒计时阶段点击暂停/开始按钮 

        _this.dowFlag = true;

        _this.computedTime(); // 继续计时


        _this.pullDown(); // 继续翻石头

      });
    }
  }, {
    key: "createInterval",
    value: function createInterval(num, dom) {
      var _this2 = this;

      // 创建倒计时 及设定部分参数
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
          _this2.pullDown(); // 开始滑动


          dom.classList.remove("show");
          var pupl = _this2.pupl;
          pupl.classList.add('play');
          _this2.wantClickPupl = true; // 表示可点击 用于检测是否在倒计时阶段点击暂停/开始按钮 

          clearInterval(timer);
          that.computedTime();
        }
      }, 1000);
    }
  }, {
    key: "computedTime",
    value: function computedTime() {
      var _this3 = this;

      // 时间管理
      var u = this.u,
          strU = this.strU,
          seconds = this.seconds,
          timeSec = this.timeSec,
          score = this.score,
          dom = this.numDom;
      var scoreTimer = setInterval(function () {
        score = score + Math.ceil(5 * Math.random());
        _this3.score = score;
      }, 100);
      var secTimer = setInterval(function () {
        u++;

        if (u < 10) {
          strU = "0" + u;
        } else {
          strU = u;

          if (u >= 100) {
            u = 1;
            seconds++;
          }
        }

        timeSec = seconds + "." + strU + " 秒";
        dom.innerHTML = "".concat(score, "\n            <div class=\"seconds\">").concat(timeSec, "</div>");
        _this3.u = u, _this3.strU = strU, _this3.seconds = seconds, _this3.timeSec = timeSec;
      }, 10);
      this.secTimer = secTimer;
      this.scoreTimer = scoreTimer;
    }
  }, {
    key: "cancleTimer",
    value: function cancleTimer() {
      // 暂停 或者游戏结束清除时间计时
      clearInterval(this.scoreTimer);
      clearInterval(this.secTimer);
      window.cancelAnimationFrame(this.animateDown);
      this.butflying("removefly");
    }
  }, {
    key: "pauseClick",
    value: function pauseClick() {
      var _this4 = this;

      // 点击暂停 状态控制
      var that = this;
      this.pupl.addEventListener("click", function (e) {
        console.log(e.target);
        var state = that.pupl.classList.contains("play");

        if (_this4.wantClickPupl) {
          console.log("你倒是暂停");

          if (state) {
            console.log("暂停之后清除定时器");
            that.cancleTimer();
            that.pupl.classList.remove("play");
          } else {
            that.computedTime();
            that.pupl.classList.add("play");
            console.log("开始动画");

            _this4.pullDown();
          }
        } else {
          console.log("游戏尚未开始");
        }
      });
    }
  }, {
    key: "butflying",
    value: function butflying(state) {
      // 控制蝴蝶飞翔动画
      var butfly = document.querySelector('.butterfly span');

      if (state == "addfly") {
        butfly.classList.add('fly');
      }

      if (state == "removefly") {
        butfly.classList.remove('fly');
      }
    }
  }, {
    key: "butfferMove",
    value: function butfferMove() {
      var that = this;
      window.addEventListener("deviceorientation", function (event) {
        var show = document.querySelector(".direction");
        var dec = Math.floor(event.gamma);

        if (dec < -0) {
          show.innerHTML = "往左" + "".concat(dec);
          that.speed = -3;
        } else if (dec > 0) {
          show.innerHTML = "往右" + "".concat(dec);
          that.speed = 3;
        } else {
          show.innerHTML = "水平" + "".concat(dec);
          that.speed = 0;
        }
      });
      window.addEventListener("keydown", function (e) {
        if (e.keyCode == 39) {
          that.speed = 2;
        } else if (e.keyCode == 37) {
          that.speed = -2;
        }
      });
    }
  }, {
    key: "pullDown",
    value: function pullDown() {
      var _this5 = this;

      // 石头滚动动画
      // 初始化石头状态
      this.butflying("addfly");
      cancelAnimationFrame(this.animateDown);
      var that = this;
      var obList = document.querySelector(".ob-list"); // 滚动画板  

      var footer = document.querySelector(".footer"); // 蝴蝶位置

      var distance = this.clientWidth / 20;
      var newLeft = distance; // 石头偏移量

      var dow = function dow() {
        if (_this5.dowFlag) {
          if (obList) {
            var obOffsetTOp = obList.offsetTop; // 滚动画板左上角与定位的父级左上角的距离 -667

            var newSet = obOffsetTOp + 4;
            obList.style.top = newSet + "px"; // 开始下滑 

            newLeft += that.speed;

            if (newLeft < distance) {
              newLeft = distance;
            } else if (newLeft > _this5.clientWidth - footer.offsetWidth - distance) {
              newLeft = _this5.clientWidth - footer.offsetWidth - distance;
            }

            footer.style.left = newLeft + "px"; // 蝴蝶左右动画

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

          _this5.checkBackIndex();

          _this5.checked();

          _this5.animateDown = window.requestAnimationFrame(dow);
        } else {
          _this5.cancleTimer();
        }
      }; // this.down = down


      dow();
    }
  }, {
    key: "checkBackIndex",
    value: function checkBackIndex() {
      var returnDom = this.returnDom.style.zIndex;

      if (returnDom == 999) {
        // 游戏暂停
        // that.cancleTimer()
        this.dowFlag = false;
        this.pupl.classList.remove("play"); // 暂停按钮不可用 样式改变 

        this.wantClickPupl = false;
      }
    }
  }, {
    key: "collision",
    value: function collision(ele, lastId) {
      // 检测碰撞核心操作
      var butfLeft = document.querySelector(".footer");
      var rect1 = {};
      var rect2 = {};
      rect1.x = butfLeft.offsetLeft, rect1.y = butfLeft.offsetTop, rect1.height = butfLeft.offsetHeight, rect1.width = butfLeft.offsetHeight, rect2.x = ele.offsetLeft, rect2.y = ele.offsetTop, rect2.width = ele.offsetHeight, rect2.height = ele.offsetHeight; // console.log(butfLeft.offsetTop) 
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
        // console.log("碰撞")
        ele.style.display = "none";
        var len = this.live;

        if (this.live > 0) {
          console.log("新的石头");
          var liveDom = Array.from(document.querySelectorAll('.live')); // console.log(Array.from(liveDom))
          // console.log(this.live) 

          liveDom[len - 1].classList.add('livelose');
          this.live--;
        } else {
          this.dowFlag = false; // 如果为false 游戏结束

          console.log("游戏结束"); // 游戏结束 

          this.wantClickPupl = false; // 禁用暂停开始按钮

          new InfoStart().showWindow("error");
          new ErrorCheck().run();
          document.querySelector('.start').style.zIndex = "999";
        }
      }
    }
  }, {
    key: "checked",
    value: function checked() {
      // 检测碰撞
      // console.log(this.dowFlag)
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