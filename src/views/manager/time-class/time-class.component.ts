import { Component, OnInit } from '@angular/core';
import { ClassManagerService } from '../../../service/Manager/class-manager.service';
import { TimeClass } from '../../../dto/TimeClass';
import { MainManagerComponent } from "../main-manager/main-manager.component";
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from '../../../dto/subject.model';
import { Timetable } from '../../../dto/timeTableManager';

@Component({
  selector: 'app-time-class',
  templateUrl: './time-class.component.html',
  styleUrls: ['./time-class.component.scss'],
  imports: [MainManagerComponent, CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class TimeClassComponent implements OnInit {
  classId: string = '';
  subjects: Subject[] = [];  // Mảng subjects để hiển thị trong select
  addTimeTable: FormGroup;  // FormGroup để quản lý form
  timeClasses: TimeClass[] = [];
  constructor(private classManagerService: ClassManagerService) {
    // Khởi tạo form với các control
    this.addTimeTable = new FormGroup({
      nameSubject: new FormControl(''),
      dateLearn: new FormControl(''),
      startTime: new FormControl(''),
      endTime: new FormControl(''),
      room: new FormControl('')
    });


    this.addTimeTable.get('startTime')?.valueChanges.subscribe((startTime) => {
      this.setEndTime(startTime);
    });
  }
  
  

  ngOnInit(): void {
    // Lấy dữ liệu môn học từ API
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

  setEndTime(startTime: string): void {
    if (!startTime) {
      this.addTimeTable.get('endTime')?.setValue('');
      return;
    }

    // Tách giờ và phút từ startTime
    const [hours, minutes] = startTime.split(':').map(Number);

    // Thêm 2 giờ vào startTime
    let endHour = hours + 2;  // Cộng thêm 2 giờ

    // Kiểm tra xem giờ có vượt qua 24h hay không
    if (endHour >= 24) {
      endHour -= 24;
    }

    // Đảm bảo endTime có định dạng "H:mm"
    const endTime = `${endHour}:${minutes < 10 ? '0' + minutes : minutes}`;
    this.addTimeTable.get('endTime')?.setValue(endTime);
  }

  getTimeClasses(classId: string): void {
    this.classManagerService.viewDetail(classId).subscribe(
      (data: TimeClass[]) => {
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
  // Hàm để gửi dữ liệu từ form tới API
  addNewTime(): void {
    const timetableData: Timetable = {
      // Mã lịch học mới (có thể được sinh tự động ở server)
      classId: 0, // Lớp học (có thể cần lấy từ URL hoặc form)
      subjectId: this.addTimeTable.value.nameSubject, // Lấy giá trị subjectId từ form
      dateLearn: this.addTimeTable.value.dateLearn,
      startTime: this.addTimeTable.value.startTime,
      endTime: this.addTimeTable.value.startTime,
      room: this.addTimeTable.value.room,
     
    };

    // Gửi dữ liệu qua POST request
    this.classManagerService.addNewTimeTable(timetableData).subscribe(
      (response) => {
        console.log('Lịch học đã được thêm:', response);
        // Có thể cập nhật lại danh sách thời khóa biểu sau khi thêm mới
      },
      (error) => {
        console.error('Lỗi khi thêm lịch học:', error);
      }
    );
  }
}