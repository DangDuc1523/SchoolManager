import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
 
})
export class MemberComponent implements OnInit {
  goBack() {
    window.history.back();  // Sử dụng history của trình duyệt để quay lại trang trước
  }
  selectedClass: any;
  students: any[] = [];

  classData = [
    {
      name: 'Toán 12',
      teacher: 'Cô Lan',
      subject: 'Toán học',
      students: [
        { name: 'Nguyễn Văn A', dob: '2005-05-15', address: 'Hà Nội' },
        { name: 'Trần Thị B', dob: '2006-07-20', address: 'Hải Phòng' },
        { name: 'Lê Văn C', dob: '2005-09-10', address: 'Hồ Chí Minh' }
      ]
    },
    {
      name: 'Vật Lý 11',
      teacher: 'Thầy Hải',
      subject: 'Vật lý',
      students: [
        { name: 'Phạm Văn D', dob: '2006-02-25', address: 'Đà Nẵng' },
        { name: 'Nguyễn Thị E', dob: '2005-11-30', address: 'Quảng Ninh' },
        { name: 'Trần Văn F', dob: '2005-01-15', address: 'Cần Thơ' }
      ]
    }
  ];

  ngOnInit() {
    // Khởi tạo selectedClass và students từ classData
    this.selectedClass = this.classData[0];
    this.students = this.selectedClass.students;

    console.log('selectedClass:', this.selectedClass);
    console.log('students:', this.students);
  }

  // Chức năng thay đổi lớp học
  changeClass(event: Event) {
    const target = event.target as HTMLSelectElement;
    const index = Number(target.value); // Chuyển giá trị từ string thành number
  
    if (!isNaN(index) && index >= 0 && index < this.classData.length) {
      this.selectedClass = this.classData[index];
      this.students = this.selectedClass.students;
    } else {
      console.error("Invalid class index");
    }
  }
}
