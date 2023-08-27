import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserReposComponent } from "./components/user-repos/user-repos.component";

const routes: Routes = [
  {
    path: '',
    component: UserReposComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserReposRoutingModule { }
