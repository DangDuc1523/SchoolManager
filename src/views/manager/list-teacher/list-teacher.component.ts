import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainManagerComponent } from "../main-manager/main-manager.component";
import { User } from '../../../dto/User';
import { ListTeacherService } from '../../../service/Manager/list-teacher.service';

@Component({
  selector: 'app-list-teacher',
  standalone: true,
  imports: [MainManagerComponent, CommonModule],
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.scss']
})
export class ListTeacherComponent implements OnInit {
  listTeacher: User[] = []; // Danh sách giáo viên
  listUser: User[] = [];    // Danh sách người dùng (có thể thêm làm giáo viên)
  showUserList: boolean = false; // Điều khiển hiển thị bảng danh sách người dùng

  constructor(private listTeacherService: ListTeacherService) {}

  ngOnInit(): void {
    this.getListTeacher();
  }

  getListTeacher(): void {
    this.listTeacherService.getListTeacher().subscribe({
      next: (data: User[]) => {
        if (data && data.length > 0) {
          this.listTeacher = data;
        } else {
          this.listTeacher = [];
        }
      },
      error: (error) => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
        this.listTeacher = [];
      }
    });
  }

  getListStudent(): void {
    this.listTeacherService.getAllStudents().subscribe({
      next: (data: User[]) => {
        if (data && data.length > 0) {
          // Loại bỏ người dùng có role là "Teacher"
          this.listUser = data.filter(user => user.role !== 'Teacher');
        } else {
          this.listUser = [];
        }
      },
      error: (error) => {
        console.error('Lỗi khi lấy danh sách sinh viên:', error);
        this.listUser = [];
      }
    });
  }

  addTeacher(userid: number): void {
    this.listTeacherService.changeUserRole(userid, 'Teacher').subscribe({
      next: (response) => {
        console.log('Role changed successfully', response);
        alert('Role changed successfully!');
        this.getListTeacher(); // Cập nhật lại danh sách giáo viên
        this.getListStudent(); // Cập nhật lại danh sách người dùng
      },
      error: (error) => {
        console.error('Error changing role', error);
        alert('Error changing role');
      }
    });
  }

  DeleteTeacher(userid: number): void {
    this.listTeacherService.changeUserRole(userid, 'Student').subscribe({
      next: (response) => {
        console.log('Role changed successfully', response);
        alert('Role changed successfully!');
        this.getListTeacher(); // Cập nhật lại danh sách giáo viên
        this.getListStudent(); // Cập nhật lại danh sách người dùng
      },
      error: (error) => {
        console.error('Error changing role', error);
        alert('Error changing role');
      }
    });
  }

  toggleUserList(): void {
    this.showUserList = !this.showUserList;
    if (this.showUserList) {
      this.getListStudent(); // Tải danh sách người dùng nếu hiển thị bảng
    }
  }
}
