import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Message } from 'src/app/models/message';
import { MessagesService } from 'src/app/services/message/messages.service';
import { SharedService } from 'src/app/services/shared service/shared.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [
    trigger('myAnimation', [
      // Define your animation here
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter, :leave', animate('0.5s ease-in-out'))
    ])
  ]
})
export class ContactComponent {
  constructor(public sharedService:SharedService,
    private messageService:MessagesService,
    private spinner: NgxSpinnerService
    ){
    
  }
  message=new Message();
  messages:any

  ngOnInit(){
    this.messageService.getAllMessages()
      .subscribe(
        res=>{
        this.messages=res;
        console.log(this.messages)

        }
      )

  }
  test(condition:any,errorMessage:string){
    if (condition) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    }
  }

  patternTest(condition:any,errorMessage:string){
    if (condition) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    }
  }
  sendMessage(f:NgForm){
    this.message=f.value;
    this.message.date=this.sharedService.getCurrentDate();
    this.spinner.show();
    this.messageService.addMessage(this.message)
      .subscribe(
        res=>{
      

          setTimeout(() => {            
            this.spinner.hide();
          }, 3000);
          setTimeout(()=>{
            
            Swal.fire({
              title: "your message send Successfully !",
              icon: "success"
            });

          },3300)
         
        },
        err=>{
          setTimeout(() => {            
            this.spinner.hide();
          }, 3000);
          setTimeout(()=>{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Samthign was wrong!",
            });
          },3300)
        }
      )
  }

}
