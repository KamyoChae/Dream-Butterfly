class Renderli {
    // 接收一个难度参数，决定一行创建多少个石头 0/1/2
    constructor(num, target){
        this.rowStoneNum = num
        this.target = target
    }
    getStoneNum(){
        return  Math.floor(Math.random() * this.rowStoneNum + 1)
        
    }
    getLiDomDiv(stoneNum){
        
        let dom = `<div class="stone"></div> `
        let nullDomArr = []
        for(let i = 0; i< 7-stoneNum; i++){
            nullDomArr.push(dom)
        }
        
        while(stoneNum){
            let name = Math.ceil(Math.random()*13) // 随机生成图片
            let index = Math.floor(Math.random()* 7) // 随机插入li位置
            console.log(index)
            let newDom = `<div class="stone" style="background-image:url(./images/lib/${name}.jpg)"></div> `
            nullDomArr.splice(index, 0, newDom )
            stoneNum --
        }
        

        return this.toElement(nullDomArr.join("")) 
    }
    toElement(strDom){
        // 踩了一个大坑，写完项目着重做下总结
        let li = document.createElement('li'); 
        li.innerHTML = strDom; 
        return li
    }
    insertToOb(dom){
        let ul = document.querySelector(this.target)  
        ul.insertBefore(dom, ul.firstChild) 
    }
    run(){
        let num = this.getStoneNum() 
        let liDiv = this.getLiDomDiv(num) 
        this.insertToOb(liDiv)
    }
  
    
}
  