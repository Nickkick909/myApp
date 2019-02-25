import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ItemService } from '../item.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  imgfile="/assets/Cheeseburger.jpg";
  items=[
    {"name":"meat","price": 15.00, "type":"dish",'img':this.imgfile, "description":"yummy meat from animals"},
    {"name":"icecream","price": 5.00, "type":"desert",'img':this.imgfile, "description":"yummy cream from ice"},
  ]

  constructor(
    private router: Router,
    public itemService: ItemService

  ){}

  ngOnInit(){
    this.items = this.itemService.getItems();
    if(this.items != undefined){
          console.log(this.items.length);
    }
    
  }

  openNewItemPage(){
  	console.log("clicked me");
  	this.router.navigate(["/add-item"]);

	}

goToItem(item){
  	console.log(item);
  	this.router.navigate(["/item-detail-page", item]);

  }
  
}
