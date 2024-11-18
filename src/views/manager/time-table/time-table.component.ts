import { Component, OnInit } from '@angular/core';
import { MainManagerComponent } from "../main-manager/main-manager.component";
import { Timetable } from '../../../dto/timeTableManager';
import { ClassManagerService } from '../../../service/Manager/class-manager.service';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-time-table',
  standalone: true,
  imports: [MainManagerComponent, RouterModule, CommonModule],
  templateUrl: './time-table.component.html',
  styleUrl: './time-table.component.scss'
})

export class TimetableComponent implements OnInit {

  timetables: Timetable[] = [];
  timeSlots = [
    { start: "08:00", end: "10:00" },
    { start: "10:00", end: "12:00" },
    { start: "12:00", end: "14:00" },
    { start: "14:00", end: "16:00" },
    { start: "16:00", end: "18:00" },
    { start: "18:00", end: "20:00" }
  ];

  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(private classManager: ClassManagerService) {}

  ngOnInit(): void {
    
  }

  // Hàm kiểm tra xem ngày và giờ có khớp với timetable hay không
  isValidSlot(timetable: Timetable, timeIndex: number): boolean {
    const date = new Date(timetable.dateLearn);
    const dayOfWeek = date.getDay(); // getDay() trả về số thứ tự ngày trong tuần (0 - Chủ Nhật, 6 - Thứ Bảy)

    // Kiểm tra xem ngày học có trùng với ngày trong tuần không
    const isDayValid = this.daysOfWeek[dayOfWeek] === this.daysOfWeek[timeIndex];

    // Kiểm tra thời gian bắt đầu có nằm trong khoảng thời gian không
    const startHour = parseInt(timetable.startTime.split(':')[0], 10);
    const timeSlot = this.timeSlots[timeIndex];
    const timeRangeStart = parseInt(timeSlot.start.split(':')[0], 10);
    const timeRangeEnd = parseInt(timeSlot.end.split(':')[0], 10);

    const isTimeValid = startHour >= timeRangeStart && startHour < timeRangeEnd;

    return isDayValid && isTimeValid;
  }
}

