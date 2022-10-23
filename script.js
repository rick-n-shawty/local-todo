const addBtn = document.getElementById('add-btn')
const mainInput = document.getElementById('input')
const mainContainer = document.getElementById('task-container')
let global_todo = []


class Task{
    constructor(title, id){
        this.title = title
        this.id = id
        this.isBeingEdited = false
        this.isCompleted = false
        this.textInput = document.createElement('div')
        this.editBtn = document.createElement('button')
        this.deleteBtn = document.createElement('button')
        this.checkbox = document.createElement('input')
    }
    
    setup(){
        const task = document.createElement('div')
        task.id = this.id
        task.className = 'taskCard'

        const leftSection = document.createElement('div')
        leftSection.append(this.checkbox, this.textInput)
        leftSection.className = 'taskCard-left'
        this.checkbox.type = 'checkbox'
        this.checkbox.onclick = () => this.complete()
        this.textInput.textContent = this.title
        this.textInput.contentEditable = this.isBeingEdited

        const rightSection = document.createElement('div')
        rightSection.append(this.editBtn, this.deleteBtn)
        rightSection.className = 'taskCard-right'
        this.editBtn.textContent = this.isBeingEdited ? 'SAVE' : 'EDIT'
        this.editBtn.className = 'editBtn'
        this.editBtn.onclick  = () => this.edit()
        this.deleteBtn.textContent = 'DELETE'
        this.deleteBtn.className = 'deleteBtn'
        this.deleteBtn.onclick = () => this.delete()
        task.append(leftSection, rightSection)
        return task
    };

    edit(){
        this.isBeingEdited = !this.isBeingEdited
        this.editBtn.textContent = this.isBeingEdited ? 'SAVE' : 'EDIT'     
        this.textInput.contentEditable = this.isBeingEdited
        const todos = JSON.parse(localStorage.getItem('todos'))
        this.title = this.textInput.textContent
        let newTodos = todos.map(item =>{
            if(this.id === item.id){
                item.title = this.title
                return item
            }else{
                return item
            }
        })
        localStorage.setItem('todos', JSON.stringify(newTodos))                 
    };
    complete(){
        this.isCompleted = !this.isCompleted
        this.textInput.classList.toggle('completed')
    }
    delete(){
        const todos = JSON.parse(localStorage.getItem('todos'))
        let newTodos = []
        todos.forEach(element => {
            if(element.id !== this.id){
                newTodos.push(element)
            }
        });
       newTodos = newTodos.map(item => {
        if(newTodos.indexOf(item) !== item.id){
            item.id = newTodos.indexOf(item)
            return item
        }else{
            return item
        }
       })
       localStorage.setItem('todos', JSON.stringify(newTodos))
       display(JSON.parse(localStorage.getItem('todos')))
    }

}


addBtn.addEventListener('click', () =>{
    if(localStorage.getItem('todos') === null){
        localStorage.setItem('todos', JSON.stringify([]))
    }
    const todos = JSON.parse(localStorage.getItem('todos'))
    todos.push(
        {
            id: todos.length, 
            title: mainInput.value
        }
    )
    localStorage.setItem('todos', JSON.stringify(todos))
    display(todos)
    mainInput.value = ''
})

function display(todos){
    const taskElements = todos.map(item =>{
        return new Task(item.title, item.id)
    })
    mainContainer.replaceChildren()
    for(let i = 0; i < taskElements.length; i++){
        mainContainer.append(taskElements[i].setup())
    }
}
display(JSON.parse(localStorage.getItem('todos')))