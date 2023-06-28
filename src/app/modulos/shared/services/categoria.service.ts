import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  listaCategorias(){
    const endpoint = `${base_url}/categorias`;
    return this.http.get(endpoint);
  }

  guardaCategoria(data: any){
    const endpoint = `${base_url}/categorias`;
    return this.http.post(endpoint, data);
  }

  actualizarCategoria(data: any, id: any){
    const endpoint = `${base_url}/categorias/${id}`;
    return this.http.put(endpoint, data);    
  }

  eliminarCategoria(id: any){
    const endpoint = `${base_url}/categorias/${id}`;
    return this.http.delete(endpoint, id);  
  }

  buscarCategoria(id: any){
    const endpoint = `${base_url}/categorias/${id}`;
    return this.http.get(endpoint);
  }

  exportCategorias(){
    const endpoint = `${base_url}/categorias/export/excel`;
    return this.http.get(endpoint, {responseType: 'blob'});
  }

}
