import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
declare var FB: any;
@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http:HttpClient) { 
  this.initializeFacebookSDK();
}
  url="http://localhost:3000/users";
  addUser(user:User){
    return this.http.post(this.url,user);
  }
  getALLUsers(){
    return this.http.get(this.url);
  }
  getUserById(id:any):Observable<any>{
    return this.http.get<any>(`${this.url}/${id}`);
  }
  login(email: string, password: string): Observable<any> {
    return this.http.get(this.url+"?email="+email+"&password="+password);
  }
  findUsersByEmail(email:string):Observable<any>{
    return this.http.get(this.url+"?email="+email);
  }
  deleteUser(id:string):Observable<any>{
    return this.http.delete(this.url+"/"+id);
  }
  updateById(id: any, updatedProduct: any): Observable<any> {
    return this.http.put(this.url+"/"+id, updatedProduct);
  }
  updateUser(id:string,updatedUser:any):Observable<any>{
    return this.http.put(this.url+"/"+id,updatedUser);
  }
  updateUserAccount(user:any){
    this.updateUser(user.id,user)
      .subscribe(
        res=>{
        }
      )
  }

  private initializeFacebookSDK() {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId: '7672991056129146',
        cookie: true,
        xfbml: true,
        version: 'v12.0'
      });
    };

    const d = document;
    const s = 'script';
    const id = 'facebook-jssdk';
    const js: HTMLScriptElement = d.createElement(s) as HTMLScriptElement;
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    const fjs = d.getElementsByTagName(s)[0];
    if (fjs) {
      fjs.parentNode && fjs.parentNode.insertBefore(js, fjs);
    }
  }

 

  loginWithFacebook(): void {
    FB.login((response: any) => {
      if (response.authResponse) {
        // User logged in successfully, now fetch user information
        FB.api('/me', { fields: 'name,email' }, (apiResponse: any) => {
          console.log(apiResponse);
          // You can access user's name and email from apiResponse
          const name = apiResponse.name;
          const email = apiResponse.email;
          // Now you can use the name and email as needed
        });
      } else {
        console.error('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'email' });
  }
  /*
  searchProduct(query: string) {
    return this.http.get<product[]>(http://localhost:3000/products?Category=${query});

  }


 <div class="navbar align-self-center d-flex">
                  <div class="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                      <div class="input-group">

                          <input type="text" class="form-control" id="inputMobileSearch" placeholder="Search ...">
                          <div class="input-group-text">
                              <i class="fa fa-fw fa-search"></i>
                          </div>
                      </div>
                  </div>



                  <div *ngIf="menuType!=='seller'" class="nav-search">
                    <input type="text"
                    #searchInput
                    (keyup)="searchProduct($event)" (blur)="hideSearch()" placeholder="Search Products" />

                  <a class="nav-icon d-none d-lg-inline"    #searchInput
                  (keyup)="searchProduct($event)" (blur)="hideSearch()"  data-bs-toggle="modal" data-bs-target="#templatemo_search">
                    <i class="fa fa-fw fa-search text-dark mr-2" (click)="submitSearch(searchInput.value)"></i>
                </a>

                    <ul class="suggested-search" *ngIf="searchResult">
                      <li *ngFor="let item of searchResult">
                        <a (mousedown)="redirectToDetails(item.id)" >{{item.name}}</a>
                      </li>
                    </ul>
                  </div>

  */
}
