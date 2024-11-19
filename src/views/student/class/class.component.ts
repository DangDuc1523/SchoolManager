  import { Component,OnInit, inject } from '@angular/core';
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
  
      // this.loadClass(Number(studentId)); // đây là userid
    }
  
    // loadClass(studentId: number): void {
    //   this.studentService.getClass(1).subscribe({
    //     next: (data: ClassSubject[]) => {
    //       console.log("data",data)
    //       this.schedule = data.map((classSubject) => ({
    //         timetableID: 0,
    //         classID: classSubject.classId,
    //         subjectID: classSubject.subjectId,
    //         dateLearn: classSubject.dateLearn,    
    //         startTime: classSubject.startTime,    
    //         endTime: classSubject.endTime,        
    //       }));
    //       console.log('Transformed schedule:', this.schedule);
    //     },
    //     error: (err) => {
    //       console.error('Error fetching schedule:', err);
    //     },
    //   });
    // }
    
    
    getMockDate(): string {
      // Trả về ngày giả định hoặc tính toán dựa trên logic của bạn
      return new Date().toISOString().split('T')[0]; // Ngày hôm nay
    }
    

    isScheduled(day: string, time: string): boolean {
      return this.schedule.some(
        (item) =>
          
          this.isTimeOverlap(item.startTime, item.endTime, time)
      );
    }
    
    getSubjectByDayAndTime(day: string, time: string): string | null {
      const match = this.schedule.find(
        (item) =>
          this.isTimeOverlap(item.startTime, item.endTime, time)
      );
      return match ? `Class ${match.classID} - Subject ${match.subjectID}` : null;
    }
    
    
  
    isTimeOverlap(start: string, end: string, slot: string): boolean {
      if (!start || !end || !slot) return false; // Kiểm tra giá trị null hoặc undefined
      const [slotStart, slotEnd] = slot.split(' - ');
      if (!slotStart || !slotEnd) return false; // Kiểm tra định dạng
      return (
        this.timeToMinutes(start) < this.timeToMinutes(slotEnd) &&
        this.timeToMinutes(end) > this.timeToMinutes(slotStart)
      );
    }
    

  
    timeToMinutes(time: string): number {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    }
  
    getDayOfWeek(date: string): string {
      if (!date) return ''; // Xử lý trường hợp date null
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) return ''; // Xử lý trường hợp ngày không hợp lệ
      return parsedDate.toLocaleDateString('en-US', { weekday: 'long' });
    }
    
    goBack() {
      window.history.back();  
    } 
  }
    
    
  
