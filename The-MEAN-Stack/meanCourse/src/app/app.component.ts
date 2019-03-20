import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
// import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }

  //   Now we just need to run that method and a great place to run this is in the app component. There,
  // we know that this component gets loaded first, when our application is starting up,
  // this component gets loaded,
  // so this is a great place to actually do our basic initializations.

  // storedPosts: Post[] = [];

  // onPostAdded(post) {
  //   this.storedPosts.push(post);
  // }

}
