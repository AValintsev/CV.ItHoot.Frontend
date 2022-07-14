import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function requiredFileType(type: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const filePath = control.value;
        if (filePath) {
            const extension = filePath.split('.').pop().toLowerCase();
            if (type.toLowerCase() !== extension.toLowerCase()) {
                return {
                    requiredFileType: true
                };
            }
            return null;
        }
        return null;
    };
}