import { ResumeService } from 'src/app/services/resume.service';
import { Component, OnInit } from '@angular/core';
import { CvCard } from 'src/app/models/cv-card';
import { Observable } from 'rxjs';

@Component({
	selector:'cv-cv-list',
	templateUrl:'./cv-list.component.html',
	styleUrls:['./cv-list.component.scss']
})

export class CvListComponent implements OnInit {
	public cvCards$!: Observable<Array<CvCard>>;

	constructor(public resumeService: ResumeService) { }

	ngOnInit(): void {
		// this.cvCards$ = this.cVService.cvCards$;
		// this.cVService.getAllCvCards().subscribe(console.log);
	}
}