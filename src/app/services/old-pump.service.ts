import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pump} from "../models/pump";
import {OldPump} from "../models/oldPump";

@Injectable({
  providedIn: 'root'
})
export class OldPumpService {

  HTTPOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    }),
  };

  url: string = "https://hooyberghs-api.azurewebsites.net/api/oldpump/"

  constructor(private httpClient: HttpClient) {
  }

  getOldPumps(): Observable<OldPump[]> {
    return this.httpClient.get<Pump[]>(this.url);
  }

  getOldPumpById(id: number): Observable<OldPump> {
    return this.httpClient.get<Pump>(`${this.url}${id}`);
  }

  createOldPump(oldPump: OldPump): Observable<OldPump> {
    return this.httpClient.post<Pump>(`${this.url}`, JSON.stringify(oldPump), this.HTTPOptions);
  }

  updateOldPump(id: number, oldPump: OldPump): Observable<OldPump> {
    return this.httpClient.put<OldPump>(`${this.url}${id}`, JSON.stringify(oldPump), this.HTTPOptions);
  }

  deleteOldPump(id: number): Observable<OldPump> {
    return this.httpClient.delete<OldPump>(`${this.url}${id}`);
  }
}
