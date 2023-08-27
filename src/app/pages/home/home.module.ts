import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AppApiService } from "@shared/services";
import { HomeService } from "./components/services/home.service";
import { UsersTableModule } from "../../shared/components/users-table";
import { FormInputModule } from "@shared/controls/form-input";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UsersTableModule,
    FormInputModule,
    ReactiveFormsModule,
  ],
  providers: [AppApiService, HomeService]
})
export class HomeModule { }
