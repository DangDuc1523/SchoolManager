import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassManagerService } from '../../../service/Manager/class-manager.service';
import { Observable } from 'rxjs';
import { MainManagerComponent } from "../main-manager/main-manager.component";
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from '../../../dto/subject.model';
import { Timetable } from '../../../dto/timeTableManager';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-time-table-form',
  standalone: true,
  imports: [MainManagerComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './time-class.component.html',
  styleUrls: ['./time-class.component.scss']
})
export class TimeClassComponent implements OnInit {
  addTimeTable: FormGroup;
  timeClasses: any[] = []; // Array to store the time table data
  subjects : Subject[] = []
  classId : string = ''
  

  constructor(
    private fb: FormBuilder,
    private classManagerService: ClassManagerService  // Inject the service
  ) {
    this.addTimeTable = this.fb.group({
      dateLearn: ['', Validators.required],
      startTime: ['', Validators.required],
      room: ['']
    });
  }

  ngOnInit(): void {
    this.classManagerService.getSubjects().subscribe(
      (data) => {
        this.subjects = data;
      },
      (error) => {
        console.error('Error fetching subjects:', error);
      }
    );
    this.classId = this.classManagerService.getClassId();
    this.getTimeClasses(this.classId);

  }

  // Method to handle form submission
  addNewTime(): void {
    if (this.addTimeTable.valid) {
      const formData = this.addTimeTable.value;

      const newTimeClass = {
        timetableId: 0,  // Assuming new timetable, so ID is 0
        classId: 0,      // Assuming no class ID initially, can be dynamic later
        subjectId: 0,    // Assuming no subject ID initially, can be dynamic later
        dateLearn: formData.dateLearn,
        startTime: {
          ticks: this.convertToTicks(formData.startTime)
        },
        endTime: {
          ticks: this.convertToTicks(this.calculateEndTime(formData.startTime))
        },
        room: formData.room
      };

      // Send data to API using the service
      this.classManagerService.addTimeTable(newTimeClass).subscribe(response => {
        console.log('Data submitted successfully', response);
        this.timeClasses.push(newTimeClass); // Add the new time class to the table
        this.addTimeTable.reset(); // Reset the form after submission
      }, error => {
        console.error('Error submitting data', error);
      });
    }
  }

  // Convert time to ticks (milliseconds since epoch)
  convertToTicks(time: string): number {
    const [hour, minute] = time.split(':').map((part) => parseInt(part, 10));
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date.getTime(); // Get ticks (milliseconds since Jan 1, 1970)
  }

  // Method to calculate the end time based on start time
  calculateEndTime(startTime: string): string {
    const startHour = parseInt(startTime.split(':')[0], 10);
    const endHour = startHour + 1;  // Assuming each class lasts 1 hour
    return `${endHour}:00`;
  }


  getTimeClasses(classId: string): void {
    this.classManagerService.viewDetail2(classId).subscribe(
      (data: Timetable[]) => {
        if (data && data.length > 0) {
          this.timeClasses = data; // Lưu toàn bộ dữ liệu trả về vào mảng
        } else {
          console.warn('Không có dữ liệu để hiển thị.');
          this.timeClasses = [];
        }
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
        this.timeClasses = [];
      }
    );
  }

}


