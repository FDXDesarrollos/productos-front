import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaService } from '../../../shared/services/categoria.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { NewCategoriaComponent } from '../new-categoria/new-categoria.component';
import { ConfirmComponent } from 'src/app/modulos/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from 'src/app/modulos/shared/services/util.service';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  isAdmin!: boolean;

  constructor(private categoriaService: CategoriaService, 
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private util: UtilService) { }

  ngOnInit(): void {
    this.listaCategorias();
    this.isAdmin = this.util.isAdmin();
  }

  displayedColumns: string[] = ['id','nombre','descripcion','acciones'];
  dataSource = new MatTableDataSource<CategoriaElemento>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  listaCategorias(){
    /*this.categoriaService.listaCategorias()
        .subscribe( (data:any) => {
          console.log("Categorias: ", data);
          this.procesaCategorias(data);
        }, (error: any) => {
          console.log("Error: ", error);
    });*/

    this.categoriaService.listaCategorias().subscribe({
        next: data => {
          console.log("Respuesta categorias: ", data);
          this.procesaCategorias(data);
        },
        error: error => console.log("Error: ", error)
    });
  }

  procesaCategorias(resp: any){
    const datosCategoria : CategoriaElemento[] = [];

    if( resp.metadata[0].code == "00" ){
      let lista = resp.categoriaResponse.categoria;
      lista.forEach((elemento: CategoriaElemento) => {
        datosCategoria.push(elemento);
      });

      this.dataSource = new MatTableDataSource<CategoriaElemento>(datosCategoria);
      this.dataSource.paginator = this.paginator;
    }
  }

  openDialog(){
      const dialogRef = this.dialog.open(NewCategoriaComponent, {
        width: '450px'
      });
  
      dialogRef.afterClosed().subscribe((result:any) => {
        if(result == 1){
          this.openSnackBar("Información registrada", "Exito");
          this.listaCategorias();
        }
        else if(result == 2){
          this.openSnackBar("Error al registrar", "Error");
        }
      });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {duration:3000});
  }

  editar(id: number, nombre: string, descripcion: string){
    const dialogRef = this.dialog.open(NewCategoriaComponent, {
      width: '450px',
      data: {id: id, nombre: nombre, descripcion: descripcion}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Información actualizada", "Exito");
        this.listaCategorias();
      }
      else if(result == 2){
        this.openSnackBar("Error al actualizar", "Error");
      }
    });    
  }

  eliminar(id:number){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {id: id, modulo: "categoria"}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Información eliminada", "Exito");
        this.listaCategorias();
      }
      else if(result == 2){
        this.openSnackBar("Error al eliminar", "Error");
      }
    });      
  }

  buscar(termino:string){
    if(termino.length === 0){
      return this.listaCategorias();
    }
    else{
      this.categoriaService.buscarCategoria(termino)
      .subscribe((resp:any) => {
        this.procesaCategorias(resp);
      });
    }
  }

}

export interface CategoriaElemento{
  id: number;
  nombre: string;
  descripcion: string;
}
