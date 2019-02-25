import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ItemService } from '../item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  add_item_form: FormGroup;
  constructor(
    private router: Router,
 	 public formBuilder: FormBuilder,
 	     public itemService: ItemService
  ) { }

  ngOnInit() {
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
    this.itemService.createItem(value.name,value.price, value.type, value.img, value.description, 1);

  	this.goBack();
  }

  goBack(){
  	    this.router.navigate(['']);
  }

}
