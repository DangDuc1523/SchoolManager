import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TeacherService } from '../../../services/teacher.service';
import { Teacher } from '../../../dto/user.model';

@Component({
  selector: 'app-teacher-profile',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './teacherprofile.component.html',
  styleUrls: ['./teacherprofile.component.scss'],
  providers: [DatePipe],
})
export class TeacherProfileComponent implements OnInit {
  teacher: Teacher | null = null;

  constructor(private teacherService: TeacherService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    const teacherId = 2;
    this.teacherService.getTeacherProfile(teacherId).subscribe({
      next: (data) => {
        data.dateOfBirth = this.datePipe.transform(data.dateOfBirth, 'dd/MM/yyyy') || '';
        this.teacher = data;
      },
      error: (err) => {
        console.error('Error fetching teacher profile', err);
      },
    });
  }
}
