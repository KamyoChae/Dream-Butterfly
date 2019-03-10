"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Renderli =
/*#__PURE__*/
function () {
  // 接收一个难度参数，决定一行创建多少个石头 0/1/2
  function Renderli(num, target) {
    _classCallCheck(this, Renderli);

    this.rowStoneNum = num;
    this.target = target;
  }

  _createClass(Renderli, [{
    key: "getStoneNum",
    value: function getStoneNum() {
      return Math.floor(Math.random() * this.rowStoneNum + 1);
    }
  }, {
    key: "getLiDomDiv",
    value: function getLiDomDiv(stoneNum) {
      var dom = "<div class=\"stone\"></div> ";
      var nullDomArr = [];

      for (var i = 0; i < 7 - stoneNum; i++) {
        nullDomArr.push(dom);
      }

      while (stoneNum) {
        var name = Math.ceil(Math.random() * 13); // 随机生成图片

        var index = Math.floor(Math.random() * 7); // 随机插入li位置

        console.log(index);
        var newDom = "<div class=\"stone\" style=\"background-image:url(./images/lib/".concat(name, ".jpg)\"></div> ");
        nullDomArr.splice(index, 0, newDom);
        stoneNum--;
      }

      return this.toElement(nullDomArr.join(""));
    }
  }, {
    key: "toElement",
    value: function toElement(strDom) {
      // 踩了一个大坑，写完项目着重做下总结
      var li = document.createElement('li');
      li.innerHTML = strDom;
      return li;
    }
  }, {
    key: "insertToOb",
    value: function insertToOb(dom) {
      var ul = document.querySelector(this.target);
      ul.insertBefore(dom, ul.firstChild);
    }
  }, {
    key: "run",
    value: function run() {
      var num = this.getStoneNum();
      var liDiv = this.getLiDomDiv(num);
      this.insertToOb(liDiv);
    }
  }]);

  return Renderli;
}();