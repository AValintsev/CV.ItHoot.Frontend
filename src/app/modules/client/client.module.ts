import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientRoutingModule} from './client-routing.module';
import {ClientProposalService} from 'src/app/services/client/client-proposal.service';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
  ],
  providers: [ClientProposalService]
})
export class ClientModule { }
