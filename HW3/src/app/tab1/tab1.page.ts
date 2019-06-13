import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { ItemService } from '../item.service';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  itemsObervable:Observable<any[]>;
  items_all=[];
  isowner:boolean= this.itemService.getUser();
  searchKey="";
  items=this.items_all;
  

  

  constructor(
    private router: Router,
    public itemService: ItemService,
    private storage: Storage)
    {
      console.log('Tab1 constructed');
      
    }

  ngOnInit() {
    this.itemsObervable = this.itemService.getItems();
    console.log('imported items');
    //this.items_all=this.items;
    //this.isowner = this.isowner;
    this.itemsObervable.subscribe(items => {
      this.items = items;
      //this.items_all= this.items;

    })
    
    //this.isowner=this.checkOwner();
    console.log('item: ' + this.items.values);
    if(this.items != undefined) {
      console.log('There are ' + this.items.length + ' items in menu.');
    }
    //this.isowner=this.checkOwner();
    console.log(this.isowner);
  }

  openNewItemPage() {
    console.log('Opened new item page.');
    this.router.navigate(['/new-item']);
  }
  openSettingsPage() {
    console.log('Opened new item page.');
    this.router.navigate(['/tabs/tabs/tab3']);
  }
  openCartPage() {
    console.log('Opened new item page.');
    this.router.navigate(['/tabs/tabs/tab2']);
  }

  itemDetailPage(item) {
    console.log('Item detail: ' + item);
  	this.router.navigate(["/item-detail-page", item]);
  }
  protected search() {
    this.resetChanges();

    this.items = this.items.filter((item) => {
      return item.title.toLowerCase().indexOf(this.searchKey.toLowerCase()) > -1;
    })
    
  }
  protected resetChanges() {
    this.items = this.items_all;
  }
  // checkOwner() : boolean {
  //   //let userid= firebase.auth().currentUser.uid;
  //   var tempisowner: boolean = false;
  //   //this.isowner=false;
  //   let fireBaseUser = this.itemService.getUserID();
  //     let usertypesRef = firebase.database().ref('usertypes/');
  //     usertypesRef.orderByChild("uid").equalTo(fireBaseUser).on("value",function(data) {
  //       data.forEach(function(data) {
  //         console.log("usertype: " +data.val().type)
  //         if(data.val().type =="owner") {
  //           return true;
  //           console.log("owner");
  //           tempisowner = true;
            
  //         }
           
          
  //       })
  //     });
  //     return tempisowner;
  // //   console.log(usertypesRef);
  // }
}
