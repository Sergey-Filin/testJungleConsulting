import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    UsersTableComponent
  ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        RouterModule,
    ],
  exports: [
    UsersTableComponent
  ]
})
export class UsersTableModule { }
