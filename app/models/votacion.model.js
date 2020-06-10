const mongoose= require('mongoose');

const VotacionSchema = mongoose.Schema({
    idAnime:String,
    idUsuario:String,
    nota:Number
},{
    timestamps:true
});


module.exports = mongoose.model('Votacion',VotacionSchema);