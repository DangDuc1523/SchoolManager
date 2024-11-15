import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../dto/user.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private apiUrl = 'https://localhost:44344/api/User';

  constructor(private http: HttpClient) {}

  getTeacherProfile(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`);
  }
}
