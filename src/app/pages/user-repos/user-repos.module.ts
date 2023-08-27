import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserReposRoutingModule } from './user-repos-routing.module';
import { UserReposComponent } from './components/user-repos/user-repos.component';
import { UserReposService } from "./services/user-repos.service";
import { AppApiService } from "@shared/services";
import { ReposTableModule } from "../../shared/components/repos-table";
import { ModalModule } from "@shared/modules/modal";
import { ReposDetailsInfoModule } from "../../shared/components/repos-details-info";


@NgModule({
  declarations: [
    UserReposComponent
  ],
  imports: [
    CommonModule,
    UserReposRoutingModule,
    ReposTableModule,
    ReposDetailsInfoModule,
    ModalModule,
  ],
  providers: [
      UserReposService,
      AppApiService,
  ]
})
export class UserReposModule { }
