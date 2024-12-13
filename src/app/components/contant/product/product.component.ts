import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService } from '../../../services/shared service/shared.service';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [
    trigger('myAnimation', [
      // Define your animation here
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter, :leave', animate('0.5s ease-in-out'))
    ])
  ]
})
export class ProductComponent {
  constructor(public shared:SharedService,
    public productService:ProductService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
  ){

  }
  files: File[] = [];
  fileNames:any
  products:any;
  product=new Product();
  timeLeft: number = 60; // 60 seconds
  searchCatigorie="";
  searchVaule="";

 

  
  ngOnInit(){

  
    console.log('search :',this.productService.catigorieSearch,this.productService.search)
    this.searchCatigorie=this.productService.catigorieSearch;
    this.searchVaule=this.productService.search;

    this.productService.getAllProducts()
      .subscribe(
        res=>{
          this.products=res
          console.log(res)
        }
      )
      this.filterProductByTitle();
    
  }
  onFileChange(event: any) {
    this.files = Array.from(event.target.files);
  }
  uploadFiles() {
    
    return this.files.map(file => file.name);
    
  }
  addProduct(f:NgForm){
    
    let product =new Product;
    product.title=f.value["title"];
    product.category=f.value["category"];
    product.description=f.value["description"];
    product.price=f.value["price"];
    product.quantity=f.value["quantity"];
    product.likes=[];
    product.sales=[];
    product.images=this.uploadFiles();
    for (let i = 0; i < product.images.length; i++) {
      product.images[i]=`./../../../../assets/${product.images[i]} `
    }
    this.spinner.show();
    this.productService.addProduct(product)
      .subscribe(
        
        res=>{
          setTimeout(() => {            
            this.spinner.hide();
          }, 3000);
          setTimeout(()=>{
            alert("Products add successfully.");

          },3300)
          this.ngOnInit();
          f.value["title"]="";
          f.value["category"]="";
          f.value["description"]="";
          f.value["price"];
          f.value["quantity"]="";
          
        }
      )

  }
  deletePoduct(id:string){
    this.productService.deleteProduct(id)
      .subscribe(
        res=>{
          this.ngOnInit();
        }
      )
  }
  getProductById(id:any){
    this.productService.getProductById(id)
      .subscribe(
        res=>{
          console.log(res);
          this.product=res;
        }
      )
  }
  updatePoducts(id:any,product:any){
    this.spinner.show();

    this.productService.updateProduct(id,product)
      .subscribe(
        res=>{
          setTimeout(() => {   
            this.ngOnInit()         
            this.spinner.hide();
          }, 3000);
          setTimeout(()=>{
            alert("Products update successfully.");

          },3300)
        }
      )
  }
  addActiveToFilterItme(index:number){
    let fliterTtem=document.querySelectorAll(".fliter-item");
    fliterTtem.forEach(
      (item)=>{
        console.log(item)
        item.classList.remove("active");
      }
      
    )
    fliterTtem[index].classList.add("active");


   
  }
  filterProductByTitle() {
    this.products = this.products.filter((product:Product) =>
      product.title.toLowerCase().includes(this.productService.search.toLowerCase())
    );
    console.log("Filtered products:", this.products);
  }

  getProductByCategory(category:string){
    this.productService.getProductByCategory(category)
      .subscribe(
        res=>{
          this.products=res;
        }
      )
  }
}