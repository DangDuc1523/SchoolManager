import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../dto/Student';
import { Timetable } from '../dto/timetable.model';
import { ClassSubject } from '../dto/classSubject.model';
import { Observable } from 'rxjs';
import { Subject } from '../dto/subject.model';
import { Grade } from '../dto/classgrade';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'https://localhost:44344/api';

  constructor(private http: HttpClient) {}

  // Lấy thông tin hồ sơ sinh viên theo ID
  getStudentProfile(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/User/${id}`);
  }

  // Cập nhật thông tin hồ sơ sinh viên
  updateStudentProfile(student: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/User/${student.userId}`, student);
  }

  // Lấy danh sách lớp của sinh viên theo StudentId
  getClass(studentId: number): Observable<ClassSubject[]> {
    return this.http.get<ClassSubject[]>(`${this.apiUrl}/Class/student/${studentId}`);
  }

  // Lấy thời khóa biểu theo ClassId
  getTimetablesByClass(classId: number): Observable<Timetable[]> {
    return this.http.get<Timetable[]>(`${this.apiUrl}/Timetable/Class/${classId}`);
  }

  // Lấy danh sách môn học và lớp
  getClassSubjects(): Observable<ClassSubject[]> {
    return this.http.get<ClassSubject[]>(`${this.apiUrl}/ClassSubject`);
  }

  // Lấy danh sách môn học theo ClassId
  getSubjectsByClassId(classId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/Subject/Class/${classId}`);
  }

  // Lấy danh sách môn học theo ClassId và TeacherId
  getSubjectsByClassAndTeacher(classId: number, teacherId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/Subject/Class/${classId}/Teacher/${teacherId}`);
  }

  // ========== Phần liên quan đến Grade (điểm) ==========
  
  // Lấy điểm theo StudentId và SubjectId
  getGradeByStudentAndSubject(studentId: number, subjectId: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.apiUrl}/Grade/Student/${studentId}/Subject/${subjectId}`);
  }

  // Lấy tất cả điểm của sinh viên đang đăng nhập theo SubjectId
  getGradesForLoggedInStudent(subjectId: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.apiUrl}/Grade/LoggedInStudent?subjectId=${subjectId}`);
  }

  // Nhập điểm từ file Excel
  importGrades(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/Grade/ImportGrade`, formData);
  }

  // Lấy tất cả điểm của một sinh viên
  getAllGradesByStudent(studentId: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(`https://localhost:44344/api/Grade/2/2`);
  }
  getSubjectById(subjectId: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.apiUrl}/Subject/${subjectId}`);
  }
  getGradesByStudentId(studentId: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.apiUrl}/Grade/Student/${studentId}`);
  }
  getTimetableByStudentId(studentId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${studentId}`);
  }
}
