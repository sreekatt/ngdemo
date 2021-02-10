import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-g-maps',
  templateUrl: './g-maps.component.html',
  styleUrls: ['./g-maps.component.css']
})
export class GMapsComponent implements OnInit {

  // showSpinner = false;
  mapLoaded: boolean;
  map: google.maps.Map;
  center: google.maps.LatLngLiteral;

  selectedSource:string;
  selectedDestination:string;

  options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: true,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    zoom: 12
  }

  ds: google.maps.DirectionsService;
  dr: google.maps.DirectionsRenderer;

  constructor() { }

  ngOnInit(): void {
    this.ds = new google.maps.DirectionsService();
    this.dr = new google.maps.DirectionsRenderer({
      map: null,
      suppressMarkers: true
    });

    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

    this.map = new google.maps.Map(document.getElementById('g-map'), {
        ...this.options,
        center: this.center
      });

      this.map.addListener('tilesloaded', () => {
        this.mapLoaded = false;
      });
/*
      const markerStart  = new google.maps.Marker({
        position: this.center,
        map: this.map
      });
``    */
    });
  }

  setRoutePolyline() {
    let request = {
      origin: this.selectedSource,
      destination: this.selectedDestination,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.ds.route(request, (response, status) => {
      this.dr.setOptions({
        suppressPolylines: false,
        map: this.map
      });
      if (status == google.maps.DirectionsStatus.OK){
        this.dr.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    })
  }

  onSourceChange(v) {
    if (this.dr != null) {
      this.dr.setMap(null);
      this.dr = null;
      }
    if(this.selectedSource == undefined || this.selectedDestination == undefined) {
        return;
    } else {
      this.dr = new google.maps.DirectionsRenderer({
        suppressMarkers: false
      });
      this.setRoutePolyline();
    }
  }

  onDestinationChange(v) {
    if (this.dr != null) {
      this.dr.setMap(null);
      this.dr = null;
      }
    if(this.selectedDestination === undefined || this.selectedDestination === undefined) {
      return;
    } else {
      this.dr = new google.maps.DirectionsRenderer({
        suppressMarkers: false
      });
      this.setRoutePolyline();
    }
  }

}


/*
  navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      //console.log(this.center.lat);
    this.map = new google.maps.Map(document.getElementById('g-map'), {
        ...this.options,
        center: this.center

      });
      const markerStart  = new google.maps.Marker({
        position: this.center,
        map: this.map
      })
    });
*/
