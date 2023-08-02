import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            birthday: ['', [Validators.required]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        });
    }
}
