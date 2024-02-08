import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XmlService {
  constructor(private http: HttpClient) {}

  loadXmlFile(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'text' });
  }

  updateXmlContent(url: string, newContent: string): Observable<any> {
    return this.http.put(url, newContent, { responseType: 'text' });
  }
}
