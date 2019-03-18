"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InfoStart =
/*#__PURE__*/
function () {
  // 用于控制首页启动页面
  function InfoStart(num) {
    _classCallCheck(this, InfoStart);

    this.score = num;
  }

  _createClass(InfoStart, [{
    key: "clickStart",
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

          if (from === "index" && to === "start") {
            console.log("我要返回主页面");
            var returnDom = document.querySelector('.return');
            returnDom.style.zIndex = "999";
          } else {
            history.pushState({
              from: to,
              to: from
            }, null, "?" + from);
            that.showWindow(from);
          }
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
        console.log("查询链上");
        Nasa.query('n1pifG4soXjrRBFjJNWbEpqHQ8DzG8tNunc', 'getItems', []).then(function (res) {
          var list = res.execResult; // 将list渲染到页面

          var str = "";
          list.forEach(function (el, index) {
            var s = "";

            if (typeof el.user === "string") {
              s = "<li>\n                                    <span class=\"world-index\">".concat(index + 1, "</span>\n                                    <span class=\"world-addr\">").concat(el.user, "</span>\n                                    <span class=\"world-score\"><i class=\"red\">").concat(el.score, "</i> \u5206</span>\n                                </li>");
              str += s;
            }
          });
          document.querySelector('.list-world').innerHTML = str;
        }, function (error) {
          console.log("error");
        });
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
    key: "bindSend",
    value: function bindSend(num) {
      // 绑定点击 
      var addr = 'n1pifG4soXjrRBFjJNWbEpqHQ8DzG8tNunc';
      var sendBtn = document.querySelector('.oversend');
      sendBtn.addEventListener("click", function () {
        // 点击按钮
        // 调用线上合约接口 
        console.log(num + "传过来之后");
        Nasa.user.getAddr().then(function (re) {
          console.log(re);
          var user = re;
          Nasa.call(addr, 'createItems', [num, user]).then(function (res) {
            var payId = res.payId;
            console.log(res); // 返回交易流水号id
            // 通过另一个接口检查是否已经完成交易

            return Nasa.getTxResult(payId);
          }, function (error) {
            console.log("查询流水过程中出了点问题");
          }).then(function (res) {
            console.log(res); // 完成交易之后 将先前的数据写入页面

            if (res.status === 1) {
              var exec = res.execResult; // 开始渲染页面

              var score = exec.content; // 分数

              var time = exec.publish_at; // 时间 

              var _user = res.from; // 用户
            }
          });
        }, function (error) {
          console.log("查询地址失败");
          alert("获取星云钱包地址受限，请在chrome上体验Dapp！");
        });
      });
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