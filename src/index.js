"use strict";

const todoFactory = (title, description, dueDate, priority) => {
  let completed = false;

  const setComplete = () => {
    this.completed = true;
  };

  return { title, description, dueDate, priority, completed, setComplete };
};

const projectFactory = projectName => {
  const todos = [];

  const addTodo = todo => {
    todos.push(todo);
  };

  const getTodos = () => todos;

  return { projectName, addTodo, getTodos };
};

const todoListFactory = listName => {
  const projects = [];

  const addProject = project => {
    projects.push(project);
  };

  const getProjects = () => projects;

  return { listName, addProject, getProjects };
};

const uiController = (appElement, todoList) => {
  const parent = document.getElementById(appElement);

  const initUi = () => {
    document
      .getElementById("closeOverlayBtn")
      .addEventListener("click", closeOverlay);

    document
      .getElementById("createNewProjectBtn")
      .addEventListener("click", () => {
        createProject(document.getElementById("projectName").value);
      });

    createNewProjectBtn();
    displayProjects();
  };

  const closeOverlay = () => {
    document.getElementById("newProjectForm").reset();
    document.getElementById("newProjectOverlay").style.display = "none";
  };

  const createNewProjectBtn = () => {
    const newProjectBtn = document.createElement("button");
    newProjectBtn.innerHTML = "New Project";
    newProjectBtn.classList.add("btn");
    newProjectBtn.addEventListener("click", () => {
      displayProjects();
      document.getElementById("newProjectOverlay").style.display = "block";
    });

    parent.appendChild(newProjectBtn);
  };

  const createProject = projectName => {
    const newProject = projectFactory(projectName);
    todoList.addProject(newProject);
    closeOverlay();
    displayProjects();
  };

  const renderNewTaskForm = (divID, project) => {
    const containerNode = document.getElementById(divID);
    const elements = new Map([
      ["title", ["Task Name", "text"]],
      ["description", ["Description", "text"]],
      ["dueDate", ["Due Date", "date"]],
      ["priority", ["Priority", "text"]]
    ]);

    const form = document.createElement("form");

    elements.forEach((value, key) => {
      const label = document.createElement("label");
      label.innerHTML = value[0];
      label.htmlFor = "newTask_" + key;
      form.appendChild(label);

      const input = document.createElement("input");
      input.type = value[1];
      input.id = "newTask_" + key;
      input.name = "newTask_" + key;
      form.appendChild(input);
    });
    const createBtn = document.createElement("button");
    createBtn.innerHTML = "Create";
    createBtn.type = "button";
    createBtn.addEventListener("click", e => {
      console.log("Submit new task");
      console.log(e.target.parentElement.elements);
      const title = document.getElementById("newTask_title").value;
      const description = document.getElementById("newTask_description").value;
      const dueDate = document.getElementById("newTask_dueDate").value;
      const priority = document.getElementById("newTask_priority").value;
      //const title = e.path
      const newTodo = todoFactory(title, description, dueDate, priority);
      project.addTodo(newTodo);
      displayProjects();
    });
    form.appendChild(createBtn);
    containerNode.parentNode.insertBefore(form, containerNode.nextSibling);

    console.log("creating new task form for: " + divID);
  };

  const displayProjects = () => {
    const projectsContainer =
      document.getElementById("projectsDiv") || document.createElement("div");
    projectsContainer.id = "projectsDiv";
    projectsContainer.innerHTML = "";

    const projects = todoList.getProjects();

    // iterate through each project
    for (let i = 0; i < projects.length; i++) {
      const projectDiv = document.createElement("div");

      projectDiv.innerHTML = `<h2>${projects[i].projectName}</h2>`;
      projectDiv.classList.add("project");
      projectDiv.id = projects[i].projectName;

      // iterate through to-dos in project
      const todos = projects[i].getTodos();

      // add header row if project is not empty
      for (let j = 0; j < todos.length; j++) {
        const todoDiv = document.createElement("div");
        todoDiv.innerHTML = `<h3>${todos[j].title}</h3>`;
        todoDiv.innerHTML += " " + todos[j].dueDate;
        todoDiv.classList.add("todo");
        projectDiv.appendChild(todoDiv);
      }

      const createTaskBtn = document.createElement("button");
      createTaskBtn.classList.add("createTaskBtn");
      createTaskBtn.id = `createTask_${projects[i].projectName}`;
      createTaskBtn.addEventListener("click", () => {
        renderNewTaskForm(createTaskBtn.id, projects[i]);
      });
      createTaskBtn.innerHTML = "Create New Task";
      projectDiv.appendChild(createTaskBtn);
      projectsContainer.appendChild(projectDiv);
    }
    console.log(todoList.getProjects());
    parent.appendChild(projectsContainer);
  };

  return { initUi, displayProjects };
};

console.log("webpack operational");

let todo1 = todoFactory(
  "Take out Garbage",
  "Empty the garbage from house and take garbage bin to street",
  "Tomorrow",
  "Medium"
);

let todo2 = todoFactory(
  "Take out Compost",
  "Empty the compost from house and take compost bin to street",
  "Tomorrow",
  "Medium"
);

//console.log(todo1);

let project1 = projectFactory("Chores");

project1.addTodo(todo1);
project1.addTodo(todo2);

let todoList = todoListFactory("defaultList");

todoList.addProject(project1);

//console.log(project1.getTodos());

let ui = uiController("app", todoList);
ui.initUi();
