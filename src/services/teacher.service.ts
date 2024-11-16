import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../dto/user.model';
import { Timetable } from '../dto/timetable.model';
import { ClassSubject } from '../dto/classSubject.model';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private apiUrl = 'https://localhost:44344/api/User';

  constructor(private http: HttpClient) {}

  getTeacherProfile(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`);
  }

  updateUserProfile(teacher: Teacher): Observable<Teacher> {
    if (!teacher.userID) {
      throw new Error('User ID is required for updating profile');
    }
  
    return this.http.put<Teacher>(`${this.apiUrl}/${teacher.userID}`, teacher);
  }
  getClassSubjects(): Observable<ClassSubject[]> {
    return this.http.get<ClassSubject[]>(`${this.apiUrl}/ClassSubject`);
  }

  getTimetablesByClass(classID: number): Observable<Timetable[]> {
    return this.http.get<Timetable[]>(`${this.apiUrl}/TimeTable/Class/${classID}`);
  }

  getTeacherSchedules(teacherId: number): Observable<ClassSubject[]> {
    return this.http.get<ClassSubject[]>(`${this.apiUrl}/ClassSubject?teacherId=${teacherId}`);
  }
  
  
}
