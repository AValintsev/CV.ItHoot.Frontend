import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HeaderComponent } from './header/header.component';
// import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { SharedModule } from '../../shared/shared.module';
// import { AuthBarComponent } from './auth-bar/auth-bar.component';

@NgModule({
  declarations: [
    // HeaderComponent,
    // FooterComponent,
    AboutComponent,
    // AuthBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    // HeaderComponent,
    // FooterComponent
  ]
})
export class CoreModule { }
