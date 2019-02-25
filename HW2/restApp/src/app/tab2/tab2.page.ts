import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ItemService } from '../item.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  imgfile="https://www.brewingz.com/wp-content/uploads/2015/11/Order-Online.png";
  orders=[{"id":1, "totalItems":2, "totalPrice":28.15, "itemName": "icecream", "date": 2-9-2019},
  {"id":1, "totalItems":2, "totalPrice":28.15, "itemName": "icecream", "date": 2-9-2019},];

  constructor(
    private router: Router,
    public itemService: ItemService

  ){}

  ngOnInit(){
    this.orders = this.itemService.getOrders();
    if(this.orders != undefined){
          console.log(this.orders.length);
    }
    
  }

  openNewItemPage(){
  	console.log("clicked me");
  	this.router.navigate(["/add-item"]);

	}

goToOrder(order){
  	console.log(order);
  	this.router.navigate(["/order-detail-page", order]);

  }
  
}