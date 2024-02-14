const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authUtils = require('../middleware/authUtilites');

function authentification(req, res, next) {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ Error: 'Unauthorized' });
    }

    const decadetoken = authUtils.verifyToken(token);
    if(!decadetoken){
        return res.status(401).json({ Error: 'Unauthorized' });
    }
    res.user = decadetoken;
    next();
}

//------------------------------------------
// -------------- Rutas GET ----------------
// Ruta para consultar todas las tareas
router.get('/',authentification, (req, res) => {
    res.json(taskController.getAllTask());
});

router.get('/info',authentification ,(req, res) => {
    const info = taskController.getTaskInfo();
    res.json(info);
});

// Ruta para consultar una tarea por su id
router.get('/:id', authentification, (req, res) => {
    const { id } = req.params;
    const task = taskController.getTaskById(id);

    if (task){
        res.json(task);
    } else {
        res.status(404).json({Error: "Tarea no encontrada"});
    }
});


//------------------------------------------
// -------------- Rutas POST ---------------
router.post('/', authentification, (req, res) => {
    const { title, description } = req.body;
    const newTask = taskController.createTask(title, description);
    res.status(201).json(newTask);
});

//------------------------------------------
// -------------- Rutas PUT ----------------
router.put('/:id', authentification, (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const task = taskController.updateTask(id, title, description, completed);

    if (task){
        res.json(task);
    } else {
        res.status(404).json({Error: "Tarea no encontrada"});
    }
});

//------------------------------------------
// ------------ Rutas DELETE ---------------
router.delete('/:id', authentification, (req, res) => {
    const { id } = req.params;
    const task = taskController.deleteTask(id);

    if (task){
        res.json(task);
    } else {
        res.status(404).json({Error: "Tarea no encontrada"});
    }
})

module.exports = router;