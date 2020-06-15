const express  = require("express");
const router   = express.Router();

const usuarios = require('../controllers/usuarios.controller.js');

    // Create a new user
    router.post('/create', usuarios.create);

    //saber si el correo se repite
    router.post('/userExit', usuarios.userExit);

    //revisar usuario si es valido en la base de datos
    router.post('/isValidUser', usuarios.isValidUser);

    // Conseguir todos los usuarios de la base de datos
    router.get('/list', usuarios.findAll);

    // Update la lista de aime del usuario actual
    router.post('/updateAnimeList', usuarios.updateAnimeList);

    //Ver los animes que tiene el usuario
    router.post('/conseguirAnime', usuarios.conseguirAnime);
    
    //Cambiar la img del usuario
    router.post('/updateImg', usuarios.updateImg);

    module.exports = router;