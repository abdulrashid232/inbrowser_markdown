import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private apiUrl = '../assets/data.json';

  fetchData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
