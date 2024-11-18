import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TeacherService } from '../../../services/teacher.service';
import { AuthService } from '../../../service/auth.service';
import { Timetable } from '../../../dto/timetable.model';
import { ClassSubject } from '../../../dto/classSubject.model';

@Component({
  selector: 'app-teacherschedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacherschedule.component.html',
  styleUrls: ['./teacherschedule.component.scss'],
})
export class TeacherScheduleComponent implements OnInit {
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
  teacherService: TeacherService = inject(TeacherService);

  ngOnInit(): void {
    const teacherId = this.auth.getId();

    if (!teacherId) {
      console.error('Teacher ID is missing from AuthService.');
      return;
    }

    this.loadTeacherSchedule(Number(teacherId));
  }

  loadTeacherSchedule(teacherId: number): void {
    this.teacherService.getTeacherSchedules(teacherId).subscribe({
      next: (data: ClassSubject[]) => {
        this.schedule = data.map((classSubject) => ({
          timetableID: 0, 
          classID: classSubject.classId,
          subjectID: classSubject.subjectId,
          dateLearn: '2024-11-20', 
          startTime: '08:00', 
          endTime: '10:00', 
        }));
        console.log('Transformed schedule:', this.schedule);
      },
      error: (err) => {
        console.error('Error fetching schedule:', err);
      },
    });
  }
  
  

  isScheduled(day: string, time: string): boolean {
    return this.schedule.some(
      (item) =>
        this.getDayOfWeek(item.dateLearn) === day &&
        this.isTimeOverlap(item.startTime, item.endTime, time)
    );
  }

  getSubjectByDayAndTime(day: string, time: string): string | null {
    const match = this.schedule.find(
      (item) =>
        this.getDayOfWeek(item.dateLearn) === day &&
        this.isTimeOverlap(item.startTime, item.endTime, time)
    );
    return match ? `Class ${match.classID}` : null;
  }

  isTimeOverlap(start: string, end: string, slot: string): boolean {
    const [slotStart, slotEnd] = slot.split(' - ');
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
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('en-US', { weekday: 'long' }); // Lấy tên ngày trong tuần
  }
}
