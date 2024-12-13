import { Component ,ElementRef} from '@angular/core';
import {Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {



  timeLeft: number = 60; // 60 seconds

 

  startTimer() {
    const timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);
  }


  constructor(private router:Router,
    private elRef: ElementRef,
    public productService:ProductService
  ){

  }
  products:any;
  firstTenProduct=Array(10);
 
  ngOnInit(){
    this.productService.getAllProducts()
      .subscribe(
        res=>{
          this.products=res
          console.log(this.products)
          console.log(this.firstTenProduct)
        }
      )
  }
  navigateTo(destination:String){
    this.router.navigateByUrl("/"+destination);
    console.log(this.router);
   
  }

  showDropdown(){
    var list=document.getElementsByClassName("cate");
    for (let index = 0; index < list.length; index++) {
      list[index].addEventListener('click',()=>{
        console.log(list[index].nextElementSibling);
        list[index].nextElementSibling?.classList.add('show')
      })      
    }
  }
  

  ngAfterViewInit() {
    $(this.elRef.nativeElement).find('.product-slider').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 2,
      dots:true,
      autoplay: true,
      autoplaySpeed: 2000,
    });
    $(this.elRef.nativeElement).find('.hot-product-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots:true
    });

  }



}
