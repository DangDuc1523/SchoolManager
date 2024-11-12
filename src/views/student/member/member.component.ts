import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  selectedClass: any;
  students: any[] = [];

  classData = [
    {
      name: 'Toán 12',
      teacher: 'Cô Lan',
      subject: 'Toán học',
      students: [
        { name: 'Nguyễn Văn A' },
        { name: 'Trần Thị B' },
        { name: 'Lê Văn C' }
      ]
    },
    {
      name: 'Vật Lý 11',
      teacher: 'Thầy Hải',
      subject: 'Vật lý',
      students: [
        { name: 'Phạm Văn D' },
        { name: 'Nguyễn Thị E' },
        { name: 'Trần Văn F' }
      ]
    }
  ];

  ngOnInit() {
    // Khởi tạo selectedClass và students
    this.selectedClass = this.classData[0];
    this.students = this.selectedClass.students;

    // Ghi log để kiểm tra dữ liệu
    console.log('selectedClass:', this.selectedClass);
    console.log('students:', this.students);
  }
}
