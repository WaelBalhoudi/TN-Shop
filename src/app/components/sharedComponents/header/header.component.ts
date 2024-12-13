declare var google:any

import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, ViewChild,NgZone, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cart } from 'src/app/models/cart';
import { User } from 'src/app/models/user';
import { ProductService } from 'src/app/services/product/product.service';
import { SharedService } from 'src/app/services/shared service/shared.service';
import { UserService } from 'src/app/services/user service/user.service';
import Swal from 'sweetalert2';
import * as emailjs from 'emailjs-com';
import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
emailjs.init("MefakeGSRdP9SpdeF");


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('myAnimation', [
      // Define your animation here
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter, :leave', animate('0.5s ease-in-out'))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  constructor(private userService:UserService,
    private spinner: NgxSpinnerService,
    private router:Router,
    public sharedService:SharedService,
    public productService:ProductService,
    private authService: SocialAuthService,
    private ngZone: NgZone
  ){
  }
  
  passwordPattern = '[0-9]'
  symbolPattern = '[!@#$%^&*_]';
  uppercasePattern = '[A-Z]'; 
  lowercasePattern='[a-z]'
  user=new User();
  searchUser=new User();
  cart=new Array();
  users:any;
  userId:any;
  loggedIn:any;
  user2:any;
  searchUserId="";
  productQuantityInCart=0;
  otpValue:any;
  timeLeft: number = 60;
  like=true;
  show=false;
  showPnelOPTCode=false;
  showPanelChangePassword=false;
  showVerifictionCodeInSingUp=false;
  emailSended=true;
  auth2: any;

  
  ngOnInit(){
   

    this.productService.catigorieSearch="All Catigories"
    this.userId=localStorage.getItem("userId");
    if(this.userId){
      this.userService.getUserById(this.userId)
        .subscribe(
          res=>{
            this.user=res;
            this.productQuantityInCart=this.productService.getProductQuantityInCart(this.user.cart);
            this.cart=this.getTheFirstFiveItemOfCart(this.user.cart);
            console.log(this.cart)
            
          }
        )
    }
    this.sharedService.cartUpdate$.subscribe(() => {
      this.userService.getUserById(this.userId)
      .subscribe(
        res=>{        
          this.user=res;
          this.productQuantityInCart=this.productService.getProductQuantityInCart(this.user.cart);
          this.cart=this.getTheFirstFiveItemOfCart(this.user.cart);
          console.log(this.cart)
        }
      )
      
    });

    this.authService.authState.subscribe((user2) => {
      this.user2 = user2;
      console.log(user2)
      this.loggedIn = (user2 != null);
    });

    
  }
  showCartPorduct(){
    console.log(this.cart)
  }
  signUp(f:NgForm){
    this.user=f.value;
    this.user.cart=[];
    this.user.messages=[];
    console.log(this.user);
    this.user.role="user"
    this.sendEmail(this.user)
    setTimeout(() => {            
      this.spinner.hide();
      console.log(this.emailSended)
      if (this.emailSended) {
        console.log("test ss")
        this.showVerifictionCodeInSingUp=true
      }else{
      let myModal = document.getElementById("signUpModal");
      this.closeModal(myModal)
      }

    }, 3000);
   
  }



  logIn(f:NgForm){
    this.spinner.show();
    this.userService.login(f.value['login'],f.value['pass'])
    .subscribe(
      res=>{
        if(res.length){
          
          localStorage.setItem("userId",res[0].id);

          this.user=res[0];
          this.ngOnInit();
          setTimeout(() => {            
            this.spinner.hide();
          }, 3000);
          setTimeout(()=>{
            if(this.userId=="21c5"){
              this.router.navigateByUrl("/Admin Dashboard")
              setTimeout(()=>{
                location.reload();
              },)
             

            }
            if (this.userId!="21c5") {
        
              Swal.fire({
                title: "Log In Successfully !",
                text:"welcome to your account "+res[0].fullName,
                icon: "success"
              });
              }
          },3000)
          
        }
        else{
          setTimeout(() => {            
            this.spinner.hide();
          }, 3000);
          setTimeout(()=>{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "password or email invalide!",
            });
          },3000)
        }
      },
      

    )
    
    
  }
  logOut(){
    localStorage.setItem("userId","");
    this.ngOnInit();
  }
  deleteProductFromCart(productId:string,userAccount:User){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProductFromCart(productId,userAccount);
        this.productQuantityInCart=this.productService.getProductQuantityInCart(this.user.cart);
    
        this.cart=this.getTheFirstFiveItemOfCart(this.user.cart);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  

  }
  
  getTheFirstFiveItemOfCart(cart:any){
    let c=new Array();
    if(cart.length>5){
      for (let index = 0; index <5; index++) {
        c.push(cart[index]);
        
      }
    }
    else{
      for (let index = 0; index <cart.length; index++) {
        c.push(cart[index]);
        
      }
    }
    return c;
  }

 increasePoructQuantity(product:Cart){
  product.quantity++;
  product.totalPrix=product.prix*product.quantity;
  this.userService.updateUserAccount(this.user);

  this.ngOnInit();
 }
 decreasesPoructQuantity(product:Cart){
  if (product.quantity>0) {
    product.quantity--;
    product.totalPrix=product.prix*product.quantity;
    this.userService.updateUserAccount(this.user);
  
    this.ngOnInit();
  }
  
 }
 writeQuantity(product:Cart,quantity:String){
  if (product.quantity>0) {
    product.quantity=+quantity
    product.totalPrix=product.prix*product.quantity;
    this.userService.updateUserAccount(this.user);
    this.ngOnInit();
  }
  
 }
 findUserByEmail(f:NgForm){
  this.spinner.show();
  this.userService.findUsersByEmail(f.value['e'])
  .subscribe(res=>{
   if(res.length>0){
    this.searchUser=res[0]
    this.sendEmail(this.searchUser)
   }
   else {

    setTimeout(() => {            
      this.spinner.hide();
       let myModal = document.getElementById("forgotPasswordModal");

      this.closeModal(myModal);
    }, 3000);
    setTimeout(()=>{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You don't have an account please sign Up!",
      });
    },3000)
  }
    
   
  },
  err=>{
    setTimeout(() => {            
      this.spinner.hide();
    }, 3000);
    }
  )
 }

 closeModal(myModal:any) {
  // let myModal = document.getElementById("forgotPasswordModal");
  if (myModal) {
    // Close the modal by removing the 'show' class
   
    myModal.style.display="none"
    let modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
    myModal.removeAttribute('role');
    document.body.style.overflow ="";
    document.body.style.paddingRight ="";
  }
}
showModal(){
  let myModal = document.getElementById("forgotPasswordModal");
  if (myModal) {
    myModal.classList.add("show");

  }  
}

