import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeClass } from '../../dto/TimeClass';  // Đảm bảo rằng bạn đã import đúng DTO
import { IClass } from '../../dto/IClass';

@Injectable({
  providedIn: 'root'
})
export class ClassManagerService {

  private classId: string = '';

  setClassId(id: string): void {
    this.classId = id;
  }

  getClassId(): string {
    return this.classId;
  }

  private baseurl: string = 'https://localhost:44344/api';  // URL API của bạn

  constructor(private http: HttpClient) { }

  getClassManager(): Observable<IClass[]> {
    return this.http.get<IClass[]>('https://localhost:44344/api/Class');
  }

  // Phương thức gọi API để lấy thông tin thời gian học cho classId
  viewDetail(classId: string): Observable<TimeClass[]> {
    return this.http.get<TimeClass[]>(`${this.baseurl}/TimeTable/class/${classId}`);
  }
}
