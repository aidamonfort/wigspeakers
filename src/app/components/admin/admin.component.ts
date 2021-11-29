import { Component, OnInit, NgZone } from '@angular/core';
import { SpeakerService } from '../../services/speaker.service';
import { Speaker } from '../../speaker';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  idAdmins = ['5GLNbAVvAzegDziOIQs11uqaC9u2',
    'ZXtJYKaXdpOG3tTnaIJvy6iUse22', 'ijFQggrEr8YHb8Ik0Uxxyrh9ZhE3', '12s95YPBSzOgLbwBVmMwzIN0QNw1'];

  constructor(public spService: SpeakerService, public fAuth: AngularFireAuth, private router: Router, private ngZone: NgZone) {
    if (fAuth.auth.currentUser == null) { // there is not user logged in
      // this.router.navigate(['/login']);
      this.ngZone.run(() => this.router.navigateByUrl('/speakers')).then();
    }

    if (this.idAdmins.indexOf(this.fAuth.auth.currentUser.uid) === -1) {
      this.ngZone.run(() => this.router.navigateByUrl('/speakers')).then();
    }

  }

  ngOnInit(): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      responsive: true
    };
  }

  markAddedSP(sp: Speaker) {
    this.spService.updateSignInAlready(sp.id, sp.signin.mailing, sp.signin.slack);
  }

}
