import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Thêm FormsModule
import { User} from '../../../dto/Student';
import { AuthService } from '../../../service/auth.service';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, FormsModule], // Thêm FormsModule vào imports
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [DatePipe],
})
export class ProfileComponent implements OnInit {
  student: User | null = null;
  isEditing: boolean = false; // Trạng thái chỉnh sửa
  auth: AuthService = inject(AuthService);

  constructor(private studentService: StudentService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    const studentId = this.auth.getId();
  
    if (!studentId) {
      console.error('Student ID is missing from AuthService.');
      return;
    }
  
    console.log('Student ID from AuthService:', studentId);
  
    this.studentService.getStudentProfile(Number(studentId)).subscribe({
      next: (data: any) => {
        console.log('Fetched student data from API:', data);
  
        data.userID = data.userId;
        delete data.userId;
  
        if (!data.userID) {
          console.error('API did not return userID. Data received:', data);
        }
  
        data.dateOfBirth = this.datePipe.transform(data.dateOfBirth, 'yyyy-MM-dd') || '';
        this.student = data;
      },
      error: (err) => {
        console.error('Error fetching student profile:', err);
      },
    });
  }
  goBack() {
    window.history.back();  // Sử dụng history của trình duyệt để quay lại trang trước
  }
}
