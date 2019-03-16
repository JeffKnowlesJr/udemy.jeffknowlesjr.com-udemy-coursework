import { Component, OnInit, OnDestroy } from '@angular/core';
// Input is required to make posts property bindable
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content: 'This is the first post\'s content'},
  //   {title: 'First Post', content: 'This is the first post\'s content'},
  //   {title: 'First Post', content: 'This is the first post\'s content'}
  // ];

  // @Input() posts: Post[] = [];
  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading = false;
  totalPosts = 10;
  postsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public postsService: PostsService) { } // Automatically creates a new property

  // implemented life cycle hook
  // for basic initialization tasks
  ngOnInit() {
    this.isLoading = true;
    // Add Spinner
    this.postsService.getPosts(); // Fetching our posts
    // postsSub below is an important module to make use of to
    //  prevent subscriptions from persisting after the method is no longer needed on the DOM
    // required to prevent memory leakage
    this.postsSub = this.postsService.getPostUpdateListener().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        // hide Spinner
      }
    );
    // Subscribe sets up a subscription and takes three possible arguments
    // first is a function that is executed whenever new data is emitted
    // the second will be called whenever an error is emitted
    // The third will be called whenever the observable is completed
  }

  onChangedPage(pageData: PageEvent) {
    console.log(pageData);
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  // This will remove the subscription and prevent memory leaks
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
