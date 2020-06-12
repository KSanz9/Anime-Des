const Comentario = require('../models/comentarios.model.js');

// Crear y salvar
exports.create = (req,res)=>{

    // Validamos el Investigador
    if (!req.body){
        console.log(req.body);
        return res.status(400).send({
           message:"Comentario Vacio..." 
        });
    }

    const comentario = new Comentario({
        idAnime: req.body.idAnime,
        idUsuario: req.body.idUsuario,
        comentario: req.body.comentario
    })

    comentario.save().then(data =>{
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message|| "Something was wrong creating Comentario"
        });
    });
};


exports.comentAnime = (req, res) => {

    const comentario = new Comentario({
        idAnime: req.body.codigoAnime
    })
        Comentario.find({idAnime: comentario.idAnime}).then(animeAux=>{
        
        res.status(200).send({anime:animeAux});

   }).catch(err=>{
        res.status(500).send({
            message: err.message || " Algo fue mal"
        });
    });


}