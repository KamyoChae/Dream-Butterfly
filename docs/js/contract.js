"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),e}var myCantract=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"init",value:function(){LocalContractStorage.set("items",[])}},{key:"getItems",value:function(){return LocalContractStorage.get("items")}},{key:"createItems",value:function(e){var t={content:e,publish_at:Date.now()/1e3},a=LocalContractStorage.get("items");return a=a.push(t),LocalContractStorage.set("items",a),t}}]),e}();module.exports=myCantract;