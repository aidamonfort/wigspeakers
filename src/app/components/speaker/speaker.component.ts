import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpeakerService } from '../../services/speaker.service';
import { Speaker } from 'src/app/speaker';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.css']
})
export class SpeakerComponent implements OnInit {

  sp: Speaker;

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
    research: 'Research / Science Please specify ...',
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

  constructor(private route: ActivatedRoute, private speakerService: SpeakerService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const spSub = this.speakerService
      .getSpeakerById(id)
      .subscribe(speaker => {
        if (speaker) {
          this.sp = speaker;
          spSub.unsubscribe();
        }
      });
  }

  typeOf(value) {
    return typeof value;
  }

  sendEmail(e) {
    location.href = 'mailto:' + e + '?subject=WiG+ speaker';
  }

}
