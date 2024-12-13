import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MessagesService } from 'src/app/services/message/messages.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router:Router,private messageService:MessagesService){}
  nbMessages:any;
  messages:any
  ngOnInit(){
    this.messageService.getAllMessages()
      .subscribe(
        res=>{
          this.messages=res;
          console.log(this.messages.length)
        }
      )
  }
  activeLink(index:number){
    let list=document.querySelectorAll(".navigation-menu li");
    list.forEach(
      (item)=>{
        item.classList.remove("hovered")
      }
    )
    list[index].classList.add("hovered");
  }
  onpenDashBoard(){
    document.querySelector(".navigation-menu")?.classList.toggle("active");
    document.querySelector(".main")?.classList.toggle("active");
    let  btn = document.getElementById("bn");
    let  list = document.getElementById("list");
    let  con  = document.getElementById("con");
    btn?.classList.toggle("acitve");
    btn?.classList.toggle("openbtn");
    list?.classList.toggle("openlist");
    con?.classList.toggle("opencon");
    

  }
  logOut(){
    localStorage.setItem("userId","");
    location.reload();
    
  }
}

