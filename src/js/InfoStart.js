

class InfoStart {
    // 用于控制首页启动页面
    constructor(num) {
        this.score = num
    }
    clickStart() {
        let start = document.querySelector(".startbtn")
        let that = this
        start.addEventListener('click', () => {

            history.pushState({ from: "index", to: "start" }, null, "?start")
            that.showWindow("start")


            let model = new ModelControl(3, ".model")
            model.startInit()
            model.run() // 倒计时秒数 model框节点
        })
        window.addEventListener("popstate", function (e) {
            if (e.state) {
                let from = e.state.from
                let to = e.state.to
                console.log("from: " + from)
                console.log("to: " + to)
                if (from === "index" && to === "start") {
                    console.log("我要返回主页面")
                    let returnDom = document.querySelector('.return')
                    returnDom.style.zIndex = "999"

                } else {
                    history.pushState({ from: to, to: from }, null, "?" + from)
                    that.showWindow(from)
                }
            }
        })

    }
    clickWorld() {
        let start = document.querySelector(".worldbtn")
        let that = this
        start.addEventListener('click', () => {
            history.pushState({ from: "index", to: "world" }, null, "?world")
            that.showWindow("world")
            console.log("查询链上")
            Nasa.query('n1pifG4soXjrRBFjJNWbEpqHQ8DzG8tNunc', 'getItems', [])
                .then((res) => { 
                    const list = res.execResult
                    // 将list渲染到页面
                    let str = ""
                    list.forEach((el, index) => {
                        let s = ""
                        if(typeof(el.user) === "string"){
                            s = `<li>
                                    <span class="world-index">${index + 1}</span>
                                    <span class="world-addr">${el.user}</span>
                                    <span class="world-score"><i class="red">${el.score}</i> 分</span>
                                </li>` 
                                str+=s
                        }
                        
                    });
                    document.querySelector('.list-world').innerHTML = str
                }, (error) => {
                        console.log("error")
                    })


        })
    }
    showWindow(name) {
        let obj = {
            index: document.querySelector('.index'),
            start: document.querySelector('.start'),
            error: document.querySelector('.error'),
            tips: document.querySelector('.tips'),
            world: document.querySelector('.world'),
        }
        for (let prop in obj) {
            // if(obj[prop]){}
            if (name == prop) {

                obj[prop].style.zIndex = "999"
            } else {
                obj[prop].style.zIndex = "-999"
            }
        }
    }
    bindSend(num) {
        // 绑定点击 
        const addr = 'n1pifG4soXjrRBFjJNWbEpqHQ8DzG8tNunc'
        let sendBtn = document.querySelector('.oversend')
        sendBtn.addEventListener("click", () => {
            // 点击按钮
            // 调用线上合约接口 
            console.log(num + "传过来之后")
            Nasa.user.getAddr().then((re) => {
                console.log(re)
                let user = re
                Nasa.call(addr, 'createItems', [num, user])
                .then((res) => {
                    let payId = res.payId
                    console.log(res)
                    // 返回交易流水号id
                    // 通过另一个接口检查是否已经完成交易
                    return Nasa.getTxResult(payId)
                }, (error) => {
                    console.log("查询流水过程中出了点问题")
                })
                .then((res) => {
                    console.log(res)
                    // 完成交易之后 将先前的数据写入页面
                    if (res.status === 1) {
                        let exec = res.execResult

                        // 开始渲染页面
                        let score = exec.content // 分数
                        let time = exec.publish_at // 时间 
                        let user = res.from // 用户

                        

                    }
                })
            }, (error) => {
                console.log("查询地址失败")
                alert("获取星云钱包地址受限，请在chrome上体验Dapp！")
                this.showWindow("tips")
            })
            
        })
    }
    run() {
        this.clickStart()
        this.clickWorld()
    }
}

