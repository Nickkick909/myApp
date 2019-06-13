  import { Component, OnInit } from '@angular/core';
  import { Validators, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
  import { Router } from '@angular/router';
  import { ItemService } from '../item.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
    settings_form: FormGroup;
  
    constructor(
      private router: Router,
      public formBuilder: FormBuilder,
      public itemService: ItemService
  
  ) { }
  
    ngOnInit() {
  
      this.settings_form = this.formBuilder.group({
        storeName: new FormControl('', Validators.required),
        logo: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required)
      });
  
    }
  
    editSettings(value){
      //save the item, and then go back
      this.itemService.editSettings(value.storeName, value.logo, value.phone, value.address);
  
      this.goBack();
    }
  
    goBack(){
          this.router.navigate(['/tabs/tabs/tab1']);
    }
  
  }


