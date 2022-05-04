import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CvCard } from 'src/app/models/cv-card';
import { CVService } from '../../../services/cv.service';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['../../../shared/styles/cvlist.scss']
})
export class CvListComponent implements OnInit {
  public cvCards$!: Observable<Array<CvCard>>;

  constructor(public cVService: CVService) { }

  ngOnInit(): void {
    this.cvCards$ = this.cVService.cvCards$;
    this.cVService.getAllCvCards().subscribe(console.log);
  }
}
