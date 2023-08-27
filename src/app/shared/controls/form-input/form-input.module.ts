import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from "@shared/controls/form-input/components/form-input/form-input.component";
import { FormErrorsModule } from "@shared/controls/form-errors";


@NgModule({
  declarations: [
    FormInputComponent
  ],
  imports: [
    CommonModule,
    FormErrorsModule
  ],
  exports: [
    FormInputComponent
  ]
})
export class FormInputModule { }
