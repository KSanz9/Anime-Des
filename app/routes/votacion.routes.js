const express  = require("express");
const router   = express.Router();

const votacion = require('../controllers/votacion.controller.js');

    // Create a new user
    router.post('/create', votacion.create);

    // Retrieve all investigadores
    router.get('/list', votacion.findAll);

    //revisar usuario si es valido en la base de datos
    //router.post('/isValidUser', usuarios.isValidUser);

    // Retrieve a single investigadores with investigadorId
    //router.get('/investigadores/:investigadorId', investigadores.findOne);

    // Update a investigadores with investigadorId
    //router.put('/investigadores/:investigadorId', investigadores.update);

    // Delete a investigadores with investigadorId
    //router.delete('/investigadores/:investigadorId', investigadores.delete);

    module.exports = router;