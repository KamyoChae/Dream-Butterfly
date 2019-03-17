class myCantract{

    // 合约地址 
    // n233qBhuo3BgcyMaw49N4fN1ZZztcVtVVT9
    // 交易哈希
    // d5cb3c1df2e7b657161080e9d93a3940d9e0e2ded42ddfacf552e545df6ed871
    constructor(){}
    
    init(){
        // 初始化必须的
        LocalContractStorage.set('items', [])
    }

    getItems(){
        // 公开接口
        return LocalContractStorage.get('items')
    }
    createItems(content){
        const newItem = {
            content,
            publish_at:Date.now()/1000,

        }
        const items = LocalContractStorage.get('items')
        items = items.push(newItem)
        LocalContractStorage.set('items', items)
        return newItem 
    } 
}

module.exports = myCantract