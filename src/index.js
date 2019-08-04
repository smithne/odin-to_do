"use strict";

const todoFactory = (title, description, dueDate, priority) => {
    
    let completed = false;
    
    const setComplete = () => {
        this.completed = true;
    }

    return {title, description, dueDate, priority, completed, setComplete};
}

const projectFactory = (projectName) => {
    const todos = [];
    
    const addTodo = (todo) => {
        todos.push(todo);
    }

    const getTodos = () => todos;

    return {projectName, addTodo, getTodos};
}

const todoListFactory = (listName) => {
    const projects = [];

    const addProject = (project) => {
        projects.push(project);
    }

    const getProjects = () => projects;

    return {listName, addProject, getProjects};
}


const uiController = (appElement, todoList) => {

    const createNewProjectBtn = (container) => {
        let parent = document.getElementById(container);
        
    }

}

// app workflow
    // V1: no storage - new list on page load
        // create new list on page load


// ui elements
    // V1
        // button to create new project
        // display all projects
            // display all tasks for each project



// objects
    // to-do item

    // project - contains to-dos

    // to-do list - contains of projects

    // DOM management

    // local storage

console.log('webpack operational');

let todo1 = todoFactory("Take out Garbage",
    "Empty the garbage from house and take garbage bin to street",
    "Tomorrow", "Medium");

let todo2 = todoFactory("Take out Compost",
    "Empty the compost from house and take compost bin to street",
    "Tomorrow", "Medium");


console.log(todo1);

let project1 = projectFactory();

project1.addTodo(todo1);
project1.addTodo(todo2);

todoList = todoListFactory("defaultList");

todoList.addProject(project1);

console.log(project1.getTodos());