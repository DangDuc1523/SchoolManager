import { Component, OnInit, inject } from '@angular/core';
import { TeacherService } from '../../../services/teacher.service';
import { AuthService } from '../../../service/auth.service';
import { Timetable } from '../../../dto/timetable.model';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-teacherschedule',
  standalone: true,
  imports: [CommonModule, HomeComponent],
  templateUrl: './teacherschedule.component.html',
  styleUrls: ['./teacherschedule.component.scss'],
})
export class TeacherScheduleComponent implements OnInit {
  timeSlots = [
    '08:00 - 09:30',
    '10:00 - 11:30',
    '13:00 - 14:30',
    '15:00 - 16:30',
  ];
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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
    this.teacherService.getTeacherTimeTable(teacherId).subscribe({
      next: (data) => {
        this.schedule = data.map((item) => ({
          ...item,
          room: item.room || 'Unknown', // Đảm bảo thông tin phòng
        }));
      },
      error: (err) => {
        console.error('Error fetching schedule:', err);
      },
    });
  }

  getScheduleForTimeAndDay(day: string, time: string): Timetable | null {
    return this.schedule.find(
      (item) =>
        this.getWeekday(item.dateLearn) === day &&
        this.isTimeOverlap(item.startTime, item.endTime, time)
    ) || null;
  }

  getWeekday(date: string): string {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('en-US', { weekday: 'long' });
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
}
