import { Component } from '@angular/core';

// Create a typescript component class
// Turn in into a component that Angular understands by using a Decorator

@Component({

  // Basic Component needs a template and a selector

  selector: 'app-post-create',
  templateUrl: './post-create.component.html'
})
export class PostCreateComponent {
  enteredValue = '';
  newPost = '';
  // onaddPost(postInput: HTMLTextAreaElement) {
  onAddPost() {
    // console.dir(postInput);

    // Using dot notation to access the value property of post Input
    this.newPost = this.enteredValue;
  }
}
