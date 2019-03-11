import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// Subject is essentially an event emitter although for broader usage than the angular one

@Injectable({providedIn: 'root'})// Can be done as an alternative to module providers
export class PostsService {

  constructor(private http: HttpClient ) {}

  private posts: Post[] = [];
// reference type
  private postUpdated = new Subject<Post[]>();
  // passing the list of posts as a payload

  // So in get post, I want to send an http request and sending http requests
  //  thankfully is very easy with angular because it has a built-in http client.
  getPosts() {
    // return[...this.posts]; // creating a new array with spread operator

    // the angular http client uses observables
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts').subscribe((postData) => {
      // this helps us because now here where we get our posts data, we actually get typescript support and
      // IDE support and for example my IDE knows that we have a message in a posts property on the response data.
      this.posts = postData.posts;
      // we need to inform our app and the other parts of our app about this update,
      this.postUpdated.next([...this.posts]);
    });
    // for observables connected to features built into angular like
    // the http client, this unsubscription will be handled for you by angular.
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable(); // Special method which allows for others to listen
  }

  addPost(title: string, content: string) { // addPost(post: Post)
    const post: Post = {id: null, title, content}; // title: title content: content
    this.posts.push(post);
    this.postUpdated.next([...this.posts]); // This emits a new value which is a copy of my postlist
  }
}

// 1. In get posts, I want to reach out to my backend, fetch the posts,
// 2. store them in posts here and then
// 3. fire my update listener to inform everyone interested
