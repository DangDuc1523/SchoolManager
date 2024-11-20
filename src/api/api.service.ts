import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IClass } from '../dto/IClass'
import { TimeClass } from '../dto/TimeClass';
import { RegisterDTO } from '../dto/RegisterDTO';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  
   private baseurl = "https://localhost:44344/api"
  
  constructor(private http: HttpClient) { }



  login(username: string, password: string): Observable<string> {
    const url = `${this.baseurl}/Auth/login?username=${username}&password=${password}`;
    return this.http.post(url, {}, { responseType: 'text' });
  }


  signup(newRegisterDTO:any): Observable<any>{
    return this.http.post<any>("https://localhost:44344/api/Auth/register", newRegisterDTO);
    
  }


  viewDetail(classId: string): Observable<TimeClass[]> {
    return this.http.get<TimeClass[]>(`${this.baseurl}/TimeTable/class/${classId}`);
  }

  ResetPassword(username: string) : Observable<any> {
    return this.http.post(`https://localhost:44344/api/Auth/forgetpassword1`,username);
  }
}
