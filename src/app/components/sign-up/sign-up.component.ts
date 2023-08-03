import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFormService } from 'src/app/services/auth-form.service';
import { BaseFormService } from 'src/app/services/base-form.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
    form!: FormGroup;

    date!: { year: number; month: number };
    minDate = { year: 1900, month: 1, day: 1 };
    maxDate = { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDay() };

    constructor(
        private fb: FormBuilder,
        public auth: AuthFormService,
        private router: Router,
        public baseForm: BaseFormService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group(
            {
                name: ['', this.auth.nameValidationRules],
                surname: ['', this.auth.nameValidationRules],
                email: ['', this.auth.emailValidationRules],
                password: ['', this.auth.passwordValidationRules],
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

            const year = 31556952000;
            const distance = new Date().getTime() - new Date(inputTimeStamp).getTime();
            const res = distance / year;

            if (res < this.auth.ageLimit) {
                return {
                    ageError: true,
                };
            }
        }

        return null;
    };

    handleSubmit() {
        if (this.form.valid) {
            this.auth.toggleLoading();
            this.auth.create(this.form.value).subscribe({
                next: () => {
                    this.auth.toggleLoading();
                    this.router.navigate(['/signin']);
                },
                error: (err) => {
                    this.auth.toggleLoading();
                    console.log(err);
                },
            });
        }
    }
}
