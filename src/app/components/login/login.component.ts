import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public emailInput = '';
  public pwdInput = '';
  public errorSignIn = '';
  public errorSignUp = '';
  public emailInputCreate = '';
  public pwdInputCreate = '';
  public repPwdInputCreate = '';
  public isCreating = false;
  public isLoading = true;

  constructor(public fAuth: AngularFireAuth, private router: Router, private ngZone: NgZone) {
    this.isLoading = true;
    if (fAuth.auth.currentUser !== null) { // there is user logged in
      this.isLoading = false;
      this.ngZone.run(() => this.router.navigateByUrl('/register')).then();
      // this.router.navigate(['/register']);
    }
    this.fAuth.auth.onAuthStateChanged(u => {
      this.isLoading = false;
      if (u) {
        this.ngZone.run(() => this.router.navigateByUrl('/register')).then();
      }
    });
  }

  loginFB() {
    this.fAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  loginTW() {
    this.fAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
  }

  loginG() {
    this.fAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  login() {
    this.fAuth.auth.signInWithEmailAndPassword(this.emailInput, this.pwdInput).then().catch(error => {
      this.errorSignIn = error;
    });
  }

  signUp() {
    this.fAuth.auth.createUserWithEmailAndPassword(this.emailInputCreate, this.pwdInputCreate).then().catch(error => {
      this.errorSignUp = error;
    });
  }

  recoverPwd() {
    this.errorSignIn = '';
    this.fAuth.auth.sendPasswordResetEmail(this.emailInput).catch(error => {
      if (error) {
        this.errorSignIn = error.message;
      }
    }).then(() => {
      if (this.errorSignIn === '') {
        this.errorSignIn = 'Check your email. We have sent a password reset link.';
      }
    });
  }

  checkPwd() {
    if (this.pwdInputCreate !== this.repPwdInputCreate) {
      this.errorSignUp = 'Passwords are not equal!';
    } else {
      this.errorSignUp = '';
    }
  }

  ngOnInit(): void {
    this.errorSignIn = '';
    this.isLoading = false;
  }

}
