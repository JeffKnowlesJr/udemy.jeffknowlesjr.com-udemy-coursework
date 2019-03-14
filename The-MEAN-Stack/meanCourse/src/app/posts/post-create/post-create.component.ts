import { Component, OnInit } from '@angular/core';
// To emit our own event we need a feature EventEmitter
// import { Post } from '../post.model';
// NgForm,
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { mimeType } from './mime-type.validator';

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
  imagePreview: string;
  isLoading = false;
  form: FormGroup;
  // now we create and store our form programmatically

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  // <> defines the generic type to emit
  // @Output() postCreated = new EventEmitter<Post>();

  // We also need a property to emit an event
  // output turns this into an event which can be heard from outside

  // onaddPost(postInput: HTMLTextAreaElement) {
  // form of type ngForm
  onSavePost() {
    if (this.form.invalid) {
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
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content);
    }

    // console.dir(postInput);
    // Using dot notation to access the value property of post Input
    // this.newPost = this.enteredValue;
    // form.resetForm();
    this.form.reset();
  }

  onImagePicked(event: Event) {
    // Now we can solve this by converting this or by explicit telling Typescript that this will be of type
    // HTML input element.
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    // Please note, the entire file which is a file object in Javascript,
    // so this is no text, this is a file object,
    // you are not limited to storing text in your form,
    this.form.get('image').updateValueAndValidity();
    // console.log(file);
    // console.log(this.form);
    // this in onImagePicked, I want to convert my image to a so-called dataURL
    console.log('imagePreview', this.imagePreview);
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  ngOnInit() {
    // initializing our form
    this.form = new FormGroup({
      // form control takes a couple of arguments
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur'
      }),
      'content': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur'
      }),
      'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });

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
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };
          // Set value allows you to override the values for your form controls you registered here,
          // so you pass a Javascript object here and you need to set a value for every form control.
          this.form.setValue({
            'title': this.post.title,
            'content': this.post.content
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    }); // listen to changes in the route url
  }

}
