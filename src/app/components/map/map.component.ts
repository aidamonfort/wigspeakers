import { Component, OnInit } from '@angular/core';
import { SpeakerService } from 'src/app/services/speaker.service';
import { MapService } from '../../services/map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor( public spService: SpeakerService, public mapService: MapService) { }


  ngOnInit(): void {

    setTimeout(() => {
      this.mapService.buildMapPolygon();
    }, 3000);
  }

}
