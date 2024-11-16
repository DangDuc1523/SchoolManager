import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../dto/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListTeacherService {

  constructor(private http: HttpClient) { }


  getListTeacher(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:44344/api/User');
  }
}
