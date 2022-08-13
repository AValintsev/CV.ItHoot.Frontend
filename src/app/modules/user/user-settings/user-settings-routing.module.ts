import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DeleteModalService} from 'src/app/services/delete-modal.service';
import {UserSettingsComponent} from "./user-settings/user-settings.component";

const routes: Routes = [
  {
    path: '',
    component: UserSettingsComponent,
  }
];

@NgModule({
  declarations: [],
  imports:
    [
      RouterModule.forChild(routes),
    ],
  exports: [RouterModule],
  providers:[DeleteModalService]
})
export class UserSettingRoutingModule { }
