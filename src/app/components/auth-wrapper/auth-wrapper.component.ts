import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFormService } from 'src/app/services/auth-form.service';

@Component({
    selector: 'app-auth-wrapper',
    templateUrl: './auth-wrapper.component.html',
    styleUrls: ['./auth-wrapper.component.scss'],
})
export class AuthWrapperComponent implements OnInit {
    constructor(private router: Router, public auth: AuthFormService) {}

    ngOnInit(): void {
        this.router.navigate(['/signup']);
    }
}
