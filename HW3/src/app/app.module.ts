import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule} from '@ionic/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';

import { File } from "@ionic-native/file/ngx";
import { Camera } from "@ionic-native/camera/ngx";
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  imports: [BrowserModule, AngularFireModule.initializeApp(environment), 
    AngularFirestoreModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), ReactiveFormsModule],
  providers: [
    AngularFirestore,
    PhotoLibrary,
    Camera,
    File,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
