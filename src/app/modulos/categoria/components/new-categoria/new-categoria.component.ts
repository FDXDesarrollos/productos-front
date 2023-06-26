import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from './../../../shared/services/categoria.service';


@Component({
  selector: 'app-new-categoria',
  templateUrl: './new-categoria.component.html',
  styleUrls: ['./new-categoria.component.css']
})
export class NewCategoriaComponent implements OnInit {
  public categoryForm: FormGroup;
  public tituloForm: string = "Nueva Categoria";

  constructor(private fb: FormBuilder, 
              private categoriaService: CategoriaService,
              private dialogRef: MatDialogRef<NewCategoriaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

      this.categoryForm = this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required]
      });

      if(data != null){
        this.tituloForm = "Actualizar Categoria";
        this.mostrarForm(data);
      }
   }

  ngOnInit(): void {

  }

  onGuardar(){
    let data = {
      nombre: this.categoryForm.get('nombre')?.value,
      descripcion: this.categoryForm.get('descripcion')?.value
    }

    if(this.data != null){
      this.categoriaService.actualizarCategoria(data, this.data.id)
      .subscribe((data: any) => {
        this.dialogRef.close(1);
      },
      (error:any) => {
        this.dialogRef.close(2);
      });
    }
    else{
      this.categoriaService.guardaCategoria(data)
      .subscribe((data:any) => {
        console.log(data);
        this.dialogRef.close(1);
      }, 
      (error:any) =>{
        this.dialogRef.close(2);
      });
    }   
  }

  onCancelar(){
    this.dialogRef.close(3);
  }

  mostrarForm(data: any){
    this.categoryForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      descripcion: [data.descripcion, Validators.required]
    });    
  }

  
}
