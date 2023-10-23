"use strict"
import {Project, Todo} from './project.js';

const Storage = () => {
    const saveProjectList = (projectList) => {
        function unpackObj(){
            let newObj = new Object();
            let projectArr = projectList.getProjectList()
            projectArr.forEach(project => {
                let projectTitle = project.getName()
                let todoArr = project.getChilds()
                let todoEntires = []
                todoArr.forEach(todo => {
                    todoEntires.push([todo.getTitle(), todo.getDueDate(), todo.isComplete()])
                })
                newObj[projectTitle] = todoEntires
                todoEntires = []
            });
            return newObj
        }
        localStorage.setItem('projectList', JSON.stringify(unpackObj()))
    }
    const loadProjectList = (projectList) => {
        let addToProjectList = JSON.parse(localStorage.getItem('projectList'))
        let projectKeys = Object.keys(addToProjectList)
        projectKeys.forEach(projectTitle => {
            let newProject = Project(projectTitle)
            addToProjectList[projectTitle].forEach(todo => {
                newProject.addChild(Todo(todo[0], newProject, todo[1], todo[2]))
            })
            projectList.addProject(newProject)
        })
    }



    return {saveProjectList, loadProjectList}
}

const storage = Storage()

export default storage
