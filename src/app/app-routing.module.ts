import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';

const routes: Routes = [
    {
        path: '',
        component: AuthWrapperComponent,
        children: [
            {
                path: 'signup',
                component: SignUpComponent,
            },
            {
                path: 'signin',
                component: SignInComponent,
            },
        ],
    },

    {
        path: 'home',
        component: HomeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
