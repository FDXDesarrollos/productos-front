import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/modulos/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';
import { ModalProductoComponent } from '../modal-producto/modal-producto.component';
import { ProductoService } from './../../shared/services/producto.service';

//American Team
// 52 55 7276 9333

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private productoService: ProductoService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listaProductos();
  }

  displayedColumns: string[] = ['id', 'nombre', 'precio', 'cantidad', 'categoria', 'imagen', 'acciones'];
  dataSource = new MatTableDataSource<ProductoElemento>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  listaProductos(){
    /*this.productoService.listaProductos()
        .subscribe((data:any) => {
          console.log('Lista Productos: ', data);
          this.procesaProductos(data);
    },
    (error:any) => {
          console.log('Error al listar Productos: ', error);
    });*/

    this.productoService.listaProductos().subscribe({
      next: data => {
        console.log("Lista Productos: ", data);
        this.procesaProductos(data);
      },
      error: error => console.log("Error: ", error)
    });
    
  }

  procesaProductos(resp: any){
    const dateProducto: ProductoElemento[] = [];

    if(resp.metadata[0].code == '00'){
      let listaProducto = resp.productoResponse.producto;

      listaProducto.forEach((elemento: ProductoElemento) => {
        //elemento.categoria = elemento.categoria.nombre;
        elemento.imagen = 'data:image/jpeg;base64,' + elemento.imagen;
        dateProducto.push(elemento);
      });

      // set data source
      this.dataSource = new MatTableDataSource<ProductoElemento>(dateProducto);
      this.dataSource.paginator = this.paginator;
    }
  }

  openDialog(){
    const dialogRef = this.dialog.open(ModalProductoComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Información registrada", "Exito");
        this.listaProductos();
      }
      else if(result == 2){
        this.openSnackBar("Error al registrar", "Error");
      }
    });
}

openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
  return this.snackBar.open(message, action, {duration:3000});
}

editar(id: number, nombre: string, precio: number, cantidad: number, categoria: number){
  const dialogRef = this.dialog.open(ModalProductoComponent, {
    width: '450px',
    data: {id: id, nombre: nombre, precio: precio, cantidad: cantidad, categoria: categoria}
  });

  dialogRef.afterClosed().subscribe((result:any) => {
    if(result == 1){
      this.openSnackBar("Información actualizada", "Exito");
      this.listaProductos();
    }
    else if(result == 2){
      this.openSnackBar("Error al actualizar", "Error");
    }
  });    
}

eliminar(id:number){
  const dialogRef = this.dialog.open(ConfirmComponent, {
    data: {id: id, modulo: "producto"}
  });

  dialogRef.afterClosed().subscribe((result:any) => {
    if(result == 1){
      this.openSnackBar("Información eliminada", "Exito");
      this.listaProductos();
    }
    else if(result == 2){
      this.openSnackBar("Error al eliminar", "Error");
    }
  });      
}

buscar(termino:string){
  if(termino.length === 0){
    return this.listaProductos();
  }
  else{
    this.productoService.buscarProducto(termino)
    .subscribe((resp:any) => {
      this.procesaProductos(resp);
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
