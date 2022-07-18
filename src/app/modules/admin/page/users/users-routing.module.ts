import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {UserListPageComponent} from "./user-list-page/user-list-page.component";

const routes: Routes = [

  {
    path: '',
    component: UserListPageComponent
  }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
