import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { SpeakerService } from './speaker.service';
import countriesJSON from './countries.json';
import { GeoJSONSource, Point } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;
  // Coordenadas de la localización donde queremos centrar el mapa
  lat = 43.1746;
  lng = -2.4125;
  zoom = 1;

  countries: any = countriesJSON;

  countriesCount = [];

  constructor(public spServices: SpeakerService) {
    // Asignamos el token desde las variables de entorno
    this.mapbox.accessToken = environment.mapBoxToken;
  }
  buildMapPolygon() {
    this.map = new mapboxgl.Map({
      container: 'mapDiv',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    console.log('build map polygon');

    this.countries.features.forEach(country => {
      if (this.spServices.countriesCount[country.properties.AFF_ISO]) {
        country.properties.count = this.spServices.countriesCount[country.properties.AFF_ISO];
      } else {
        country.properties.count = 0;
      }
    });

    /*     Object.keys(this.spServices.countriesCount).forEach(k => {
          this.countriesCount.push({ code: k, count: this.spServices.countriesCount[k] });
        }); */


    this.map.on('load', () => {
      this.map.addSource('speakersCount', {
        type: 'geojson',
        data: this.countries
      });

      /*
            // Build a GL match expression that defines the color for every vector tile feature
            // Use the ISO 3166-1 alpha 3 code as the lookup key for the country shape
            const matchExpression = ['match', ['get', 'AFF_ISO']];
      
            // Calculate color values for each country based on 'hdi' value
            for (const row of this.countriesCount) {
              // Convert the range of data values to a suitable color
      
              let color = '#B65DF5';
      
              if (row.count > 50) {
                color = '#391D4D';
              } else if (row.count > 20) {
                color = '#512A6E';
              } else if (row.count > 10) {
                color = '#994ECF';
              }
      
              //      #391D4D
             //      #512A6E
              //     #994ECF
              //     #B65DF5 
      
              matchExpression.push(row.code, color);
            }
      
            // Last value is the default, used where there is no data
            matchExpression.push('rgba(0, 0, 0, 0)');
      
            this.map.addLayer(
              {
                id: 'poly',
                type: 'fill',
                source: 'speakersCount',
                paint: {
                  'fill-color': matchExpression,
                  'fill-opacity': 0.75
                  // 'fill-outline-color': '#51296d'
                }
              });
      */

      this.map.addLayer({
        id: 'poly',
        type: 'fill',
        source: 'speakersCount', // reference the data source
        layout: {},
        filter: ['>', 'count', 0],
        paint: {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'count'],
            5,
            '#B65DF5',
            10,
            '#994ECF',
            20,
            '#512A6E',
            50,
            '#391D4D'
          ],
          'fill-opacity': 0.75
        }
      });

      this.map.on('click', 'poly', (e) => {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          // tslint:disable-next-line:max-line-length
          .setHTML('Speakers: ' + e.features[0].properties.count + '<br> <a href="https://speakers.womeningeospatial.org" target="_blank"> See full profiles </a>')
          .addTo(this.map);
      });


      // inspect a cluster on click
      /*       this.map.on('click', 'clusters', (e) => {
              const features = this.map.queryRenderedFeatures(e.point, {
                layers: ['clusters']
              });
              const clusterId = features[0].properties.cluster_id;
              this.map.getSource('earthquakes').getClusterExpansionZoom(
                clusterId,
                (err, zoom) => {
                  if (err) return;
  
                  map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                  });
                }
              );
            }); */

      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      /*       map.on('click', 'unclustered-point', (e) => {
              const coordinates = e.features[0].geometry.coordinates.slice();
              const mag = e.features[0].properties.mag;
              const tsunami =
                e.features[0].properties.tsunami === 1 ? 'yes' : 'no';
  
              // Ensure that if the map is zoomed out such that
              // multiple copies of the feature are visible, the
              // popup appears over the copy being pointed to.
              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
              }
  
              new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(
                  `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`
                )
                .addTo(map);
            });
  
            map.on('mouseenter', 'clusters', () => {
              map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'clusters', () => {
              map.getCanvas().style.cursor = '';
            });
      */
    });
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'mapDiv',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    console.log('build map');

    this.map.on('load', () => {
      this.map.addSource('speakersGeo', {
        type: 'geojson',
        data: JSON.parse(this.spServices.featureCollection),
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });

      this.map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'speakersGeo',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#51296d',
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            50,
            30,
            100,
            40
          ]
        }
      });

      this.map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'speakersGeo',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        },
        paint: {
          'text-color': 'white'
        }
      });


      // Load an image from an external URL.
      this.map.loadImage(
        '/assets/img/pin_rotated.png',
        (error, image) => {
          if (error) throw error;

          // Add the image to the map style.
          this.map.addImage('pin', image);

          this.map.addLayer({
            id: 'unclustered-point',
            type: 'symbol',
            source: 'speakersGeo',
            filter: ['!', ['has', 'point_count']],
            layout: {
              'icon-image': 'pin',
              'icon-size': 0.25
            }
          });
        });

      // inspect a cluster on click
      /*       this.map.on('click', 'clusters', (e) => {
              const features = this.map.queryRenderedFeatures(e.point, {
                layers: ['clusters']
              });
              const clusterId = features[0].properties.cluster_id;
              this.map.getSource('earthquakes').getClusterExpansionZoom(
                clusterId,
                (err, zoom) => {
                  if (err) return;
  
                  map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                  });
                }
              );
            }); */

      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      this.map.on('click', 'unclustered-point', (e) => {

        const geometry = e.features[0].geometry;

        let coordinates = null;
        if (geometry.type === 'Point') {
          coordinates = geometry.coordinates.slice();
        }

        const sp_id = e.features[0].properties.id;
        const sp_picture = e.features[0].properties.picture;
        const sp_name = e.features[0].properties.name;
        const sp_position = e.features[0].properties.position;
        const sp_contactEmail = e.features[0].properties.contactEmail;
        const sp_contactLinkedIn = e.features[0].properties.contactLinkedIn;
        const sp_contactTwitter = e.features[0].properties.contactTwitter;
        const sp_twitter = e.features[0].properties.twitter;
        const sp_linkedIn = e.features[0].properties.linkedIn;
        const sp_email = e.features[0].properties.email;
        const sp_webpage = e.features[0].properties.webpage;

        //   console.log(e.features[0]);

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            ` <div class="card card-plain text-center">
            <div class="col-md-4 ml-auto mr-auto">
            <img *ngIf="${sp_picture} != ''" src="${sp_picture}" loading="lazy"
                alt="${sp_name} Profile Picture WiG+"
                class="img-raised rounded-circle img-fluid">
        </div>
        <h6 class="card-title"> ${sp_name}
            <br>
            <small class="card-description text-muted small">
            ${sp_position}</small>
        </h6>
        <br>
        <a href="/speakers/${sp_id}" target="_blank" routerLink="/speakers/${sp_id}" class="text-primary">See complete
                                                    profile</a>

                                                    </div>`
          )
          .addTo(this.map);
      });



      /*       <div class="card-footer justify-content-center">
            <a *ngIf="${sp_contactLinkedIn}" href="${sp_linkedIn}" target="_blank"
                class="btn btn-link btn-just-icon"><i
                    class="fab fa-linkedin-in"></i></a>
            <a *ngIf="${sp_contactTwitter}" href="${sp_twitter}" target="_blank"
                class="btn btn-link btn-just-icon"><i
                    class="fab fa-twitter"></i></a>
            <a *ngIf="${sp_contactEmail}" href="javascript:;"
                (click)="sendEmail(${sp_email})"
                class="btn btn-link btn-just-icon"><i
                    class="fa fa-envelope"></i></a>
            <a *ngIf="${sp_webpage} != '' && ${sp_webpage} != null" target="_blank"
                href="${sp_webpage}" class="btn btn-link btn-just-icon"><i
                    class="fas fa-globe-americas"></i></a>
        </div> */

      this.map.on('mouseenter', 'clusters', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });
      this.map.on('mouseleave', 'clusters', () => {
        this.map.getCanvas().style.cursor = '';
      });

    });
  }

  updateSource() {
    (this.map.getSource('speakersGeo') as GeoJSONSource).setData(JSON.parse(this.spServices.featureCollection));
  }

}
