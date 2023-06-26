import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from './../../../shared/services/categoria.service';
import { ProductoService } from '../../services/producto.service';



@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any, 
             private categoriaService: CategoriaService,
             private productoService: ProductoService) { }

  ngOnInit(): void {

  }

  onSiClick(){
    if(this.data != null){
      if(this.data.modulo == "categoria"){
        this.categoriaService.eliminarCategoria(this.data.id)
            .subscribe((data:any) => {
              this.dialogRef.close(1);
            },
            (error:any) => {
              this.dialogRef.close(2);
            });
      }
      else if(this.data.modulo == "producto"){
        this.productoService.eliminaProducto(this.data.id)
            .subscribe((data:any) => {
              this.dialogRef.close(1);
            },
            (error:any) => {
              this.dialogRef.close(2);
            });        
      }
    }
    else{
      this.dialogRef.close(2);
    }
  }

  onNoClick(){
    this.dialogRef.close(3);
  }




}
