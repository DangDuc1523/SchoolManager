import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../../services/teacher.service';
import { AuthService } from '../../../service/auth.service';
import { Subject } from '../../../dto/subject.model';
import { Student } from '../../../dto/student.models';
import { forkJoin, map, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-classinfo',
  standalone: true,
  imports: [CommonModule, FormsModule, HomeComponent],
  templateUrl: './grademanagement.component.html',
  styleUrls: ['./grademanagement.component.scss'],
})
export class GradeManagementComponent implements OnInit {
  classes: any[] = [];
  subjects: Subject[] = [];
  students: { student: Student; user: any; grade: any }[] = [];
  errorMessage = '';
  successMessage = '';
  selectedClassId: number = 0;
  selectedSubjectId: number = 0;
  selectedClassName = '';
  selectedSubjectName = '';
  averageGrade: number = 0;
  private auth: AuthService = inject(AuthService);
  private teacherId: number = 0;

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.teacherId = Number(this.auth.getId());
    if (this.teacherId > 0) {
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
        this.resetSubjectAndStudentViews();
      },
      error: (error) => {
        console.error('Error fetching class info:', error);
        this.errorMessage = 'Unable to fetch classes. Please try again later.';
      },
    });
  }

  getSubjectsForClass(classId: number, className: string): void {
    this.resetStudentView();
    this.selectedClassId = classId;
    this.selectedClassName = className;
    this.teacherService.getSubjectsByClassAndTeacher(classId, this.teacherId).subscribe({
      next: (subjects) => {
        this.subjects = subjects;
      },
      error: (error) => {
        console.error('Error fetching subjects:', error);
        this.errorMessage = 'Unable to fetch subjects. Please try again later.';
      },
    });
  }

  getStudentsForSubject(subjectId: number, subjectName: string): void {
    this.selectedSubjectId = subjectId;
    this.selectedSubjectName = subjectName;

    this.teacherService.getStudentsByClassAndSubject(this.selectedClassId, subjectId).subscribe({
      next: (students) => {
        const studentDetailRequests = students.map((student) =>
          forkJoin({
            user: this.teacherService.getTeacherProfile(student.userId),
            grade: this.teacherService.getGradeByStudentAndSubject(student.userId, subjectId),
          }).pipe(
            map(({ user, grade }) => ({
              student,
              user,
              grade: grade.length > 0 ? grade[0] : null,
            }))
          )
        );

        forkJoin(studentDetailRequests).subscribe({
          next: (studentDetails) => {
            this.students = studentDetails as { student: Student; user: any; grade: any }[];
            this.calculateAverageGrade();
          },
          error: (error) => {
            console.error('Error fetching user or grade details:', error);
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

  updateGrade(grade: { gradeId: number; studentId: number; subjectId: number; classId: number; score: number }): void {
    if (!grade || !grade.gradeId) {
      this.errorMessage = 'Grade ID is required for updating grade.';
      console.error('Error: Grade ID is missing.');
      return;
    }
  
    if (grade.score < 0 || grade.score > 10) {
      this.errorMessage = 'Score must be between 0 and 10.';
      console.error('Error: Invalid score value.');
      return;
    }
  
    this.teacherService.updateGrade(grade).subscribe({
      next: (response) => {
        if (response) { // Nếu API trả về response bất kỳ
          this.successMessage = 'Grade updated successfully!';
          this.calculateAverageGrade();
          setTimeout(() => (this.successMessage = ''), 3000);
        } else {
          this.errorMessage = 'Update failed. Please check the grade data.';
        }
      },
      error: (error) => {
        console.error('Error updating grade:', error);
        this.errorMessage = 'Unable to update grade. Please try again later.';
      },
    });
    
  }
  

  calculateAverageGrade(): void {
    const totalGrades = this.students.reduce(
      (sum, item) => (item.grade ? sum + item.grade.score : sum),
      0
    );
    const gradeCount = this.students.filter((item) => item.grade).length;
    this.averageGrade = gradeCount > 0 ? totalGrades / gradeCount : 0;
  }

  exportTableToExcel(): void {
    const sheetData = [
      [`StudentID`, `Full Name`, `SubjectID`, `ClassID`, `Score`],
      ...this.students.map((item) => [
        item.user?.userId || 'N/A',
        item.user?.fullName || 'N/A',
        this.selectedSubjectId || 'N/A',
        this.selectedClassId || 'N/A',
        item.grade?.score || 'N/A',
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Class Data');
    XLSX.writeFile(wb, `ClassData.xlsx`);
  }

  onImportGrade(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.teacherService.importGrade(file).subscribe({
        next: (response) => {
          this.successMessage = 'Import successful!';
          this.getStudentsForSubject(this.selectedSubjectId, this.selectedSubjectName);
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: (error) => {
          console.error('Error importing grades:', error);
          this.errorMessage = 'Import failed. Please try again.';
        },
      });
    }
  }

  resetSubjectAndStudentViews(): void {
    this.selectedClassName = '';
    this.subjects = [];
    this.resetStudentView();
  }

  resetStudentView(): void {
    this.selectedSubjectName = '';
    this.students = [];
  }
}
