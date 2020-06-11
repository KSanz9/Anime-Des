const express  = require("express");
const router   = express.Router();

const comentarios = require('../controllers/comentarios.controller.js');

    // Create a new user
    router.post('/create', comentarios.create);


    module.exports = router;