import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReposTableComponent } from './components/repos-table/repos-table.component';

@NgModule({
  declarations: [
    ReposTableComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  exports: [
    ReposTableComponent
  ]
})
export class ReposTableModule { }
