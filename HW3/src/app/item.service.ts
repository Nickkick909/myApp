import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  //define some data containers such as arrays to store items
  items:Observable<any[]>;
  orders:Observable<any[]>;
  user:Array<any>=[{"uid":"testid", "type":"testtype"}];
  refu=firebase.database().ref('usertypes/');
  constructor(public db: AngularFirestore, private storage: Storage, public events:Events) { 
    console.log("loading saved items and orders");
    this.items = db.collection('items').valueChanges();
    this.orders = db.collection('orders').valueChanges();
    this.refu.on('value',resp =>{
      this.user=[];
      this.user=snapshotToArray(resp);
      this.events.publish('dataloaded',Date.now())
    });
  }

  //provide functions to get items
  getItems(){
    console.log('getting items...' + this.items);
    return this.items;
  }

  //get them orders boi
  getOrders(){
    console.log('gettings orders...' + this.orders);
    return this.orders;
  }

  createItem(name, price, category, photoUrl,description){
    let randomId = Math.random().toString(36).substr(2,5);
    this.db.collection('/items').add({
      "id":randomId, 
      "name":name, 
      "price": price, 
      "category":category, 
      "photoUrl":photoUrl, 
      "description":description
    });
/*
    console.log("now saving all items:");
    let usersStringifiedObj = JSON.stringify(this.items);
    localStorage.setItem("items", usersStringifiedObj);*/

    // let loadeditems= JSON.parse(localStorage.getItem("items"));
    // console.log("saved no. of items"+loadeditems.length.toString())
  }

  editSettings(storeName, logo, phone, address){
    this.db.collection('/settings').add({
      "storeName":storeName, 
      "logo": logo, 
      "phone":phone, 
      "address":address
    });
  }

  /*updateItem(newValues){
    let itemIndex = this.items.findIndex(item => item.id == newValues.id);
    
    if(newValues.photoUrl == undefined){
      newValues.photoUrl = this.items[itemIndex].photoUrl
    }

    this.items[itemIndex] = newValues;
    console.log(newValues.photoUrl);
  }*/

  createOrder(quantity, total_price, item_name,date) {
    let randomId = Math.random().toString(36).substr(2,5);
    let uid= firebase.auth().currentUser.uid;
    this.db.collection('/orders').add({
      "id":uid, 
      "quantity":quantity, 
      "total_price": total_price, 
      "item_name":item_name, 
      "date":date
    });
  }
  getUser(){ 
    for(var i=0;i<this.user.length;i++) {
      if(this.user[i].uid==firebase.auth().currentUser.uid) {
        if(this.user[i].type=="owner"){
          return true;
        }
      }
    }
  }
  createUser(id,type){
    let newInfo=firebase.database().ref('users/').push();
    newInfo.set({
      'id': id,
      'type': type
    });
    console.log(this.user);
  }
 
}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.id = childSnapshot.key;
      // console.log(item);
      returnArr.push(item);
  });

  return returnArr;
}