

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
        this.wantClickPupl = false // 通过这里进行动画的开关

        this.liHeight = ""
        this.animateDown = ""

        this.clientWidth = document.body.clientWidth
        this.clientHeight = document.body.clientHeight
        this.dowFlag = true
        this.live = 3
        this.speed = 0 // 蝴蝶移动速度

        this.returnDom = document.querySelector('.return') // 返回状态框

        this.markLeft = 0 // 用于标记暂停蝴蝶位置

    }
    run() {
        // 启动
        this.createInterval(this.num, this.dom)
        this.pauseClick()
    }

    startInit() {
        new oAudio().playGame() // 播放开始游戏音乐
        // 初始化游戏数据

        // 清除所有定时器
        // this.dowFlag = false // 为false表示清除定时器 由于使用了动画帧 其他方法一律无效 
        console.log(this.dowFlag)
        // 初始化生命
        this.live = 3
        let liveArr = Array.from(document.querySelectorAll(".live"))
        liveArr.forEach((ele) => {
            ele.setAttribute("class", "live")
        })

        // 初始化得分
        this.numDom.innerHTML = `0 <div class="seconds">0.00 秒</div>`
        clearInterval(this.secTimer)
        clearInterval(this.scoreTimer)

        // 初始化障碍石头
        let obbox = document.querySelector('.obstacle')
        obbox.innerHTML = ""
        let newUL = document.createElement('ul')
        newUL.setAttribute("class", "ob-list")
        obbox.insertBefore(newUL, obbox.firstChild)
        for (let i = 0; i < 10; i++) {
            let renderStone = new Renderli(2, ".ob-list") // 渲染石头
            renderStone.run()
        }

        // 初始化每个li的高度用于渲染石头宽度
        this.liHeight = document.querySelector(".ob-list li").offsetHeight // 每个li 的高度 66  

        // 初始化蝴蝶移动速度
        this.speed = 0
        // 给蝴蝶绑定函数
        this.butfferMove()
        this.markLeft = 0 // 将蝴蝶移动到最左边

        // 给返回模态框添加事件

        document.querySelector('.yes').addEventListener("click", () => {
            // 返回首页
            console.log("返回首页")
            new oAudio().indexGame() // 播放首页音乐
            new InfoStart().showWindow("index")
            this.returnDom.style.zIndex = "-999"  // 隐藏模态框 
        })
        document.querySelector('.no').addEventListener("click", () => {
            // 继续游戏
            console.log("继续游戏")
            if (this.live >= 0) {
                
                this.returnDom.style.zIndex = "-999"  // 隐藏模态框
                let pupl = this.pupl
                pupl.classList.add('play')
                this.wantClickPupl = true // 表示可点击 用于检测是否在倒计时阶段点击暂停/开始按钮 

                this.dowFlag = true

                // 由于下面也进行了计时操作，因此需要检测 当分数为0时，执行计时 不为0说明只是按了返回按钮。
                // 只是按了返回按钮，就不做计时操作
                if (this.score != 0) {
                    console.log("计时")
                    this.computedTime() // 继续计时
                }

                this.pullDown() // 继续翻石头

            }
        })

    }
    createInterval(num, dom) {
        // 创建倒计时 及设定部分参数
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
        // 时间管理
        clearInterval(this.secTimer)
        clearInterval(this.scoreTimer)
        let u = this.u,
            strU = this.strU,
            seconds = this.seconds,
            timeSec = this.timeSec,
            score = this.score,
            dom = this.numDom

        let scoreTimer = setInterval(() => {

            score = score + Math.ceil(5 * Math.random())

            this.score = score
        }, 100)

        let secTimer = setInterval(() => {
            u++
            if (u < 10) {
                strU = "0" + u
            } else {
                strU = u
                if (u >= 100) {
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
        // 暂停 或者游戏结束清除时间计时


        clearInterval(this.scoreTimer)
        clearInterval(this.secTimer)
        window.cancelAnimationFrame(this.animateDown)
        this.butflying("removefly")



    }
    pauseClick() {
        // 点击暂停 状态控制
        let that = this
        this.pupl.addEventListener("click", (e) => {
            console.log(e.target)
            let state = that.pupl.classList.contains("play")
            if (this.wantClickPupl) { 
                if (state) {
                    console.log(state)
                    console.log("没有play")
                    that.cancleTimer()
                    this.markLeft = document.querySelector(".footer").offsetLeft
                    that.pupl.classList.remove("play")
                } else {
                    that.computedTime()
                    that.pupl.classList.add("play")
                    console.log("有play")
                    this.pullDown("new") // 表示读取上一次的位置
                }
            } else {
                console.log("游戏尚未开始")
            }

        })

    }
    butflying(state) {
        // 控制蝴蝶飞翔动画
        let butfly = document.querySelector('.butterfly span')
        if (state == "addfly") {
            butfly.classList.add('fly')
        }
        if (state == "removefly") {
            butfly.classList.remove('fly')
        }
    }
    butfferMove() {
        let that = this
        window.addEventListener("deviceorientation", (event) => {

            let show = document.querySelector(".direction")
            let dec = Math.floor(event.gamma)

            if (dec < -0) {
                show.innerHTML = "往左" + `${dec}`
                that.speed = -3
            } else if (dec > 0) {
                show.innerHTML = "往右" + `${dec}`
                that.speed = 3
            } else {
                show.innerHTML = "水平" + `${dec}`
                that.speed = 0
            }
        })
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 39) {
                that.speed = 2
            } else if (e.keyCode == 37) {
                that.speed = -2
            }

        })
    }

    pullDown(str) {
        // 石头滚动动画

        // 初始化石头状态
        this.butflying("addfly")
        cancelAnimationFrame(this.animateDown)
        let that = this
        let obList = document.querySelector(".ob-list") // 滚动画板  
        let footer = document.querySelector(".footer") // 蝴蝶位置
        let markLeft = this.markLeft // 标记上一次位置 
        let distance = this.clientWidth / 20
        let newLeft = distance // 石头偏移量

        if (str === "new") {
            newLeft = markLeft
        }

        let dow = () => {

            if (this.dowFlag) {
                if (obList) {
                    let obOffsetTOp = obList.offsetTop // 滚动画板左上角与定位的父级左上角的距离 -667
                    let newSet = obOffsetTOp + 4
                    obList.style.top = newSet + "px" // 开始下滑 

                    newLeft += that.speed
                    if (newLeft < distance) {
                        newLeft = distance
                    } else if (newLeft > (this.clientWidth - footer.offsetWidth - distance)) {
                        newLeft = (this.clientWidth - footer.offsetWidth - distance)
                    }
                    footer.style.left = newLeft + "px" // 蝴蝶左右动画

                    if (obOffsetTOp >= that.liHeight) {
                        // 表示滑动到了最下面 多一个 移除最下面的节点 重新添加一个节点
                        let len = obList.childNodes.length
                        let lastChild = obList.childNodes[len - 1]
                        obList.removeChild(lastChild)
                        obList.style.top = 0 + "px" // 开始下滑 

                        // 插入新节点
                        new Renderli(2, ".ob-list").run() // 渲染石头  
                    }

                }

                this.checkBackIndex()
                this.checked()
                this.animateDown = window.requestAnimationFrame(dow)
            } else {
                this.cancleTimer()
            }
        }
        // this.down = down
        dow()
    }
    checkBackIndex() {
        let returnDom = this.returnDom.style.zIndex
        if (returnDom == 999) {
            // 游戏暂停
            // that.cancleTimer()
            this.dowFlag = false
            this.pupl.classList.remove("play")
            // 暂停按钮不可用 样式改变 
            this.wantClickPupl = false
        }
    }
    collision(ele, lastId) {
        // 检测碰撞核心操作
        let butfLeft = document.querySelector(".footer")
        let rect1 = {}
        let rect2 = {}
        rect1.x = butfLeft.offsetLeft,
            rect1.y = butfLeft.offsetTop,
            rect1.height = butfLeft.offsetHeight,
            rect1.width = butfLeft.offsetHeight,
            rect2.x = ele.offsetLeft,
            rect2.y = ele.offsetTop,
            rect2.width = ele.offsetHeight,
            rect2.height = ele.offsetHeight

        // console.log(butfLeft.offsetTop) 

        // rect1.x < rect2.x + rect2.width &&
        // rect1.x + rect1.width > rect2.x &&
        // rect1.y < rect2.y + rect2.height &&
        // rect1.height + rect1.y > rect2.y

        // 方便 查看 数据
        // console.log(rect1.x, rect2.x, rect2.width,
        //     rect1.width,
        //     rect1.y, rect2.y, rect2.height,
        //     rect1.height)
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y) {

            // console.log("碰撞")
            ele.style.display = "none"

            let len = this.live
            if (this.live > 0) {
                console.log("新的石头")
                new oAudio().hitGame() // 播放碰撞音乐
                let liveDom = Array.from(document.querySelectorAll('.live'))

                // console.log(Array.from(liveDom))
                // console.log(this.live) 
                liveDom[len - 1].classList.add('livelose')
                this.live--

            } else {
                new oAudio().hitGame() // 播放碰撞音乐
                this.dowFlag = false // 如果为false 游戏结束
                console.log("游戏结束")
                // 游戏结束 
                this.wantClickPupl = false // 禁用暂停开始按钮
                new InfoStart().showWindow("error")
                new ErrorCheck().run()
                document.querySelector('.start').style.zIndex = "999"
            }

        }
    }
    checked() {
        // 检测碰撞
        // console.log(this.dowFlag)
        let that = this
        let domList = Array.from(document.querySelectorAll(".stone")) // 含70个元素的dom数组
        let newDom = []
        domList.forEach((ele) => {
            if (ele.style.backgroundImage !== "") {
                newDom.push(ele)
            }
        })
        // 遍历 石头 

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

        newDom.forEach((ele) => {
            that.collision(ele)
        })
    }

}