import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Productos } from '../models/productos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  URL_API = 'http://localhost:3000/api/productos';
  
  productoSelected: Productos = {
    name:'',
    description:'',
    quantity:0,
    price:0,

  };

  productos : Productos[];

  constructor(private http:HttpClient) { 
    this.productoSelected=  new Productos();
  }
  

  getProductos(){
      return this.http.get<Productos[]>(this.URL_API);
  }

  createProducto(producto: Productos){
    return this.http.post(this.URL_API,producto);
  }

  deleteProducto(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`);

  }

  editProducto(producto: Productos){
    return this.http.put(`${this.URL_API}/${producto._id}`,producto)
  }

  get_Productos(filtro:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.URL_API+'/filtro/'+filtro,{headers:headers});
  }
}
 