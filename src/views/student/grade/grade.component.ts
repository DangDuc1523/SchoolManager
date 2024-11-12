import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-grade',
  standalone: true,
  imports: [CommonModule], // Thêm CommonModule vào đây
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent {
  grades = [
    { subject: 'Toán', score: 9.5, rating: 'Xuất sắc' },
    { subject: 'Lý', score: 8.0, rating: 'Giỏi' },
    { subject: 'Hóa', score: 7.0, rating: 'Khá' },
    // Thêm các môn khác nếu cần
  ];
}
