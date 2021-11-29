import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsComponent } from './components/terms/terms.component';
import { GdprComponent } from './components/gdpr/gdpr.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { HowComponent } from './components/how/how.component';
import { SpeakersComponent } from './components/speakers/speakers.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLanding = redirectUnauthorizedTo(['speakers']);

const routes: Routes = [
  { path: 'terms', component: TermsComponent },
  { path: 'gdpr', component: GdprComponent },
  { path: 'how', component: HowComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, ...canActivate(redirectUnauthorizedToLanding)},
  { path: 'register', component: RegisterComponent },
  { path: 'speakers', component: SpeakersComponent },
  { path: 'speakers/:id', component: SpeakersComponent },
  { path: '',  redirectTo: '/speakers', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
