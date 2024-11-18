import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../../services/teacher.service';
import { AuthService } from '../../../service/auth.service';
import { Subject } from '../../../dto/subject.model';
import { Student } from '../../../dto/student.models';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-classinfo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grademanagement.component.html',
  styleUrls: ['./grademanagement.component.scss'],
})
export class GradeManagementComponent implements OnInit {
  classes: any[] = []; 
  subjects: Subject[] = []; 
  students: { student: Student; user: any }[] = []; 
  errorMessage = '';
  selectedClassId: number = 0; 
  selectedClassName = ''; 
  selectedSubjectName = ''; 
  private auth: AuthService = inject(AuthService);
  private teacherId: number = 0;

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.teacherId = Number(this.auth.getId());
    if (this.teacherId && this.teacherId > 0) {
      this.getTeacherClasses(this.teacherId);
    } else {
      this.errorMessage = 'Invalid teacher ID. Please check your authentication.';
      console.error('Error: Invalid teacher ID');
    }
  }

  getTeacherClasses(teacherId: number): void {
    this.teacherService.getClassesByTeacherId(teacherId).subscribe({
      next: (classes) => {
        this.classes = classes;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error fetching class info:', error);
        this.errorMessage = 'Unable to fetch classes. Please try again later.';
      },
    });
  }

  getSubjectsForClass(classId: number, className: string): void {
    this.selectedClassId = classId; // Save selected class ID
    this.selectedClassName = className; // Save selected class name
    this.teacherService.getSubjectsByClassAndTeacher(classId, this.teacherId).subscribe({
      next: (subjects) => {
        this.subjects = subjects;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error fetching subjects:', error);
        this.errorMessage = 'Unable to fetch subjects. Please try again later.';
      },
    });
  }

  getStudentsForSubject(subjectId: number, subjectName: string): void {
    this.selectedSubjectName = subjectName; // Save selected subject name
    this.teacherService.getStudentsByClassAndSubject(this.selectedClassId, subjectId).subscribe({
      next: (students) => {
        const studentDetailRequests = students.map((student) =>
          this.teacherService.getTeacherProfile(student.userId).pipe(
            map((user) => ({
              student,
              user,
            }))
          )
        );

        forkJoin(studentDetailRequests).subscribe({
          next: (studentDetails) => {
            this.students = studentDetails;
            this.errorMessage = '';
          },
          error: (error) => {
            console.error('Error fetching user details:', error);
            this.errorMessage = 'Unable to fetch student details. Please try again later.';
          },
        });
      },
      error: (error) => {
        console.error('Error fetching students:', error);
        this.errorMessage = 'Unable to fetch students. Please try again later.';
      },
    });
  }
}
