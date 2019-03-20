import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isloading = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isloading = true;
    this.authService.createUser(form.value.email, form.value.password);
  }
}
