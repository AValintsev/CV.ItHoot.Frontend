import { AccountService } from './../../../../services/account.service';
import { Users } from './../../../../models/users-type';
import { ResumeService } from 'src/app/services/resume.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeDto } from 'src/app/models/resume/resume-dto';
import * as saveAs from 'file-saver';
import 'grapesjs-preset-webpage';
declare var grapesjs: any;

@Component({
  selector: 'cv-template-two',
  templateUrl: './template-two.component.html',
  styleUrls: ['./template-two.component.scss']
})
export class TemplateTwoComponent implements OnInit {
  public editor:any = null
  User=Users
  color = '#37474f'
  userId!: number
  obj:{[key:string]:any}={}
  constructor(
    public accountService:AccountService,
    private resumeService: ResumeService,) { }

  @Input() public resumeEditForm!: ResumeDto
  @Input() public showLogo:boolean = true
  @Input() public showPdfSave:boolean = true

  ngOnInit(): void {
    this.getStoreColor();
    this.editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: '#gjs',
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: true,
      // Size of the editor
      height: '700px',
      width: 'auto',
      // Disable the storage manager for the moment
      storageManager: false,
      // Avoid any default panel
      panels: { defaults: [] },
      plugins: ['gjs-preset-webpage'],
      pluginsOpts: {
        'gjs-preset-webpage': {
          blocksBasicOpts: {
            blocks: ['column2', 'column3', 'column3-7', 'text', 'link', 'image', 'video'],
            flexGrid: 1,
          },
        }}
    })
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

  savePdf(resumeId: number, firstName: string='', lastName: string='') {
    this.resumeService.getPdf(resumeId).subscribe(response => {
      saveAs(response, `${firstName} ${lastName}.pdf`);
    });
  }

  getArray(number: number) {
    return new Array(number).fill(1)
  }

  getYear(startDate:string,endDate:string){
    let start =  Date.parse(startDate)
    let end = Date.parse(endDate)
    if(end>=start){
      let t = end - start;
      return Math.floor(t / (1000 * 60 * 60 * 24 * 30 * 12));
    }
    return 0
  }
  getMonth(startDate: string, endDate: string){
    let start = Date.parse(startDate)
    let end = Date.parse(endDate)
    if (end >= start) {
      let t = end - start;

        return Math.floor(t / (1000 * 60 * 60 * 24 * 30) % 12);
    }
    return 0
  }
}
