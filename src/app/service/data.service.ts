import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private apiUrl = '../assets/data.json';

  fetchData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  private selectedDocument = new BehaviorSubject<any>(null);
  public selectedDocument$ = this.selectedDocument.asObservable();

  setSelectedDocument(document: any) {
    this.selectedDocument.next(document);
    }
}
