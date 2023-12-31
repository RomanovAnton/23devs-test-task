import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';
import { ButtonComponent } from './widgets/button/button.component';
import { PostComponent } from './components/post/post.component';
import { PaginationComponent } from './widgets/pagination/pagination.component';
import { LoaderComponent } from './widgets/loader/loader.component';
import { AddPostModalComponent } from './components/add-post-modal/add-post-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        SignUpComponent,
        HomeComponent,
        AuthWrapperComponent,
        ButtonComponent,
        PostComponent,
        PaginationComponent,
        LoaderComponent,
        AddPostModalComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, NgbModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
