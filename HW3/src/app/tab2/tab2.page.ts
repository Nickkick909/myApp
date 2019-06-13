import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  ordersObservable:Observable<any[]>;
  orders:Array<any>=[];

  constructor(
    private router: Router,
    public itemService: ItemService) { }

  ngOnInit() {
    this.ordersObservable = this.itemService.getOrders();
    this.ordersObservable.subscribe(orders => {
      this.orders = orders;
    }) 
    let uid= this.itemService.getUser();
    
    if(this.orders != undefined) {
      console.log('There are ' + this.orders.length + ' orders in menu.');
    }
  }
  
  orderDetailPage(order) {
    console.log('Order detail: ' + order);
  	this.router.navigate(["/order-detail-page", order]);
  }
}

