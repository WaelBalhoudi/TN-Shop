import { Component } from '@angular/core';
import { SharedService } from '../../services/shared service/shared.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {
  constructor(public sharedService:SharedService){
    
  }
}
