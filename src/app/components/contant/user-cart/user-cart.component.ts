import { Component } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { User } from 'src/app/models/user';
import { ProductService } from 'src/app/services/product/product.service';
import { SharedService } from 'src/app/services/shared service/shared.service';
import { UserService } from 'src/app/services/user service/user.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent {
  constructor(public productService:ProductService,private userService:UserService,private shared:SharedService){

  }
  user=new User();
  users:any;
  userId:any;
  productQuantityInCart=0;
  cart=new Array();
  ngOnInit(){
    this.userId=localStorage.getItem("userId");
    if(this.userId){
      this.userService.getUserById(this.userId)
        .subscribe(
          res=>{
            this.user=res;
            this.productQuantityInCart=this.productService.getProductQuantityInCart(this.user.cart);
            this.cart=this.getAllProductInCart()
            console.log(this.cart)
          }
        )
    }
  }
  getAllProductInCart(){
    let cart=new Array();
    for (let index = 0; index < this.user.cart.length; index++) {
      cart.push(this.user.cart[index])      
    }
    
    return cart;
  }

  deleteProductFromCart(productId:string,userAccount:User){
    this.productService.deleteProductFromCart(productId,userAccount);
    this.productQuantityInCart=this.productService.getProductQuantityInCart(this.user.cart);
    this.shared.updateCart();
    this.cart=this.getAllProductInCart();
  this.ngOnInit();


  }
 increasePoructQuantity(product:Cart){
  product.quantity++;
  product.totalPrix=product.prix*product.quantity;
  this.userService.updateUserAccount(this.user);
  this.shared.updateCart();
  this.ngOnInit();
 }
 decreasesPoructQuantity(product:Cart){
  if (product.quantity>0) {
    product.quantity--;
    product.totalPrix=product.prix*product.quantity;
    this.userService.updateUserAccount(this.user);
    this.shared.updateCart();
  
    this.ngOnInit();
  }
  
 }
 writeQuantity(product:Cart,quantity:String){
  if (product.quantity>0) {
    product.quantity=+quantity
    product.totalPrix=product.prix*product.quantity;
    this.userService.updateUserAccount(this.user);
    this.shared.updateCart();
    this.ngOnInit();
  }
  
 }
}
