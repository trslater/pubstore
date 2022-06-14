import { makePubstore } from "../../pubstore.js"

// Define components
const makeBox = elem => ({
    // Props as object functions
    isDragging: isDragging => {
        if (isDragging) elem.classList.add("dragging")
        else elem.classList.remove("dragging")
    },
    x: x => { elem.style.left = `${x - 50}px` },
    y: y => { elem.style.top = `${y - 50}px` }
})

// Collect elements
const boxElem = document.getElementById("box")

// Construct components
const box = makeBox(boxElem)

// Define model
const [subIsDragging, unsubIsDragging, pubIsDragging, isDragging] = makePubstore(false)
const [subDragX, unsubDragX, pubDragX, dragX] = makePubstore(100)
const [subDragY, unsubDragY, pubDragY, dragY] = makePubstore(100)

// Subscribe to model (usually component props)
subIsDragging(box.isDragging)
subDragX(box.x)
subDragY(box.y)

// Events trigger store updates
boxElem.onmousedown = event => {
    pubIsDragging(() => true)
}
window.onmousemove = event => {
    if (isDragging()) {
        pubDragX(() => event.clientX)
        pubDragY(() => event.clientY)
    }
}
boxElem.onmouseup = event => {
    pubIsDragging(() => false)
}
