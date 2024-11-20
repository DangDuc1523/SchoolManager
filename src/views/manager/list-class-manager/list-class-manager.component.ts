import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainManagerComponent } from '../main-manager/main-manager.component';
import { IClass } from '../../../dto/IClass';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../api/api.service';
import { ClassManagerService } from '../../../service/Manager/class-manager.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from '../../../dto/subject.model';
import { FormsModule } from '@angular/forms';
import { User } from '../../../dto/Student';

@Component({
  selector: 'app-list-class-manager',
  standalone: true,
  imports: [FormsModule, MainManagerComponent, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './list-class-manager.component.html',
  styleUrls: ['./list-class-manager.component.scss'],
})
export class ListClassManagerComponent implements OnInit {
  classData: IClass[] = []; // Danh sách lớp học
  subject: Subject[] = [];
  students: User[] = []; // Danh sách sinh viên
  filteredTeacher: User[] = []; // Danh sách sau khi lọc
  selectedSubjectId: number | null = null;
  selectedTeacherId: number | null = null;
  classid: number = 0;
  subjectId: number = 0;
  userId: number = 0;

  // FormGroup cho việc thêm lớp
  addClassForm = new FormGroup({
    nameClass: new FormControl(''), // Tên lớp
    subjectId: new FormControl(''), 
    userId: new FormControl(''), // Phòng học
  });

  // Inject Router
  router = inject(Router);

  constructor(private apiService: ApiService, private classManager: ClassManagerService) {}

  ngOnInit(): void {
    // Gọi API để lấy danh sách lớp học
    this.classManager.getClassManager().subscribe({
      next: (data: IClass[]) => {
        this.classData = data; // Gán dữ liệu vào biến classData
        console.log('Classes loaded:', data);
      },
      error: (error: any) => {
        console.error('Error fetching class data:', error);
      },
      complete: () => {
        console.log('Class data fetch complete.');
      },
    });

    this.classManager.getSubjects().subscribe({
      next: (data: Subject[]) => {
        this.subject = data; // Gán dữ liệu vào biến subject
        console.log('Subjects loaded:', data);
      },
      error: (error: any) => {
        console.error('Error fetching subject data:', error);
      },
    });

    this.classManager.getAllStudents().subscribe(
      (data) => {
        this.students = data;
        console.log(this.students);

        this.filteredTeacher = this.students.filter(
          (student) => student.role === 'Teacher'
        ); // Lọc Teacher
        console.log('Filtered Students:', this.filteredTeacher);
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  // Xem chi tiết thời khóa biểu của lớp
  viewDetail(classId: string): void {
    this.classManager.setClassId(classId);
    this.router.navigate(['/timeClass']);
  }

  // Xem danh sách học sinh của lớp
  viewListStudent(classId: string): void {
    this.classManager.setClassId(classId);
    this.router.navigate(['/infoClassManager']);
  }

  addClass(): void {
    const nameClass = this.addClassForm.get('nameClass')?.value?.trim() || '';
    const subjectId = this.addClassForm.get('subjectId')?.value?.trim() || '';
    const userid = this.addClassForm.get('userId')?.value?.trim() || '';
    this.subjectId = Number(this.addClassForm.get('subjectId')?.value);
    this.userId = Number(this.addClassForm.get('userId')?.value);

    this.classManager.setSubId(this.subjectId);
    
    if (!nameClass) {
      alert('All fields are required!');
      return;
    }
  
    this.classManager.addNewClass(nameClass, subjectId).subscribe({
      next: (response) => {
        this.classid = response.classId; // Lấy classId từ phản hồi API
        console.log('Class added successfully:', response);
  
        // Gọi addClassSubject sau khi nhận được classId từ response
        console.log("classid :" + this.classid);
        console.log("subjectid " +this.subjectId);
        console.log("userid " +this.userId);
        this.classManager.addClassSubject(this.classid, this.subjectId, this.userId).subscribe({
          next: (classSubjectResponse) => {
            console.log('Class-Subject added successfully:', classSubjectResponse);
          },
          error: (classSubjectError) => {
            console.error('Error adding Class-Subject:', classSubjectError);
          }
        });
  
        this.addClassForm.reset(); // Reset form sau khi thêm thành công
        this.refreshClassList(); // Cập nhật danh sách lớp
      },
      error: (error) => {
        console.error('Error adding class:', error);
      },
    });
  }
  

  // Xóa lớp học
  deleteClass(classId: string): void {
    this.classManager.deleteClass(classId).subscribe({
      next: (response) => {
        console.log('Class deleted successfully:', response);
        this.classData = this.classData.filter((classItem) => classItem.classId !== classId); // Cập nhật danh sách
      },
      error: (error) => {
        console.error('Error deleting class:', error);
      },
    });
  }

  // Làm mới danh sách lớp sau khi thêm hoặc xóa
  private refreshClassList(): void {
    this.classManager.getClassManager().subscribe({
      next: (data: IClass[]) => {
        this.classData = data; // Cập nhật lại danh sách lớp
      },
      error: (error: any) => {
        console.error('Error refreshing class data:', error);
      },
    });
  }
}
