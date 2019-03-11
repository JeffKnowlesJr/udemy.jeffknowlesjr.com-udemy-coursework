import { Component } from '@angular/core';
// To emit our own event we need a feature EventEmitter
// import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

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

  constructor(public postsService: PostsService) {}

  // <> defines the generic type to emit
  // @Output() postCreated = new EventEmitter<Post>();

  // We also need a property to emit an event
  // output turns this into an event which can be heard from outside

  // onaddPost(postInput: HTMLTextAreaElement) {
  // form of type ngForm
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // };
    // const post: Post = {
    //   title: this.enteredTitle,
    //   content: this.enteredContent
    // }; Removed two way binding method
    // now we can call this method taking post as arguement
    // this.postCreated.emit(post);
    this.postsService.addPost(form.value.title, form.value.content);
    // console.dir(postInput);
    // Using dot notation to access the value property of post Input
    // this.newPost = this.enteredValue;
    form.resetForm();
  }



}
