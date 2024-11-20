import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainManagerComponent } from "../main-manager/main-manager.component";
import { ClassManagerService } from '../../../service/Manager/class-manager.service';
import { User } from '../../../dto/User';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-info-class',
  standalone: true,
  imports: [MainManagerComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './info-class.component.html',
  styleUrl: './info-class.component.scss'
})
export class InfoClassComponent implements OnInit {

  classId: string = ''; 
  user: User[] = [];
  studentId: number = 0;  // This will store the studentId after fetching it
  router = inject(Router);

  addStudent = new FormGroup({
    nameClass: new FormControl(''),
    schedule: new FormControl(''),
    room: new FormControl('')
  });
  message: string = '';

  constructor(private classManager: ClassManagerService) {}

  ngOnInit(): void {
    this.classId = this.classManager.getClassId();
    this.getStudentClasses(this.classId);
  }

  getStudentClasses(classId: string): void {
    this.classManager.getInforClass(classId).subscribe({
      next: (data: User[]) => {
        console.log(data);  // Check the data returned from API
        this.user = data;
      },
      error: (error: any) => {
        console.error('Error calling API:', error);
      },
      complete: () => {
        console.log('API call completed.');
      }
    });
  }

  addNewStudent() {
    this.router.navigate(['/listStudent']);
  }

  deleteUser(userid: number): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this student and their grades?');
    const classId = Number(this.classId);
    
    if (isConfirmed) {
      // Fetch the studentId using the API call
      this.classManager.getStudentByUserIdAndClassId(userid, classId).subscribe({
        next: (data: any) => {
          const studentId = data.studentId;  // This is the correct studentId value

          console.log('Received studentId:', studentId);
          
          // Proceed with the deletion using the studentId
          this.classManager.deleteStudentAndGrades(studentId, classId).subscribe({
            next: () => {
              this.message = 'Student and grades deleted successfully!';
              console.log('Student and grades deleted successfully!');
            },
            error: (error) => {
              this.message = 'An error occurred while deleting the student and grades.';
              console.error('Error deleting student and grades:', error);
            },
            complete: () => {
              console.log('Delete operation completed.');
            }
          });
        },
        error: (error) => {
          console.error('Error fetching studentId:', error);
        }
      });
    }
  }
}
