import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { MainManagerComponent } from "../main-manager/main-manager.component";
import { IClass } from '../../../dto/IClass'

import { ApiService } from '../../../api/api.service';

@Component({
  selector: 'app-list-class-manager',
  standalone: true,
  imports: [ MainManagerComponent],
  templateUrl: './list-class-manager.component.html',
  styleUrl: './list-class-manager.component.scss'
})
export class ListClassManagerComponent implements OnInit {
  

  classData: IClass[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getClassManager().subscribe({
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
}
