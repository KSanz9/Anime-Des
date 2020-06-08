const mongoose= require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre:String,
    email:String,
    password:String,
    animesVistos:[String]
},{
    timestamps:true
});


module.exports = mongoose.model('Usuario',UsuarioSchema);