import { ResumeService } from 'src/app/services/resume.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ResumeDto } from 'src/app/models/resume-dto';
import { map } from 'rxjs/operators';
import * as saveAs from 'file-saver';

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
  
  getFormControlValue(name: string) {
    if (this.resumeEditForm && this.resumeEditForm[name]) {
      return this.resumeEditForm[name]
    }

  }
 howOld(birthDay:Date){
  return Math.floor(new Date(Date.now()).getFullYear() - new Date(birthDay).getFullYear())
 }
  getResumePdf() {
    if (!this.userId) return
    this.resumeService.getPdf(this.userId).subscribe(response => {
      saveAs(response, `${this.getFormControlValue('firstName')} ${this.getFormControlValue('lastName')}.pdf`);
    });
  }
  navigateToEditPage(){
    if (!this.userId)return
    this.router.navigate(['home/cv/edit', this.userId])
  }

  getArray(number:number){
    console.log(number)
    console.log(new Array(number).fill(1))
   return new Array(number).fill(1)
  }
}
