import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared service/shared.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent {
  constructor(public sharedService:SharedService){}
  ngOnInit(){
    Swal.fire({
      title: "Hello Wael !",
      text: "Welcome to your website!",
      icon: "success"
    });
  }
}
