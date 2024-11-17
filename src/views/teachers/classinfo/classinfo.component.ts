import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/auth.service';
import { Subject } from '../../../dto/subject.model'; 

@Component({
  selector: 'app-classinfo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classinfo.component.html',
  styleUrls: ['./classinfo.component.scss'],
})
export class ClassInfoComponent implements OnInit {
  classes: any[] = [];
  subjects: Subject[] = [];
  selectedClassId: number | null = null;
  errorMessage = '';
  private auth: AuthService = inject(AuthService);
  private teacherId: number = 0;
  private apiUrl = 'https://localhost:44344/api'; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.teacherId = Number(this.auth.getId()); 
    this.getTeacherClasses();
  }

  getTeacherClasses(): void {
    this.http
      .get<any[]>(`${this.apiUrl}/Class/teacher/${this.teacherId}/classes`)
      .subscribe({
        next: (classes) => {
          this.classes = classes;
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error fetching class info:', error);
          this.errorMessage = 'Unable to fetch classes. Please try again later.';
        },
      });
  }

  getSubjectsByClassId(classId: number): void {
    this.selectedClassId = classId; 
    this.http
      .get<Subject[]>(`${this.apiUrl}/Subject/class/${classId}`)
      .subscribe({
        next: (subjects) => {
          this.subjects = subjects;
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error fetching subjects:', error);
          this.errorMessage = 'Unable to fetch subjects. Please try again later.';
        },
      });
  }
}
