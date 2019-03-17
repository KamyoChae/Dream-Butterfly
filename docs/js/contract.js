"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var myCantract =
/*#__PURE__*/
function () {
  // 合约地址 
  // n233qBhuo3BgcyMaw49N4fN1ZZztcVtVVT9
  // 交易哈希
  // d5cb3c1df2e7b657161080e9d93a3940d9e0e2ded42ddfacf552e545df6ed871
  function myCantract() {
    _classCallCheck(this, myCantract);
  }

  _createClass(myCantract, [{
    key: "init",
    value: function init() {
      // 初始化必须的
      LocalContractStorage.set('items', []);
    }
  }, {
    key: "getItems",
    value: function getItems() {
      // 公开接口
      return LocalContractStorage.get('items');
    }
  }, {
    key: "createItems",
    value: function createItems(content) {
      var newItem = {
        content: content,
        publish_at: Date.now() / 1000
      };
      var items = LocalContractStorage.get('items');
      items = (_readOnlyError("items"), items.push(newItem));
      LocalContractStorage.set('items', items);
      return newItem;
    }
  }]);

  return myCantract;
}();

module.exports = myCantract;