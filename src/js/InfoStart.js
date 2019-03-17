

class InfoStart{
    // 用于控制首页启动页面
    constructor(num){
        this.score = num
    }
    clickStart(){
        let start = document.querySelector(".startbtn")
        let that = this 
        start.addEventListener('click',()=>{
            
            history.pushState({from:"index", to: "start"}, null, "?start")
            that.showWindow("start")
            
            
            let model = new ModelControl(3, ".model")
            model.startInit() 
            model.run() // 倒计时秒数 model框节点
        })
        window.addEventListener("popstate", function(e){
            if(e.state){
                let from = e.state.from 
                let to = e.state.to 
                console.log("from: " + from)
                console.log("to: " + to)
                if(from === "index"&& to==="start"){  
                    console.log("我要返回主页面")
                    let returnDom = document.querySelector('.return')
                    returnDom.style.zIndex = "999"

                }else{ 
                    history.pushState({from:to, to:from}, null,"?"+ from)
                    that.showWindow(from) 
                }
            }  
        })
        
    }
    clickWorld(){ 
        let start = document.querySelector(".worldbtn")
        let that = this 
        start.addEventListener('click',()=>{
            history.pushState({from:"index", to: "world"}, null, "?world")
            that.showWindow("world")  
            console.log("查询链上")
            Nasa.query('n1wWjxZmTX2SJGbT9YrY84dK5xkTCbRLcqQ', 'getItems', [])
                .then((res)=>{
                    console.log(res)
                    const list = res.execResult 
                    // 将list渲染到页面
                    console.log(list)
                },
                (error)=>{
                    console.log("error")
                })
                
                
        })
    }
    showWindow(name){
        let obj = {
            index : document.querySelector('.index'),
            start : document.querySelector('.start'),
            error : document.querySelector('.error'),
            help : document.querySelector('.help'),
            world : document.querySelector('.world'),
        }
        for(let prop in obj){
            // if(obj[prop]){}
            if(name == prop){
                
                obj[prop].style.zIndex = "999"
            }else{
                obj[prop].style.zIndex = "-999"
            }
        }
    }
    bindSend(num){
        // 绑定点击 
        const addr = 'n1wWjxZmTX2SJGbT9YrY84dK5xkTCbRLcqQ'
        let sendBtn = document.querySelector('.oversend')
        sendBtn.addEventListener("click", ()=>{
            // 点击按钮
            // 调用线上合约接口 
            console.log(num + "传过来之后")
            Nasa.call(addr, 'createItems', [num])
                .then((res)=>{
                    let payId = res.payId
                    console.log(res)
                    // 返回交易流水号id
                    // 通过另一个接口检查是否已经完成交易
                    return Nasa.getTxResult(payId)
                },(error)=>{
                    console.log("查询流水过程中出了点问题")
                })
                .then((res)=>{
                    console.log(res)
                    // 完成交易之后 将先前的数据写入页面
                    if(res.status === 1){
                        let exec = res.execResult 

                        // 开始渲染页面
                        let score = exec.content // 分数
                        let time = exec.publish_at // 时间 
                        let user = res.from // 用户
                        
                    }
                })
        })
    } 
    run(){
        this.clickStart()
        this.clickWorld()
    }
}