sendEmail(user: User) {
  this.emailSended=true
  this.spinner.show();

  this.otpValue = Math.floor(Math.random() * 10000);
  emailjs.send("service_yfl12xs", "template_d1p5hdu", {
    from_name: "TN Shop Team",
       to_name: user.fullName,
      OTP: this.otpValue,
      message: "Use the code to verify your account",
      reply_to: user.email,
    }).then((response) => {
      console.log('Email sent:', response);
      setTimeout(() => {            
        this.spinner.hide();
         this.showPnelOPTCode=true
         this.startTimer();
      }, 3000);

      if (response.status !== 200) {
        throw new Error('Email sending failed');
      }
    }).catch((error) => {
      this.emailSended=false;
      console.error('Email sending error:', error);
      let myModal = document.getElementById("forgotPasswordModal");
               
      setTimeout(() => {            
        this.spinner.hide();
        this.closeModal(myModal);
      }, 3000);
    
     
      setTimeout(() => {
        console.log("3")

       
        console.log("testqqdf")
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while sending the email!",
        });
      }, 3000);
     
      throw new Error('Email sending failed');
     
    });
    console.log(this.otpValue);
  
}
moveToNextInput(currentInput:any) {
  // Get the index of the current input field
  var currentIndex = Array.prototype.indexOf.call(document.querySelectorAll('input'), currentInput);
  
  // Move focus to the next input field if not at the last input
  if (currentIndex < document.querySelectorAll('input').length - 1) {
      document.querySelectorAll('input')[currentIndex + 1].focus();
  }
}
verifyCodeAndSignUP(f:NgForm,user:any){
  this.spinner.show();
  let otpCode=Number.parseInt(f.value['n1']+f.value['n2']+f.value['n3']+f.value['n4']);
  setTimeout(() => {            
    this.spinner.hide();
  }, 3000);
  let myModal = document.getElementById("signUpModal");
    this.closeModal(myModal)
    if(otpCode==this.otpValue)  {
      this.userService.addUser(this.user)
      .subscribe(
        res=>{
          let ues:any;
          ues=res;
          localStorage.setItem("userId",ues.id);
          this.ngOnInit();
          setTimeout(()=>{
            
            Swal.fire({
              title: "Good job!",
              text: "Wellcom to TN Shop!",
              icon: "success"
            });

          },3000)
          
        },
        err=>{
          setTimeout(()=>{
            
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "samthing is wrong!",
            });

          },3000)
         
        }
       
      )
    }else{
      setTimeout(()=>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The OTP code is incorrect !!",
        });
      },3000)
      
    }  
}
verifyOtpCode(f:NgForm){
  this.spinner.show();
  let otpCode=Number.parseInt(f.value['n1']+f.value['n2']+f.value['n3']+f.value['n4']);
  setTimeout(() => {            
    this.spinner.hide();
  }, 3000);
  setTimeout(() => {    
    if(otpCode==this.otpValue){
      this.showPanelChangePassword=true;
      this.showPnelOPTCode=false
  
    }else{
      let myModal = document.getElementById("forgotPasswordModal");

      this.closeModal(myModal);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The OTP code is incorrect",
      });
    }
  }, 3000);
  
  

}
updatePassword(f:NgForm){

this.searchUser.password=f.value["password"];
this
this.userService.updateById(this.searchUser.id,this.searchUser)
  .subscribe(
    res=>{
      Swal.fire({
        title: "Update Successfully !",
        icon: "success"
      });
    },
    err=>{
    
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "samthing is wrong!",
      });
    }
  )
}
startTimer() {
  const timerInterval = setInterval(() => {
    if (this.timeLeft > 0) {
      this.timeLeft--;
    } else {
      this.otpValue=null
      clearInterval(timerInterval);
    }
  }, 1000);
}

signOut(): void {
  this.authService.signOut();
}

onSignIn(googleUser: any) {
  // Handle sign-in success here
  console.log('Google user signed in:', googleUser);
}

}
