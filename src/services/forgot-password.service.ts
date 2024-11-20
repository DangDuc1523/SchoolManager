import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private apiUrl = 'https://localhost:44344/api/Auth/forgetpassword';

  constructor(private http: HttpClient) {}

  resetPassword(username: string): Observable<any> {
    return this.http.post(this.apiUrl, { username });
  }
}
