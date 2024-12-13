import { Component } from '@angular/core';
import { SharedService } from './services/shared service/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TN Shop';
  constructor(public sharedService:SharedService){
    
  }
}