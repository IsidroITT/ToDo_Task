// Modulo de express
const express = require('express');
const bodyParser = require('body-parser');
const taskRouter = require('./routes/taskRoutes');
const authUtils = require('./middleware/authUtilites');

const app = express();
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    if (userName === 'admin' && password === 'admin'){
        const token = authUtils.generateToken({ id: 1, name: userName });
        return res.status(200).json({ token });
    }else {
        return res.status(401).json({ Error: "Usuario o contraseña incorrecta" });
    }
})

app.use('/task', taskRouter);

// Puerto de comunicacion con el servidor
const PORT = process.env.PORT || 3000;

// Ejecutar el servidor en el puerto indicado (3000)
app.listen(PORT, () =>{
    console.log(`Servidor en ejecucion ${PORT}`);
});