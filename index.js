// Modulo de express
const express = require('express');

// Nuestra clase de tareas
const Task = require('./task');

const app = express();

// Puerto de comunicacion con el servidor
const PORT = process.env.PORT || 3000;

// Establecemos el modelo de intercambio de datos
app.use(express.json());

// Array de tareas
let task = [];

// Rutas de las acciones
app.post('/task',(req, res) => {
    console.log("Request: "+req);
    console.log("Response: "+res);

    // Desestructurar los valores de tittle y description del body
    // de la peticion
    const { title, description } = req.body

    // Crear las tareas con la informacion basica (titulo y descripcion) 
    const newTask = new Task(task.length + 1, title, description);

    // Agregar la nueva tarea la arreglo
    task.push(newTask);

    // Devolver el estado de la respuesta
    res.status(201).json(newTask);   
});

// Consulta de todas las tareas
app.get('/task', (req, res) => {
    res.json(task);
})
// Ejecutar el servidor en el puerto indicado (3000)
app.listen(PORT, () =>{
    console.log(`Servidor en ejecucion ${PORT}`);
});
