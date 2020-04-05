import { Component, OnInit, ɵsetCurrentInjector, NgZone } from '@angular/core';
import { Speaker } from '../../speaker';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { auth, User } from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = null;
  public model: Speaker;

  userIdToDelete = '';

  // fileToUpload: File = null;

  public otherAreaAdd = '';
  public otherAppAdd = '';
  public otherSector = '';
  public savedTxt = '';
  public errorGDPR = '';

  public acceptedGDPR = false;

  public areasText = {
    research:   'Research / Science Please specify ...',
    geosoft: 'Geospatial Software',
    geosoftsub: {
        foss4g: 'FOSS4G (e.g. QGIS, gdal)',
        arcgis: 'ArcGIS Suite',
        mapinfo: 'Mapinfo Suite',
        cadcorp: 'Cadcorp Suite',
        fme: 'FME',
        other: 'Other (specify)',
    },
    webmapping: 'Webmapping',
    webmappingsub: {
        openlayers: 'Open Layers',
        leaflet: 'Leaflet',
        arcgis: 'ArcGIS Suite',
        d3: 'D3',
        mapbox: 'Mapbox Studio and Mapbox GL',
        other: 'Other (Specify)',
    },
    geoopendata: 'Geospatial Open Data platforms',
    geoopendatasub: {
        geonode: 'Geonode /Carto',
        arcgis: 'ArcGIS Open Data Platform',
        copernicus: 'Copernicus Open Data',
        earth: 'Earth on AWS',
        google: 'Google Open Data initiative',
    },
    remote: 'Remote Sensing & Earth Observations',
    gis: 'Geographic Information Systems',
    ethical: 'Ethical Geography',
    geocloud: 'Geospatial cloud platforms',
    geocloudsub: {
        google: 'Google Earth Engine',
        amazon: 'Amazon Web Services',
        other: 'Other (Specify)',
    },
    geoprogramming: '(Geospatial) programming / Data Science',
    geoprogrammingsub: {
        python: 'Python',
        r: 'R',
        jupyter: 'Jupyter Notebooks',
        javascript: 'Javascript',
        other: 'Other (Specify)',
    },
    datavis: 'Data Visualisation ',
    datavissub: {
        cartography: 'Cartography',
        dashboards: 'Dashboards',
        graphic: 'Graphic design',
    },
    dataJournalism: '(Geospatial) Data Journalism',
    strategic: 'Strategic Skills',
    strategicsub: {
        geospatial: 'Geospatial leadership',
        policy: 'Policy',
        gi: 'GI Implementation / Strategy',
        growth: 'Growth in the geospatial / space Industry',
    },
    geodata: 'Geospatial Data',
    geodatasub: {
        spatial: 'Spatial Data Analysis & Insight',
        location: 'Location Intelligence',
        bigdata: 'Big Data / Geospatial Data',
        opendata: 'Open Data',
    },
    entrepreneurship: 'Entrepreneurship',
    innovation: 'Innovation / New Uses of GIS data',
    innovationsub: {
        ar: 'Augmented Reality (AR)',
        vr: 'Virtual Reality (VR)',
        ml: 'Machine Learning / Artificial Intelligence',
        blockchain: 'Blockchain',
        fiveg: '5G',
        iot: 'Internet-of-Things (IoT)',
        geotrans: 'Geospatial and digital transformation',
    },
    other: 'Other'
};

