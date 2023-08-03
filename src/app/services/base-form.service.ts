import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Button } from '../enum/Button';

@Injectable({
    providedIn: 'root',
})
export class BaseFormService {
    buttonType = Button;
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

    getValidationMessage(form: FormGroup, inputName: string, messages: any) {
        const input = form.get(inputName);
        if (input!.errors) {
            for (let key in input!.errors) {
                return messages[inputName][key];
            }
        }
        return '';
    }
}
