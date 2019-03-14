import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
// Subject is essentially an event emitter although for broader usage than the angular one

@Injectable({providedIn: 'root'})// Can be done as an alternative to module providers
export class PostsService {

  constructor(private http: HttpClient, private router: Router ) {}

  private posts: Post[] = [];
// reference type
  private postUpdated = new Subject<Post[]>();
  // passing the list of posts as a payload

  // So in get post, I want to send an http request and sending http requests
  //  thankfully is very easy with angular because it has a built-in http client.
  getPosts() {
    // return[...this.posts]; // creating a new array with spread operator

    // the angular http client uses observables
    // here we will convert the data before using it _id to id
    // stream and the map function your expects an argument. It expects an argument, a function which should
    // execute on every data that makes it through that observable stream
    this.http
      .get<{message: string, posts: any}>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath
          };
        }); // normal javascript map to change the data within an array
      }))
      .subscribe((morphedPosts) => {
      // this helps us because now here where we get our posts data, we actually get typescript support and
      // IDE support and for example my IDE knows that we have a message in a posts property on the response data.
        this.posts = morphedPosts;
        // we need to inform our app and the other parts of our app about this update,
        this.postUpdated.next([...this.posts]);
      });
    // for observables connected to features built into angular like
    // the http client, this unsubscription will be handled for you by angular.
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable(); // Special method which allows for others to listen
  }

//   Now we will have one problem though, right now
// get post returns a post,
// well it will not be able to do that anymore because if we make a http call here, that'll be an asynchronous
// code and you can't return inside of a subscription,
// you need to return synchronously,
// so that means you can't return in a place which will run sometime in the future.
// So what I'll do here instead is
// I will still return something but I will return the observable we're getting from the angular http
// client so that we can subscribe in the component where we are interested in that data.
  getPost(id: string) {
    return this.http.get<{_id: string, title: string, content: string, imagePath: string}>('http://localhost:3000/api/posts/' + id);
  }
  // so send that get request there and return the result of this get request which is our observable.

  addPost(title: string, content: string, image: File) { // addPost(post: Post)
    // const post: Post = {id: null, title: title, content: content}; // title, content // caused Assertion failed
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    // Optimistic updating, updating our local data before we have server side confirmation that it was updated
    // We switched to asynch updating by moving our push and update within subscribe callback
    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData).subscribe((responseData) => {
      const post: Post = {
        id: responseData.post.id,
        title: title,
        content: content,
        imagePath: responseData.post.imagePath
      };
      console.log(responseData.message);
      const id = responseData.post.id;
      post.id = id;
      // We can edit const post because we aren't changing the reference value but rather the property value of the object
      this.posts.push(post);
      this.postUpdated.next([...this.posts]); // This emits a new value which is a copy of my postlist
      // we could call getPosts but it's somewhat redundant
      this.router.navigate(['/']);
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content, imagePath: null};
    this.http
      .put('http://localhost:3000/api/posts/' + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }
//   Of course we will have a payload here though,
// put requests take a payload,
// the post which we want to use and post ID is just ID here, like this.

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId); // filtering out deleted post by id
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
      }); // We need to subscribe
  }

}

// 1. In get posts, I want to reach out to my backend, fetch the posts,
// 2. store them in posts here and then
// 3. fire my update listener to inform everyone interested
