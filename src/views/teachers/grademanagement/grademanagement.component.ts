import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../../services/teacher.service';
import { AuthService } from '../../../service/auth.service';
import { Subject } from '../../../dto/subject.model';

@Component({
  selector: 'app-classinfo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grademanagement.component.html',
  styleUrls: ['./grademanagement.component.scss'],
})
export class GradeManagementComponent implements OnInit {
  classes: any[] = []; // Danh sách các lớp học
  subjects: Subject[] = []; // Danh sách môn học khi chọn class
  errorMessage = '';
  selectedClassName = ''; // Tên lớp được chọn
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
        if (error.status === 404) {
          this.errorMessage = 'No classes found for this teacher.';
        } else {
          this.errorMessage = 'Unable to fetch classes. Please try again later.';
        }
      },
    });
  }

  getSubjectsForClass(classId: number, className: string): void {
    this.selectedClassName = className; // Lưu tên lớp được chọn
    this.teacherService.getSubjectsByClassAndTeacher(classId, this.teacherId).subscribe({
      next: (subjects) => {
        this.subjects = subjects;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error fetching subjects:', error);
        if (error.status === 404) {
          this.errorMessage = 'No subjects found for this class.';
        } else {
          this.errorMessage = 'Unable to fetch subjects. Please try again later.';
        }
      },
    });
  }
}
