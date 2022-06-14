const makePublishstore = initValue => {
    let value = initValue
    const subscribes = []
    
    const subscribe = callback => {
        subscribes.push(callback)
        callback(value)
    }
    
    const unsubscribe = callback => {
        subscribes.splice(subscribes.indexOf(callback), 1)
    }
    
    const publish = getNewValue => {
        const newValue = getNewValue(value)
        
        // If value hasn't change, don't update
        if (newValue == value) return
        
        value = newValue
        
        for (const callback of subscribes) callback(value)
    }
    
    const peek = () => value
    
    return [subscribe, unsubscribe, publish, peek]
}
