import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-order-detail-page',
  templateUrl: './order-detail-page.page.html',
  styleUrls: ['./order-detail-page.page.scss'],
})
export class OrderDetailPagePage implements OnInit {
  current_order:any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    public itemService: ItemService) {}

  ngOnInit() {
     //current item information
     this.route.params.subscribe(
      param => {
        this.current_order = param;
        console.log('Selected item detail: ' + this.current_order.item_name);
      }
    )
  }
  goBack(){
    this.router.navigate(['/tabs/tabs/tab2']);
  }

}
