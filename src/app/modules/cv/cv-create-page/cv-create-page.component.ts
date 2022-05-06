import {Component, OnInit, ViewChild} from '@angular/core';
import {ResumeCardCreateDto} from "../../../models/cv-card";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ResumeService} from "../../../services/resume.service";
import {SnackBarService} from "../../../services/snack-bar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cv-create-page',
  templateUrl: './cv-create-page.component.html',
  styleUrls: ['./cv-create-page.component.scss']
})
export class CvCreatePageComponent implements OnInit {

  resumeCreateDto:ResumeCardCreateDto = {} as ResumeCardCreateDto;
  public resumeCreateForm: FormGroup = {} as FormGroup;
  constructor(private resumeService: ResumeService,
              private snackbarService: SnackBarService,
              private router:Router) { }

  ngOnInit(): void {
    this.validateForm();
  }

  private validateForm(){
    this.resumeCreateForm = new FormGroup({
      cvName: new FormControl(this.resumeCreateDto.firstName,[
        Validators.required
      ]),
      firstName: new FormControl(this.resumeCreateDto.firstName,[
        Validators.required
      ]),
      lastName: new FormControl(this.resumeCreateDto.lastName,[
        Validators.required
      ]),
      email: new FormControl(this.resumeCreateDto.email,[
        Validators.required,
        Validators.email
      ]),
      site: new FormControl(this.resumeCreateDto.site),
      phone: new FormControl(this.resumeCreateDto.phone,[
        Validators.pattern('[- +()0-9]+')
      ]),
      code: new FormControl(this.resumeCreateDto.code),
      country: new FormControl(this.resumeCreateDto.country,[
        Validators.required
      ]),
      city: new FormControl(this.resumeCreateDto.city,[
        Validators.required
      ]),
      street: new FormControl(this.resumeCreateDto.street,[
        Validators.required
      ]),
      requiredPosition: new FormControl(this.resumeCreateDto.requiredPosition,[
        Validators.required
      ]),
      birthdate: new FormControl(this.resumeCreateDto.requiredPosition,[
        Validators.required
      ]),
      aboutMe: new FormControl(this.resumeCreateDto.requiredPosition,[
        Validators.required
      ]),
      educations: new FormArray([]),
      experiences: new FormControl([]),
      skills: new FormControl([]),
      userLanguages: new FormControl([]),
    });
  }

  public submit(resume: ResumeCardCreateDto){
    this.resumeService.createResume(resume).subscribe({
      next:()=>{
        this.snackbarService.showSuccess('Created');
        this.router.navigate(['/home/cv'])
      },
      error:(error)=>{
        this.snackbarService.showDanger('Something went wrong!')
      }
    })
  }

}
