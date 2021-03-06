import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FreeapiService } from '../services/freeapi.service';
import * as L from 'leaflet';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit, AfterViewInit, OnDestroy{
  public attribution:any = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  public tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  // Making a marker with a custom icon
  public issIcon = L.icon({
    // iconUrl: '../../assets/images/iss_200.png',
    iconUrl: environment.assetsPrefix+'assets/images/iss_200.png',
    iconSize:     [50, 32], // size of the icon
    iconAnchor:   [25, 16], // point of the icon which will correspond to marker's location
  });
  public errorMsg: string;
  public myMap;
  public tiles;
  public marker;
  public firstTime = true;
  public id;
  public lat = 0;
  public lng = 0;

  constructor(private _freeApiService: FreeapiService) { }

  ngOnInit(): void {


  }

  ngAfterViewInit(){

    this.myMap = L.map('iss-map').setView([this.lat, this.lng], 1);
    this.tiles = L.tileLayer(this.tileUrl, {attribution: this.attribution}).addTo(this.myMap);
    this.marker = L.marker([0,0], {icon: this.issIcon}).addTo(this.myMap.setView([this.lat, this.lng]));

    this.getIssTracking();
    this.id = setInterval(() => {
      this.getIssTracking();
    }, 3000);

  }

  getIssTracking(){
    this._freeApiService.getIss()
      .subscribe(data => {
        const ldata = data;
        const { latitude, longitude } = ldata;
        this.lat = ldata.latitude;
        this.lng = ldata.longitude;

        this.marker.setLatLng([latitude, longitude]);
        },
        error => this.errorMsg = error);
  };

  ngOnDestroy(){
    if(this.id){
      clearInterval(this.id);
     // this._freeApiService.getIss().unsubscribe();
    }
  }

}
