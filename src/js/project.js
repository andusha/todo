"use strict"
import format from "date-fns/format"
import parseISO from "date-fns/parseISO"

const ProjectList = () => {
    let projectList = []

    const getProjectList = () => projectList
    const addProject = (project) => projectList.push(project)   
    const deleteProject = (project) => {
        project.deleteAllChilds()
        let projectToDelete = projectList.indexOf(project)
        projectList.splice(projectToDelete,1) 
    }

    return {addProject, getProjectList, deleteProject}
}

const Project = (name) => {
    let childs = []

    const reName = (newName) => name = newName
    const getName = () => name
    const addChild = (child) => childs.push(child)
    const deleteChild = (child) => {
        let childToDelete = childs.indexOf(child)
        childs.splice(childToDelete,1)  
    }
    const getChilds = () => childs
    const deleteAllChilds = () => childs.length = 0

    return {getName, reName, addChild, deleteChild, getChilds, deleteAllChilds}
}

const Todo = (title, parent, description = '', dueDate = format(Date.now(), 'PP'), complete = false) => {
    let parents = [parent]

    const getTitle = () => title
    const renameTitle = (newTitle) => title = newTitle

    const isComplete = () => complete
    const toggleComplete = () => complete = !complete

    const getDescription = () => description
    const reNameDescription = (newDescription) => description = newDescription

    const getDueDate = () => dueDate
    const newDueDate = (newDueDate) => {
        let parsedDueDate = parseISO(newDueDate)
        dueDate = format(parsedDueDate, 'PP')
    }

    const getParent = () => parents[0]
    const addParent = (newParent) => parents.push(newParent)

    return {    
        getTitle, 
        renameTitle, 
        isComplete, 
        toggleComplete, 
        getDescription, 
        reNameDescription, 
        getDueDate, 
        newDueDate,
        addParent,
        getParent,
        }
}

export {ProjectList ,Project, Todo}
