import { Component, OnInit } from '@angular/core';

  import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
  import { Router,ActivatedRoute } from '@angular/router';
  
  import { ItemService } from '../item.service';
@Component({
  selector: 'app-order-detail-page',
  templateUrl: './order-detail-page.page.html',
  styleUrls: ['./order-detail-page.page.scss'],
})

  export class OrderDetailPagePage implements OnInit {
  
    current_order:any;
    view_order_form:FormGroup;
    constructor(
      public formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private itemService: ItemService,
      private router:Router
      ) { 

          // value.totalItems, value.totalPrice, value.itemName, value.date
          this.view_order_form = this.formBuilder.group({
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
          this.current_order = param;
          console.log(this.current_order);
          
          this.view_order_form.patchValue({itemName:this.current_order.itemName});
          this.view_order_form.patchValue({totalPrice:this.current_order.totalPrice});
          this.view_order_form.patchValue({totalItems:this.current_order.totalItems});
          this.view_order_form.patchValue({date:this.current_order.date});
          
        }
      )
    }
  
    updateItem(value){
      console.log(value.name);
      console.log(value.description);
  
      //update the item in the items of th Service Object
      //need to import the ItemService and create it in constructor
      let newValues = {
        id: this.current_order.id,
        name: value.name,
        description: value.description
      }
      this.itemService.updateItem(newValues);
  
  
      this.goBack();
    }
    viewOrder(value){
      console.log(value.itemName);
      console.log(value.totalPrice);
      console.log(value.totalItems);
      // //save the item, and then go back
      //? 
      var totalItems= 1;
      var itemName= this.current_order.name;
      var totalPrice = this.current_order.price * totalItems;
      var current_date = new Date();
    }
  
    goBack(){
      this.router.navigate(['']);
    }
  
  }
  
