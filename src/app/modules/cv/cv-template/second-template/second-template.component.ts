import { ResumeService } from 'src/app/services/resume.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import {ResumeDto} from "../../../../models/resume/resume-dto";

@Component({
  selector: 'cv-second-template',
  templateUrl: './second-template.component.html',
  styleUrls: ['./second-template.component.scss']
})
export class SecondTemplateComponent implements OnInit {
  color = '#37474f'
  userId!:number
  constructor(
    private activatedRoute:ActivatedRoute,
    private resumeService:ResumeService,
    private router:Router
  ) { }

  @Input() public resumeEditForm!: ResumeDto

  ngOnInit(): void {
    this.getStoreColor()
     this.activatedRoute.params.subscribe(
       {
         next: params => this.userId = params.id,
         error: error => console.log(error),
       }
     )

  }
   getStoreColor(){
     return this.color = localStorage.getItem('color') ||'#37474f';
   }
  storeColor(color:string){
   localStorage.setItem('color',color)
  }

 howOld(birthDay:string){
  return Math.floor(new Date(Date.now()).getFullYear() - new Date(birthDay!).getFullYear())
 }
  getResumePdf() {
    if (!this.userId) return
    this.resumeService.getPdf(this.userId).subscribe(response => {
      saveAs(response, `${this.resumeEditForm.firstName} ${this.resumeEditForm.lastName}.pdf`);
    });
  }
  navigateToEditPage(){
    if (!this.userId)return
    this.router.navigate(['home/cv/edit', this.userId])
  }

  getArray(number:number){
   return new Array(number).fill(1)
  }
}
