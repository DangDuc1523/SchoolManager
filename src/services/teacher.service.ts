import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../dto/user.model';
import { Timetable } from '../dto/timetable.model';
import { ClassSubject } from '../dto/classSubject.model';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { Subject } from '../dto/subject.model';
import { Student } from '../dto/student.models';
import { Grade } from '../dto/grade.models';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private apiUrl = 'https://localhost:44344/api';

  constructor(private http: HttpClient) {}

  getTeacherProfile(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/User/${id}`);
  }

  updateUserProfile(teacher: Teacher): Observable<Teacher> {
    if (!teacher.userID) {
      throw new Error('User ID is required for updating profile');
    }
    return this.http.put<Teacher>(`${this.apiUrl}/User/${teacher.userID}`, teacher);
  }
  
  getClassSubjects(): Observable<ClassSubject[]> {
    return this.http.get<ClassSubject[]>(`${this.apiUrl}/User/ClassSubject`);
  }
  //chưa đc
  getTimetablesByClass(classID: number): Observable<Timetable[]> {
    return this.http.get<Timetable[]>(`${this.apiUrl}/User/TimeTable/Class/${classID}`);
  }

  getTeacherSchedules(teacherId: number): Observable<ClassSubject[]> {
    return this.http.get<ClassSubject[]>(`${this.apiUrl}/User/ClassSubject?teacherId=${teacherId}`);
  }
  //đến đây
  getClassesByTeacherId(teacherId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Class/teacher/${teacherId}/classes`);
  }

  getSubjectsByClassId(classId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/class/${classId}`);
  }

  getSubjectsByClassAndTeacher(classId: number, teacherId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/Subject/class/${classId}/teacher/${teacherId}`);
  }
  getStudentsByClassAndSubject(classId: number, subjectId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/Student/class/${classId}/subject/${subjectId}`);
  }
  getGradeByStudentAndSubject(studentId: number, subjectId: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.apiUrl}/Grade/${studentId}/${subjectId}`);
  }
  updateGrade(grade: { gradeId: number; studentId: number; subjectId: number; classId: number; score: number }): Observable<any> {
    if (!grade.gradeId) {
      throw new Error('Grade ID is required for updating grade');
    } 
    return this.http.put(`${this.apiUrl}/Grade/${grade.gradeId}`, grade);
  }
  
}

