import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { TeacherService } from '../../../services/teacher.service';
import { Teacher } from '../../../dto/user.model';
import { AuthService } from '../../../service/auth.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, HomeComponent], 
  templateUrl: './teacherprofile.component.html',
  styleUrls: ['./teacherprofile.component.scss'],
  providers: [DatePipe],
})
export class TeacherProfileComponent implements OnInit {
  teacher: Teacher | null = null;
  isEditing: boolean = false; 
  auth: AuthService = inject(AuthService);

  constructor(private teacherService: TeacherService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    const teacherId = this.auth.getId();
  
    if (!teacherId) {
      console.error('Teacher ID is missing from AuthService.');
      return;
    }
  
    console.log('Teacher ID from AuthService:', teacherId);
  
    this.teacherService.getTeacherProfile(Number(teacherId)).subscribe({
      next: (data: any) => {
        console.log('Fetched teacher data from API:', data);
  
        data.userID = data.userId;
        delete data.userId;
  
        if (!data.userID) {
          console.error('API did not return userID. Data received:', data);
        }
  
        data.dateOfBirth = this.datePipe.transform(data.dateOfBirth, 'yyyy-MM-dd') || '';
        this.teacher = data;
      },
      error: (err) => {
        console.error('Error fetching teacher profile:', err);
      },
    });
  }
  
  

  toggleEditMode(): void {
    this.isEditing = !this.isEditing; 
  }

  saveProfile(): void {
    if (!this.teacher) {
      alert('Failed to update profile. Teacher data is missing.');
      return;
    }
  
    if (!this.teacher.fullName || !this.teacher.dateOfBirth || !this.teacher.address || !this.teacher.contactInfo || !this.teacher.specialty) {
      alert('All fields are required. Please fill in all fields.');
      return;
    }
  
    this.teacherService.updateUserProfile(this.teacher).subscribe({
      next: () => {
        this.isEditing = false;
        alert('Profile updated successfully!');
      },
      error: () => {
        alert('Failed to update profile. Please try again.');
      },
    });
  }
  
  
}
  
  

