module.exports = class Task {
    // Constructor de la clase Task, que crea una tarea con un identificador, titulo, descripcion, con la fecha de hoy
    //  y por defecto las marca como NO completadas
    constructor(id, title, description, completed=false, 
        createdAt = new Date()) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.completed = completed;
            this.createdAt = createdAt;
        }
};