import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainManagerComponent } from "../main-manager/main-manager.component";
import { ClassManagerService } from '../../../service/Manager/class-manager.service';
import { User } from '../../../dto/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-class',
  standalone: true,
  imports: [MainManagerComponent, CommonModule],
  templateUrl: './info-class.component.html',
  styleUrl: './info-class.component.scss'
})
export class InfoClassComponent implements OnInit {

  classId: string = ''; 

  user : User[] = []
  router = inject(Router)

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
    
  }
  
}
