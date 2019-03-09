class ErrorCheck extends InfoStart{ 
    run(){

        this.toIndexPage()
    }
    toIndexPage(){ 
        let dom = document.querySelector('.overstart')
        dom.addEventListener("click", ()=>{

            this.showWindow("index")
        })
    }
}