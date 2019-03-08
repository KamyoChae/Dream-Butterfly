class InfoStart{
    // 用于控制首页启动页面
    clickStart(){
        
        console.log(666) 
        let start = document.querySelector(".startbtn")
        let that = this 
        start.addEventListener('click',()=>{
            history.pushState({from:"index", to: "start"}, null, "?start")
            that.showWindow("start")  
            new ModelControl(3, ".model").run()
        })
        window.addEventListener("popstate", function(e){
            if(e.state){
                let from = e.state.from 
                let to = e.state.to 
                console.log("from: " + from)
                console.log("to: " + to)
                history.pushState({from:to, to:from}, null,"?"+ from)
                that.showWindow(from) 
            }  
        })
        
    }
    clickWorld(){
        console.log(98989)
        let start = document.querySelector(".worldbtn")
        let that = this 
        start.addEventListener('click',()=>{
            history.pushState({from:"index", to: "world"}, null, "?world")
            that.showWindow("world")  
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
    run(){
        this.clickStart()
        this.clickWorld()
    }
}

