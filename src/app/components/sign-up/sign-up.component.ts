import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Button } from 'src/app/enum/Button';
import { AuthFormService } from 'src/app/services/auth-form.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
    form!: FormGroup;
    buttonType = Button;

    date!: { year: number; month: number };
    minDate = { year: 1900, month: 1, day: 1 };
    maxDate = { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDay() };

    constructor(private fb: FormBuilder, public auth: AuthFormService) {}

    ngOnInit(): void {
        this.form = this.fb.group(
            {
                name: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(this.auth.nameRegex),
                        Validators.minLength(2),
                        Validators.maxLength(20),
                    ],
                ],
                surname: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(this.auth.nameRegex),
                        Validators.minLength(2),
                        Validators.maxLength(20),
                    ],
                ],
                email: ['', [Validators.required, Validators.pattern(this.auth.emailRegex)]],
                password: [
                    '',
                    [Validators.required, Validators.pattern(this.auth.passwordRegex), Validators.minLength(8)],
                ],
                confirmPassword: ['', Validators.required],
                age: ['', [Validators.required]],
            },
            { validator: [this.checkMatchPassword, this.checkAge] }
        );
    }

    checkMatchPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        let password = control.get('password');
        let confirmpassword = control.get('confirmPassword');
        if (password && confirmpassword && password?.value != confirmpassword?.value) {
            return {
                passwordmatcherror: true,
            };
        }
        return null;
    };

    checkAge: ValidatorFn = (control: any): ValidationErrors | null => {
        const ageControl = control.get('age');
        if (ageControl.value) {
            const inputTimeStamp = new Date(
                ageControl.value.year,
                ageControl.value.month - 1,
                ageControl.value.day + 1
            );

            const distance = new Date().getFullYear() - new Date(inputTimeStamp).getFullYear();
            if (distance < this.auth.ageLimit) {
                return {
                    ageError: true,
                };
            }
        }

        return null;
    };

    
}
