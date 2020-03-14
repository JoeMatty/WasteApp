import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, ToastController,IonDatetime } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { LogModalPageModule } from './pages/log-modal/log-modal.module';
import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { CameraScanService } from 'src/app/services/camera-scan.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { PopoverController } from '@ionic/angular';
import { AddPopComponent } from './popover/add-pop/add-pop.component';


library.add(fab);

@NgModule({
  declarations: [AppComponent,AddPopComponent],
  entryComponents: [AddPopComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule, 
    
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    LogModalPageModule,
    BrowserAnimationsModule],
    
  providers: [
    StatusBar,
    InAppBrowser,
    CameraScanService,
    PopoverController,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
    BarcodeScanner,
    SQLitePorter,
    ToastController,
    Geolocation
  ],
  exports: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
