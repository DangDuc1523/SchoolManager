import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { StudentService } from '../../../services/student.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  providers: [DatePipe],
})
export class InfoComponent implements OnInit {
  student: any = {
  fullName: '',
  dateOfBirth: '',
  address: '',
  contactInfo: '',
  specialty: '',
};

  isEditing: boolean = false; // Trạng thái chỉnh sửa
  auth: AuthService = inject(AuthService);

  constructor(private studentService: StudentService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    const studentId = this.auth.getId();

    if (!studentId) {
      console.error('Student ID is missing from AuthService.');
      return;
    }

    this.studentService.getStudentProfile(Number(studentId)).subscribe({
      next: (data: any) => {
        console.log('Fetched student data from API:', data);

        data.dateOfBirth = this.datePipe.transform(data.dateOfBirth, 'yyyy-MM-dd') || '';
        this.student = data;
      },
      error: (err) => {
        console.error('Error fetching student profile:', err);
      },
    });
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    if (!this.student) {
      alert('Failed to update profile. Student data is missing.');
      return;
    }

    if (!this.student.fullName || !this.student.dateOfBirth || !this.student.address || !this.student.contactInfo || !this.student.specialty) {
      alert('All fields are required. Please fill in all fields.');
      return;
    }

    this.studentService.updateStudentProfile(this.student).subscribe({
      next: () => {
        this.isEditing = false;
        alert('Profile updated successfully!');
      },
      error: () => {
        alert('Failed to update profile. Please try again.');
      },
    });
  }

  goBack(): void {
    window.history.back();
  }
}
