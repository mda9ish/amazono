import { Injectable } from '@angular/core';
import {NavigationStart,Router} from '@angular/router';
import { RestApiService } from './rest-api.service';


@Injectable()
export class DataService {
message='';
messageType='danger';
cartItem=0;

user:any;

  constructor(private router:Router, private rest: RestApiService) {
  	this.router.events.subscribe(event=>{
  		if(event instanceof NavigationStart){
  			this.message='';
  		}
  	});

   }
   error(message){
   	this.messageType='danger';
   	this.message=message;
   }
  success(message){
   	this.messageType='success';
   	this.message=message;
   }
   warning(message){
   	this.messageType='warning';
   	this.message=message;
   }

   async getProfile(){
    try{
      if(localStorage.getItem('token')){
        const data = await this.rest.get(
          'http://localhost:3030/api/accounts/profile',
          );
        this.user= data['user'];

      }
    }catch(e){
      this.error(e);
    }
   }
    getCart(){
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    }

    addToCart(item:string){
      const cart:any = this.getCart();
      if(cart.find(data => JSON.stringify(data)=== JSON.stringify(item))){
        return false;
      }else{
        cart.push(item);
        this.cartItem++;
        localStorage.setItem('cart', JSON.stringify(cart));
        return true;
      }
    }

    clearCart(){
      this.cartItem = 0;
      localStorage.setItem('cart', '[]');
    }

    removeFromCart(item:string){
      let cart : any = this.getCart();
      if(cart.find(data => JSON.stringify(data)===JSON.stringify(item))){
        cart = cart.filter(data=> JSON.stringify(data) !== JSON.stringify(item));
        this.cartItem--;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }

}
