import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

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
  constructor() {
    // Asignamos el token desde las variables de entorno
    this.mapbox.accessToken = environment.mapBoxToken;
  }
  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    console.log('build map');
/* 
    this.map.on('load', () => {
      this.map.loadImage(
        '../assets/img/pin.png',
        (error, image) => {
          if (error) {
            throw error;
          }
          this.map.addImage('geowigs', image);
          this.map.addSource('point', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [0, 0]
                  }
                }
              ]
            }
          });
          this.map.addLayer({
            id: 'points',
            type: 'symbol',
            source: 'point',
            layout: {
              'icon-image': 'geowigs',
              'icon-size': 0.25
            }
          });
        }
      );
    });
 */




  }
}
