import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../dto/user.model';
import { Timetable } from '../dto/timetable.model';
import { ClassSubject } from '../dto/classSubject.model';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { Subject } from '../dto/subject.model';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'https://localhost:44344/api';

  constructor(private http: HttpClient) {}

  getStudentProfile(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/User/${id}`);
  }
  updateStudentProfile(student: Student): Observable<Student> {
    
    return this.http.put<Student>(`${this.apiUrl}/User/${student.userID}`, student);
  }
  getClass(StudentId: number): Observable<ClassSubject[]> {
    return this.http.get<ClassSubject[]>(`${this.apiUrl}/TimeTable/student/${StudentId}`);// api này cx sai : đang lấy theo 1 kiểu gì đó rất ngớ ngẩn 
  }
  getTimetablesByClass(classID: number): Observable<Timetable[]> {
    return this.http.get<Timetable[]>(`${this.apiUrl}/User/TimeTable/Class/${classID}`); // api sai
  }
  getClassSubjects(): Observable<ClassSubject[]> {
    return this.http.get<ClassSubject[]>(`${this.apiUrl}/User/ClassSubject`); // api sai
  }
  getSubjectsByClassId(classId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/class/${classId}`);
  }
  getSubjectsByClassAndTeacher(classId: number, studentId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/Subject/class/${classId}/teacher/${studentId}`);
  }
}
