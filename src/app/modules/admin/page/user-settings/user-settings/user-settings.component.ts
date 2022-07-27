import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, UntypedFormGroup, Validators} from "@angular/forms";
import {UserDto, UserProfileDto} from "../../../../../models/user-dto";
import {UserService} from "../../../../../services/user.service";
import {SnackBarService} from "../../../../../services/snack-bar.service";

@Component({
  selector: 'cv-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  userForm: FormGroup = {} as FormGroup;
  userProfile: UserProfileDto;

  constructor(
    private userService: UserService,
    private snackBar:SnackBarService
  ) {
    userService.getCurrentUser().subscribe(user => {
      this.userProfile = user;
      this.validateForm();
    });

  }

  ngOnInit(): void {
  }

  canSubmit(): boolean {
    return this.userForm.valid && this.userForm.dirty;
  }

  validateForm() {
    this.userForm = new FormGroup({
      id: new FormControl(this.userProfile?.id, [Validators.required]),
      firstName: new FormControl(this.userProfile?.firstName, [Validators.required]),
      lastName: new FormControl(this.userProfile?.lastName, [Validators.required]),
      phoneNumber: new FormControl(this.userProfile?.phoneNumber, [Validators.pattern('[- +()0-9]+'), Validators.minLength(10)]),
      email: new FormControl({value: this.userProfile?.email, disabled: true}, [Validators.required]),
      site: new FormControl(this.userProfile?.lastName, []),
    });
  }

  submit() {
    this.userService.updateUserProfile(this.userForm.value).subscribe(()=>{
      this.snackBar.showSuccess('User profile updated');
    });
  }
}
