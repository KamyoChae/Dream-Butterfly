"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var oAudio =
/*#__PURE__*/
function () {
  function oAudio() {
    _classCallCheck(this, oAudio);

    this.music = document.querySelector(".sound .checked");
    this.audio = document.querySelectorAll("audio");
  }

  _createClass(oAudio, [{
    key: "run",
    value: function run() {
      this.bindMusic();
    }
  }, {
    key: "playGame",
    value: function playGame() {
      // 开始游戏播放的音乐
      this.createAudio("play", true, 0, ".info");
    }
  }, {
    key: "indexGame",
    value: function indexGame() {
      // 进入首页播放的音乐
      this.createAudio("index", true, 0, ".info");
    }
  }, {
    key: "hitGame",
    value: function hitGame() {
      // 发生碰撞播放的音乐
      this.createAudio("hit", false, 1, ".hit");
    }
  }, {
    key: "bindMusic",
    value: function bindMusic() {
      var _this = this;

      // 是否播放音乐
      var music = this.music;
      music.addEventListener("click", function () {
        var flag = music.classList.contains("ischecked");
        var audio = _this.audio[0];
        console.log(audio);

        if (flag) {
          audio.pause();
          music.classList.remove("ischecked");
        } else {
          audio.play();
          music.classList.add("ischecked");
        }
      });
    }
  }, {
    key: "createAudio",
    value: function createAudio() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      console.log(args);
      this.audio[args[2]].loop = args[1];
      var arr = document.querySelectorAll(args[3]);
      var otype = ["mp3", "wav"];
      arr.forEach(function (ele, index) {
        ele.src = "./audio/".concat(args[0], ".").concat(otype[index]);
      });
      this.audio[args[2]].load();
    }
  }]);

  return oAudio;
}();

new oAudio().run();