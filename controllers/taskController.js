//import Task from "../models/task";
const Task = require("../models/task");

let task = [
    {
        id: 1,
        title: "Tarea 1",
        description: "Descripcion de la tarea 1",
        completed: false
    },
    {
        id: 2,
        title: "Tarea 2",
        description: "Descripcion de la tarea 2",
        completed: false
    }
];

// ------------------------------------------
// -------------- Funciones GET ----------------
function getAllTask(){
    return task;
}

function getTaskById(id){
    return task.find(task => task.id === parseInt(id));
}

function getTaskInfo(){
    let totalTask = task.length;
    let lastTask = task[0];
    let firstTask = task[task.length - 1];
    let completedTasks = 0;
    task.forEach(element => {
        if (element.completed){
            completedTasks++;
        }
    });
    return {
        "Total Tasks": totalTask,
        "Last Task": lastTask,
        "First Task": firstTask,
        "Completed Tasks": completedTasks,
        "Pending Tasks": task.length - completedTasks
    }
}

// ------------------------------------------
// -------------- Funciones POST ---------------
function createTask(title, description){
    const newTask = new Task(task.length + 1, title, description);
    task.push(newTask);
    return newTask;
}

// ------------------------------------------
// -------------- Funciones PUT ----------------
function updateTask(id, title, description, completed){
    if (!task.find(task => task.id === parseInt(id))){
        return false;
    }
    const taskToUpdate = task.find(task => task.id === parseInt(id));
    taskToUpdate.title = title;
    taskToUpdate.description = description;
    taskToUpdate.completed = completed;
    return taskToUpdate;
}

// ------------------------------------------
// -------------- Funciones DELETE ---------------
function deleteTask(id){
    if (!task.find(task => task.id === parseInt(id))){
        return false;
    }
    const taskToDelete = task.find(task => task.id === parseInt(id));
    const index = task.indexOf(taskToDelete);
    task.splice(index, 1);
    return task;
}

module.exports = {
    getAllTask,
    getTaskById,
    getTaskInfo,
    createTask,
    updateTask,
    deleteTask
}