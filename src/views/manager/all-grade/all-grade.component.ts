import { Component } from '@angular/core';
import { ClassManagerService } from '../../../service/Manager/class-manager.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Grade } from '../../../dto/grade.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-grade',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-grade.component.html',
  styleUrl: './all-grade.component.scss'
})
export class AllGradeComponent {
  grades: Grade[] = [];
  loading: boolean = true;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private classManagerService: ClassManagerService) {}

  ngOnInit(): void {
    this.classManagerService.getGrades().subscribe({
      next: (data) => {
        this.grades = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching grades:', error);
        this.loading = false;
      },
    });
  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.grades.map((grade, index) => ({
        StudentId: grade.student.studentId,
        NameStudent: grade.student.user?.fullName,
        SubjectId: grade.subject.subjectId,
        ClassId: grade.class.classId,
        Score: grade.score,
      }))
    );

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Grades');

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const data: Blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    saveAs(data, 'grades.xlsx');
  }

  onImportGrade(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Calling the service to import the file directly using FormData
      this.classManagerService.importGrade(file).subscribe({
        next: () => {
          this.successMessage = 'Import successful!';
          setTimeout(() => (this.successMessage = ''), 3000);
          // Optionally, reload the grades after import
          this.ngOnInit();
        },
        error: (error) => {
          console.error('Error importing grades:', error);
          this.errorMessage = 'Import failed. Please try again.';
        },
      });
    }
  }
}
