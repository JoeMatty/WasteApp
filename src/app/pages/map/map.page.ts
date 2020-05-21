import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { LogModalPageRoutingModule } from '../log-modal/log-modal-routing.module';
import { Network } from '@ionic-native/network/ngx';


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
  internetConnected = true;
  currentlatLng;
  connectSubscription;
  currentLocation = "1";
  constructor(private geoLocation: Geolocation, private plt: Platform, private iab:InAppBrowser, private storage: Storage, private network: Network) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    if (this.plt.is('cordova')) {
      this.internetConnected = this.checkInternet();
    }
    if (this.internetConnected){
      this.loadMap();
      this.findPlace();
    }
  }
  checkInternet(){
    if(this.network.type === "NONE"){
      return false;
    }
    else{
      return true;
    }
  }
  loadMap(){
      this.currentlatLng = new google.maps.LatLng(53.3766,-1.4668);
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
      // this.storage.get('latlng').then((result) => {
        this.currentlatLng = this.updateUserPostion();
      //   console.log("storage :"+ result.lat);
      //   if(result === undefined){
      //   }else{
            
      //      // latLng = result;
      //   }
      // })
      let mapOptions = {
          center: this.currentlatLng,
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: styles,
          mapTypeControl: false

      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
     
  }
  updateUserPostion(){
    let latLng = new google.maps.LatLng(53.3766,-1.4668);
    this.geoLocation.getCurrentPosition().then(resp => {
      
      
          latLng = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
          this.currentLocation = resp.coords.latitude+ " " +resp.coords.longitude;
          this.storage.set('latlng',latLng);

      })
      
    return latLng;
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
      query: this.search,
      location: this.map.getCenter()
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
