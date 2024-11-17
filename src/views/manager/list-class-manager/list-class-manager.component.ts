import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { MainManagerComponent } from "../main-manager/main-manager.component";
import { IClass } from '../../../dto/IClass';
import { TimeClass } from '../../../dto/TimeClass';
import { RouterModule } from '@angular/router'; 

import { ApiService } from '../../../api/api.service';
import { ClassManagerService } from '../../../service/Manager/class-manager.service';

@Component({
  selector: 'app-list-class-manager',
  standalone: true,
  imports: [ MainManagerComponent, RouterModule],
  templateUrl: './list-class-manager.component.html',
  styleUrl: './list-class-manager.component.scss'
})
export class ListClassManagerComponent implements OnInit {

  classData: IClass[] = [];

  router = inject(Router)

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

  
}
