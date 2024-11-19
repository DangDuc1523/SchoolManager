import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../../services/teacher.service';
import { AuthService } from '../../../service/auth.service';
import { Subject } from '../../../dto/subject.model';
import { Student } from '../../../dto/student.models';
import { forkJoin, map } from 'rxjs';
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
  selectedClassName = '';
  selectedSubjectName = '';
  averageGrade: number = 0; // Store average grade
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
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error fetching subjects:', error);
        this.errorMessage = 'Unable to fetch subjects. Please try again later.';
      },
    });
  }

  getStudentsForSubject(subjectId: number, subjectName: string): void {
    this.selectedSubjectName = subjectName;
    this.teacherService.getStudentsByClassAndSubject(this.selectedClassId, subjectId).subscribe({
      next: (students) => {
        const studentDetailRequests = students.map((student) =>
          forkJoin({
            user: this.teacherService.getTeacherProfile(student.userId),
            grade: this.teacherService.getGradeByStudentAndSubject(student.studentId, subjectId),
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
            this.calculateAverageGrade(); // Calculate average grade
            this.errorMessage = '';
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

  updateGrade(grade: any): void {
    if (!grade) {
      this.errorMessage = 'Grade information is missing. Unable to update.';
      console.error('Grade object is null or undefined');
      return;
    }

    if (grade.score < 0 || grade.score > 10) {
      this.errorMessage = 'Score must be between 0 and 10.';
      return;
    }

    this.teacherService.updateGrade(grade).subscribe({
      next: () => {
        console.log(`Grade with ID ${grade.gradeId} updated successfully to score ${grade.score}.`);
        this.calculateAverageGrade(); // Recalculate average grade after update
        this.successMessage = `Grade updated successfully to ${grade.score}.`;
        this.errorMessage = '';

        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        console.error('Error updating grade:', error);
        this.errorMessage = 'Unable to update grade. Please try again later.';
        this.successMessage = ''; // Clear success message if any error occurs
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
    // Calculate the average grade
    const totalScore = this.students.reduce((sum, item) => sum + (item.grade?.score || 0), 0);
    const averageGrade = this.students.length > 0 ? (totalScore / this.students.length).toFixed(2) : 'N/A';
  
    // Prepare metadata
    const metadata = [
      [`Class Name:`, this.selectedClassName],
      [`Subject:`, this.selectedSubjectName],
      [`Average Grade:`, averageGrade],
      [],
      [`#`, `Full Name`, `Date of Birth`, `Contact Info`, `Address`, `Grade`], // Table headers
    ];
  
    // Prepare student data
    const studentData = this.students.map((item, index) => [
      index + 1,
      item.user?.fullName || 'N/A',
      item.user?.dateOfBirth || 'N/A',
      item.user?.contactInfo || 'N/A',
      item.user?.address || 'N/A',
      item.grade?.score || 'N/A',
    ]);
  
    // Combine metadata and student data
    const sheetData = [...metadata, ...studentData];
  
    // Convert data to a worksheet
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
  
    // Create workbook and append worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students for Subject');
  
    // Export to Excel
    XLSX.writeFile(wb, `${this.selectedClassName}_${this.selectedSubjectName}_Students.xlsx`);
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
