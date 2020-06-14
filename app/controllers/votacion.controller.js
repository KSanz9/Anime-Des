const Votacion = require('../models/votacion.model.js');

// Crear y salvar
exports.create = (req,res)=>{

    // Validamos el Investigador
    if (!req.body){
        console.log(req.body);
        return res.status(400).send({
           message:"Usuario Vacio..." 
        });
    }

    const votacion = new Votacion({
        idAnime: req.body.idAnime,
        idUsuario: req.body.idUsuario,
        nota: req.body.nota
    })


    votacion.save().then(data =>{
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message|| "Something was wrong creating Usuario"
        });
    });
};


// Obtener todos los Usuarios
exports.findAll = (req,res) => {

    Votacion.find().then(votaciones=>{
        res.send(votaciones);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || " Algo fue mal mientras los capturabamos a todos"
        });
    });

};


exports.mirarVotacion = (req, res) => {
    const idAnime = req.body.idAnime;
    let sumaNotas = 0;

  Votacion.find({idAnime: idAnime}).then(usuarioAux=>{
    usuarioAux.forEach(element => {
        console.log(usuarioAux);
        sumaNotas+=element.nota;
    });
        sumaNotas = sumaNotas/usuarioAux.length;

     res.status(200).send({sumaNotas});
          
      
     
  }).catch(err=>{
      res.status(500).send({
          message: err.message || " Algo fue mal"
      });
  });
  }