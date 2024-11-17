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
    return this.http.post<User[]>('https://localhost:44344/api/user/teachers', {}); // Gửi một object rỗng nếu API không yêu cầu dữ liệu
  }
  
}
