import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriaModule } from '../categoria/categoria.module';
import { ProductoModule } from '../producto/producto.module';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent    
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CategoriaModule,
    ProductoModule
  ]
})
export class DashboardModule { }
