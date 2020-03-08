import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { LogModalPageRoutingModule } from '../log-modal/log-modal-routing.module';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @ViewChild('map',{static: false}) mapElement: ElementRef;
  map: google.maps.Map;
  home: google.maps.Marker;
  infoWindow = new google.maps.InfoWindow;
  search = "Recycle centre";

  constructor(private geoLocation: Geolocation, private plt: Platform, private iab:InAppBrowser, private storage: Storage) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
      this.loadMap();
  }
  loadMap(){
      let latLng = new google.maps.LatLng(53.381130,-1.470085);
      let styles: google.maps.MapTypeStyle[] = [
          {
            featureType: 'poi',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          }
      ];
      this.storage.get('latlng').then((result) => {
        console.log("storage :"+ result.lat);
        if(result === undefined){
            latLng = this.updateUserPostion();
        }else{
            
            latLng = result;
        }
      })
      console.log(latLng.lat+" "+latLng.lng)
      let mapOptions = {
          center: latLng,
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: styles,
          mapTypeControl: false

      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
     
  }
  updateUserPostion(){
    let latLng = new google.maps.LatLng(51.5074,0.1278);

      this.geoLocation.getCurrentPosition().then(resp => {

          latLng = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
          this.storage.set('latlng',latLng);

      }).catch((err) => {
          this.storage.get('latlng').then((result) => {
              if(result === undefined){
                this.storage.set('latlng',latLng);
              }
          })
          console.log(err);
      })
      
    return latLng;
  }
  loadUserPostion(){
    this.plt.ready().then(() => {
        this.geoLocation.getCurrentPosition().then(resp => {
          const coors = {
            lat:resp.coords.latitude,
            lng:resp.coords.longitude
          }
            console.log('response: ', resp);
            this.storage.set('latlng',coors);
            this.focusMap(coors.lat,coors.lng);
            this.addMarker(coors.lat,coors.lng,'You are here');
        })
    })
  }
  focusMap(lat,long){
    let position = new google.maps.LatLng(lat,long);
    this.map.setCenter(position);
    this.map.setZoom(13);
  }
  addMarker(lat,long,info){
    let position = new google.maps.LatLng(lat,long);

    this.home = new google.maps.Marker({
      map: this.map,
      position: position,
      animation: google.maps.Animation.DROP
    })
  }
  removeMarker(){
      this.home.setMap(null);
  }
  toggleMarker(){

  }
  addNearbyMarker(place: google.maps.places.PlaceResult){
    var image = '../../../assets/imgs/PinClipart.com_garbage-bag-clipart_1656157.png';
    const icon = {
      url: image,
      scaledSize: new google.maps.Size(35,35),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(0,0)
    }
    let marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location,
      animation: google.maps.Animation.DROP,
      icon: icon
    });

    marker.addListener('click', () => {
      let photo = '';
      if(place.hasOwnProperty('photos')){
        photo = place.photos[0].getUrl({maxWidth: 100, maxHeight: 100});
      }
      this.infoWindow.setContent(`<img src="${photo}" style="width: 100%; max-height: 100px;object-fit: contain;"/><br>
      <b>${place.name}</b>`);
      this.infoWindow.open(this.map, marker);
    });
  }
  findPlace(){
    const request = {
      query: this.search
    };
    let service = new google.maps.places.PlacesService(this.map);
    service.textSearch(request, (results, status) => {
      console.log(results);
      console.log(status);
      if(status === google.maps.places.PlacesServiceStatus.OK){
         for(let place of results){
          if(place.hasOwnProperty('photos')){
              this.addNearbyMarker(place);
          }
         }
         
      }
    }) 
  }
  showNearby(){
    const request: google.maps.places.PlaceSearchRequest = {
      type: 'Hotel',
      radius: 5000,
      location: this.home.getPosition()
    };
    let service = new google.maps.places.PlacesService(this.map);
    
    service.nearbySearch(request, (results, status) => {
      console.log(results);
      if(status === google.maps.places.PlacesServiceStatus.OK){
         for(let place of results){
           if(place.hasOwnProperty('photos')){
            this.addNearbyMarker(place);
           }
         }
         
      }
    })  
  }
}
