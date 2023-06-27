import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from 'src/app/modulos/shared/services/producto.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chartBar: any;
  chartDonut: any;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.listaProductos();
  }

  displayedColumns: string[] = ['id', 'nombre', 'precio', 'cantidad', 'categoria', 'imagen', 'acciones'];
  dataSource = new MatTableDataSource<ProductoElemento>();  

  listaProductos(){
    this.productoService.listaProductos().subscribe({
      next: data => {
        console.log("Lista Productos: ", data);
        this.procesaProductos(data);
      },
      error: error => console.log("Error: ", error)
    });
    
  }

  procesaProductos(resp: any){
    const nombreProducto: string [] = [];
    const cantidades: number [] = [];

    if(resp.metadata[0].code == '00'){
      let listaProducto = resp.productoResponse.producto;

      listaProducto.forEach((elemento: ProductoElemento) => {
        nombreProducto.push(elemento.nombre);
        cantidades.push(elemento.cantidad);
      });

      //Gráfico de barras
      this.chartBar = new Chart('canvas-bar', {
        type:'bar',
        data:{
          labels: nombreProducto,
          datasets:[
            {label: 'Productos', data: cantidades}
          ]
        }
      });

      //Gráfico de Dona
      this.chartDonut = new Chart('canvas-doughnut', {
        type:'doughnut',
        data:{
          labels: nombreProducto,
          datasets:[
            {label: 'Productos', data: cantidades}
          ]
        }
      });


    }
  }


}

export interface ProductoElemento{
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  categoria: any;
  imagen: any;
}