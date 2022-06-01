import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientTeamService } from 'src/app/services/client/client-team.service';

@NgModule({
  declarations: [ 
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
  ],
  providers: [ClientTeamService]
})
export class ClientModule { }
