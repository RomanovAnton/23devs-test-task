import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Button } from '../enum/Button';
import { BaseService } from './base.service';
import { User } from '../types/User';

@Injectable({
    providedIn: 'root',
})
export class AuthFormService extends BaseService<User> {
    protected override entityUrlName = 'users';
    isLoading = false;
    buttonType = Button;
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
            pattern: 'Пароль должен содержать: цифру, символ, заглавную и строчную буквы',
            minlength: 'Минимальная длина 8',
        },
        confirmPassword: 'Пароли не совпадают',
        age: 'Доступно для пользователей старше 18 лет',
    };

    nameRegex = /^[а-яА-ЯёЁa-zA-Z]*$/;
    emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    passwordRegex = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)(?=.*[^a-zа-яA-ZА-Я\d]).*$/;
    ageLimit = 18;

    nameValidationRules = [
        Validators.required,
        Validators.pattern(this.nameRegex),
        Validators.minLength(2),
        Validators.maxLength(20),
    ];

    emailValidationRules = [Validators.required, Validators.pattern(this.emailRegex)];
    passwordValidationRules = [Validators.required, Validators.pattern(this.passwordRegex), Validators.minLength(8)];

    toggleLoading() {
        this.isLoading = !this.isLoading;
    }
}
