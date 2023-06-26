import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  listaProductos(){
    const endpoint = `${base_url}/productos`;
    return this.http.get(endpoint);
  }

  guardaProducto(data: any){
    const endpoint = `${base_url}/productos`;
    return this.http.post(endpoint, data);
  }

  actualizaProducto(data: any, id: any){
    const endpoint = `${base_url}/productos/${id}`;
    return this.http.put(endpoint, data);    
  }

  eliminaProducto(id: any){
    const endpoint = `${base_url}/productos/${id}`;
    return this.http.delete(endpoint, id);  
  }

  buscarProducto(termino: string){
    const endpoint = `${base_url}/productos/filtro/${termino}`;
    return this.http.get(endpoint);
  }



}
