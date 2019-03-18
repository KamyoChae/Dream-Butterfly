class myCantract {
   
    /**
     * n1h1iYxMr5wFTi7coWx4wHYWQpqqgeqrnrL
     * d84c50660ef88206cf5054407326c541d49cf5169e4f000c535a9edfb74a8d39
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
        items = [...items, newItem]
        LocalContractStorage.set('items', items)
        return newItem
    }
}

module.exports = myCantract

 