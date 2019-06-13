import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { ItemService } from '../item.service';


import * as firebase from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

new_item_form: FormGroup;
  imgfile="assets/icecream.jpg";
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public itemService: ItemService
 	     ) { 
  }
  ngOnInit() {
  	  	this.new_item_form = this.formBuilder.group({
      email: new FormControl('nrknight@email.sc.edu', Validators.required),
      password: new FormControl('testpass', Validators.required)
    });
  }
  signup(){
  	this.router.navigate(["signup"]);
  }
  login(item){
  	console.log(item.email+"   "+item.password)
  	var self=this;
	var email=item.email;
	var password=item.password;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode);
		if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else if (errorCode === 'auth/user-not-found'){
            alert("User does not exist");
          }
          console.log(error);
		}
	).then(function(result){
		  	// self.router.navigate(["/login"]);
				let userid= firebase.auth().currentUser.uid;
				let usertypesRef = firebase.database().ref('usertypes/');
				usertypesRef.orderByChild("uid").equalTo(userid).on("value",function(data) {
					data.forEach(function(data) {
						console.log("usertype: " +data.val().type)
					})
				});
		  self.router.navigate(["/tabs/tabs/tab1"]);
	});
  }
  loginFacebook(){
  	var self=this;
  		console.log("facebook login")
  		// Sign in using a popup.
		var provider = new firebase.auth.FacebookAuthProvider();
		provider.addScope('user_birthday');
		firebase.auth().signInWithPopup(provider).then(function(result) {
		  // This gives you a Facebook Access Token.
		  var token = result.credential.providerId;
		  console.log(token)
		  // The signed-in user info.
		  var user = result.user;
		  console.log(user);
		  self.router.navigate(["/tabs/tabs/tab1"]);
		});

  }

  loginGoogle(){
  		var self=this;
  		console.log("google login")
  		// Using a popup.
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('profile');
		provider.addScope('email');
		firebase.auth().signInWithPopup(provider).then(function(result) {
		 // This gives you a Google Access Token.
		 var token = result.credential.providerId;
		 // The signed-in user info.
		 var user = result.user;
		 console.log(user);
			//this.navCtrl.setRoot(TabsPage);
		 self.router.navigate(["/tabs/tabs/tab1"]);
		});
  }

}
