import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor(private userService:UserService){

  }


  users:any;
  ngOnInit(){
    this.userService.getALLUsers()
      .subscribe(
        res=>{
          this.users=res;
          console.log(this.users)
        }

      )
  }
}
