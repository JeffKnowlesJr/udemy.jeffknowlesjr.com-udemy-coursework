import { Component, OnInit } from '@angular/core';
// To emit our own event we need a feature EventEmitter
// import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

// Create a typescript component class
// Turn in into a component that Angular understands by using a Decorator

@Component({

  // Basic Component needs a template and a selector

  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  post: Post;
  private mode = 'create';
  private postId: string;
  isLoading = false;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  // <> defines the generic type to emit
  // @Output() postCreated = new EventEmitter<Post>();

  // We also need a property to emit an event
  // output turns this into an event which can be heard from outside

  // onaddPost(postInput: HTMLTextAreaElement) {
  // form of type ngForm
  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    // Add Spinner
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
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content);
    }

    // console.dir(postInput);
    // Using dot notation to access the value property of post Input
    // this.newPost = this.enteredValue;
    form.resetForm();
  }

  ngOnInit() {
    // the paramap is an observable, and the paramroute could change while we're on the page
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        // Add Spinner
        this.postsService.getPost(this.postId).subscribe(postData => {
          // Hide Spinner
          this.isLoading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content};
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    }); // listen to changes in the route url
  }

}
