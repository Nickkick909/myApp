import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  //define some data containers such as arrays to store items
  items:Array<any>=[{"id":1,"name":"icecream","price": 5.00, "type":"desert",'img':"test", "description":"yummy cream from ice"}];
  orders:Array<any>=[{"id":1, "totalItems":2, "totalPrice":28.15, "itemName": "icecream", "date": 2-9-2019}];
  constructor(private storage: Storage) { 
     console.log("loading saved items");
     
    let loadeditems= JSON.parse(localStorage.getItem("items"));
    let loadedorders= JSON.parse(localStorage.getItem("orders"));
    if(loadeditems != null){
      this.items = loadeditems;
    }
    else{
      this.items =[];
    }
    if(loadedorders != null){
      this.orders = loadedorders; 
    }
    else{
      this.orders =[];
    }

  }

  //provide functions to get items, and save items

  getItems(){
  	return this.items;
  }
  getOrders(){
  	return this.orders;
  }

  createItem(name,price, type, img, description, quantity){
  	  let randomId = Math.random().toString(36).substr(2, 5);
    this.items.push({
      'id': randomId,
      'name': name,
      'price': price,
      'type' : type,
      'img': img,
      'description': description,
      'qualtity' : quantity
    });

    console.log("now saving all items:");
    let usersStringifiedObj = JSON.stringify(this.items);
    localStorage.setItem("items", usersStringifiedObj);

    // let loadeditems= JSON.parse(localStorage.getItem("items"));
    // console.log("saved no. of items"+loadeditems.length.toString())
  }

  updateItem(newValues){
    let itemIndex = this.items.findIndex(item => item.id == newValues.id);
    
    if(newValues.img == undefined){
    	newValues.img = this.items[itemIndex].img
    }

    this.items[itemIndex] = newValues;
    console.log(newValues.img);

    console.log("now saving all items:");
    let usersStringifiedObj = JSON.stringify(this.items);
    localStorage.setItem("items", usersStringifiedObj);
  }

  addOrder(totalItems, totalPrice, itemName, date){
    let randomId = Math.random().toString(36).substr(2, 5);
    this.orders.push({
      'id': randomId,
      'totalItems': totalItems,
      'totalPrice': totalPrice,
      'itemName': itemName,
      'date': date  
    });

  console.log("now saving all items:");
  let usersStringifiedObj = JSON.stringify(this.orders);
  localStorage.setItem("orders", usersStringifiedObj);

  // let loadeditems= JSON.parse(localStorage.getItem("items"));
  // console.log("saved no. of items"+loadeditems.length.toString())
}
}

