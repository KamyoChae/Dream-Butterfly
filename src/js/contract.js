class myCantract {
   
    /**
     * n1pifG4soXjrRBFjJNWbEpqHQ8DzG8tNunc
     * 10517a2e972aa24516047107f5db999e80c749611cc5374f944105fe23149b35 
     */
    constructor() { }

    init() { 
        LocalContractStorage.set('items', [])
    }

    getItems() { 
        return LocalContractStorage.get('items')
    }
    createItems(score,user) {
        let newItem = {
            score,
            user,
            publish_at: Date.now() / 1000,

        }
        let items = LocalContractStorage.get('items') 
        items = [...items, newItem]
        LocalContractStorage.set('items', items)
        return newItem
    }
}

module.exports = myCantract

 