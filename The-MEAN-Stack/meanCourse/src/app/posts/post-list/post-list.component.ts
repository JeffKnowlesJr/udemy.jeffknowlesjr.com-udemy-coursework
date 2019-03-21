import { Component, OnInit, OnDestroy } from '@angular/core';
// Input is required to make posts property bindable
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

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
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public postsService: PostsService, private authService: AuthService) { } // Automatically creates a new property

  // implemented life cycle hook
  // for basic initialization tasks
  ngOnInit() {
    this.isLoading = true;
    // Add Spinner
    this.postsService.getPosts(this.postsPerPage, this.currentPage); // Fetching our posts
    // postsSub below is an important module to make use of to
    //  prevent subscriptions from persisting after the method is no longer needed on the DOM
    // required to prevent memory leakage
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe(
      (postData: {posts: Post[], postCount: number}) => {
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
        this.isLoading = false;
        // hide Spinner
      }
    );
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    // Subscribe sets up a subscription and takes three possible arguments
    // first is a function that is executed whenever new data is emitted
    // the second will be called whenever an error is emitted
    // The third will be called whenever the observable is completed
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage)
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  // This will remove the subscription and prevent memory leaks
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
