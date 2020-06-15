const express  = require("express");
const router   = express.Router();

const comentarios = require('../controllers/comentarios.controller.js');

    // Crear un comentario pasando el usuario la id del anime y 
    router.post('/create', comentarios.create);
    //Obtener comentarios de la base de datos
    router.post('/comentAnime', comentarios.comentAnime);

    module.exports = router;