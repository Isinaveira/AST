import { Component, OnInit } from '@angular/core';
import {ProductosService} from '../../services/productos.service'
import { NgForm } from '@angular/forms';
import { Productos } from 'src/app/models/productos';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{
  public filtro;
 
  constructor(public productosService: ProductosService){}

  ngOnInit(): void{
    this.getProductos() //para que de inicio ya muestre los productos
  }

  getProductos(){
    this.productosService.getProductos().subscribe(
      res => {
        this.productosService.productos = res;
      },
      err =>console.log(err)

    )
  }

  addProducto(form: NgForm){
    if(form.value._id){ //en caso de que el producto exista, lo actualiza
      this.productosService.editProducto(form.value).subscribe(
        res=> {
          this.getProductos();
          window.alert("El producto ha sido actualizado");
          form.reset();
        },
        err=> console.log(err)
      )
    }else{ //en caso de que no exista lo crea
      this.productosService.createProducto(form.value).subscribe(
      res=> {
        this.getProductos();
        window.alert("Se ha añadido un nuevo producto");
        form.reset();},
      err=>console.log(err)        
      )
    }
    
  }

  editProducto(producto: Productos){
    this.productosService.productoSelected=producto; //para que se rellenen los datos en el formulario
  }

  deleteProducto(id: string){
    if (confirm('Seguro que quieres eliminarlo?')){
       this.productosService.deleteProducto(id).subscribe(
         (res) => {
           this.getProductos();
           window.alert("Se ha borrado correctamente el producto");
         },
         (err) => console.error(err)
       );
      
    } 
  }

  resetForm(form: NgForm){
   form.reset()
   this.getProductos()
  }

  search(searchForm){

    if(searchForm.value.filtrotxt){
      this.productosService.get_Productos(searchForm.value.filtrotxt).subscribe(
      res=>{
          this.productosService.productos=res;
      },
      error=> console.log(error)
    );
    }else if(searchForm.value.filtrotxt==null || searchForm.value.filtrotxt==''){ //en caso de q no haya nada en el buscador y se le de al boton, muestra todos
      this.productosService.getProductos().subscribe(
        res => {
          this.productosService.productos = res;
        },
        err =>console.log(err)
  
      )
    }
    
    
  }

  
}
