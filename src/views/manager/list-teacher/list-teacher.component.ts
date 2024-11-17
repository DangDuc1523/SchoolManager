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
  listTeacher: User[] = []; // Mảng chứa danh sách giáo viên

  constructor(private listTeacherService: ListTeacherService) {}

  ngOnInit(): void {
    this.getListTeacher();
  }

  getListTeacher(): void {
    this.listTeacherService.getListTeacher().subscribe({
      next: (data: User[]) => {
        if (data && data.length > 0) {
          this.listTeacher = data; // Lưu dữ liệu trả về vào mảng
        } else {
          console.warn('Không có dữ liệu để hiển thị.');
          this.listTeacher = [];
        }
      },
      error: (error) => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
        this.listTeacher = [];
      },
      complete: () => {
        console.log(this.listTeacher);
      }
    });
  }
}
