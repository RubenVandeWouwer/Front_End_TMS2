import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pump} from "../../models/pump";
import {UserData} from "../../models/user";
import firebase from "firebase/compat";
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  HTTPOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    }),
  };

  constructor(private httpClient: HttpClient) {
  }

  url: string = "https://hooyberghs-api.azurewebsites.net/api/user/"

  getUsers(): Observable<UserData[]> {
    return this.httpClient.get<UserData[]>(this.url);
  }

  getUserForGuard(email: string): Observable<UserData[]> {
    return this.httpClient.get<UserData[]>(`${this.url}${email}`);
  }

  getUserByEmail(email: string): Observable<UserData> {
    return this.httpClient.get<UserData>(`${this.url}${email}`);
  }


  // getPumpById(id: number): Observable<Pump> {
  //   return this.httpClient.get<Pump>(`${this.url}${id}`);
  // }
  //
  // createPump(pump: Pump): Observable<Pump> {
  //   return this.httpClient.post<Pump>(`${this.url}`, JSON.stringify(pump), this.HTTPOptions);
  // }
  //
  // updatePump(id: number, pump: Pump): Observable<Pump> {
  //   return this.httpClient.put<Pump>(`${this.url}${id}`, JSON.stringify(pump), this.HTTPOptions);
  // }
  //
  // deletePump(id: number): Observable<Pump> {
  //   return this.httpClient.delete<Pump>(`${this.url}${id}`);
  // }
}
