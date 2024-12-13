import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient ) {}
  
  
  private cartUpdateSubject = new Subject<void>();

  cartUpdate$ = this.cartUpdateSubject.asObservable();

  updateCart() {
    this.cartUpdateSubject.next();
  }
  url="http://localhost:3000/";
 userId=localStorage.getItem("userId");
 adminId="21c5"
 numberOfProductInCart=0;

  porductsList=[
    {title:"Lightining to USB",price:45,category:"accessories",image:"./../../assets/images/img4.jpg",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem corporis eius cumque quod necessitatibus totam aperiam velit quam nobis laboriosam dolores unde sequi tempora, impedit consectetur fuga, vitae explicabo recusandae"},
    {title:"smart Tv",price:170,category:"Electromgnetic",image:"./../../assets/images/img1.png",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem corporis eius cumque quod necessitatibus totam aperiam velit quam nobis laboriosam dolores unde sequi tempora, impedit consectetur fuga, vitae explicabo recusandae"},
    {title:"smart Tv",price:174,category:"Electromgnetic",image:"./../../assets/images/img2.webp",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem corporis eius cumque quod necessitatibus totam aperiam velit quam nobis laboriosam dolores unde sequi tempora, impedit consectetur fuga, vitae explicabo recusandae"},
    {title:"PC Asus",price:174,category:"informatique",image:"./../../assets/images/10.jpg",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem corporis eius cumque quod necessitatibus totam aperiam velit quam nobis laboriosam dolores unde sequi tempora, impedit consectetur fuga, vitae explicabo recusandae"},
    {title:"PC Asus",price:174,category:"informatique",image:"./../../assets/images/9.jpg",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem corporis eius cumque quod necessitatibus totam aperiam velit quam nobis laboriosam dolores unde sequi tempora, impedit consectetur fuga, vitae explicabo recusandae"},
    {title:"smartphone",price:174,category:"phones",image:"./../../assets/images/img13.webp",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem corporis eius cumque quod necessitatibus totam aperiam velit quam nobis laboriosam dolores unde sequi tempora, impedit consectetur fuga, vitae explicabo recusandae"},
    {title:"smartphone",price:174,category:"phones",image:"./../../assets/images/img14.webp",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem corporis eius cumque quod necessitatibus totam aperiam velit quam nobis laboriosam dolores unde sequi tempora, impedit consectetur fuga, vitae explicabo recusandae"},
    {title:"smartphone",price:174,category:"phones",image:"./../../assets/images/img12.webp",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem corporis eius cumque quod necessitatibus totam aperiam velit quam nobis laboriosam dolores unde sequi tempora, impedit consectetur fuga, vitae explicabo recusandae"},
    {title:"T shirt",price:174,category:"Clotges",image:"./../../assets/images/7.jpg",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem corporis eius cumque quod necessitatibus totam aperiam velit quam nobis laboriosam dolores unde sequi tempora, impedit consectetur fuga, vitae explicabo recusandae"},
    {title:"T shirt",price:174,category:"Clotges",image:"./../../assets/images/8.jpg",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem corporis eius cumque quod necessitatibus totam aperiam velit quam nobis laboriosam dolores unde sequi tempora, impedit consectetur fuga, vitae explicabo recusandae"},
  ]
  
  getCurrentDate(): string {
    const today = new Date();
  
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

}
