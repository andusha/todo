"use strict";
import {ProjectList, Project, Todo} from './project.js';
import closeSvg from '../icons/close.svg'


const projectList = ProjectList()

let current

function createImage(image) {
    const myImage = new Image();
    myImage.src = image;

    return myImage
}



function projectIsExist(project) {
    if (projectList.getProjectList().includes(project)) return true
    return false
}

function navPopup(){
    const popup = document.querySelector('.nav__popup')

    popup.addEventListener("submit", function(e){
        e.preventDefault()
        let projectName = e.currentTarget.projectName.value
        projectList.addProject(Project(projectName))
        updateProjectList()
    })
}
function currentProject (project='', param=false) {
    if (param) current = project
    else return current
}

function updateProjectList () {
    const projectContainer = document.querySelector('.nav__project-container')
    projectContainer.innerHTML = ''

    let projectArr = projectList.getProjectList()

    for (let i = 0; i < projectArr.length; i++){
        projectContainer.appendChild(createProjectElement(projectArr[i]))
    }
    let current = currentProject()
    let currentExist = projectIsExist(current)
    if (currentExist) {
        let currentIndex = projectArr.indexOf(current)
        console.log(current.getName(), projectArr.indexOf(current))
        projectContainer.childNodes[currentIndex].click()
    }
    else if (!projectArr.length == 0) projectContainer.firstChild.click() 
}

function createProjectElement (project) {
    function listener () {
        title.innerHTML = project.getName()
        updateTodoList(project)
        currentProject(project, true)
    }

    const title = document.querySelector('.main__title')

    const div = document.createElement('div')
    const span = document.createElement('span')
    const deleteButton = document.createElement('button')

    span.classList.add('nav__text');
    div.classList.add('nav__project');
    deleteButton.classList.add('nav__project-button')
    
    span.innerText = project.getName()

    div.addEventListener('click', listener)

    deleteButton.addEventListener('click', function () {
        div.removeEventListener('click', listener)
        title.innerHTML = ''
        projectList.deleteProject(project)
        updateTodoList(project)
        updateProjectList()
    })

    deleteButton.appendChild(createImage(closeSvg))
    div.appendChild(span)
    div.appendChild(deleteButton)

    return div
}
function addTodoToProjectForm (project) {
    const form = document.createElement('form')
    const input = document.createElement('input')
    const buttonDiv = document.createElement('div')
    const buttonAdd = document.createElement('button')
    const buttonDelete = document.createElement('button')

    form.classList.add('main__popup')
    input.classList.add('main__input')
    buttonDiv.classList.add('main__popup-buttons')
    buttonAdd.classList.add('main__popup-button-add')
    buttonDelete.classList.add('main__popup-button-delete')

    form.addEventListener('submit', function(e){
        e.preventDefault()
        let todoName = e.currentTarget.todoName.value
        project.addChild(Todo(todoName,project))
        console.log(project.getName(), project.getChilds())
        console.log(projectList.getProjectList())
        updateTodoList(project)
    })

    input.setAttribute('id', 'todoName')
    buttonAdd.setAttribute('type', 'submit')

    buttonDiv.appendChild(buttonAdd)
    buttonDiv.appendChild(buttonDelete)
    form.appendChild(input)
    form.appendChild(buttonDiv)

    return form
}

function updateTodoList (project) {
    const todoContainer = document.querySelector('.main__todo-container')
    todoContainer.innerHTML = ''

    for (let i = 0; i < project.getChilds().length; i++){
        todoContainer.appendChild(createTodoElement(project.getChilds()[i], i))
    }
    if (!projectList.getProjectList().includes(project)) return
    todoContainer.appendChild(addTodoToProjectForm(project))    
}

function createTodoElement (todo, count) {
    const parent = todo.getParent()
    console.log(count)
    const div = document.createElement('div')
    const span = document.createElement('span')
    const date = document.createElement('span')
    const renameButton = document.createElement('input')
    const completeButton = document.createElement('input')
    const dateButton = document.createElement('input')
    const deleteButton = document.createElement('button')

    span.innerText = todo.getTitle()
    date.innerText = todo.getDueDate()

    if (todo.isComplete()) {
        span.classList.add('main__todo_active')
        completeButton.setAttribute('checked', true)
    }

    renameButton.addEventListener('keyup', function(e) {
        if (!(e.which == 13)) return
        let renameTodo = document.getElementById('newTodoName' + count).value
        span.innerHTML = renameTodo
        todo.renameTitle(renameTodo)
    })

    dateButton.onchange = () =>{
        let newDate = document.getElementById('newTodoDate' + count).value
        todo.newDueDate(newDate)
        date.innerText = todo.getDueDate()
    }


    deleteButton.addEventListener('click', () =>{
        parent.deleteChild(todo)
        updateTodoList(parent)
    })

    completeButton.addEventListener('click', () => {
        todo.toggleComplete()
        span.classList.toggle('main__todo_active')
    })

    completeButton.setAttribute('type', 'checkbox')
    completeButton.setAttribute('id', 'complete' + count)
    dateButton.setAttribute('type', 'date')
    dateButton.setAttribute('id', 'newTodoDate' + count)
    renameButton.setAttribute('id', 'newTodoName' + count)
    

    div.classList.add('main__todo');
    span.classList.add('main__text');

    deleteButton.appendChild(createImage(closeSvg))

    div.appendChild(completeButton)
    div.appendChild(span)
    div.appendChild(renameButton)
    div.appendChild(date)
    div.appendChild(dateButton)
    div.appendChild(deleteButton)

    return div
}
export default navPopup


