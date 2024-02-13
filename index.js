// Modulo de express
const express = require('express');
const bodyParser = require('body-parser');
const taskRouter = require('./routes/taskRouter');

const app = express();
app.use(bodyParser.json())
app.use('/task', taskRouter);

// Puerto de comunicacion con el servidor
const PORT = process.env.PORT || 3000;

// Array de tareas
let task = [];

// Rutas de las acciones
app.post('/task',(req, res) => {
    //Comprobar que el body tenga title y description
    if (!req.body.title || !req.body.description){
        return res.status(400).json({Error: "Es necesario un title o description en el body"});
    }

    // Desestructurar los valores de tittle y description del body
    // de la peticion
    const { title, description } = req.body

    // Crear las tareas con la informacion basica (titulo y descripcion) 
    const newTask = new Task(task.length + 1, title, description);

    // Agregar la nueva tarea la arreglo
    task.push(newTask);

    // Devolver el estado de la respuesta
    return res.status(201).json(newTask);   
});

// Consulta de todas las tareas
app.get('/task', (req, res) => {
    
    // Comprobar si la lista esta vacia
    if (task.length === 0){
        return res.status(404).json({Error: "La lista de tareas esta vacia"});
    }

    // Enviar la lista de tareas
    return res.status(302).json(task);
})

// Consultar una tarea por su id
app.get('/task/one', (req, res) => {

    if (!res.body.id){
        return res.status(400).json({ Error: "Hace falta un parametro a buscar" });
    }

    const { id } = req.body;
    
    // Error  si no encuentra la tarea buscada
    if (!task.includes(task[id - 1])){
        return res.status(404).json({Error: "Tarea no encontrada"});
    }

    return res.status(302).json(task[id - 1]);    
})

// Consultar informacion de las tareas
app.get('/task/info', (req, res) => {

    // Comprobar que existan tareas en el lista
    if (task.length === 0){
        return res.status(404).json({ Error: "La lista de elementos se encuentra vacia" })
    }

    // Variables 'auxiliares'
    let totalTask = task.length;
    let lastTask = task[0];
    let firstTask = task[task.length - 1];
    let completedTasks = 0;

    task.forEach(element => {
        if (element.completed){
            completedTasks++;
        }
    });

    return res.status(302).json({
        "Total Tasks": totalTask,
        "Last Task": lastTask,
        "First Task": firstTask,
        "Completed Tasks": completedTasks,
        "Pending Tasks": task.length - completedTasks
    })
})

// Eliminar elementos de la lista
app.delete('/task', (req, res) => {

    if (!res.body.id){
        return res.status(400).json({ Error: "Hace falta un parametro a buscar" });
    }

    const { id } = req.body

    if (!task.includes(task[id - 1])){
        return res.status(404).json({Error: "Tarea no encontrada"});
    }

    delete task[id - 1];
    return res.status(200).json(task);
})

// Actualizar la lista de tareas
app.put('/task', (req, res) => {

    // Comprobar que la informacion de la tarea a actualizar este completa
    if (!req.body.id || !req.body.title || !req.body.description || !req.body.completed){
        return res.status(400).json({Error: "Es necesaria la informacion completa de la tarea a actualizar"});
    }

    const { id, title, description, completed} = req.body;

    // Comprobar que la tarea exista
    if (!task.includes(task[id - 1])){
        return res.status(400).json({Error: "Tarea no encontrada"});
    }

    // Crear las tareas con la informacion basica (titulo y descripcion) 
    const updatedTask = new Task(id, title, description, completed);

    // Actualizar la tarea con la nueva tarea creada
    task[id - 1] = updatedTask;

    // Devolver el estado de la respuesta y mostar la nueva tarea agregada
    return res.status(200).json(updatedTask);  
})


// Ejecutar el servidor en el puerto indicado (3000)
app.listen(PORT, () =>{
    console.log(`Servidor en ejecucion ${PORT}`);
});