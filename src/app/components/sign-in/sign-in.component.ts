import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

    constructor(private fb: FormBuilder, public auth: AuthFormService, private router: Router) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            email: ['', this.auth.emailValidationRules],
            password: ['', this.auth.passwordValidationRules],
        });
    }

    handleSubmit() {
        if (this.form.valid) {
            this.router.navigate(['/home']);
        }
    }
}
