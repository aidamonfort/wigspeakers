import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SpeakersComponent } from './components/speakers/speakers.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAnalyticsModule, ScreenTrackingService } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AngularFireStorageModule } from '@angular/fire/storage';
import 'firebase/storage';
import { GdprComponent } from './components/gdpr/gdpr.component';
import { TermsComponent } from './components/terms/terms.component';
import { HowComponent } from './components/how/how.component';
import { SpeakerComponent } from './components/speaker/speaker.component';
import { SpeakerService } from './services/speaker.service';

import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    GdprComponent,
    TermsComponent,
    HowComponent,
    SpeakersComponent,
    SpeakerComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgSelectModule,
    FormsModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapBoxToken // Optional, can also be set per map (accessToken input of mgl-map)
     // geocoderAccessToken: 'TOKEN' // Optional, specify if different from the map access token, 
     // can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    })
  ],
  providers: [
    ScreenTrackingService,
    SpeakerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
