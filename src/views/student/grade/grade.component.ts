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
    { room: '101', subject: 'Toán học', teacher: 'Cô Lan', score: 8.5 },
    { room: '102', subject: 'Vật lý', teacher: 'Thầy Hải', score: 9.0 },
    { room: '103', subject: 'Hóa học', teacher: 'Cô Mai', score: 7.0 },
  ];
  goBack() {
    window.history.back();  // Sử dụng history của trình duyệt để quay lại trang trước
  }
}
