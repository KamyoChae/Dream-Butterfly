

class oAudio {
    constructor() {

        this.music = document.querySelector(".sound .checked")
        this.audio = document.querySelectorAll("audio") 
    }
    run() {
        this.bindMusic()
       
    }
    playGame() {
        // 开始游戏播放的音乐
        this.createAudio("play", true, 0, ".info")
    }
    indexGame(){
        // 进入首页播放的音乐
        this.createAudio("index", true, 0, ".info")
    }
    hitGame(){
        // 发生碰撞播放的音乐
        this.createAudio("hit", false, 1, ".hit")
    }

    bindMusic() {
        // 是否播放音乐
        let music = this.music
        music.addEventListener("click", () => {
            let flag = music.classList.contains("ischecked")


            let audio = this.audio
            if (flag) {
                audio[0].pause()
                audio[1].pause()
                music.classList.remove("ischecked")
            } else {
                audio[0].play()
                audio[1].play()
                music.classList.add("ischecked")
            }
        })
    }
    createAudio(...args){ 
        console.log(args)
        this.audio[args[2]].loop = args[1]
        let arr =  document.querySelectorAll(args[3]) 
        let otype = ["mp3", "wav"]
        arr.forEach((ele,index)=>{ 
            ele.src = `./audio/${args[0]}.${otype[index]}`
        })
        this.audio[args[2]].load() 
        
    } 
}
new oAudio().run()