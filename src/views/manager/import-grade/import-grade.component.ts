import { Component, OnInit } from '@angular/core';
import { ClassManagerService } from '../../../service/Manager/class-manager.service';
import { Student } from '../../../dto/student.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-import-grade',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './import-grade.component.html',
  styleUrl: './import-grade.component.scss'
})
export class ImportGradeComponent implements OnInit{

  
  subjectId: number= 0;
  classId: number = 0;
  students: Student[] = [];
  

  constructor(private classManager: ClassManagerService) {}
  
  ngOnInit(): void {
    this.subjectId = this.classManager.getSubjectId();
    this.loadStudents(this.subjectId, Number(this.classManager.getClassId()));
  }

  
  loadStudents(subjectId: number, classId: number): void {
    this.classManager.getStudentsByClassAndSubject(subjectId, classId).subscribe({
      next: (data: Student[]) => {
        this.students = data;
      },
      error: (error) => {
        console.error('Error loading students:', error);
      }
    });
  }
  

  updateGrade() {
    throw new Error('Method not implemented.');
    }

}
