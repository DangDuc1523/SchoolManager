import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClass } from '../dto/IClass'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
   private baseurl = "https://localhost:44344/api"
  
  constructor(private http: HttpClient) { }

  getClassManager(): Observable<IClass[]> {
    return this.http.get<IClass[]>('https://localhost:44344/api/Class');
  }

  login(username: string, password: string): Observable<string> {
    const url = `${this.baseurl}/Auth/login?username=${username}&password=${password}`;
    return this.http.post(url, {}, { responseType: 'text' });
  }


  signup(data: any): Observable<any>{
    return this.http.post<any>('https://localhost:44344/api', data);
  }
}
