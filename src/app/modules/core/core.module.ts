import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import { HeaderComponent } from './header/header.component';
// import { FooterComponent } from './footer/footer.component';

import {SharedModule} from '../../shared/shared.module';
// import {SideBarComponent} from '../admin/admin-layout/side-bar.component';

// import { AuthBarComponent } from './auth-bar/auth-bar.component';

@NgModule({
  declarations: [
    // HeaderComponent,
    // FooterComponent,

    // SideBarComponent,
    // AuthBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    // SideBarComponent,
    // HeaderComponent,
    // FooterComponent
  ]
})
export class CoreModule { }
