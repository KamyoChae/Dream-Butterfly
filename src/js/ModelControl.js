class ModelControl {
    constructor(num, dom) {
        this.dom = document.querySelector(dom)
        this.num = num
        this.secTimer = null
        this.scoreTimer = null
        this.pupl = document.querySelector(".pupl")
        this.numDom = document.querySelector(".score .num")

        this.u = 0
        this.strU = ""
        this.seconds = 0
        this.timeSec = ""
        this.score = 0
        this.wantClickPupl = false

        this.liHeight = document.querySelector(".ob-list li").offsetHeight // 每个li 的高度 66  
        this.animateDown = ""
    }
    run() {
        this.createInterval(this.num, this.dom)
        this.pauseClick()
    }

    createInterval(num, dom) {
        let count = num
        clearInterval(timer)
        dom.innerHTML = `<span>${count}</span>`
        dom.classList.add("show")
        let that = this
        let timer = setInterval(() => {
            count--
            if (count) {
                dom.innerHTML = `<span>${count}</span>`

            } else {
                // dom.innerHTML = "游戏开始"
                this.pullDown() // 开始滑动
                dom.classList.remove("show")
                let pupl = this.pupl
                pupl.classList.add('play')
                this.wantClickPupl = true // 表示可点击 用于检测是否在倒计时阶段点击暂停/开始按钮 
                clearInterval(timer)
                that.computedTime()
            }
        }, 1000)
    }
    computedTime() {
        let u = this.u,
            strU = this.strU,
            seconds = this.seconds,
            timeSec = this.timeSec,
            score = this.score,
            dom = this.numDom

        let scoreTimer = setInterval(() => {

            score = score + Math.ceil(1 * Math.random())
            
            this.score = score 
        }, 100)

        let secTimer = setInterval(() => {
            u++
            if (u < 10) {
                strU = "0" + u
            } else {
                strU = u
                if (u > 100) {
                    u = 1
                    seconds++
                }
            }
            timeSec = seconds + "." + strU + " 秒"
            dom.innerHTML = `${score}
            <div class="seconds">${timeSec}</div>`
            this.u = u,
            this.strU = strU,
            this.seconds = seconds,
            this.timeSec = timeSec
        }, 10);

        this.secTimer = secTimer
        this.scoreTimer = scoreTimer 
 
 
    }

    cancleTimer() {

        clearInterval(this.scoreTimer)
        clearInterval(this.secTimer) 
        window.cancelAnimationFrame(this.animateDown)

    }
    pauseClick() {
        let that = this
        this.pupl.addEventListener("click", (e) => {
            console.log(e.target)
            let state = that.pupl.classList.contains("play")
            if (this.wantClickPupl) {
                if (state) {
                    that.cancleTimer()
                    that.pupl.classList.remove("play")
                } else {
                    that.computedTime()
                    that.pupl.classList.add("play")
                    console.log("开始动画")
                    this.pullDown()
                }
            } else {
                console.log("游戏尚未开始")
            }

        })
        
    }

    pullDown(){
        cancelAnimationFrame(this.animateDown)
        console.log(this.liHeight)
        let that = this
        let dow = ()=>{
             
            let liHeight = document.querySelector(".ob-list li").offsetHeight // 每个li 的高度 66 
            let obList = document.querySelector(".ob-list") // 滚动画板  
            if(obList){
                let obOffsetTOp = obList.offsetTop // 滚动画板左上角与定位的父级左上角的距离 -667
                let newSet = obOffsetTOp + 2 
                obList.style.top = newSet + "px" // 开始下滑 

                if(obOffsetTOp>=that.liHeight){
                    // 表示滑动到了最下面 多一个 移除最下面的节点 重新添加一个节点
                    let len = obList.childNodes.length
                    let lastChild = obList.childNodes[len-1]
                    obList.removeChild(lastChild)
                    obList.style.top = 0 + "px" // 开始下滑 

                    // 插入新节点
                    new Renderli(2, ".ob-list").run() // 渲染石头  
                }
                // 不断进行移动

            }
            
           this.animateDown = window.requestAnimationFrame(dow) 
            
        }
        // this.down = down
        dow()  
    }

}