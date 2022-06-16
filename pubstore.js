export const makePubstore = initValue => {
    let value = initValue
    const subscribers = []
    
    const subscribe = callback => {
        subscribers.push(callback)
        callback(value)
    }
    
    const unsubscribe = callback => {
        subscribers.splice(subscribers.indexOf(callback), 1)
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
