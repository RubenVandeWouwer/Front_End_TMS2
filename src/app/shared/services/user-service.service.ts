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

  updateUser(id: number, user: UserData): Observable<UserData> {
    return this.httpClient.put<UserData>(`${this.url}${id}`, JSON.stringify(user), this.HTTPOptions);
  }

  createUser(user: UserData): Observable<UserData> {
    return this.httpClient.post<UserData>(`${this.url}`, JSON.stringify(user), this.HTTPOptions);
  }

    deleteUser(id: number): Observable<UserData> {
    return this.httpClient.delete<UserData>(`${this.url}${id}`);
  }

  // getPumpById(id: number): Observable<Pump> {
  //   return this.httpClient.get<Pump>(`${this.url}${id}`);
  // }
  //
  // deletePump(id: number): Observable<Pump> {
  //   return this.httpClient.delete<Pump>(`${this.url}${id}`);
  // }
}
