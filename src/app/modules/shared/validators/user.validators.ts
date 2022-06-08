import { ValidationErrors, ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms'
import { EducationDialog } from '../../cv/education-dialog/education-dialog.component';

export class UserValidators{
	static checkValidEndDateDialog(component: any): ValidatorFn {
		return (endDate: AbstractControl): ValidationErrors | null => {
			if (component.educationForm && component.educationForm.controls && component.educationForm.controls['startDate']?.value) {
				console.log('aaa')
				const startDate = component.educationForm.controls['startDate']?.value
				if (typeof (endDate.value) === 'string') {
					if (new Date(endDate.value) < new Date(startDate as string)) {
						return { incorrectDate: true }
					}
					return null
				} else if (typeof (endDate.value) === 'object') {
					if (new Date(endDate.value.format()) < new Date(startDate as string)) {
						return { badDate: true }
					}
					return null
				}
			}
			return null
		}
	}
	static checkValidEndDateExperience(component: any): ValidatorFn {
		return (endDate: AbstractControl): ValidationErrors | null => {
			if (component.experienceForm && component.experienceForm.controls && component.experienceForm.controls['startDate']?.value) {
				const startDate = component.experienceForm.controls['startDate']?.value
				if (typeof (endDate.value) === 'string') {
					if (new Date(endDate.value) < new Date(startDate as string)) {
						return { incorrectDate: true }
					}
					return null
				} else if (typeof (endDate.value) === 'object') {
					if (new Date(endDate.value.format()) < new Date(startDate as string)) {
						return { badDate: true }
					}
					return null
				}
			}
			return null
		}
	}

}

