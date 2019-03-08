import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// NgModel is not included in the core and so it needs to be added

import { AppComponent } from './app.component';
// Typescript requirement if you use something in another file
// You need to tell TS where the code can be found
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
