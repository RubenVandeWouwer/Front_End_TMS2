import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Pump} from "../models/pump";
import {Observable} from "rxjs";
import {PumpValues} from "../models/pumpValues";
import {SensorValues} from "../models/sensorValues";

@Injectable({
  providedIn: 'root'
})
export class SensorValueService {

  HTTPOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    }),
  };

  url: string = "https://localhost:7120/api/sensorvalue"

  // url: string = "https://hooyberghs-api.azurewebsites.net/api/sensorvalue"

  constructor(private httpClient: HttpClient) {
  }


  createSensorValue(sensorValue: SensorValues): Observable<SensorValues> {
    return this.httpClient.post<SensorValues>(`${this.url}`, JSON.stringify(sensorValue), this.HTTPOptions);
  }
}
