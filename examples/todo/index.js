import { makePubstore } from "../../pubstore.js"

// Define components
const makeTodoList = elem => ({
    // Functions for each prop
    todos: todos => {
        // Clear todo list
        elem.innerHTML = ""
        
        for (const todo of todos) {
            const li = document.createElement("li")
            li.innerHTML = todo
            elem.append(li)
        }
    }
})

// Collect elements
const todoListElem = document.getElementById("todos")
const todoTextInput = document.getElementById("todo-text")
const addTodoButton = document.getElementById("add-todo")

// Initialize components
const todoList = makeTodoList(todoListElem)

// Create model
const [subTodos, unsubTodos, pubTodos, todos] = makePubstore([])

// Subscribe funcs to model (often component props)
subTodos(todoList.todos)

// Events should generally only publish updates to model
addTodoButton.onclick = () => {
    pubTodos(oldTodos => [...oldTodos, todoTextInput.value])
    todoTextInput.value = ""
}
