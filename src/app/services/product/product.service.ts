import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from '../user service/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient,private userService:UserService) { }
  url="http://localhost:3000/products";
  products:any;
  catigorieSearch="All Catigories";
  search="";

  addProduct(product:any){
     return this.http.post(this.url,product);
  }
  getAllProducts(){
    return this.http.get(this.url);
  }
  getProductById(id:string):Observable<any>{
    return this.http.get(this.url+"/"+id)
  }
  deleteProduct(id:string):Observable<any>{
    return this.http.delete(this.url+"/"+id);
  }
  updateProduct(id:string,updatedProduct:any):Observable<any>{
    return this.http.put(this.url+"/"+id,updatedProduct);
  }
  getNewPrice(price:string){
    return parseInt(price)+20;
  }
  getShortDescription(description:string){
    const words = description.split(' ');
     
    // Get the first six words
    const firstSixWords = words.slice(0, 7);

    // Join the words back into a string
    const result = firstSixWords.join(' ');

    return result;
  }
  // hatem55008610

  deleteProductFromCart(prodcutId:string,userAccount:User){
    userAccount.cart.splice(userAccount.cart.indexOf(prodcutId),1)
    this.userService.updateById(userAccount.id,userAccount)
    .subscribe(
      res=>{
        console.log(userAccount.cart)
        console.log(res)

      }
    )
    console.log(userAccount.cart)
  }
  getProductQuantityInCart(cart:any){
    let productQuantityInCart=0;
     for (let index = 0; index < cart.length; index++) {
       productQuantityInCart +=cart[index].quantity;
       
     }
     return productQuantityInCart;
   }
  getTotalPriceInCart(cart:any){
    let totalPrix=0;
     for (let index = 0; index < cart.length; index++) {
       totalPrix +=cart[index].totalPrix;
       
     }
     return totalPrix;
   }

   getProductByCategory(category:string):Observable<any>{
    return this.http.get(this.url+'?category='+category)
   }

   
}
