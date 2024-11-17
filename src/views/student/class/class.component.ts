  import { Component } from '@angular/core';
  import { CommonModule } from '@angular/common'; // Import CommonModule

  @Component({
    selector: 'app-class',
    standalone: true,
    imports: [CommonModule], // Thêm CommonModule vào đây
    templateUrl: './class.component.html',
    styleUrls: ['./class.component.scss']
  })
  export class ClassComponent {
    timetable = [
      {
        name: 'Thứ Hai',
        subjects: [
          {
            name: 'Toán',
            room: '101',
            time: '08:00 AM',
            startTime: '08:00',
            endTime: '10:00',
            class: 'Lớp A1',
            date: new Date() // ngày cụ thể
          },
          {
            name: 'Lý',
            room: '102',
            time: '10:30 AM',
            startTime: '10:30',
            endTime: '12:00',
            class: 'Lớp A2',
            date: new Date() // ngày cụ thể
          }
        ]
      }
    ];   
    goBack() {
      window.history.back();  // Sử dụng history của trình duyệt để quay lại trang trước
    } 
  }
