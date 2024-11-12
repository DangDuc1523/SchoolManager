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
          { date: '2024-11-11', time: '08:00 - 10:00', name: 'Toán', room: '101' },
          { date: '2024-11-11', time: '10:30 - 12:00', name: 'Lý', room: '102' }
        ]
      },
      {
        name: 'Thứ Ba',
        subjects: [
          { date: '2024-11-12', time: '08:00 - 10:00', name: 'Hóa', room: '201' },
          { date: '2024-11-12', time: '10:30 - 12:00', name: 'Văn', room: '202' }
        ]
      }
    ];
    
  }
