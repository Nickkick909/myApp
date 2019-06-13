import { Component, OnInit } from '@angular/core';
import { File } from "@ionic-native/file/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
// import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import * as firebase from "firebase";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {
  imgfile= "";
  add_item_form: FormGroup;
  constructor(private file: File, private camera: Camera,
    private router: Router,
 	  public formBuilder: FormBuilder,
 	     public itemService: ItemService) { }

  ngOnInit() : void {
    this.add_item_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required),
      description:new FormControl('', Validators.required),
      quantity: 1
    });
  }
  createItem(value){
  	console.log(value.name);
  	console.log(value.price);
  	console.log(value.type);
  	//save the item, and then go back
    //? 
    this.itemService.createItem(value.name,value.price, value.type, value.img, value.description);

  	this.goBack();
  }

  goBack(){
  	    this.router.navigate(['/tabs/tabs/tab1']);
  }
  async pickImage() {
    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.FILE_URI,
      //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY, //i added this, should let them select from photo library
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    try {
      console.log(this);
      let cameraInfo = await this.camera.getPicture(options);
      let blobInfo = await this.makeFileIntoBlob(cameraInfo);
      let uploadInfo: any = await this.uploadToFirebase(blobInfo);
      console.log(uploadInfo);
      let url:any = uploadInfo.ref.getDownloadURL();
      alert("File Upload Success " + uploadInfo);
      this.imgfile = uploadInfo.ref.getDownloadURL();
      
    } catch (e) {
      console.log(e.message);
      alert("File Upload Error " + e.message);
    }
  }

  
// FILE STUFF
makeFileIntoBlob(_imagePath) {
  // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
  return new Promise((resolve, reject) => {
    let fileName = "";
    this.file
      .resolveLocalFilesystemUrl(_imagePath)
      .then(fileEntry => {
        let { name, nativeURL } = fileEntry;

        // get the path..
        let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
        console.log("path", path);
        console.log("fileName", name);

        fileName = name;

        // we are provided the name, so now read the file into
        // a buffer
        return this.file.readAsArrayBuffer(path, name);
      })
      .then(buffer => {
        // get the buffer and make a blob to be saved
        let imgBlob = new Blob([buffer], {
          type: "image/jpeg"
        });
        console.log(imgBlob.type, imgBlob.size);
        resolve({
          fileName,
          imgBlob
        });
      })
      .catch(e => reject(e));
  });
} 

   /**
   *
   * @param _imageBlobInfo
   */
 uploadToFirebase(_imageBlobInfo) {
    console.log("uploadToFirebase");
    return new Promise((resolve, reject) => {
      let imageid = (Math.floor(Math.random() * 2000)).toString();
      let filename = "menu_"+imageid
      // filename = _imageBlobInfo.fileName;
      let fileRef = firebase.storage().ref("images/" + filename);

      let uploadTask = fileRef.put(_imageBlobInfo.imgBlob);
      let mydownloadurl="";
      

      uploadTask.on(
        "state_changed",
        (_snapshot: any) => {
          console.log(
            "snapshot progess " +
              (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100
          );
        },
        _error => {
          console.log(_error);
          reject(_error);
        },
        () => {
          // completion...  get the image URL for saving to database
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            mydownloadurl = downloadURL;
            // resolve( mydownloadurl);
          });
          resolve( uploadTask.snapshot);
          this.imgfile = mydownloadurl;
          resolve( mydownloadurl);
          this.imgfile = mydownloadurl;

        }
      );
    });
  } 

}
