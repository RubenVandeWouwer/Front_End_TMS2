import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sensor} from "../models/sensor";

@Injectable({
  providedIn: 'root'
})
export class SensorService {


  HTTPOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    }),
  };

  url: string = "https://hooyberghs-api.azurewebsites.net/api/sensor/"

  constructor(private httpClient: HttpClient) {
  }

  getSensors(): Observable<Sensor[]> {
    return this.httpClient.get<Sensor[]>(this.url);
  }

  getSensorById(id: number): Observable<Sensor> {
    return this.httpClient.get<Sensor>(`${this.url}${id}`);
  }

  createSensor(sensor: Sensor): Observable<Sensor> {
    return this.httpClient.post<Sensor>(`${this.url}`, JSON.stringify(sensor), this.HTTPOptions);
  }

  updateSensor(id: number, sensor: Sensor): Observable<Sensor> {
    return this.httpClient.put<Sensor>(`${this.url}${id}`, JSON.stringify(sensor), this.HTTPOptions);
  }

  deleteSensor(id: number): Observable<Sensor> {
    return this.httpClient.delete<Sensor>(`${this.url}${id}`);
  }
}
