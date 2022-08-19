import {AccountService} from './../../../../services/account.service';
import {UserRole} from './../../../../models/users-type';
import {ResumeService} from 'src/app/services/resume.service';
import {AfterContentInit, AfterViewInit, Component, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {ResumeDto} from 'src/app/models/resume/resume-dto';
import * as saveAs from 'file-saver';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

@Component({
  selector: 'cv-template-two',
  templateUrl: './template-two.component.html',
  styleUrls: ['./template-two.component.scss']
})
export class TemplateTwoComponent implements OnInit,AfterContentInit,AfterViewInit {
  public editor:any = null
  User=UserRole
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
  }
 ngAfterContentInit(){

 }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

 ngAfterViewInit(){
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
    this.resumeService.getResumePdfById(resumeId).subscribe(response => {
      saveAs(response, `${firstName} ${lastName}.pdf`);
    });
  }

  getArray(number: number) {
    return new Array(number).fill(1)
  }


  getYear(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const month = (end.getMonth()) - (start.getMonth());
    let year = end.getFullYear() - start.getFullYear()
    if (month < 0) {
      year = year - 1;
    }
    // if (month <= 0 && year <= 0) {
    //   return ''
    // }
    return year;
  }

  getMonth(startDate: string, endDate: string) {

    const start: Date = new Date(startDate);
    const end: Date = new Date(endDate);
    const month = (end.getMonth()) - (start.getMonth());
    const year = end.getFullYear() - start.getFullYear()
    // if (month <= 0 && year <= 0) {
    //   return ''
    // }
    if (month < 0) {
      return 12 + month;
    } else {
      return month
    }
  }



   autoResize() {
     this.textarea!.style.height = 'auto';
     this.textarea!.style.height = this.textarea!.scrollHeight + 'px';
}
}
