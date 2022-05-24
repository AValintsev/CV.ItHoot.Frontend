import { Component, Input, OnInit } from '@angular/core';
import { ResumeDto } from 'src/app/models/resume-dto';

@Component({
  selector: 'cv-second-template',
  templateUrl: './second-template.component.html',
  styleUrls: ['./second-template.component.scss']
})
export class SecondTemplateComponent implements OnInit {
  color = '#37474f'
  constructor() { }

  @Input() public resumeEditForm!: ResumeDto

  ngOnInit(): void {
    this.getStoreColor()
    // setTimeout(()=>{console.log(this.resumeEditForm)},400)
    

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
}
