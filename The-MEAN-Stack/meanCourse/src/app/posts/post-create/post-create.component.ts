import { Component, EventEmitter, Output } from '@angular/core';
// To emit our own event we need a feature EventEmitter

// Create a typescript component class
// Turn in into a component that Angular understands by using a Decorator

@Component({

  // Basic Component needs a template and a selector

  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';

  @Output() postCreated = new EventEmitter();
  // We also need a property to emit an event
  // output turns this into an event which can be heard from outside

  // onaddPost(postInput: HTMLTextAreaElement) {
  onAddPost() {
    // JS object

    const post = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    // now we can call this method taking post as arguement
    this.postCreated.emit(post);
    // console.dir(postInput);
    // Using dot notation to access the value property of post Input
    // this.newPost = this.enteredValue;
  }
  constructor() { }

  ngOnInit() {
  }
}
