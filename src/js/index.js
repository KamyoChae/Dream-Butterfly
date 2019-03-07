class StartGame{
    clickStart(){
        let start = document.querySelector(".startbtn")
        let win_index = document.querySelector('.index')
        let win_start = document.querySelector('.start')
        start.addEventListener('click',()=>{
            win_index.style.zIndex = "-999"
            win_start.style.zIndex = "999"
        })
    }
    run(){
        this.clickStart()
    }
}

new StartGame().run()