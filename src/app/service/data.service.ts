import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private apiUrl = '../assets/data.json';

  private localStorageKey = 'documents';
  
  fetchData(): Observable<any[]> {
    const data = localStorage.getItem(this.localStorageKey);
    if (data) {
      return of(JSON.parse(data));
    } else {
      return this.http.get<any>(this.apiUrl);
    }
  }

  saveData(documents: any[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(documents));
  }

  private selectedDocument = new BehaviorSubject<any>(null);
  public selectedDocument$ = this.selectedDocument.asObservable();

  setSelectedDocument(document: any) {
    this.selectedDocument.next(document);
  }
  


  
}
