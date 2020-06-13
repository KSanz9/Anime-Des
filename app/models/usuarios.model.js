const mongoose= require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre:String,
    email:String,
    password:String,
    imgUser:String,
    animesVistos:[String]
},{
    timestamps:true
});


module.exports = mongoose.model('Usuario',UsuarioSchema);