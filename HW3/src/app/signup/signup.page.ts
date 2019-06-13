import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router,ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user={
  email:"",
  password:""};

  constructor(private router:Router) { }

  ngOnInit() {
  }

		
  signup(){
  	console.log(this.user.email+"  "+this.user.password)
  	var email=this.user.email;
  	var password=this.user.password;
		var self=this;
		
		

  	firebase.auth().createUserWithEmailAndPassword(email, password).catch(
  		function(error) {
	  // Handle Errors here.
	  console.log(error);
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  console.log(error.message);
	  if(errorCode.length > 0){
	  	console.log("Failed");
	  }
	  else{
	  	console.log("signup ok")
		}
		var userid=firebase.auth().currentUser.uid;
		let usertype = firebase.database().ref('usertypes/').push();
		usertype.set({
			'uid' : userid,
			'type' : "owner"
	});

	  // ...
	}).then(function(user){
		  	console.log("finished creating account")
		  	// self.router.navigate(["/login"]);
		  	self.router.navigate(["/tabs/tabs/tab1"]);
	});

	
	}

	

}



