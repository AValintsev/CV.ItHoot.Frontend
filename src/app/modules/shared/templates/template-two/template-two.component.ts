import { AccountService } from './../../../../services/account.service';
import { Users } from './../../../../models/users-type';
import { ResumeService } from 'src/app/services/resume.service';
import { AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeDto } from 'src/app/models/resume/resume-dto';
import * as saveAs from 'file-saver';
import grapesjs from 'grapesjs';
import 'grapesjs-preset-webpage';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cv-template-two',
  templateUrl: './template-two.component.html',
  styleUrls: ['./template-two.component.scss']
})
export class TemplateTwoComponent implements OnInit,AfterContentInit,AfterViewInit {
  public editor:any = null
  User=Users
  color = '#37474f'
  userId!: number
  textarea = document.querySelector('textarea');
  obj:{[key:string]:any}={}
  constructor(
    private _ngZone: NgZone,
    public accountService:AccountService,
    private resumeService: ResumeService,) { }
  @ViewChild('autosize', { static: false }) autosize!: CdkTextareaAutosize;
  @Input() public resumeEditForm!: ResumeDto
  @Input() public showLogo:boolean = true
  @Input() public showPdfSave:boolean = true

  ngOnInit(): void {  
        this.textarea?.addEventListener('input', this.autoResize, false);
    this.getStoreColor();
    console.log('template', this.resumeEditForm)
 
  }
 ngAfterContentInit(){
 
 }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

 ngAfterViewInit(){
  this.editor = grapesjs.init({
    // Indicate where to init the editor. You can also pass an HTMLElement
    container: '#gjs',
    // Get the content for the canvas directly from the element
    // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
    fromElement: true,
    // Size of the editor
    height: '700px',
    width: '1200px',
    // Disable the storage manager for the moment
    storageManager: false,
    // Avoid any default panel
    panels: { defaults: [] },
    plugins: ['gjs-preset-webpage'],
    pluginsOpts: {
      'gjs-preset-webpage': {
        blocksBasicOpts: {
          blocks: [],
          // flexGrid: 1,
        },
      }}
  });
//   this.editor.addComponents(`<div>
//   <img src="https://path/image" />
//   <span title="foo">Hello world!!!</span>
// </div>`);
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
      let time = end - start;
      return Math.floor(time / (1000 * 60 * 60 * 24 * 30 * 12));
    }
    return 0
  }
  getMonth(startDate: string, endDate: string){
    let start = Date.parse(startDate)
    let end = Date.parse(endDate)
    if (end >= start) {
      let time = end - start;
        return Math.floor(time / (1000 * 60 * 60 * 24 * 30) % 12);
    }
    return 0
  }

      
   autoResize() {
     this.textarea!.style.height = 'auto';
     this.textarea!.style.height = this.textarea!.scrollHeight + 'px';
}
}
