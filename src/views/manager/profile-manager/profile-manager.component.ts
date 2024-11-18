import { Component, inject, OnInit } from '@angular/core';
import { MainManagerComponent } from "../main-manager/main-manager.component";
import { AuthService } from '../../../service/auth.service';
import { ClassManagerService } from '../../../service/Manager/class-manager.service';
import { User } from '../../../dto/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-manager',
  standalone: true,
  imports: [MainManagerComponent, CommonModule],
  templateUrl: './profile-manager.component.html',
  styleUrls: ['./profile-manager.component.scss']
})
export class ProfileManagerComponent implements OnInit {

  auth: AuthService = inject(AuthService);

  // Ép kiểu từ string | null sang number | null
  id: number | null = this.auth.getId() ? Number(this.auth.getId()) : null;

  userInfo: User[] = [];

  constructor(private classManager: ClassManagerService) {}

  ngOnInit(): void {
    if (this.id !== null) {
      this.getInfor(this.id);  // Gọi API với id hợp lệ
    } else {
      console.error("ID không hợp lệ");
    }
  }

  getInfor(id: number): void {
    this.classManager.getInfor(id).subscribe(
      data => {
        this.userInfo = data; // Lưu dữ liệu người dùng trả về
      },
      error => {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    );
  }
}
