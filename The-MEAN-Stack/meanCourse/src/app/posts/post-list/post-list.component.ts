import { Component, OnInit, Input } from '@angular/core';
// Input is required to make posts property bindable

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // posts = [
  //   {title: 'First Post', content: 'This is the first post\'s content'},
  //   {title: 'First Post', content: 'This is the first post\'s content'},
  //   {title: 'First Post', content: 'This is the first post\'s content'}
  // ];
  @Input() posts = [];

  constructor() { }

  ngOnInit() {
  }

}
