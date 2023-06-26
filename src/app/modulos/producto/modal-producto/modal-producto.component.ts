import { CategoriaService } from './../../shared/services/categoria.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from './../../shared/services/producto.service';

export interface CategoriaElemento{
  id: number;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css']
})
export class ModalProductoComponent implements OnInit {
  public productoForm: FormGroup;
  public tituloForm: string = "Nuevo Producto"; 
  public categorias: CategoriaElemento[]=[];
  public selectedFile: any;
  public nameImg: string = "";

  constructor(private fb: FormBuilder, 
              private productoService: ProductoService,
              private categoriaService: CategoriaService,
              private dialogRef: MatDialogRef<ModalProductoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.productoForm = this.fb.group({
        nombre: ['', Validators.required],
        precio: ['', Validators.required],
        cantidad: ['', Validators.required],
        categoria: ['', Validators.required],
        imagen: ['', Validators.required]
      });

      if(data != null){
        this.tituloForm = "Actualizar Producto";
        this.mostrarForm(data);
      }
  }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(){
    this.categoriaService.listaCategorias().subscribe( (data:any) => {
      this.categorias = data.categoriaResponse.categoria;
    },
    (error:any) => {
      console.log('Error al obtener Categorias');
    });
  }

  onGuardar(){
    let data = {
      nombre: this.productoForm.get('nombre')?.value,
      precio: this.productoForm.get('precio')?.value,
      cantidad: this.productoForm.get('cantidad')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      imagen: this.selectedFile
    }

    const datosForm = new FormData();
    datosForm.append('nombre', data.nombre); 
    datosForm.append('precio', data.precio); 
    datosForm.append('cantidad', data.cantidad);
    datosForm.append('cateId', data.categoria); 
    datosForm.append('imagen', data.imagen, data.imagen.name);

    if(this.data != null){
      this.productoService.actualizaProducto(datosForm, this.data.id)
          .subscribe((data:any) => {
            this.dialogRef.close(1);
          }, (error:any) => {
            this.dialogRef.close(2);
          });
    }
    else{
      this.productoService.guardaProducto(datosForm)
          .subscribe((data: any) => {
            this.dialogRef.close(1);
          }, (error:any) => {
            this.dialogRef.close(2);
          });
    }
  }

  onCancelar(){
    this.dialogRef.close(3);
  }

  mostrarForm(data: any){
    this.productoForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      precio: [data.precio, Validators.required],
      cantidad: [data.cantidad, Validators.required],
      categoria: [data.categoria.id, Validators.required],
      imagen: ['', Validators.required]
    });
  } 

  onFileChanged(event: any){
    this.selectedFile = event.target.files[0];
    console.log( this.selectedFile );

    this.nameImg = event.target.files[0].name;
  }

}
