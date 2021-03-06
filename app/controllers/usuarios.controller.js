const Usuario = require('../models/usuarios.model.js');

// Crear y salvar
exports.create = (req,res)=>{

    // Validamos el Investigador
    if (!req.body){
        console.log(req.body);
        return res.status(400).send({
           message:"Usuario Vacio..." 
        });
    }

    const usuario = new Usuario({
        nombre: req.body.nombre || "Usuario",
        email: req.body.email || "usuario@ejemplo.com",
        password: req.body.password|| "usuario",
        imgUser: req.body.imgUser|| ""
    })

    usuario.save().then(data =>{
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message|| "Something was wrong creating Usuario"
        });
    });
};


// Obtener todos los Usuarios
exports.findAll = (req,res) => {

    Usuario.find().then(usuarios=>{
        res.send(usuarios);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || " Algo fue mal"
        });
    });

};


exports.conseguirAnime = (req, res) => {
   
    Usuario.find({nombre: req.body.idUsuario}).then(userAux=>{
        console.log(userAux);
        res.status(200).send({usuario:userAux});

   }).catch(err=>{
        res.status(500).send({
            message: err.message || " Algo fue mal"
        });
    });


}




//Comprobar si el usuario dado es valido y esta en la base de datos de la pag.
exports.isValidUser = (req, res) => {
    const usuario = new Usuario({nombre: req.body.nombre,password: req.body.password})

    Usuario.find({nombre: usuario.nombre}).then(usuarioAux=>{
        
        res.status(200).send({status:true, usuario:usuarioAux[0]});

   }).catch(err=>{
        res.status(500).send({
            message: err.message || " Algo fue mal"
        });
    });

    /*TODO*/
}

exports.updateAnimeList = (req, res) => {
  const usuario = req.body.usuario;
  const anime = req.body.anime;
    console.log("voy a añadir a fav");
Usuario.findOne({nombre: usuario}).then(usuarioAux=>{
    if (!usuarioAux.animesVistos.filter(animeUse => animeUse === anime ).length) {
        usuarioAux.animesVistos.push(anime);
        usuarioAux.save();
        res.status(200).send({status:true});    
    }
   
}).catch(err=>{
    res.status(500).send({
        message: err.message || " Algo fue mal"
    });
});
}

exports.updateImg = (req, res) => {
    const imgUser = req.body.imgUser;
    const usuario = req.body.usuario;
      console.log("voy a añadir a fav");
  Usuario.findOne({nombre: usuario}).then(usuarioAux=>{

          usuarioAux.imgUser = imgUser;
          usuarioAux.save();
          res.status(200).send({status:true});    
      
     
  }).catch(err=>{
      res.status(500).send({
          message: err.message || " Algo fue mal"
      });
  });
  }



exports.userExit = (req, res) => {
    const usuario = req.body.email;

  Usuario.find({email: usuario}).then(usuarioAux=>{
      console.log("penemanalrescate:   "+usuarioAux.length);
            if (usuarioAux.length > 0) {
                res.status(200).send({status:false});
            }else{
                res.status(200).send({status:true});
            }
             
      
     
  }).catch(err=>{
      res.status(500).send({
          message: err.message || " Algo fue mal"
      });
  });
  }


