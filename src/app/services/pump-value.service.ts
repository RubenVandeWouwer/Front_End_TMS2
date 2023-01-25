import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Pump} from "../models/pump";
import {Observable} from "rxjs";
import {PumpValues} from "../models/pumpValues";

@Injectable({
  providedIn: 'root'
})
export class PumpValueService {

  HTTPOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    }),
  };

  url: string = "https://localhost:7120/api/pumpvalue"
  // url: string = "https://hooyberghs-api.azurewebsites.net/api/pumpvalue"

  constructor(private httpClient: HttpClient) {
  }


  createPumpValue(pumpValue: PumpValues): Observable<PumpValues> {
    return this.httpClient.post<PumpValues>(`${this.url}`, JSON.stringify(pumpValue), this.HTTPOptions);
  }
}
