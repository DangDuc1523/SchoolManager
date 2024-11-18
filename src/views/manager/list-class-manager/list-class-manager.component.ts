import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { MainManagerComponent } from "../main-manager/main-manager.component";
import { IClass } from '../../../dto/IClass';
import { TimeClass } from '../../../dto/TimeClass';
import { RouterModule } from '@angular/router'; 

import { ApiService } from '../../../api/api.service';
import { ClassManagerService } from '../../../service/Manager/class-manager.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-class-manager',
  standalone: true,
  imports: [ MainManagerComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './list-class-manager.component.html',
  styleUrl: './list-class-manager.component.scss'
})
export class ListClassManagerComponent implements OnInit {

  classData: IClass[] = [];

  router = inject(Router)

  addClassForm = new FormGroup({
    nameClass: new FormControl(''),
    schedule: new FormControl(''),
    room: new FormControl('')
    
  });

  constructor(private apiService: ApiService, private classManager: ClassManagerService) {}

  ngOnInit(): void {
    this.classManager.getClassManager().subscribe({
      next: (data: IClass[]) => {
        this.classData = data;
      },
      error: (error: any) => { // Định rõ kiểu `any` cho `error` để tránh lỗi
        console.error('Lỗi khi gọi API:', error);
      },
      complete: () => {
        console.log('Gọi API hoàn tất.');
      }
    });
  }

    viewDetail(classId: string): void {
      this.classManager.setClassId(classId);
      this.router.navigate(['/timeClass']);
    }

    viewListStudent(classId: string){
      this.classManager.setClassId(classId);
      this.router.navigate(['/infoClassManager']);
    }


    addClass(): void {
      // Lấy giá trị từ FormControl
      const nameClass = this.addClassForm.get('nameClass')?.value ?? '';
      const schedule = this.addClassForm.get('schedule')?.value ?? '';
      const room = this.addClassForm.get('room')?.value ?? '';
    
      // Kiểm tra giá trị trước khi gọi API
      console.log('NameClass:', nameClass);
      console.log('Schedule:', schedule);
      console.log('Room:', room);
    
      // Gọi API thêm lớp
      this.classManager.addNewClass(nameClass, schedule, room).subscribe(
        response => {
          console.log('Class added successfully', response);
          // Sau khi thêm lớp thành công, có thể reset form hoặc thông báo cho người dùng
          this.addClassForm.reset();
          location.reload();
        },
        error => {
          console.error('Error adding class', error);
        }
      );
    }
    

    deleteClass(classId: string): void {
      this.classManager.deleteClass(classId).subscribe({
        next: (response) => {
          console.log('Class deleted successfully:', response);
          // Cập nhật lại danh sách lớp sau khi xóa
          this.classData = this.classData.filter(classItem => classItem.classId !== classId);
        },
        error: (error) => {
          console.error('Error deleting class:', error);
        }
      });
    }
    

  
}
