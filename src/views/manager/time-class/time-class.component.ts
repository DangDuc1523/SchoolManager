import { Component, OnInit } from '@angular/core';
import { ClassManagerService } from '../../../service/Manager/class-manager.service';
import { TimeClass } from '../../../dto/TimeClass';
import { MainManagerComponent } from "../main-manager/main-manager.component";
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-time-class',
  templateUrl: './time-class.component.html',
  styleUrls: ['./time-class.component.scss'],
  imports: [MainManagerComponent, CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class TimeClassComponent implements OnInit {

  addTimeTable = new FormGroup({
   
    nameSubject: new FormControl(''),
    dateLearn: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    room: new FormControl('')
  });

addNewTime() {
throw new Error('Method not implemented.');
}

  timeClasses: TimeClass[] = [];  // Mảng lưu trữ dữ liệu nhận được từ API
  dateLearn: string = '';
  dayOfWeek: string = '';
  startTime: string = '';
  endTime: string = '';
  room: string = '';
  classInfo: any = {};  // Thông tin lớp học
  subjectInfo: any = {};  // Thông tin môn học
  classId: string = '';  // Lưu trữ classId

  constructor(
    private classManagerService: ClassManagerService,
    private route: ActivatedRoute // Thêm ActivatedRoute để lấy dữ liệu từ router
  ) { }

  ngOnInit(): void {
    this.classId = this.classManagerService.getClassId();
    this.getTimeClasses(this.classId);
  }

  // Hàm gọi service để lấy dữ liệu
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
  

  // Hàm để chuyển đổi ngày thành thứ trong tuần (Ví dụ: "Thứ 2", "Thứ 3", ...)
  getDayOfWeek(dateString: string): string {
    const date = new Date(dateString);  // Chuyển chuỗi ngày thành đối tượng Date
    const daysOfWeek = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    return daysOfWeek[date.getDay()];  // Trả về tên thứ tương ứng với ngày trong tuần
  }
}
