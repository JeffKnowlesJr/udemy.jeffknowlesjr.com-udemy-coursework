import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// NgModel is not included in the core and so it needs to be added here as formsmodule
// FormsModule
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// Added by Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Material Style imports
import { MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
// Typescript requirement if you use something in another file
// You need to tell TS where the code can be found
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ErrorComponent } from './error/error.component';


import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatPaginatorModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
// Now we need to do something special, since we're going to load that component,
// neither through a selector nor through routing,
// we have to tell Angular that it needs to be prepared to eventually create this component.
// It normally detects that it needs to be prepared by the fact that we somewhere used the selector
// or that we use it as a component in the router but since we will dynamically create that component or
// let that dialog service create it dynamically, we need to tell Angular that this is going to happen
// otherwise we would get an error. And for that, we add a fifth item to our ngModule configuration,
// the entry components array. You rarely need to use that
// but here you do,
// there you add the error component and this simply informs Angular that this component is going to get
// used, even though Angular can't see it.
// So now let's go to the error interceptor and use that dialog service to open a dialog with this error
// component.













export class AppModule { }
