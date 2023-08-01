import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';
import { ButtonComponent } from './widgets/button/button.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        SignUpComponent,
        HomeComponent,
        AuthWrapperComponent,
        ButtonComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, NgbModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
