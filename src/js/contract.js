class myCantract {
   
    /**
     * n1wWjxZmTX2SJGbT9YrY84dK5xkTCbRLcqQ
     * 865b06238d7dd0c9fbf491af766fe3ddddbff4bcc687fb5885835484a9be31e7
     */
    constructor() { }

    init() { 
        LocalContractStorage.set('items', [])
    }

    getItems() { 
        return LocalContractStorage.get('items')
    }
    createItems(content) {
        let newItem = {
            content:content,
            publish_at: Date.now() / 1000,

        }
        let items = LocalContractStorage.get('items') 
        items = items.push(newItem)
        LocalContractStorage.set('items', items)
        return newItem
    }
}

module.exports = myCantract

 