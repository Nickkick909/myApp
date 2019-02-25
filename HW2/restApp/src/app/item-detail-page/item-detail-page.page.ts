import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-detail-page',
  templateUrl: './item-detail-page.page.html',
  styleUrls: ['./item-detail-page.page.scss'],
})
export class ItemDetailPagePage implements OnInit {

  current_item:any;
  edit_item_form:FormGroup;
  add_order_form:FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router:Router
  	) { 
  		this.edit_item_form = this.formBuilder.group({
          name: new FormControl("", Validators.required),
          type: new FormControl("", Validators.required),
          price: new FormControl(15, Validators.required),
          description: new FormControl("", Validators.required),
          img: new FormControl("", Validators.required),
          quantity: new FormControl(1)
          
        });
        // value.totalItems, value.totalPrice, value.itemName, value.date
        this.add_order_form = this.formBuilder.group({
          totalItems: new FormControl(15, Validators.required),
          totalPrice: new FormControl(15, Validators.required),
          itemName: new FormControl("", Validators.required),
          date: new FormControl("", Validators.required),
        });
        console.log("constructor of UpdateItemPage")
  }

  ngOnInit() {
  		console.log("onInit")
  		this.route.params.subscribe(
      param => {
        this.current_item = param;
        console.log(this.current_item);
        
        this.edit_item_form.patchValue({name:this.current_item.name});
        this.edit_item_form.patchValue({price:this.current_item.price});
        this.edit_item_form.patchValue({description:this.current_item.description});
        this.edit_item_form.patchValue({img:this.current_item.img});
        this.edit_item_form.patchValue({type:this.current_item.type});
        this.edit_item_form.patchValue({quantity:this.current_item.quantity});
        
      }
    )
  }

  updateItem(value){
  	console.log(value.name);
  	console.log(value.description);

  	//update the item in the items of th Service Object
  	//need to import the ItemService and create it in constructor
  	let newValues = {
      id: this.current_item.id,
      name: value.name,
      description: value.description
    }
    this.itemService.updateItem(newValues);


    this.goBack();
  }
  addOrder(value){
  	// console.log(value.itemName);
  	// console.log(value.totalPrice);
  	// console.log(value.totalItems);
  	// //save the item, and then go back
    //? 
    var itemName= this.current_item.name;
    var numItems= this.current_item.quantity;
    var totalPrice = this.current_item.price * value.quantity;
    var current_date = new Date();
    this.itemService.addOrder(value.quantity, totalPrice, itemName, current_date);

  	this.router.navigate(['/tabs/tab2']);
  }

  goBack(){
    this.router.navigate(['']);
  }

}
