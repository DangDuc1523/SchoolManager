import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grade',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {
  grades: any[] = [];
  studentId!: number;
  subjectId: number = 1;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Lấy studentId và subjectId từ tham số route
    const studentIdFromRoute = this.route.snapshot.paramMap.get('studentId');
    const subjectIdFromRoute = this.route.snapshot.paramMap.get('subjectId');
    
    // Kiểm tra nếu tham số tồn tại trong URL
    if (studentIdFromRoute && subjectIdFromRoute) {
      this.studentId = Number(studentIdFromRoute);
      this.subjectId = Number(subjectIdFromRoute);
    } else {
      console.error('Không có studentId hoặc subjectId trong URL');
      return;
    }

    // Kiểm tra console log để xem ID có đúng không
    console.log('Student ID:', this.studentId);
    console.log('Subject ID:', this.subjectId);

    this.fetchGrades();
  }

  fetchGrades(): void {
    // Kiểm tra giá trị của studentId và subjectId trước khi gọi API
    if (!this.studentId || !this.subjectId) {
      console.error('studentId hoặc subjectId không hợp lệ');
      return;
    }

    // Gọi API với studentId và subjectId
    this.studentService.getGradesByStudentAndSubject(this.studentId, this.subjectId).subscribe({
      next: (data) => {
        console.log('Dữ liệu nhận được:', data);
        if (Array.isArray(data) && data.length > 0) {
          // Gán giá trị grades nếu có dữ liệu
          this.grades = data.map(grade => ({
            room: grade.class?.room || 'N/A',  // Lấy room từ lớp học
            subject: grade.subject?.subjectName || 'N/A',  // Lấy subjectName từ môn học
            score: grade.score  // Điểm
          }));
        } else {
          console.log('Không có dữ liệu điểm');
        }
      },
      error: (err) => {
        console.error('Error fetching grades:', err);
      }
    });
  }

  goBack() {
    window.history.back();
  }
}
