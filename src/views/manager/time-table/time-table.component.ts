import { Component, OnInit } from '@angular/core';
import { MainManagerComponent } from "../main-manager/main-manager.component";
import { Timetable } from '../../../dto/timeTableManager';
import { ClassManagerService } from '../../../service/Manager/class-manager.service';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-time-table',
  standalone: true,
  imports: [MainManagerComponent, RouterModule, CommonModule, FormsModule ],
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimetableComponent implements OnInit {
  timetables: Timetable[] = [];
  filteredTimetables: Timetable[] = [];
  timeSlots = [
    { start: "08:00", end: "10:00" },
    { start: "10:00", end: "12:00" },
    { start: "12:00", end: "14:00" },
    { start: "14:00", end: "16:00" },
    { start: "16:00", end: "18:00" },
    { start: "18:00", end: "20:00" }
  ];

  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Selected week range
  selectedStartDate: string | null = null;
  selectedEndDate: string | null = null;

  constructor(private classManager: ClassManagerService) {}

  ngOnInit(): void {
    this.classManager.getTimetable().subscribe({
      next: (data: Timetable[]) => {
        this.timetables = data;
        this.filteredTimetables = data; // Initialize filtered data
        console.log('Timetable loaded successfully', data);
      },
      error: (err) => {
        console.error('Error loading timetable:', err);
        alert('Failed to load timetable. Please try again later.');
      }
    });
  }

  /**
   * Update filteredTimetables based on the selected week.
   */
  onWeekChange(): void {
    if (this.selectedStartDate && this.selectedEndDate) {
      const start = new Date(this.selectedStartDate);
      const end = new Date(this.selectedEndDate);

      this.filteredTimetables = this.timetables.filter((timetable) => {
        const date = new Date(timetable.dateLearn);
        return date >= start && date <= end;
      });
    } else {
      this.filteredTimetables = [...this.timetables]; // Reset to full data if no range selected
    }
  }

  /**
   * Get timetable data for a specific day and time slot.
   */
  getTimetableForSlot(dayIndex: number, timeIndex: number): Timetable | null {
    const dayOfWeek = this.daysOfWeek[dayIndex];
    const timeSlot = this.timeSlots[timeIndex];

    return this.filteredTimetables.find((timetable) => {
      const timetableDate = new Date(timetable.dateLearn);
      const timetableDay = this.daysOfWeek[timetableDate.getDay()];
      const startTime = timetable.startTime.slice(0, 5);

      return (
        timetableDay === dayOfWeek &&
        startTime >= timeSlot.start &&
        startTime < timeSlot.end
      );
    }) || null;
  }
}