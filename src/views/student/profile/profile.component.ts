import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // Các thuộc tính đã fix cứng
  fullname: string = 'Nguyễn Văn A';
  username: string = 'nguyenvana';
  dob: string = '2000-01-01';  // Định dạng ngày sinh (yyyy-mm-dd)
  address: string = 'Hà Nội, Việt Nam';
  contact: string = '0123456789';  // Thông tin liên hệ
  specialty: string = 'Kỹ sư phần mềm';

  constructor() {}

  ngOnInit(): void {}
  goBack() {
    window.history.back();  // Sử dụng history của trình duyệt để quay lại trang trước
  }
}
