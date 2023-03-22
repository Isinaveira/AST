const mongoose= require('mongoose');
const { Schema } = mongoose;

const ProductoSchema= new Schema({
    name:{ type: String, required : true},
    description:{type: String, required: true},
    quantity:{type: Number, required: true},
    price:{type: Number, required: true}
},{
    versionKey:false //esto quita el --v de la bbdd q crea mongo
    //timestamps: true, serviria pal tiempo en el q se crea
});

module.exports= mongoose.model('Producto',ProductoSchema);