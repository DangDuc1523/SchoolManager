import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  user = {
    address: '',
    contactInfo: '',
    specialty: '',
    password: ''
  };

  isEditing = false;  // Ban đầu là false, không thể chỉnh sửa

  // Chế độ chỉnh sửa sẽ chuyển sang true khi nhấn nút "Sửa"
  edit() {
    this.isEditing = true;  // Bật chế độ chỉnh sửa
  }

  // Lưu thay đổi
  save() {
    if (this.isEditing) {
      console.log('Thông tin người dùng đã được lưu:', this.user);
      this.isEditing = false; // Tắt chế độ chỉnh sửa sau khi lưu
    }
  }

  // Quay lại trang trước
  goBack() {
    window.history.back();  // Sử dụng history của trình duyệt để quay lại trang trước
  }
}
