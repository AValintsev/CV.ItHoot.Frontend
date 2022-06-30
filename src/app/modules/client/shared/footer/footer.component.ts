import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ClientProposalService} from 'src/app/services/client/client-proposal.service';

@Component({
  selector: 'cv-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit{
  showLogo$!:Observable<boolean>
  constructor(private clientProposalService:ClientProposalService) { }

  ngOnInit(): void {
    this.showLogo$ = this.clientProposalService.showLogo$
  }
}
