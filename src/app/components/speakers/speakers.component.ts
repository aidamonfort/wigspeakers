import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { SpeakerService } from '../../services/speaker.service';
import { MapService } from '../../services/map.service';
import { Speaker } from '../../speaker';
import { ActivatedRoute } from '@angular/router';

import Autolinker from 'autolinker';
import { ThrowStmt } from '@angular/compiler';

/* import { MapService } from 'src/app/services/map.service';
 */
@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.css']
})
export class SpeakersComponent implements OnInit {

  private map: mapboxgl.Map;
  public LIMIT_PER_PAGE = 8;
  public currentPage = 1;

  textSearch = '';
  searchSector = {
    private: false,
    public: false,
    ngo: false,
    self: false,
    university: false,
    international: false,
    // other: false,
  };
  textYears = '';
  textLevel = '';

  searchDomain = {
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
    // other: false,
  };
  searchAreas = {
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
  };


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
  public sectorsText: {
    private: 'Private Company',
    public: 'Public sector / Government',
    ngo: 'Non-governmental organisation (NGO) / Not-For-Profit organisation',
    self: 'Self-employed / Consulting',
    university: 'University / Academia',
    international: 'International organisation',
    other: 'Other (please specify)'
  };


  public areasText = {
    research: 'Research / Science',
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

  domainText = {
    public: 'Public Health',
    defence: 'Defence and Security',
    emergency: 'Emergency Service / Public Safety',
    climate: 'Climate',
    smart: 'Smart Cities',
    citizen: 'Citizen Science',
    transportation: 'Transportation',
    energy: 'Energy',
    manufacturing: 'Manufacturing',
    environment: 'Environment',
    food: 'Food, Forestry, Agriculture',
    sustainable: 'Sustainable Development',
    policy: 'Policy'
  };

  searchLanguages = '';
  searchRegions = '';

  contactEmail = {
    name: '',
    email: '',
    message: ''
  };


  public regions = [
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

  selectedSpeaker: Speaker;
  areasClean = [];
  domainsClean = [];

  constructor(private route: ActivatedRoute, public spService: SpeakerService, public mapService: MapService) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.seeProfile(id);
    }

    setTimeout(() => {
      this.mapService.buildMap();
    }, 4000);
    this.clearSearch();
  }

  seeProfile(id) {
    const spSub = this.spService
      .getSpeakerById(id)
      .subscribe(speaker => {
        if (speaker) {
          this.selectedSpeaker = speaker;
          if (this.selectedSpeaker.speakingExperience) {
            this.selectedSpeaker.speakingExperience = Autolinker.link(this.selectedSpeaker.speakingExperience);
          }
          if (this.selectedSpeaker.contactTwitter) {
            if (this.selectedSpeaker.twitter[0] === '@') {
              const tw = this.selectedSpeaker.twitter.split('@')[1];
              this.selectedSpeaker.twitter = 'https://twitter.com/' + tw;
            }
          }
          if (this.selectedSpeaker.contactLinkedIn) {
            if (!this.selectedSpeaker.linkedIn.includes('.com')) {
              this.selectedSpeaker.linkedIn = 'https://www.linkedin.com/search/results/all/?keywords=' + this.selectedSpeaker.linkedIn;
            }
          }

          this.areasClean = [];
          Object.keys(this.selectedSpeaker.newareas).forEach(area => {
            if (this.selectedSpeaker.newareas[area]) {
              if (this.typeOf(this.areasText[area]) === 'string') {
                this.areasClean.push(this.areasText[area]);
              } else {
                Object.keys(this.selectedSpeaker.newareas[area]).forEach(subarea => {
                  if (this.selectedSpeaker.newareas[area][subarea]) {
                    if (this.typeOf(this.areasText[area][subarea]) === 'string') {
                      this.areasClean.push(this.areasText[area][subarea]);
                    }
                  }
                });
              }
            }
          });

          this.domainsClean = [];
          Object.keys(this.selectedSpeaker.domain).forEach(domain => {
            if (this.selectedSpeaker.domain[domain]) {
              if (this.typeOf(this.domainText[domain]) === 'string') {
                this.domainsClean.push(this.domainText[domain]);
              }
            }
          });

          spSub.unsubscribe();
          console.log('Selected speaker:');
          console.log(speaker);
        }
      });
  }

  filterAll() {
    this.spService.filteredSpeakersList = this.spService.speakersList;
    this.filterByText();
    this.filterBySector();
    this.filterByYears();
    this.filterByLevel();
    this.filterByLanguages();
    this.filterByDomain();
    this.filterByArea();
    this.filterByRegions();
    this.spService.buildFeatureCollection();
    this.mapService.updateSource();
  }

  filterByText() {
    this.spService.filterSpeakersByText(this.textSearch);
  }

  filterBySector() {
    this.spService.filterSpeakersBySector(this.searchSector);
  }

  filterByDomain() {
    this.spService.filterSpeakersByDomain(this.searchDomain);
  }

  filterByArea() {
    this.spService.filterSpeakersByArea(this.searchAreas);
  }

  filterByYears() {
    this.spService.filterSpeakersByYears(this.textYears);
  }

  filterByLevel() {
    this.spService.filterSpeakersByLevel(this.textLevel);
  }

  filterByLanguages() {
    this.spService.filterSpeakersByLanguages(this.searchLanguages);
  }

  filterByRegions() {
    this.spService.filterSpeakersByRegions(this.searchRegions);
  }

  onGeocoderResult(event) {
    console.log(event);
    /*     new Popup()
          .setLngLat(location)
          .setDOMContent(contentContainer)
          .addTo(this.map); */
  }

  typeOf(value) {
    return typeof value;
  }

  clearSearch() {

    this.textSearch = '';
    this.searchSector = {
      private: false,
      public: false,
      ngo: false,
      self: false,
      university: false,
      international: false,
    };
    this.searchDomain = {
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
    };
    this.searchAreas = {
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
    };

    this.searchLanguages = '';
    this.searchRegions = '';
    this.textLevel = '';
    this.textYears = '';

    this.filterAll();

  }

  sendEmail(e) {
    location.href = 'mailto:' + e + '?subject=W+G speaker';
  }


  @HostListener('window:resize')
  private onWindowResize() {
    if (this.map) {
      this.map.resize();
    }
  }
}

