const productos = require('../models/productos');
const Productos= require('../models/productos');
const productoCtrl= {};

productoCtrl.getProductos= async (req,res) =>{
    const productos= await Productos.find();
    res.json(productos);
}

productoCtrl.createProducto= async (req,res)=> {
    const producto= new Productos(req.body);
    await producto.save();
    console.log(producto);
    res.json({
        'status':'Producto saved'
    });
}

productoCtrl.getProducto = async (req,res) => {
    const producto= await Productos.findById(req.params.id);
    res.json(producto);
}

productoCtrl.editProducto= async (req,res)=>{
    const {id} = req.params;
    const producto={
        name: req.body.name,
        description:req.body.description,
        quantity:req.body.quantity,
        price:req.body.price
    }
    await Productos.findByIdAndUpdate(id,{$set:producto },{new:true});
    res.json({
        status:'Producto updated'
    })
}

productoCtrl.deleteProducto= async (req,res)=> {
    await Productos.findByIdAndDelete(req.params.id);
    res.json({
        status:'Producto deleted'
    })
}

productoCtrl.getProductosPorNombre= async(req,res)=>{
    
    if(req.params['name']){
        var name= req.params['name'];
       const productos= await Productos.find({name: new RegExp(name,'i')}).populate('name');
        res.json(productos); 
    }
    
}

module.exports = productoCtrl;