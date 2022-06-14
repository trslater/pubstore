import { makePubstore } from "../../pubstore.js"

// Collect elements
const aForm = document.getElementById("a-form")
const bForm = document.getElementById("b-form")
const output = document.getElementById("output")

// Define model
const [subA, unsubA, pubA, a] = makePubstore([])
const [subB, unsubB, pubB, b] = makePubstore([])
const [subDiff, unsubDiff, pubDiff, diff] = makePubstore(b() - a())

// Subscribe to model (here is the deriving magic!)
subDiff(diff => { output.innerHTML = diff })
subA(a => pubDiff(() => b() - a))
subB(b => pubDiff(() => b - a()))

// Events publish updates to store
aForm.onsubmit = event => {
    pubA(() => event.target.elements["a"].value)
}
bForm.onsubmit = event => {
    pubB(() => event.target.elements["b"].value)
}
