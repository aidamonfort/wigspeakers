import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { SpeakerService } from './speaker.service';

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
  constructor(public spServices: SpeakerService) {
    // Asignamos el token desde las variables de entorno
    this.mapbox.accessToken = environment.mapBoxToken;
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
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
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
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': '#86339A',
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
        '/assets/img/pin.png',
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
}
