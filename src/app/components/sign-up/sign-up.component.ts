import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Button } from 'src/app/enum/Button';

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

    validationMessages: any = {
        name: {
            required: 'Это обязательное поле',
            pattern: 'Допустимые символы A-я/A-z',
            minlength: 'Минимальная длина 2',
            maxlength: 'Максимальная длина 20',
        },
        surname: {
            required: 'Это обязательное поле',
            pattern: 'Допустимые символы A-я/A-z',
            minlength: 'Минимальная длина 2',
            maxlength: 'Максимальная длина 20',
        },
        email: {
            required: 'Это обязательное поле',
            pattern: 'Некорректный email',
        },
        password: {
            required: 'Это обязательное поле',
            pattern: 'Пароль должен содержать: цифру, символ, заглавную и строчную буквы,',
            minlength: 'Минимальная длина 8',
        },
        confirmPassword: 'Пароли не совпадают',
        age: 'Доступно для пользователей старше 18 лет',
    };

    nameRegex = /^[а-яА-ЯёЁa-zA-Z]*$/;
    emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    passwordRegex = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)(?=.*[^a-zа-яA-ZА-Я\d]).*$/;
    ageLimit = 18;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group(
            {
                name: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(this.nameRegex),
                        Validators.minLength(2),
                        Validators.maxLength(20),
                    ],
                ],
                surname: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(this.nameRegex),
                        Validators.minLength(2),
                        Validators.maxLength(20),
                    ],
                ],
                email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
                password: ['', [Validators.required, Validators.pattern(this.passwordRegex), Validators.minLength(8)]],
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
            if (distance < this.ageLimit) {
                return {
                    ageError: true,
                };
            }
        }

        return null;
    };

    checkFormValidity() {
        if (this.form.valid) {
            return this.buttonType.ACTIVE;
        } else {
            return this.buttonType.DISABLED;
        }
    }

    checkInputValidity(inputName: string) {
        const input = this.form.get(inputName);
        if (input!.invalid && (input!.dirty || input!.touched)) {
            return true;
        }
        return false;
    }

    getValidationMessage(inputName: string) {
        const input = this.form.get(inputName);
        if (input!.errors) {
            for (let key in input!.errors) {
                return this.validationMessages[inputName][key];
            }
        }
        return '';
    }
}
