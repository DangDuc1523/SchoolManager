import { Component, OnInit } from '@angular/core';
import { MainManagerComponent } from "../main-manager/main-manager.component";
import { CommonModule } from '@angular/common';
import { ClassManagerService } from '../../../service/Manager/class-manager.service';

import { User } from '../../../dto/User';
@Component({
  selector: 'app-list-student',
  standalone: true,
  imports: [MainManagerComponent, CommonModule],
  templateUrl: './list-student.component.html',
  styleUrl: './list-student.component.scss'
})
export class ListStudentComponent implements OnInit{
  classId: number = 0;
  message: string ='';
  constructor(private classManager: ClassManagerService) {}
 
  students: User[] = []; // Danh sách sinh viên
  filteredStudents: User[] = []; // Danh sách sau khi lọc

  ngOnInit(): void {
    const classIdString = this.classManager.getClassId();
    this.classId = Number(classIdString);
    this.loadStudents();
      
    
  }

  

    loadStudents(): void {
      this.classManager.getAllStudents().subscribe(
        (data) => {
          this.students = data;
          console.log(this.students);
  
          this.filteredStudents = this.students.filter(
            (student) => student.role === 'Student'
          ); // Lọc các sinh viên có role là 'Student'
          console.log('Filtered Students:', this.filteredStudents);
        },
        (error) => {
          console.error('Error fetching students:', error);
        }
      );
   }

   addStudent(userId: number): void {
    if (userId && this.classId) {
      // Gọi API để thêm học sinh
      this.classManager.addStudent(userId, this.classId).subscribe(
        (response) => {
          // Thành công: xử lý phản hồi
          console.log('Response from API:', response);
          this.message = 'Student added successfully!';  // Thông báo thành công
          
          // Tải lại danh sách sinh viên nếu muốn
          this.loadStudents();  // Tải lại danh sách sinh viên (nếu cần)
          
          // Nếu cần, bạn có thể cập nhật thêm thông tin từ API vào biến hoặc bảng
          // ví dụ:
          // this.students.push(response); // Nếu API trả về sinh viên vừa thêm
        },
        (error) => {
          // Xử lý lỗi
          if (error.status === 409) {
            this.message = 'Student already exists in this class!';  // Thông báo lỗi nếu người dùng đã tồn tại
          } else {
            this.message = 'An error occurred while adding the student: ' + (error.message || error.statusText);
          }
          console.error('Error occurred:', error);
        }
      );
    } else {
      this.message = 'UserId and ClassId are required.';  // Thông báo nếu thiếu UserId hoặc ClassId
    }
  }

  // deleteUser(userId: number): void {
  //   // console.log('Delete user with ID:', userId);
  //   // // Logic xóa
  //   // this.classManager.deleteUser(userId).subscribe(
  //   //   (response) => {
  //   //     console.log('User deleted:', response);
  //   //     this.loadUsers(); // Reload lại danh sách sau khi xóa
  //   //   },
  //   //   (error) => {
  //   //     console.error('Error deleting user:', error);
  //   //   }
  //   // );
  // }

}
