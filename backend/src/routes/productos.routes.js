const express = require('express');
const router = express.Router();

const productos=  require('../controllers/productos.controller');

router.get('/',productos.getProductos);
router.post('/',productos.createProducto);
router.get('/:id',productos.getProducto);
router.put('/:id',productos.editProducto);
router.delete('/:id',productos.deleteProducto);
router.get('/filtro/:name?',productos.getProductosPorNombre)
module.exports= router;