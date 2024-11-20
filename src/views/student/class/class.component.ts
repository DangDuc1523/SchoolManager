import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Timetable } from '../../../dto/timetable.model';
import { ClassSubject } from '../../../dto/classSubject.model';
import { AuthService } from '../../../service/auth.service';
import { StudentService } from '../../../services/student.service';


@Component({
  selector: 'app-class',
  standalone: true,
  imports: [CommonModule], // Thêm CommonModule vào đây
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  timeSlots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
  ];
  schedule: Timetable[] = [];

  auth: AuthService = inject(AuthService);
  studentService: StudentService = inject(StudentService);

  ngOnInit(): void {
    const studentId = this.auth.getId(); 

    if (!studentId) {
      console.error('Student ID is missing from AuthService.');
      return;
    }

    this.loadClass(Number(studentId)); 
  }

  loadClass(studentId: number): void {
    this.studentService.getTimetableByStudentId(studentId).subscribe({
      next: (data: any) => {
        console.log('API Response:', data); // Kiểm tra dữ liệu trả về từ API
        if (Array.isArray(data)) {
          // Nếu dữ liệu là mảng, tiến hành map
          this.schedule = data.map((item) => ({
            timetableID: item.timetableID,
            classID: item.classID,
            subjectID: item.subjectID,
            dateLearn: item.dateLearn,
            startTime: item.startTime,
            endTime: item.endTime,
            room: item.room,
            className: item.className,
            subjectName: item.subjectName
          }));
          console.log('Transformed schedule:', this.schedule);
        } else {
          console.error('Expected an array, but received:', data);
        }
      },
      error: (err) => {
        console.error('Error fetching timetable:', err);
      }
    });
  }

  getDayOfWeek(date: string): string {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('en-US', { weekday: 'long' });
  }
  // Kiểm tra xem có môn học nào vào ngày và giờ cụ thể không
isScheduled(day: string, time: string): boolean {
  return this.schedule.some((subject) => {
    const subjectDay = this.getDayOfWeek(subject.dateLearn);
    return subjectDay === day && subject.startTime === time;
  });
}


  goBack() {
    window.history.back();
  }
}
