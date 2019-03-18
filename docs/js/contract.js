"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var myCantract =
/*#__PURE__*/
function () {
  /**
   * n1h1iYxMr5wFTi7coWx4wHYWQpqqgeqrnrL
   * d84c50660ef88206cf5054407326c541d49cf5169e4f000c535a9edfb74a8d39
   */
  function myCantract() {
    _classCallCheck(this, myCantract);
  }

  _createClass(myCantract, [{
    key: "init",
    value: function init() {
      LocalContractStorage.set('items', []);
    }
  }, {
    key: "getItems",
    value: function getItems() {
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
      items = [].concat(_toConsumableArray(items), [newItem]);
      LocalContractStorage.set('items', items);
      return newItem;
    }
  }]);

  return myCantract;
}();

module.exports = myCantract;