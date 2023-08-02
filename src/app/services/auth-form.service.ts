import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Button } from '../enum/Button';

@Injectable({
    providedIn: 'root',
})
export class AuthFormService {
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

    constructor() {}

    setButtonType(form: FormGroup) {
        if (form.valid) {
            return this.buttonType.ACTIVE;
        } else {
            return this.buttonType.DISABLED;
        }
    }

    checkInputValidity(form: FormGroup, inputName: string) {
        const input = form.get(inputName);
        if (input!.invalid && (input!.dirty || input!.touched)) {
            return true;
        }
        return false;
    }

    getValidationMessage(form: FormGroup, inputName: string) {
        const input = form.get(inputName);
        if (input!.errors) {
            for (let key in input!.errors) {
                return this.validationMessages[inputName][key];
            }
        }
        return '';
    }
}
