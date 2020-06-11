const mongoose= require('mongoose');

const ComentarioSchema = mongoose.Schema({
    idAnime:String,
    idUsuario:String,
    comentario:String,
},{
    timestamps:true
});


module.exports = mongoose.model('Comentario',ComentarioSchema);