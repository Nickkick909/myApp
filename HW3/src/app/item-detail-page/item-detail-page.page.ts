import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-detail-page',
  templateUrl: './item-detail-page.page.html',
  styleUrls: ['./item-detail-page.page.scss'],
})
export class ItemDetailPagePage implements OnInit {
  current_item:any;
//  new_order: FormGroup;
  quantity: string;
  date: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    public itemService: ItemService) {
      var nowDate = new Date();
      this.quantity = '1';
      this.date = (nowDate.getMonth()+1)+'/'+nowDate.getDate() + '/' + nowDate.getFullYear();
    }

  ngOnInit() {
    //current item information
    this.route.params.subscribe(
      param => {
        this.current_item = param;
        console.log('Selected item detail: ' + this.current_item.name);
      }
    )
/*
    //order information
    this.new_order = this.formBuilder.group({
      quantity: new FormControl('1'),
      date: new FormControl('01/01/2019', Validators.required)
    });*/

  }

  createOrder(){
    // Find total price
    let total_price = +this.quantity * this.current_item.price;
    console.log('total price: ' + total_price);

    //Find item name
    let item_name = this.current_item.name;

    console.log('date: ' + this.date)
  	//save the order, and then go back
    this.itemService.createOrder(this.quantity, total_price, item_name, this.date);


  	this.goToOrders();
  }

  goToOrders(){
    this.router.navigate(['/tabs/tabs/tab2']);
  }

  goBack(){
    this.router.navigate(['/tabs/tabs/tab1']);
}

}
