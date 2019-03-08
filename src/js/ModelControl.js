class ModelControl {
    constructor(num, dom){
        this.dom = document.querySelector(dom)
        this.num = num
    }
    run(){  
        this.createInterval(this.num, this.dom)
    }

    createInterval(num, dom){
        console.log(dom)
        let count = num 
        clearInterval(timer)
        dom.innerHTML = `<span>${count}</span>`
        dom.classList.add("show")
        let that = this
        let timer = setInterval(()=>{ 
            count-- 
            if(count){
                dom.innerHTML = `<span>${count}</span>` 
                
                }else{
                // dom.innerHTML = "游戏开始"
                dom.classList.remove("show")  
                let pupl = document.querySelector(".pupl")
                pupl.classList.add('play')
                clearInterval(timer)
                that.computedTime()
            }
        },1000)
    }
    computedTime(){
        let u = 0,
            strU = "",
            seconds = 0 ,
            timeSec = "",
            score = 0,
            dom = document.querySelector(".score .num"), 
            that = this 

        let scoreTimer = setInterval(()=>{  
            
            u++
            if(u<10){
                strU = "0" + u
            }else{
                strU = u 
                if(u > 100){
                    u = 1
                    seconds ++
                }
            }
            
            score = score + Math.ceil(1*Math.random()) 
            timeSec = "" + seconds + "." + strU + " 秒"
            dom.innerHTML = `${score}
            <div class="seconds">${timeSec}</div>`
        }, 100);
 
    }

}