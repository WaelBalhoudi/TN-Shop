import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { SharedService } from 'src/app/services/shared service/shared.service';
import Swal from 'sweetalert2'
import { UserService } from 'src/app/services/user service/user.service';
import { Cart } from 'src/app/models/cart';

declare var $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements AfterViewInit {

  constructor(private route:ActivatedRoute,
    public productService:ProductService,
    private elRef: ElementRef,
    private sharedService:SharedService,
    private userService:UserService
  ){}

  product:any;
  id:any;
  productAddedItToCart=false;
  userId=localStorage.getItem("userId");
  user:any;

  ngOnInit(){
     this.id=this.route.snapshot.paramMap.get("id")
     console.log(this.id)
      this.productService.getProductById(this.id)
      .subscribe(
        res=>{
          this.product=res;
          console.log(this.product)
        }
      );
      this.userService.getUserById(this.userId)
      .subscribe(
        res=>{
          this.user=res;
        }
      )
  }

  ngAfterViewInit() {
    $(this.elRef.nativeElement).find('.slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows:false
    });
  }

  cartClick(){
    this.userId=localStorage.getItem("userId");

    if (this.userId) {
      document.querySelector(".cart-button")?.classList.add("clicked");
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to Log In",
      });
    }
   
  }

  addToCart() {
    this.userId=localStorage.getItem("userId");
  
    
    if (this.userId) {
      let cartItem=new Cart();
      let cartProductIndex=this.user.cart.findIndex((obj: Cart) => obj.productId === this.id)
      if (cartProductIndex==-1) {
        cartItem.productId=this.id;
        cartItem.productTitle=this.product.title;
        cartItem.image=this.product.images[0];
        cartItem.prix=this.product.price;
        cartItem.quantity=1;
        cartItem.totalPrix=this.product.price;
        this.user.cart.push(cartItem);

      }
      else{
        this.user.cart[cartProductIndex].quantity++;
        this.user.cart[cartProductIndex].totalPrix *=this.user.cart[cartProductIndex].quantity;

        console.log(this.user.cart[cartProductIndex])
      }
      this.userService.updateById(this.user.id,this.user)
      .subscribe(
        res=>{
          this.sharedService.updateCart();
          this.productAddedItToCart=true
        }
      )
     
      
    }
  }
}
