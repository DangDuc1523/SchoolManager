import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-teacherschedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacherschedule.component.html',
  styleUrls: ['./teacherschedule.component.scss']
})
export class TeacherScheduleComponent {
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  timeSlots = ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00'];

  schedule: { [key: string]: { [key: string]: string } } = {
    Monday: {
      '08:00 - 09:00': 'Math',
      '10:00 - 11:00': 'Science'
    },
    // More data...
  };

  isScheduled(day: string, time: string): boolean {
    return !!(this.schedule[day] && this.schedule[day][time]);
  }
}
