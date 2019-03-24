// Core Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component Imports
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

// Module Imports
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    AngularMaterialModule
  ]
})
export class AuthModule {}
