import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pump } from '../models/pump';
import { Site } from '../models/site';
import {Sensor} from "../models/sensor";

@Injectable({
  providedIn: 'root'
})
export class PumpService {

  HTTPOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    }),
  };

  url: string = "https://hooyberghs-api.azurewebsites.net/api/sensorlog/"

  constructor(private httpClient: HttpClient) {
  }
  getPumps(): Observable<Pump[]> {
    return this.httpClient.get<Pump[]>(this.url);
  }

  getPumpById(id: number): Observable<Pump> {
    return this.httpClient.get<Pump>(`${this.url}${id}`);
  }

  createPump(pump: Pump): Observable<Pump> {
    return this.httpClient.post<Pump>(`${this.url}`, JSON.stringify(pump), this.HTTPOptions);
  }

  updatePump(id: number, pump: Pump): Observable<Pump> {
    return this.httpClient.put<Pump>(`${this.url}${id}`, JSON.stringify(pump), this.HTTPOptions);
  }

  deletePump(id: number): Observable<Pump> {
    return this.httpClient.delete<Pump>(`${this.url}${id}`);
  }
}
