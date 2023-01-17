import { Injectable } from '@angular/core';
import { Site } from './models/site';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  HTTPOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    }),
  };

  url: string = "https://hooyberghs-api.azurewebsites.net/api/site/"

  constructor(private httpClient: HttpClient) {
  }

  getSites(): Observable<Site[]> {
    return this.httpClient.get<Site[]>(this.url);
  }

  getSiteById(id: number): Observable<Site> {
    return this.httpClient.get<Site>(this.url + id);
  }

  postSite(site: Site): Observable<Site> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Site>("this.url", site, this.HTTPOptions);
  }

  putSite(id:number, site: Site): Observable<Site> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Site>("this.url" + id, site, this.HTTPOptions);
  }

  deleteSite(id: number): Observable<Site> {
    return this.httpClient.delete<Site>("this.url" + id);
  }
}
