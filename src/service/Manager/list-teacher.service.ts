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
    return this.http.post<User[]>('https://localhost:44344/api/User/teacher', {}); // Gửi một object rỗng nếu API không yêu cầu dữ liệu
  }
  
  getAllStudents(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:44344/api/User');
  }

  changeUserRole(userId: number, newRole: string): Observable<any> {
    return this.http.patch(`https://localhost:44344/api/User/${userId}/change-role?newRole=${newRole}`, {});
  }
  

}
