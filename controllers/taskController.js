import Task from "../models/task";

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

function getAllTask(){
    return task;
}

function createTask(title, description){
    const newTask = new Task(task.length + 1, title, description);
    task.push(newTask);
    return newTask;
}

module.exports = {
    getAllTask,
    createTask
}