import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http:HttpClient) { }
  url="http://localhost:3000/messages";
  

  addMessage(message:any){
    return this.http.post(this.url,message);
  }
  getAllMessages(){
    return this.http.get(this.url);
  }
  getMessageById(id:string):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }
  deleteMessage(id:string):Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
  updateMessage(id:string,updatedMessage:any):Observable<any>{
    return this.http.put(`${this.url}/${id}`,updatedMessage);
  }
}
