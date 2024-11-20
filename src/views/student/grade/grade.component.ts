import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { Grade } from '../../../dto/classgrade';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Thêm FormsModule
import { AuthService } from '../../../service/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-grade',
  standalone: true,
  imports: [CommonModule, FormsModule], // Thêm FormsModule vào imports
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss'],
})
export class GradeComponent implements OnInit {
  grades: Grade[] = [];
  studentId: number = 0;
  auth: AuthService = inject(AuthService);

  // Ép kiểu từ string | null sang number | null
  id: number | null = this.auth.getId() ? Number(this.auth.getId()) : null;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    // Optionally, check if id is valid before calling loadGrades
    if (this.id !== null) {
      this.loadGrades(this.id);  // Only call if id is not null
    } else {
      console.error('Invalid user ID');
    }
  }

  // Change the method signature to accept number | null
  loadGrades(id: number | null): void {
    if (id !== null) {  // Check if id is not null inside the method
      this.studentService.getGradesByStudentId(id).subscribe(
        (data) => {
          this.grades = data;
        },
        (error) => {
          console.error('Error fetching grades:', error);
        }
      );
    } else {
      console.error('Invalid user ID');
    }
  }
}
