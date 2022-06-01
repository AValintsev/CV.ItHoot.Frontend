import { AccountService } from './../../../../services/account.service';
import { Users } from './../../../../models/users-type';
import { ResumeService } from 'src/app/services/resume.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeDto } from 'src/app/models/resume/resume-dto';
import * as saveAs from 'file-saver';

@Component({
  selector: 'cv-template-two',
  templateUrl: './template-two.component.html',
  styleUrls: ['./template-two.component.scss']
})
export class TemplateTwoComponent implements OnInit {
  User=Users
  color = '#37474f'
  userId!: number
  obj:{[key:string]:any}={}
  constructor(
    public accountService:AccountService,
    private resumeService: ResumeService,
    private router: Router
  ) { }

  // @Input() public resumeEditForm!: ResumeDto
  @Input() public resumeEditForm!: ResumeDto
  @Input() public showLogo:boolean = true

  ngOnInit(): void {
    this.getStoreColor()
  }

  getStoreColor() {
    return this.color = localStorage.getItem('color') || '#37474f';
  }
  storeColor(color: string) {
    localStorage.setItem('color', color)
  }

  howOld(birthDay: string) {
    return Math.floor(new Date(Date.now()).getFullYear() - new Date(birthDay!).getFullYear())
  }
  getResumePdf() {
    if (!this.userId) return
    this.resumeService.getPdf(this.userId).subscribe(response => {
      saveAs(response, `${this.resumeEditForm.firstName} ${this.resumeEditForm.lastName}.pdf`);
    });
  }


  getArray(number: number) {
    return new Array(number).fill(1)
  }
}
