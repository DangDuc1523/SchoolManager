import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TimeClass } from '../../dto/TimeClass'; // Đảm bảo rằng bạn đã import đúng DTO
import { IClass } from '../../dto/IClass';
import { User } from '../../dto/User';
import { Timetable } from '../../dto/timetable.model';


@Injectable({
  providedIn: 'root'
})
export class ClassManagerService {
  deleteClass(classId: string): Observable<any> {
    return this.http.delete(`https://localhost:44344/api/Class/${classId}`).pipe(
      catchError(error => {
        console.error('Error deleting class:', error);
        return throwError(() => new Error('Error deleting class'));
      })
    );
  }
  



  addNewClass(nameClass: string, schedule: string, room: string): Observable<any> {
    const newClass = {
      classId: 0,          // classId sẽ là 0 khi thêm mới
      className: nameClass, // className là tên lớp học
      schedule: schedule,   // schedule là thời khóa biểu
      room: room,           // room là phòng học
      studentCount: 0       // studentCount ban đầu là 0
    };
    console.log(newClass); // Kiểm tra cấu trúc dữ liệu gửi đi
    return this.http.post<any>('https://localhost:44344/api/Class', newClass);
  }
  

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
    const test = this.http.get<TimeClass[]>(`${this.baseurl}/TimeTable/GetTimetablesByClass/${classId}`);
    return test;
  }


  getInforClass(classId: string): Observable<User[]>
  {
    const test = this.http.get<User[]>(`${this.baseurl}/User/by-class/${classId}`);
    console.log(test);
    return test;
  }


  getAllStudents(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:44344/api/User');
  }


  addStudent(userId: number, classId: number): Observable<any> {
    return this.http.post<any>('https://localhost:44344/api/Student', { UserId: userId, ClassId: classId });
  }
  
  deleteStudent(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseurl}/Student/${userId}`);
  }
  

  getTimetable(): Observable<Timetable[]> {
    const s =  this.http.get<Timetable[]>('https://localhost:44344/api/TimeTable');
    console.log(s);
    return s;
  }


  getInfor(id: number): Observable<User[]> {
    const s =  this.http.get<User[]>(`https://localhost:44344/api/User/${id}`);
    console.log(s);
    return s;
  }

}
