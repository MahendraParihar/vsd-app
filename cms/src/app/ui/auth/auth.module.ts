import {NgModule} from '@angular/core';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {DialogForgotPasswordComponent} from './dialog-forgot-password/dialog-forgot-password.component';
import {MaterialModule} from "../../material.module";
import {ShareModule} from "../shared/share.module";
import {CommonModule} from "@angular/common";


@NgModule({
    declarations: [
        LoginComponent,
        ResetPasswordComponent,
        DialogForgotPasswordComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ShareModule,
        AuthRoutingModule
    ]
})
export class AuthModule {
}