/*
  public areas = [
    { name: 'Please specify ...', group: 'Research / Science', full: 'Research / Science' },
    { name: 'FOSS4G(e.g.QGIS, gdal)', group: 'Geospatial Software', full: 'FOSS4G(e.g.QGIS, gdal) -> Geospatial Software' },
    { name: 'ArcGIS Suite', group: 'Geospatial Software', full: 'ArcGIS Suite -> Geospatial Software' },
    { name: 'Mapinfo Suite', group: 'Geospatial Software', full: 'Mapinfo Suite -> Geospatial Software' },
    { name: 'Cadcorp Suite', group: 'Geospatial Software', full: 'Cadcorp Suite -> Geospatial Software' },
    { name: 'FME', group: 'Geospatial Software', full: 'FME -> Geospatial Software' },
    { name: 'Other(specify)', group: 'Geospatial Software', full: 'Other(specify) -> Geospatial Software' },
    { name: 'Open Layers', group: 'Webmapping', full: 'Open Layers -> Webmapping' },
    { name: 'Leaflet', group: 'Webmapping', full: 'Leaflet -> Webmapping' },
    { name: 'ArcGIS Suite', group: 'Webmapping', full: 'ArcGIS Suite -> Webmapping' },
    { name: 'D3', group: 'Webmapping', full: 'D3 -> Webmapping' },
    { name: 'Mapbox Studio and Mapbox GL', group: 'Webmapping', full: 'Mapbox Studio and Mapbox GL -> Webmapping' },
    { name: 'Other(Specify)', group: 'Webmapping', full: 'Other(Specify) -> Webmapping' },
    { name: 'Geonode / Carto', group: 'Geospatial Open Data platforms', full: 'Geonode / Carto -> Geospatial Open Data platforms' },
    { name: 'ArcGIS Open Data Platform', group: 'Geospatial Open Data platforms', full: 'ArcGIS Open Data Platform -> Geospatial Open Data platforms' },
    { name: 'Copernicus Open Data', group: 'Geospatial Open Data platforms', full: 'Copernicus Open Data -> Geospatial Open Data platforms' },
    { name: 'Earth on AWS', group: 'Geospatial Open Data platforms', full: 'Earth on AWS -> Geospatial Open Data platforms' },
    { name: 'Google Open Data initiative', group: 'Geospatial Open Data platforms', full: 'Google Open Data initiative -> Geospatial Open Data platforms' },
    { name: 'Remote Sensing & Earth Observations', group: 'EO', full: 'Remote Sensing & Earth Observations' },
    { name: 'Geographic Information Systems', group: 'GI', full: 'Geographic Information Systems' },
    { name: 'Ethical Geography', group: '', full: 'Ethical Geography' },
    { name: 'Google Earth Engine', group: 'Geospatial cloud platforms', full: 'Google Earth Engine -> Geospatial cloud platforms' },
    { name: 'Amazon Web Services', group: 'Geospatial cloud platforms', full: 'Amazon Web Services -> Geospatial cloud platforms' },
    { name: 'Other(Specify)', group: 'Geospatial cloud platforms', full: 'Other(Specify) -> Geospatial cloud platforms' },
    { name: 'Python', group: '(Geospatial) programming / Data Science', full: 'Python -> (Geospatial) programming / Data Science' },
    { name: 'R', group: '(Geospatial) programming / Data Science', full: 'R -> (Geospatial) programming / Data Science' },
    { name: 'Jupyter Notebooks', group: '(Geospatial) programming / Data Science', full: 'Jupyter Notebooks -> (Geospatial) programming / Data Science' },
    { name: 'Javascript', group: '(Geospatial) programming / Data Science', full: 'Javascript -> (Geospatial) programming / Data Science' },
    { name: 'Other(Specify)', group: '(Geospatial) programming / Data Science', full: 'Other(Specify) -> (Geospatial) programming / Data Science' },
    { name: 'Cartography', group: 'Data Visualisation', full: 'Cartography -> Data Visualisation' },
    { name: 'Dashboards', group: 'Data Visualisation', full: 'Dashboards -> Data Visualisation' },
    { name: 'Graphic design', group: 'Data Visualisation', full: 'Graphic design -> Data Visualisation' },
    { name: '(Geospatial) Data Journalism', group: '', full: '(Geospatial) Data Journalism' },
    { name: 'Geospatial leadership', group: 'Strategic Skills', full: 'Geospatial leadership -> Strategic Skills' },
    { name: 'Policy', group: 'Strategic Skills', full: 'Policy -> Strategic Skills' },
    { name: 'GI Implementation / Strategy', group: 'Strategic Skills', full: 'GI Implementation / Strategy -> Strategic Skills' },
    { name: 'Growth in the geospatial / space Industry', group: 'Strategic Skills', full: 'Growth in the geospatial / space Industry -> Strategic Skills' },
    { name: 'Spatial Data Analysis & Insight', group: 'Geospatial Data', full: 'Spatial Data Analysis & Insight -> Geospatial Data' },
    { name: 'Location Intelligence', group: 'Geospatial Data', full: 'Location Intelligence -> Geospatial Data' },
    { name: 'Big Data / Geospatial Data', group: 'Geospatial Data', full: 'Big Data / Geospatial Data -> Geospatial Data' },
    { name: 'Open Data', group: 'Geospatial Data', full: 'Open Data -> Geospatial Data' },
    { name: 'Entrepreneurship', group: '', full: 'Entrepreneurship' },
    { name: 'Augmented Reality (AR)', group: 'Innovation / New Uses of GIS data', full: 'Augmented Reality (AR) -> Innovation / New Uses of GIS data' },
    { name: 'Virtual Reality (VR)', group: 'Innovation / New Uses of GIS data', full: 'Virtual Reality (VR) -> Innovation / New Uses of GIS data' },
    { name: 'Machine Learning / Artificial Intelligence', group: 'Innovation / New Uses of GIS data', full: 'Machine Learning / Artificial Intelligence -> Innovation / New Uses of GIS data' },
    { name: 'Blockchain', group: 'Innovation / New Uses of GIS data', full: 'Blockchain -> Innovation / New Uses of GIS data' },
    { name: '5G', group: 'Innovation / New Uses of GIS data', full: '5G -> Innovation / New Uses of GIS data' },
    { name: 'Internet-of-Things (IoT)', group: 'Innovation / New Uses of GIS data', full: 'Internet-of-Things (IoT) -> Innovation / New Uses of GIS data' },
    { name: 'Geospatial and digital transformation', group: 'Innovation / New Uses of GIS data', full: 'Geospatial and digital transformation -> Innovation / New Uses of GIS data' },
    { name: 'Other', group: '', full: 'Other' }
  ];

  */

  public languages = [
    'Afrikaans',
    'Albanian',
    'Arabic',
    'Armenian',
    'Basque',
    'Bengali',
    'Bulgarian',
    'Catalan',
    'Cambodian',
    'Chinese (Mandarin)',
    'Croatian',
    'Czech',
    'Danish',
    'Dutch',
    'English',
    'Estonian',
    'Fiji',
    'Finnish',
    'French',
    'Georgian',
    'German',
    'Greek',
    'Gujarati',
    'Hebrew',
    'Hindi',
    'Hungarian',
    'Icelandic',
    'Indonesian',
    'Irish',
    'Italian',
    'Japanese',
    'Javanese',
    'Korean',
    'Latin',
    'Latvian',
    'Lithuanian',
    'Macedonian',
    'Malay',
    'Malayalam',
    'Maltese',
    'Maori',
    'Marathi',
    'Mongolian',
    'Nepali',
    'Norwegian',
    'Persian',
    'Polish',
    'Portuguese',
    'Punjabi',
    'Quechua',
    'Romanian',
    'Russian',
    'Samoan',
    'Serbian',
    'Slovak',
    'Slovenian',
    'Spanish',
    'Swahili',
    'Swedish ',
    'Tamil',
    'Tatar',
    'Telugu',
    'Thai',
    'Tibetan',
    'Tonga',
    'Turkish',
    'Ukrainian',
    'Urdu',
    'Uzbek',
    'Vietnamese',
    'Welsh',
    'Xhosa'
  ];

  public region = [
    'Africa - West',
    'Africa - East',
    'Africa - Other',
    'Asia - China',
    'Asia - India',
    'Asia - Other',
    'Australia / New Zealand',
    'Canada',
    'Central America',
    'US - East Coast',
    'US - West Coast',
    'US - South',
    'US - Midwest',
    'Latin America',
    'Middle East',
    'Europe - Other',
    'Europe - UK/ Ireland ',
  ];

  constructor(
    public fAuth: AngularFireAuth,
    private ngZone: NgZone,
    public fFire: AngularFirestore,
    private fStorage: AngularFireStorage,
    private router: Router) {

    this.model = new Speaker();
    this.userIdToDelete = '';
    // this.errorGDPR = '';

    if (fAuth.auth.currentUser == null) { // there is not user logged in
      // this.router.navigate(['/login']);
      this.ngZone.run(() => this.router.navigateByUrl('/login')).then();
    }

    this.fAuth.auth.onAuthStateChanged(u => {
      /*       this.zone.run();
            ngZone.run(); */
      if (u && u.uid !== this.userIdToDelete) {
        this.user = u;
        this.fFire.collection('speakers').doc<Speaker>(this.user.uid).valueChanges().subscribe(s => {
          if (s) {
            this.model = s;
            if (this.model.picture === '') {
              this.model.picture = '../assets/img/profile.jpg';
            }
            if (!this.model.sector) {
              this.model.sector = {
                private: false,
                public: false,
                ngo: false,
                self: false,
                university: false,
                international: false,
                other: false,
              };
            }
            if (!this.model.signin) {
              this.model.signin = {
                option: '',
                slack: false,
                mailing: false
              };
            }
            if (!this.model.domain) {
              this.model.domain = {
                public: false,
                defence: false,
                emergency: false,
                climate: false,
                smart: false,
                citizen: false,
                transportation: false,
                energy: false,
                manufacturing: false,
                environment: false,
                food: false,
                sustainable: false,
                policy: false,
                other: false
              };
            }
            if (!this.model.newareas) {
              this.model.newareas = {
                research: false,
                geosoft: false,
                geosoftsub: {
                    foss4g: false,
                    arcgis: false,
                    mapinfo: false,
                    cadcorp: false,
                    fme: false,
                    other: false,
                },
                webmapping: false,
                webmappingsub: {
                    openlayers: false,
                    leaflet: false,
                    arcgis: false,
                    d3: false,
                    mapbox: false,
                    other: false,
                },
                geoopendata: false,
                geoopendatasub: {
                    geonode: false,
                    arcgis: false,
                    copernicus: false,
                    earth: false,
                    google: false,
                },
                remote: false,
                gis: false,
                ethical: false,
                geocloud: false,
                geocloudsub: {
                    google: false,
                    amazon: false,
                    other: false,
                },
                geoprogramming: false,
                geoprogrammingsub: {
                    python: false,
                    r: false,
                    jupyter: false,
                    javascript: false,
                    other: false,
                },
                datavis: false,
                datavissub: {
                    cartography: false,
                    dashboards: false,
                    graphic: false,
                },
                dataJournalism: false,
                strategic: false,
                strategicsub: {
                    geospatial: false,
                    policy: false,
                    gi: false,
                    growth: false,
                },
                geodata: false,
                geodatasub: {
                    spatial: false,
                    location: false,
                    bigdata: false,
                    opendata: false,
                },
                entrepreneurship: false,
                innovation: false,
                innovationsub: {
                    ar: false,
                    vr: false,
                    ml: false,
                    blockchain: false,
                    fiveg: false,
                    iot: false,
                    geotrans: false,
                },
                other: false,
            };
            }
            console.log(this.model);
          } else {
            this.model.email = this.user.email;
            this.fFire.collection('speakers').doc<Speaker>(this.user.uid).set(Object.assign({}, this.model));
          }
        });
      }
    });
  }

  saveData() {
    if (this.acceptedGDPR) {
      console.log(this.model);
      this.fFire.collection('speakers').doc<Speaker>(this.user.uid).set(Object.assign({}, this.model));
      this.errorGDPR = '';
      this.savedTxt = 'Your data has been saved!';
    } else {
      this.errorGDPR = 'You need to accept our GDPR statement and Terms and Conditions.';
      this.savedTxt = '';
    }
  }

  removeData() {
    this.userIdToDelete = this.user.uid;

    this.fFire.collection('speakers').doc<Speaker>(this.user.uid).delete();
    this.fAuth.auth.currentUser.delete().catch(error => {
      if (error) {
        // tslint:disable-next-line:max-line-length
        this.errorGDPR = 'This operation is sensitive and requires recent authentication. Log in again before retrying to delete your data.';
      }
    }).then(() => {
      this.fFire.collection('speakers').doc<Speaker>(this.userIdToDelete).delete();
      this.fAuth.auth.signOut();
    });
  }

  ngOnInit(): void {
  }

  logOut() {
    this.fAuth.auth.signOut();
  }

  addOtherArea() {
    if (this.otherAreaAdd !== '') {
      if (!this.model.otherAreas) {
        this.model.otherAreas = [];
      }
      this.model.otherAreas.push(this.otherAreaAdd);
      this.otherAreaAdd = '';
    }
  }
  handleFileInput(files) {
    console.log(files[0]);
    let filePath = '';
    if (files[0].type === 'image/png') {
      filePath = 'profile' + this.user.uid + '.png';
    } else if (files[0].type === 'image/jpeg') {
      filePath = 'profile' + this.user.uid + '.jpg';
    }
    if (filePath !== '') {
      this.fStorage.upload(filePath, files[0]).then(snap => {
        snap.ref.getDownloadURL().then(url => {
          this.model.picture = url;
        });
      });
    } else {
      this.errorGDPR = 'Upload a valid png or jpg image';
    }
  }

  removeFile() {
    this.model.picture = '../assets/img/profile.jpg';
  }

}
