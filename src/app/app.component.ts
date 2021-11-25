import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wigspeakers';
  user: User = null;
  why = false;
  terms = false;
  isUser = false;
  constructor(public fAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute,) {
    console.log (this.route);

    this.fAuth.auth.onAuthStateChanged(u => {
      if (u) {
        this.user = u;
        this.isUser = true;
       // this.router.navigate(['/register']);
      } else {
        this.isUser = false;
       // this.router.navigate(['/login']);
      }
    });
  }

  logOut() {
    this.isUser = false;
    this.fAuth.auth.signOut();
  }
}
