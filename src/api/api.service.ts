import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
   private baseurl = "https://localhost:44344/api"
  
  constructor(private http: HttpClient) { }

  getPatients(): Observable<any>{
    return this.http.get<any>('https://localhost:44322/api/Patient/patients');
  }

  login(username: string, password: string): Observable<string> {
    const url = `${this.baseurl}/Auth/login?username=${username}&password=${password}`;
    return this.http.post(url, {}, { responseType: 'text' });
  }


  signup(data: any): Observable<any>{
    return this.http.post<any>('https://localhost:44344/api/Patient/signup', data);
  }
}
