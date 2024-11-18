import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainManagerComponent } from "../main-manager/main-manager.component";
import { ClassManagerService } from '../../../service/Manager/class-manager.service';
import { User } from '../../../dto/User';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-info-class',
  standalone: true,
  imports: [MainManagerComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './info-class.component.html',
  styleUrl: './info-class.component.scss'
})
export class InfoClassComponent implements OnInit {

  classId: string = ''; 

  user : User[] = []
  router = inject(Router)

  addStudent = new FormGroup({
    nameClass: new FormControl(''),
    schedule: new FormControl(''),
    room: new FormControl('')
    
  });
  message: string ='';

  constructor(private classManager: ClassManagerService){
    
  }

  ngOnInit(): void {
    this.classId = this.classManager.getClassId();
    this.getStudentClasses(this.classId);
  }

  getStudentClasses(classId: string): void{
  this.classManager.getInforClass(classId).subscribe({
    next: (data: User[]) => {
      console.log(data);  // Kiểm tra dữ liệu trả về từ API
      this.user = data;
    },
    error: (error: any) => {
      console.error('Lỗi khi gọi API:', error);
    },
    complete: () => {
      console.log('Gọi API hoàn tất.');
    }
  });
}
  addNewStudent(){
    this.router.navigate(['/listStudent'])
  }

  deleteUser(userId: number): void {
    // Hiển thị hộp thoại xác nhận
    const isConfirmed = window.confirm('Are you sure you want to delete this student?');
  
    if (isConfirmed) {
      this.classManager.deleteStudent(userId).subscribe(
        (response) => {
          this.message = 'Student deleted successfully!';  // Thông báo xóa thành công
           // Tải lại danh sách sinh viên
        },
        (error) => {
          this.message = 'An error occurred while deleting the student.';  // Thông báo lỗi khi xóa
          console.error('Error deleting student:', error);
        }
      );
    }
  }
  
  
}
