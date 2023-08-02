import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Button } from 'src/app/enum/Button';
import { AuthFormService } from 'src/app/services/auth-form.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
    form!: FormGroup;
    buttonType = Button;

    constructor(private fb: FormBuilder, public auth: AuthFormService) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            email: ['', this.auth.emailValidationRules],
            password: ['', this.auth.passwordValidationRules],
        });
    }
}
